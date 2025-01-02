import base64
import pathlib
import binascii

from api.models.Student import Student
from api.repositories.facial_recognition import FacialRecognitionRepository

from utils.exceptions import DocumentNotFound, InvalidBase64


class ImagesRepository:
    @staticmethod
    def save_base64_image_for_student(
        student_ra: int, image_base64: str
    ) -> pathlib.Path:
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
        try:
            with path.open("wb") as image_file:
                image_file.write(base64.b64decode(image_base64))
        except binascii.Error:
            raise InvalidBase64("image_base64 is not a valid base64 string")

        return path

    # TODO: should this return only image_path, or serve the actual image?
    @staticmethod
    async def get_image_by_student_ra(student_ra: int):
        student = await Student.find_one(Student.ra == student_ra)
        if not student:
            raise DocumentNotFound("Student not found")
        return student.image_path
