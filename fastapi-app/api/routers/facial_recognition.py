from fastapi import APIRouter, File, UploadFile
from api.repositories.facial_recognition import FacialRecognitionRepository

facial_recognition_router = APIRouter()

@facial_recognition_router.post("/recognize")
def recognize(image: UploadFile = File(...)):
    FacialRecognitionRepository.recognize(image)