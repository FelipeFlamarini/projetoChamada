from typing import Annotated
from fastapi import APIRouter, Form, Depends
from beanie import PydanticObjectId
from http import HTTPStatus

from api.repositories.Students import StudentsRepository


students_router = APIRouter()


@students_router.get("")
async def get_all_students():
    return await StudentsRepository.get_all_students()


@students_router.get("/{student_id}")
async def get_student_by_id(student_id: PydanticObjectId):
    return await StudentsRepository.get_student_by_id(student_id)


# TODO: image for student
@students_router.post("", status_code=HTTPStatus.CREATED)
async def create_student(name: Annotated[str, Form()], ra: Annotated[int, Form()]):
    return await StudentsRepository.create_student(name, ra)


@students_router.patch("/{student_id}")
async def update_student(
    student_id: PydanticObjectId,
    name: Annotated[str | None, Form()] = None,
    ra: Annotated[int | None, Form()] = None,
    active: Annotated[bool | None, Form()] = None,
):
    return await StudentsRepository.update_student(student_id, name, ra, active)
