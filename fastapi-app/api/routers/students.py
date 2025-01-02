from typing import Annotated, List

from fastapi import APIRouter, Form, UploadFile, File, BackgroundTasks
from http import HTTPStatus

from api.models.Student import Student
from api.repositories.Students import StudentsRepository
from api.repositories.CSV import CSVRepository
from api.schemas.student import StudentsCreatedByCSV

students_router = APIRouter()


@students_router.get("")
async def get_all_students() -> List[Student]:
    return await StudentsRepository.get_all_students()


@students_router.get("/{student_ra}")
async def get_student_by_ra(student_ra: int) -> Student:
    return await StudentsRepository.get_student_by_ra(student_ra)


@students_router.post("", status_code=HTTPStatus.CREATED)
async def create_student(
    name: Annotated[str, Form()],
    ra: Annotated[int, Form()],
    image_base64: Annotated[str, Form()],
) -> Student:
    return await StudentsRepository.create_student(name, ra, image_base64)


@students_router.post("/csv", status_code=HTTPStatus.CREATED)
async def create_students_by_csv(
    background_tasks: BackgroundTasks, csv_file: UploadFile = File(...)
) -> StudentsCreatedByCSV:
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
        # TODO: check exceptions
        except Exception as e:
            del student["image_base64"]
            try:
                student["reason"] = e.detail
            except:
                student["reason"] = str(e.__class__)
            students_not_created.append(student)

    return {
        "students_created": students_created,
        "students_not_created": students_not_created,
    }


@students_router.patch("/{student_ra}")
async def update_student_by_ra(
    student_ra: int,
    name: Annotated[str | None, Form()] = None,
    ra: Annotated[int | None, Form()] = None,
    image_base64: Annotated[str | None, Form()] = None,
    active: Annotated[bool | None, Form()] = None,
) -> Student:
    return await StudentsRepository.update_student_by_ra(
        student_ra, name, ra, image_base64, active
    )
