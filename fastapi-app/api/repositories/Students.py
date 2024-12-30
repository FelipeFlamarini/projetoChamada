import pymongo
import beanie
import beanie.exceptions
from typing import Optional

import pymongo.errors

from api.models.Student import Student

from api.repositories.Images import ImagesRepository
from api.repositories.facial_recognition import FacialRecognitionRepository
from api.repositories.students_vector_searcher import StudentsVectorSearcherRepository

from api.schemas.student import StudentUpdate

from utils.exceptions import *


class StudentsRepository:
    @staticmethod
    async def get_all_students():
        return await Student.find_all().to_list()

    @staticmethod
    async def get_student_by_ra(student_ra: int):
        student = await Student.find_one(Student.ra == student_ra)
        if not student:
            raise DocumentNotFound("Student not found")
        return student

    @staticmethod
    async def get_student_by_id(student_id: beanie.PydanticObjectId):
        student = await Student.get(student_id)
        if not student:
            raise DocumentNotFound("Student not found")
        return student

    @staticmethod
    async def _get_if_student_exists_by_ra(student_ra: int):
        if not await Student.find_one(Student.ra == student_ra):
            return False
        return True

    @staticmethod
    async def create_student(name: str, ra: int, image_base64: str):
        if await StudentsRepository._get_if_student_exists_by_ra(ra):
            raise DuplicateDocument(
                f"RA {ra} already exists"
            )  # for now, only "ra" field is unique

        try:
            image_path = ImagesRepository.save_base64_image_for_student(
                ra, image_base64
            )
            StudentsVectorSearcherRepository.add_item(
                FacialRecognitionRepository.represent(image_base64).embedding, int(ra)
            )
            return await Student(name=name, ra=ra, image_path=image_path).insert()
        except pymongo.errors.DuplicateKeyError:
            raise DuplicateDocument(
                f"RA {ra} already exists"
            )  # if somehow the first check is passed
        except Exception as e:
            print(e)
            print(e.__class__)
            raise e

    @staticmethod
    async def __update_student__(
        student: Student,
        name: Optional[str | None] = None,
        ra: Optional[int | None] = None,
        image_base64: Optional[str | None] = None,
        active: Optional[bool | None] = None,
    ):
        if ra and ra != student.ra:
            if await StudentsRepository._get_if_student_exists_by_ra(ra):
                raise DuplicateDocument(f"RA {ra} already exists")
        try:
            image_path = None
            if image_base64:
                image_path = ImagesRepository.save_base64_image_for_student(
                    ra if ra else student.ra, image_base64
                )
                StudentsVectorSearcherRepository.add_item(
                    FacialRecognitionRepository.represent(image_base64).embedding, ra
                )
            updated_student = StudentUpdate(
                name=name, ra=ra, active=active, image_path=image_path
            )
            return await student.set(updated_student.model_dump(exclude_unset=True))
        except (
            beanie.exceptions.RevisionIdWasChanged  # beanie forces this exception when DuplicateKeyError occurs
        ):
            raise DuplicateDocument(
                f"RA {ra} already exists"
            )  # for now, only "ra" field is unique

    @staticmethod
    async def update_student_by_id(
        student_id: beanie.PydanticObjectId,
        name: Optional[str | None] = None,
        ra: Optional[int | None] = None,
        image_base64: Optional[str | None] = None,
        active: Optional[bool | None] = None,
    ):
        return await StudentsRepository.__update_student__(
            await StudentsRepository.get_student_by_id(student_id),
            name,
            ra,
            image_base64,
            active,
        )

    @staticmethod
    async def update_student_by_ra(
        student_ra: int,
        name: Optional[str | None] = None,
        ra: Optional[int | None] = None,
        image_base64: Optional[str | None] = None,
        active: Optional[bool | None] = None,
    ):
        return await StudentsRepository.__update_student__(
            await StudentsRepository.get_student_by_ra(student_ra),
            name,
            ra,
            image_base64,
            active,
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
