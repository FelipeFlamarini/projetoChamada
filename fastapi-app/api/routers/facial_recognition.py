from fastapi import APIRouter, File, UploadFile
from api.repositories.facial_recognition import FacialRecognitionRepository
from api.schemas.verify import DeepFaceVerifyRequest, DeepFaceVerifyReturn
from api.schemas.represent import DeepFaceRepresentRequest, DeepFaceRepresentReturn

facial_recognition_router = APIRouter()

@facial_recognition_router.post("/recognize")
def recognize(image: UploadFile = File(...)):
    FacialRecognitionRepository.recognize(image)


@facial_recognition_router.post("/represent")
def represent_face(request: DeepFaceRepresentRequest):
    return DeepFaceRepresentReturn(**FacialRecognitionRepository.represent(request)).model_dump()

@facial_recognition_router.post("/verify")
def verify_face(request: DeepFaceVerifyRequest):
    return DeepFaceVerifyReturn(**FacialRecognitionRepository.verify(request)).model_dump()