import base64
import pathlib
import binascii

from utils.exceptions import InvalidBase64


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

    @staticmethod
    def base64_str_to_uri(base64_str: str) -> str:
        if base64_str.startswith("data:image/"):
            return base64_str
        return f"data:image/jpeg;base64,{base64_str}"

    @staticmethod
    def uri_to_base64_str(uri: str) -> str:
        if "," in uri:
            return uri.split(",")[1]
        else:
            return uri
