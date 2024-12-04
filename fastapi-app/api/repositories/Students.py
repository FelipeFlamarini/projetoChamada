import beanie.exceptions
import pymongo
import beanie
from typing import Optional
from fastapi import HTTPException
from http import HTTPStatus

import pymongo.errors

from api.models.Student import Student
from api.schemas.student import StudentUpdate


class StudentsRepository:
    @staticmethod
    async def get_all_students():
        return await Student.find_all().to_list()

    @staticmethod
    async def get_student_by_id(student_id: beanie.PydanticObjectId):
        student = await Student.get(student_id)
        if not student:
            raise HTTPException(
                status_code=HTTPStatus.NOT_FOUND, detail="Student not found"
            )
        return student

    @staticmethod
    async def create_student(name: str, ra: int):
        try:
            return await Student(name=name, ra=ra).insert()
        except pymongo.errors.DuplicateKeyError as e:
            raise HTTPException(status_code=HTTPStatus.CONFLICT, detail=f"{e.details}")

    @staticmethod
    async def update_student(
        student_id: beanie.PydanticObjectId,
        name: Optional[str | None] = None,
        ra: Optional[int | None] = None,
        active: Optional[bool | None] = None,
    ):
        student = await StudentsRepository.get_student_by_id(student_id)
        updated_student = StudentUpdate(name=name, ra=ra, active=active)
        try:
            return await student.set(updated_student.model_dump(exclude_none=True))
        except (
            beanie.exceptions.RevisionIdWasChanged  # beanie forces this exception when DuplicateKeyError occurs
        ):
            raise HTTPException(
                status_code=HTTPStatus.CONFLICT, detail=f"RA {ra} already exists"
            )

    @staticmethod
    async def deactivate_student_by_id(student_id: beanie.PydanticObjectId):
        student = await StudentsRepository.get_student_by_id(student_id)
        updated_student = StudentUpdate(active=False)
        return await student.set(updated_student.model_dump(exclude_unset=True))

    @staticmethod
    async def activate_student_by_id(student_id: beanie.PydanticObjectId):
        student = await StudentsRepository.get_student_by_id(student_id)
        updated_student = StudentUpdate(active=True)
        return await student.set(updated_student.model_dump(exclude_unset=True))
