from pydantic import BaseModel

class DeepFaceVerifyRequest(BaseModel):
    img1_path: str
    enforce_detection: bool = True
    model_name: str = "VGG-Face"

class DeepFaceVerifyReturn(BaseModel):
    verified: bool