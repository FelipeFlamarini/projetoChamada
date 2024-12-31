from typing import Annotated

from fastapi import APIRouter, Form

from api.repositories.Students import StudentsRepository
from api.repositories.Attendances import AttendancesRepository
from api.schemas.attendance import AttendanceStudentReturn

attendances_router = APIRouter()


@attendances_router.post("/")
async def create_attendance(jwt: Annotated[str, Form(...)]) -> AttendanceStudentReturn:
    student = StudentsRepository.decode_jwt(jwt)
    return await AttendancesRepository.create_attendance(student["ra"])
