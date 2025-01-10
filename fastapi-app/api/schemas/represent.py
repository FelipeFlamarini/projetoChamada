from pydantic import BaseModel
from typing import List


class DeepFaceRepresentRequest(BaseModel):
    img_path: str
    model_name: str = "Facenet512"
    detector_backend: str = "yunet"
    alignment: bool = False


class DeepFaceRepresentReturn(BaseModel):
    embedding: List[float]
    face_confidence: float
