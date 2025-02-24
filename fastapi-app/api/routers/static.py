from fastapi import APIRouter
import base64
from http import HTTPStatus

from api.repositories.Students import StudentsRepository
from api.schemas.exception import HTTPExceptionSchema

static_router = APIRouter()


@static_router.get(
    "/students/images/{student_ra}",
    responses={HTTPStatus.NOT_FOUND: {"model": HTTPExceptionSchema}},
)
async def get_student_image(student_ra: int) -> str:
    student = await StudentsRepository.get_student_by_ra(student_ra)
    with open(student.image_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode("utf-8")
    return encoded_string
