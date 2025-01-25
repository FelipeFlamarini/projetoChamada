from typing import Annotated, List
import json

from fastapi import APIRouter, Form, UploadFile, File, Depends
from fastapi.responses import StreamingResponse
from fastapi.encoders import jsonable_encoder
from http import HTTPStatus

from api.models.Student import Student

from api.repositories.Students import StudentsRepository
from api.repositories.CSV import CSVRepository
from api.repositories.user_manager import current_active_verified_user

from api.schemas.student import StudentsCreatedByCSV, StudentsCreatingStream

students_router = APIRouter()


@students_router.get("")
async def get_students(
    active: bool = True, active_user=Depends(current_active_verified_user)
) -> List[Student]:
    return await StudentsRepository.get_students(active)


@students_router.get("/all")
async def get_all_students(
    active_user=Depends(current_active_verified_user),
) -> List[Student]:
    return await StudentsRepository.get_all_students()


@students_router.get("/{student_ra}")
async def get_student_by_ra(
    student_ra: int, active_user=Depends(current_active_verified_user)
) -> Student:
    return await StudentsRepository.get_student_by_ra(student_ra)


@students_router.post("", status_code=HTTPStatus.CREATED)
async def create_student(
    name: Annotated[str, Form()],
    ra: Annotated[int, Form()],
    image_base64: Annotated[str, Form()],
    active_user=Depends(current_active_verified_user),
) -> Student:
    return await StudentsRepository.create_student(name, ra, image_base64)


@students_router.post("/csv", status_code=HTTPStatus.CREATED)
async def create_students_by_csv(
    csv_file: UploadFile = File(...), active_user=Depends(current_active_verified_user)
) -> StreamingResponse:
    students = CSVRepository.get_list_of_dicts_from_csv(csv_file.file)

    async def student_creation_generator():
        students_created = []
        students_not_created = []

        for student in students:
            try:
                student_created = await StudentsRepository.create_student(
                    student["name"], student["ra"], student["image_base64"]
                )
                students_created.append(student_created)
                yield json.dumps(
                    jsonable_encoder(
                        StudentsCreatingStream(
                            progress=(len(students_created) + len(students_not_created))
                            / len(students),
                        )
                    )
                )
            except Exception as e:
                print(e)
                del student["image_base64"]
                try:
                    student["reason"] = e.detail
                except:
                    student["reason"] = str(e.__class__)
                students_not_created.append(student)
                yield json.dumps(
                    jsonable_encoder(
                        StudentsCreatingStream(
                            progress=(len(students_created) + len(students_not_created))
                            / len(students),
                        )
                    )
                )

        yield json.dumps(
            jsonable_encoder(
                StudentsCreatedByCSV(
                    students_created=students_created,
                    students_not_created=students_not_created,
                )
            )
        )

    return StreamingResponse(
        student_creation_generator(), media_type="application/json"
    )


@students_router.patch("/bulk_activate")
async def activate_student_bulk_by_ra(
    ra_list: List[int], active_user=Depends(current_active_verified_user)
) -> List[Student]:
    return await StudentsRepository.activate_student_bulk_by_ra(ra_list)


@students_router.patch("/bulk_deactivate")
async def deactivate_student_bulk_by_ra(
    ra_list: List[int], active_user=Depends(current_active_verified_user)
) -> List[Student]:
    return await StudentsRepository.deactivate_student_bulk_by_ra(ra_list)


@students_router.patch("/{student_ra}")
async def update_student_by_ra(
    student_ra: int,
    name: Annotated[str | None, Form()] = None,
    ra: Annotated[int | None, Form()] = None,
    image_base64: Annotated[str | None, Form()] = None,
    active: Annotated[bool | None, Form()] = None,
    active_user=Depends(current_active_verified_user),
) -> Student:
    return await StudentsRepository.update_student_by_ra(
        student_ra, name, ra, image_base64, active
    )
