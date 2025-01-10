from typing import List
from pydantic import BaseModel


class DeepFaceStudentReturn(BaseModel):
    name: str
    ra: int
    token: str


class DeepFaceRecognizeReturn(BaseModel):
    verified: bool
    students: List[DeepFaceStudentReturn] = None
