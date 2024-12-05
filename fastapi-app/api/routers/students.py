from typing import Annotated
from fastapi import APIRouter, Form, UploadFile, File, BackgroundTasks
from beanie import PydanticObjectId
from http import HTTPStatus

from api.repositories.Students import StudentsRepository
from api.repositories.CSV import CSVRepository

students_router = APIRouter()


@students_router.get("")
async def get_all_students():
    return await StudentsRepository.get_all_students()


@students_router.get("/{student_id}")
async def get_student_by_id(student_id: PydanticObjectId):
    return await StudentsRepository.get_student_by_id(student_id)


@students_router.post("", status_code=HTTPStatus.CREATED)
async def create_student(
    name: Annotated[str, Form()],
    ra: Annotated[int, Form()],
    image_base64: Annotated[str, Form()],
):
    return await StudentsRepository.create_student(name, ra, image_base64)


@students_router.post("/bulk", status_code=HTTPStatus.CREATED)
async def create_students_bulk(
    background_tasks: BackgroundTasks, csv_file: UploadFile = File(...)
):
    background_tasks.add_task(csv_file.file.close)
    students_created = []
    students_not_created = []

    for student in CSVRepository.get_list_of_dicts_from_csv(csv_file.file):
        try:
            students_created.append(
                await StudentsRepository.create_student(
                    student["name"], student["ra"], student["image_base64"]
                )
            )
        except Exception as e:
            del student["image_base64"]
            student["reason"] = str(e)
            students_not_created.append(student)

    return {
        "students_created": students_created,
        "students_not_created": students_not_created,
    }


@students_router.patch("/{student_id}")
async def update_student(
    student_id: PydanticObjectId,
    name: Annotated[str | None, Form()] = None,
    ra: Annotated[int | None, Form()] = None,
    image_base64: Annotated[str | None, Form()] = None,
    active: Annotated[bool | None, Form()] = None,
):
    return await StudentsRepository.update_student(
        student_id, name, ra, image_base64, active
    )
