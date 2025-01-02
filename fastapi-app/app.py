from contextlib import asynccontextmanager
from beanie import init_beanie
from starlette.middleware.cors import CORSMiddleware
from starlette.formparsers import MultiPartParser
from fastapi import FastAPI

from api.models.User import User
from api.models.AccessToken import AccessToken
from api.models.Student import Student
from api.models.Attendance import Attendance

from api.routers.user_manager import fastapi_users, auth_backend
from api.routers.facial_recognition import facial_recognition_router
from api.routers.students import students_router
from api.routers.attendances import attendances_router

from api.repositories.Students import StudentsRepository
from api.repositories.students_vector_searcher import StudentsVectorSearcherRepository
from api.repositories.facial_recognition import FacialRecognitionRepository

from api.schemas.user import UserRead, UserCreate, UserUpdate

from utils.db import db


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_beanie(
        database=db,
        document_models=[User, AccessToken, Student, Attendance],
    )
    FacialRecognitionRepository._load_weights()
    try:
        StudentsVectorSearcherRepository.load()
    # TODO: check exceptions
    except Exception as e:
        print(e)
        print(e.__class__)
        print("Could not load students_vector_searcher")
    yield
    if StudentsVectorSearcherRepository._index:
        StudentsVectorSearcherRepository.save()


app = FastAPI(lifespan=lifespan)

MultiPartParser.max_part_size = 10 * 1024 * 1024  # max formdata size: 10MB

origins = ["http://localhost:5173/"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    fastapi_users.get_auth_router(auth_backend), prefix="/auth", tags=["auth"]
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
app.include_router(students_router, prefix="/api/students", tags=["students"])
app.include_router(
    facial_recognition_router,
    prefix="/api/facial_recognition",
    tags=["facial recognition"],
)
app.include_router(
    attendances_router,
    prefix="/api/attendances",
    tags=["attendances"],
)
