from typing import Optional, List
import os
from datetime import datetime, timezone, timedelta

import pymongo
import pymongo.errors
import beanie
import beanie.exceptions
import jwt

from api.models.Student import Student

from api.repositories.Images import ImagesRepository
from api.repositories.facial_recognition import FacialRecognitionRepository
from api.repositories.students_vector_searcher import StudentsVectorSearcherRepository

from api.schemas.student import StudentUpdate

from utils.exceptions import *

TIMEZONE_GMT_MINUS_3 = timezone(timedelta(hours=-3))
__JWT_SECRET_KEY__: str = os.getenv("JWT_RECOGNIZE_SECRET_KEY")
__JWT_ALGORITHM__: str = os.getenv("JWT_ALGORITHM")


class StudentsRepository:

    @staticmethod
    async def get_students(active: bool = True) -> List[Student]:
        return await Student.find(Student.active == active).to_list()

    @staticmethod
    async def get_all_students() -> List[Student]:
        return await Student.find_all().to_list()

    @staticmethod
    async def get_student_by_ra(student_ra: int, active: bool = True) -> Student:
        student = await Student.find_one(
            Student.ra == student_ra, Student.active == active
        )
        if not student:
            raise DocumentNotFound(f"Student with ra {student_ra} not found")
        return student

    @staticmethod
    async def get_student_by_id(student_id: beanie.PydanticObjectId) -> Student:
        student = await Student.get(student_id)
        if not student:
            raise DocumentNotFound(f"Student with id {student_id} not found")
        return student

    @staticmethod
    async def _get_if_student_exists_by_ra(student_ra: int) -> bool:
        if not await Student.find_one(Student.ra == student_ra):
            return False
        return True

    @staticmethod
    async def create_student(name: str, ra: int, image_base64: str) -> Student:

        if await StudentsRepository._get_if_student_exists_by_ra(ra):
            raise DuplicateDocument(
                f"RA {ra} already exists"
            )  # for now, only "ra" field is unique
        try:
            image_base64 = ImagesRepository.uri_to_base64_str(image_base64)
            image_path = ImagesRepository.save_base64_image_for_student(
                ra, image_base64
            )
            StudentsVectorSearcherRepository.add_item(
                FacialRecognitionRepository.represent(image_base64).embedding, int(ra)
            )
            return await Student(name=name, ra=ra, image_path=str(image_path)).insert()
        except pymongo.errors.DuplicateKeyError:
            raise DuplicateDocument(
                f"RA {ra} already exists"
            )  # if somehow the first check is passed
        # TODO: check exceptions
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
    ) -> Student:
        if ra and ra != student.ra:
            if await StudentsRepository._get_if_student_exists_by_ra(ra):
                raise DuplicateDocument(f"RA {ra} already exists")

        if active == False:
            StudentsVectorSearcherRepository.remove_item(student.ra)

        try:
            image_path = None
            if image_base64:
                image_base64 = ImagesRepository.uri_to_base64_str(image_base64)
                image_path = ImagesRepository.save_base64_image_for_student(
                    ra if ra else student.ra, image_base64
                )
                StudentsVectorSearcherRepository.add_item(
                    FacialRecognitionRepository.represent(image_base64).embedding, ra
                )
            updated_student = StudentUpdate(
                name=name, ra=ra, active=active, image_path=image_path
            )
            return await student.set(updated_student.model_dump(exclude_none=True))
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
    ) -> Student:
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
    ) -> Student:
        return await StudentsRepository.__update_student__(
            await StudentsRepository.get_student_by_ra(student_ra),
            name,
            ra,
            image_base64,
            active,
        )

    @staticmethod
    async def activate_student_bulk_by_ra(ra_list: List[int]) -> List[Student]:
        students_ras = [
            ra
            for ra in ra_list
            if await StudentsRepository._get_if_student_exists_by_ra(ra)
        ]
        students = []
        for ra in students_ras:
            students.append(
                await StudentsRepository.update_student_by_ra(ra, active=True)
            )
        return students

    @staticmethod
    async def deactivate_student_bulk_by_ra(ra_list: List[int]) -> List[Student]:
        students_ras = [
            ra
            for ra in ra_list
            if await StudentsRepository._get_if_student_exists_by_ra(ra)
        ]
        students = []
        for ra in students_ras:
            students.append(
                await StudentsRepository.update_student_by_ra(ra, active=False)
            )
        return students

    ################################################################################################################
    # JWT

    @staticmethod
    def encode_jwt(student: Student) -> str:
        return jwt.encode(
            {
                "ra": student.ra,
                "name": student.name,
                "exp": datetime.now(TIMEZONE_GMT_MINUS_3) + timedelta(seconds=20),
            },
            __JWT_SECRET_KEY__,
            algorithm=__JWT_ALGORITHM__,
        )

    @staticmethod
    def decode_jwt(token: str) -> dict:
        try:
            return jwt.decode(
                token,
                __JWT_SECRET_KEY__,
                algorithms=[__JWT_ALGORITHM__],
            )
        except jwt.ExpiredSignatureError:
            raise JWTExpired
        except jwt.InvalidSignatureError:
            raise JWTInvalidSignature
