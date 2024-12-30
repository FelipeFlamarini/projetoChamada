from pydantic import BaseModel


class DeepFaceVerifyRequest(BaseModel):
    img1_path: str
    enforce_detection: bool = True
    model_name: str = "ArcFace"
    align: bool = False


class DeepFaceStudentReturn(BaseModel):
    name: str
    ra: int


class DeepFaceVerifyReturn(BaseModel):
    verified: bool
    student: DeepFaceStudentReturn = None
