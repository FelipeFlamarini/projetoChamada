from contextlib import asynccontextmanager
from beanie import init_beanie
from utils.db import db
from fastapi import FastAPI, Depends

from api.models.User import User
from api.models.AccessToken import AccessToken

from api.routers.user_manager import fastapi_users, auth_backend, current_active_user
from api.routers.facial_recognition import facial_recognition_router

from api.schemas.user import UserRead, UserCreate, UserUpdate

import requests
from fastapi.responses import JSONResponse


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
 
    img1_path = "./public/images/dataset/img1.jpg"
    img1_path = "./public/images/dataset/img4.jpg"

    deepface_api_url = "http://0.0.0.0:5000/verify"

    with open(img1_path, "rb") as img1, open(img2_path, "rb") as img2:
        files = {
            "img1": img1,
            "img2": img2,
        }     

    try:
        response = resquest.post(deepface_api_url, files=files)
        response.raise_for_status
        data = response.json()

    except requests.exceptions.RequestException as e:
        return JSONResponse(
            status_code=500,
            content={"error": "Failed to connect to DeepFace API", "details": str(e)},
        )

    return data

@app.get("/authenticated-route")
async def authenticated_route(user: User = Depends(current_active_user)):
    return {"message": f"Hello {user.email}!"}

