from typing import List
from pydantic import BaseModel

from api.schemas.verify import DeepFaceStudentReturn


class DeepFaceRecognizeReturn(BaseModel):
    verified: bool
    students: List[DeepFaceStudentReturn] = None
