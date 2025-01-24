from fastapi import APIRouter
from fastapi.responses import FileResponse

from api.repositories.Students import StudentsRepository

static_router = APIRouter()


@static_router.get("/students/images/{student_ra}")
async def get_student_image(student_ra: int):
    student = await StudentsRepository.get_student_by_ra(student_ra)
    return FileResponse(student.image_path)
