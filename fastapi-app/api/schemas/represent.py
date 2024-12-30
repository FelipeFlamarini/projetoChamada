from pydantic import BaseModel
from typing import List


class DeepFaceRepresentRequest(BaseModel):
    img_path: str
    model_name: str = "ArcFace"
    detector_backend: str = "opencv"
    alignment: bool = True


class DeepFaceRepresentReturn(BaseModel):
    embedding: List[float]
    face_confidence: float
