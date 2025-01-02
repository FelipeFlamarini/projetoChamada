import requests

from api.schemas.represent import DeepFaceRepresentRequest, DeepFaceRepresentReturn
from api.repositories.students_vector_searcher import StudentsVectorSearcherRepository

from utils import exceptions


def __base64_str_to_uri__(base64_str: str) -> str:
    if base64_str.startswith("data:image/"):
        return base64_str
    return f"data:image/jpeg;base64,{base64_str}"


class FacialRecognitionRepository:
    def recognize(image_base64: str):
        return StudentsVectorSearcherRepository.query(
            FacialRecognitionRepository.represent(image_base64).embedding, k=2
        )

    def represent(image_base64: str) -> DeepFaceRepresentReturn:
        request = DeepFaceRepresentRequest(img_path=__base64_str_to_uri__(image_base64))
        try:
            response = requests.post(
                "http://deepface:5000/represent",
                json=request.model_dump(),
                headers={"Content-Type": "application/json"},
            )
            return DeepFaceRepresentReturn(**(response.json()["results"])[0])
        except TypeError:
            raise exceptions.InvalidBase64
        except KeyError:
            raise exceptions.FaceNotFound

    def _load_weights():
        try:
            FacialRecognitionRepository.represent(
                "data:image/png;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs="
            )
        except:  # will always raise an exception since the image has no face
            pass
