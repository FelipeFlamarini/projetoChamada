from contextlib import asynccontextmanager
from beanie import init_beanie
from utils.db import db
from fastapi import FastAPI

from api.models.User import User
from api.models.AccessToken import AccessToken
from api.models.Student import Student
from api.models.Attendance import Attendance

from api.routers.user_manager import (
    fastapi_users,
    auth_backend,
)
from api.routers.students import students_router
from api.routers.facial_recognition import facial_recognition_router

from api.schemas.user import UserRead, UserCreate, UserUpdate


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_beanie(
        database=db,
        document_models=[User, AccessToken, Student, Attendance],
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
app.include_router(students_router, prefix="/students", tags=["students"])
app.include_router(
    facial_recognition_router,
    prefix="/api/facial_recognition",
    tags=["facial recognition"],
)
