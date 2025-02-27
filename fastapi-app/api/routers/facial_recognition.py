from typing import Annotated
import os
from http import HTTPStatus

from fastapi import APIRouter, Form
import jwt

from api.repositories.facial_recognition import FacialRecognitionRepository
from api.repositories.Students import StudentsRepository

from api.schemas.recognize import DeepFaceRecognizeReturn, DeepFaceStudentReturn
from api.schemas.exception import HTTPExceptionSchema

from api.routers.rollcall import rollcall_websockets_connection_manager

from utils.exceptions import JWTExpired, JWTInvalidSignature, WebsocketNotConnected

__JWT_RECOGNIZE_SECRET_KEY__ = os.getenv("JWT_RECOGNIZE_SECRET_KEY")
__JWT_ALGORITHM__ = os.getenv("JWT_ALGORITHM")

facial_recognition_router = APIRouter()


@facial_recognition_router.post(
    "/recognize",
    responses={
        HTTPStatus.UNAUTHORIZED: {
            "model": HTTPExceptionSchema,
        },
        HTTPStatus.NOT_FOUND: {
            "model": HTTPExceptionSchema,
        },
        HTTPStatus.BAD_REQUEST: {
            "model": HTTPExceptionSchema,
        },
    },
    response_model=DeepFaceRecognizeReturn,
)
async def recognize(
    image_base64: Annotated[str, Form(...)], recognize_token: Annotated[str, Form(...)]
) -> DeepFaceRecognizeReturn:
    try:
        rollcall_token: str = jwt.decode(
            recognize_token,
            __JWT_RECOGNIZE_SECRET_KEY__,
            algorithms=[__JWT_ALGORITHM__],
        )["token"]
    except jwt.ExpiredSignatureError:
        raise JWTExpired()
    except jwt.InvalidSignatureError:
        raise JWTInvalidSignature()

    if (
        rollcall_token.upper()
        not in rollcall_websockets_connection_manager.get_active_tokens()
    ):
        raise WebsocketNotConnected()

    ras, distances = FacialRecognitionRepository.recognize(image_base64)
    ras_to_return = []
    for index, distance in enumerate(distances):
        if distance <= 0.3:  # depends on DeepFace model
            ras_to_return.append(ras[index])
    if ras_to_return == []:
        return DeepFaceRecognizeReturn(verified=False)

    students_to_return = []
    for ra in ras_to_return:
        student = await StudentsRepository.get_student_by_ra(int(ra))
        students_to_return.append(
            DeepFaceStudentReturn(
                **student.model_dump(), token=StudentsRepository.encode_jwt(student)
            )
        )
    return DeepFaceRecognizeReturn(verified=True, students=students_to_return)
