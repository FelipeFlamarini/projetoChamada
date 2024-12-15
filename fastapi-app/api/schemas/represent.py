from pydantic import BaseModel
from typing import List

class DeepFaceRepresentRequest(BaseModel):
    img_path: str
    model_name: str = "SFace"

class ResultItem(BaseModel):
    embedding: List[float]
    face_confidence: float

# Modelo principal
class DeepFaceRepresentReturn(BaseModel):
    results: List[ResultItem]