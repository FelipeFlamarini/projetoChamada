import base64
import pathlib
from http import HTTPStatus
from fastapi import HTTPException
from mimetypes import guess_type, guess_extension

from api.models.Image import Image


def save_base64_image_for_student(student_ra: int, image_base64: str) -> pathlib.Path:
    """
    Saves a base64 encoded image to the students_image folder, with student_ra as its name.

    Args:
        student_ra (int): RA of the student.
        image_base64 (str): The image encoded as a base64 string.

    Returns:
        pathlib.Path: The path where the image was saved.
    """
    path = pathlib.Path(f"./students_image/{student_ra}.jpg")
    with path.open("wb") as image_file:
        image_file.write(base64.b64decode(image_base64))
    return path


class ImagesRepository:
    @staticmethod
    async def get_image_by_student_ra(student_ra: int):
        image = await Image.find_one(Image.student_ra == student_ra)
        if not image:
            raise HTTPException(
                status_code=HTTPStatus.NOT_FOUND, detail="Student not found"
            )
        return image

    @staticmethod
    async def create_or_update_image(student_ra: int, image_base64: str):
        image_path = save_base64_image_for_student(student_ra, image_base64)
        await Image.find_one(Image.student_ra == student_ra).upsert(
            {"$set": {Image.image_path: image_path}},
            on_insert=Image(student_ra=student_ra, image_path=image_path),
        )
