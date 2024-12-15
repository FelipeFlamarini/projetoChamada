import base64
import pathlib
from http import HTTPStatus
from fastapi import HTTPException

from api.models.Student import Student


def save_base64_image_for_student(student_ra: int, image_base64: str) -> pathlib.Path:
    """
    Saves a base64 encoded image to the students_image folder, with student_ra as its name.

    Args:
        student_ra (int): RA of the student.
        image_base64 (str): The image encoded as a base64 string.

    Returns:
        pathlib.Path: The path where the image was saved.
    """
    path = pathlib.Path(f"students_images/{student_ra}.jpg")
    path.touch()
    with path.open("wb") as image_file:
        image_file.write(
            base64.b64decode(image_base64)
        )  # b64decode ignores extra padding but throws exception for not enough padding
    return path


class ImagesRepository:
    @staticmethod
    def save_base64_image_for_student(student_ra: int, image_base64: str) -> pathlib.Path:
        """
        Saves a base64 encoded image to the students_image folder, with student_ra as its name.

        Args:
            student_ra (int): RA of the student.
            image_base64 (str): The image encoded as a base64 string.

        Returns:
            pathlib.Path: The path where the image was saved.
        """
        path = pathlib.Path(f"students_images/{student_ra}.jpg")
        path.touch()
        with path.open("wb") as image_file:
            image_file.write(
                base64.b64decode(image_base64)
            )  # b64decode ignores extra padding but throws exception for not enough padding
        return path

    @staticmethod
    async def get_image_by_student_ra(student_ra: int):
        student = await Student.find_one(Student.ra == student_ra)
        if not student:
            raise HTTPException(
                status_code=HTTPStatus.NOT_FOUND, detail="Student not found"
            )
        return student.image_path