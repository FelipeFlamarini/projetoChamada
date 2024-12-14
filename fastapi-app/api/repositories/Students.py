import pymongo
import beanie
import beanie.exceptions
from typing import Optional
from fastapi import HTTPException
from http import HTTPStatus

import pymongo.errors

from api.models.Student import Student
from api.repositories.Images import ImagesRepository
from api.schemas.student import StudentUpdate


class StudentsRepository:
    @staticmethod
    async def get_all_students():
        return await Student.find_all().to_list()

    @staticmethod
    async def get_student_by_ra(student_ra: int):
        student = await Student.find_one(Student.ra == student_ra)
        if not student:
            raise HTTPException(
                status_code=HTTPStatus.NOT_FOUND, detail="Student not found"
            )
        return student

    @staticmethod
    async def get_student_by_id(student_id: beanie.PydanticObjectId):
        student = await Student.get(student_id)
        if not student:
            raise HTTPException(
                status_code=HTTPStatus.NOT_FOUND, detail="Student not found"
            )
        return student

    @staticmethod
    async def create_student(name: str, ra: int, image_base64: str):
        try:
            image_path = ImagesRepository.save_base64_image_for_student(
                ra, image_base64
            )
            student = await Student(name=name, ra=ra, image_path=image_path).insert()
            return student
        except pymongo.errors.DuplicateKeyError as e:
            raise HTTPException(status_code=HTTPStatus.CONFLICT, detail=f"{e.details}")

    @staticmethod
    async def update_student_by_id(
        student_id: beanie.PydanticObjectId,
        name: Optional[str | None] = None,
        ra: Optional[int | None] = None,
        image_base64: Optional[str | None] = None,
        active: Optional[bool | None] = None,
    ):
        student = await StudentsRepository.get_student_by_id(student_id)
        if not student:
            raise HTTPException(
                status_code=HTTPStatus.NOT_FOUND, detail="Student not found"
            )
        try:
            image_path = ImagesRepository.save_base64_image_for_student(
                student.ra, image_base64
            )
            updated_student = StudentUpdate(
                name=name, ra=ra, active=active, image_path=image_path
            )
            return await student.set(updated_student.model_dump(exclude_none=True))
        except (
            beanie.exceptions.RevisionIdWasChanged  # beanie forces this exception when DuplicateKeyError occurs
        ):
            raise HTTPException(
                status_code=HTTPStatus.CONFLICT, detail=f"RA {ra} already exists"
            )

    @staticmethod
    async def update_student_by_ra(
        student_ra: int,
        name: Optional[str | None] = None,
        ra: Optional[int | None] = None,
        image_base64: Optional[str | None] = None,
        active: Optional[bool | None] = None,
    ):
        student = await StudentsRepository.get_student_by_ra(student_ra)
        if not student:
            raise HTTPException(
                status_code=HTTPStatus.NOT_FOUND, detail="Student not found"
            )
        try:
            image_path = None
            if image_base64:
                image_path = ImagesRepository.save_base64_image_for_student(
                    student_ra, image_base64
                )
            updated_student = StudentUpdate(
                name=name, ra=ra, active=active, image_path=image_path
            )
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
