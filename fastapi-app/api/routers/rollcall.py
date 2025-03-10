import os
from typing import List, Tuple, Annotated
from datetime import timedelta, datetime
import jwt
from http import HTTPStatus

from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Form, Depends

from api.repositories.user_manager import current_active_verified_user

from api.schemas.rollcall import RollcallMessage, RollcallAction
from api.schemas.exception import HTTPExceptionSchema

from utils.exceptions import RollcallTokenNotFound
from utils.settings import GMT_TIMEZONE


__JWT_RECOGNIZE_SECRET_KEY__ = os.getenv("JWT_RECOGNIZE_SECRET_KEY")
__JWT_ALGORITHM__ = os.getenv("JWT_ALGORITHM")

rollcall_router = APIRouter()


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[Tuple[WebSocket, str]] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        while True:
            token = await websocket.receive_text()
            if any(tok == token for _, tok in self.active_connections):
                # await websocket.send_json(
                #     RollcallMessage(action=RollcallAction.reset_token).model_dump(
                #         exclude_unset=True, exclude_none=True
                #     )
                # )
                pass
            else:
                self.active_connections.append((websocket, token))
                break

    def disconnect(self, websocket: WebSocket):
        self.active_connections = [
            (ws, token) for ws, token in self.active_connections if ws != websocket
        ]

    def get_active_tokens(self):
        return [tok for _, tok in self.active_connections]

    async def start_rollcall_to_token(self, token: str):
        for ws, tok in self.active_connections:
            if tok == token.upper():
                await ws.send_json(
                    RollcallMessage(
                        action=RollcallAction.start,
                        recognize_token=jwt.encode(
                            {
                                "token": token,
                                "exp": datetime.now(GMT_TIMEZONE)
                                + timedelta(minutes=20),
                            },
                            __JWT_RECOGNIZE_SECRET_KEY__,
                            __JWT_ALGORITHM__,
                        ),
                    ).model_dump()
                )
                return True
        return False

    async def stop_rollcall_to_token(self, token: str):
        for ws, tok in self.active_connections:
            if tok == token.upper():
                await ws.send_json(
                    RollcallMessage(
                        action=RollcallAction.stop,
                    ).model_dump(exclude_unset=True, exclude_none=True)
                )
                return True
        return False


rollcall_websockets_connection_manager = ConnectionManager()


@rollcall_router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await rollcall_websockets_connection_manager.connect(websocket)
    try:
        while True:
            _ = await websocket.receive_text()
    except WebSocketDisconnect:
        rollcall_websockets_connection_manager.disconnect(websocket)


@rollcall_router.get("/active_tokens")
async def get_active_tokens(
    current_user=Depends(current_active_verified_user),
) -> List[str]:
    return rollcall_websockets_connection_manager.get_active_tokens()


@rollcall_router.post(
    "/start", responses={HTTPStatus.NOT_FOUND: {"model": HTTPExceptionSchema}}
)
async def start_rollcall(
    rollcall_token: Annotated[str, Form(...)],
    current_user=Depends(current_active_verified_user),
):
    if await rollcall_websockets_connection_manager.start_rollcall_to_token(
        rollcall_token
    ):
        return {"message": "Rollcall started", "token": rollcall_token.upper()}
    raise RollcallTokenNotFound


@rollcall_router.post(
    "/stop", responses={HTTPStatus.NOT_FOUND: {"model": HTTPExceptionSchema}}
)
async def stop_rollcall(
    rollcall_token: Annotated[str, Form(...)],
    current_user=Depends(current_active_verified_user),
):
    if await rollcall_websockets_connection_manager.stop_rollcall_to_token(
        rollcall_token
    ):
        return {"message": "Rollcall stopped", "token": rollcall_token.upper()}
    raise RollcallTokenNotFound
