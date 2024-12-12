from contextlib import asynccontextmanager
from beanie import init_beanie
from utils.db import db
from fastapi import FastAPI, Depends

from api.models.User import User
from api.models.AccessToken import AccessToken

from api.routers.user_manager import fastapi_users, auth_backend, current_active_user
from api.routers.facial_recognition import facial_recognition_router

from api.schemas.user import UserRead, UserCreate, UserUpdate


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_beanie(
        database=db,
        document_models=[User, AccessToken],
    )
    yield


app = FastAPI(lifespan=lifespan)

app.include_router(
    fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"]
)
app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)
app.include_router(
    facial_recognition_router,
    prefix="/api/facial_recognition",
    tags=["facial recognition"],
)

@app.get("/")
def teste():
 
    res = DeepFace.verify(
        img1_path = "./public/teste.jpeg",
        img2_path = "./public/images/Felipe Flamarini.jpg",
        enforce_detection=False,
        model_name = "ArcFace"
            )

    return res

@app.get("/authenticated-route")
async def authenticated_route(user: User = Depends(current_active_user)):
    return {"message": f"Hello {user.email}!"}

