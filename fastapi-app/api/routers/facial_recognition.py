from typing import Annotated
from fastapi import APIRouter, Form

from api.repositories.facial_recognition import FacialRecognitionRepository
from api.repositories.Students import StudentsRepository

from api.schemas.recognize import DeepFaceRecognizeReturn, DeepFaceStudentReturn


facial_recognition_router = APIRouter()


@facial_recognition_router.post("/recognize")
async def recognize(image_base64: Annotated[str, Form(...)]) -> DeepFaceRecognizeReturn:
    ras, distances = FacialRecognitionRepository.recognize(image_base64)
    print(ras, distances)
    ras_to_return = []
    for index, distance in enumerate(distances):
        if distance <= 0.3:  # depends on DeepFace model
            ras_to_return.append(ras[index])
    if ras_to_return == []:
        return DeepFaceRecognizeReturn(verified=False)

    students_to_return = []
    for ra in ras_to_return:
        student = await StudentsRepository.get_student_by_ra(int(ra))
        students_to_return.append(
            DeepFaceStudentReturn(
                **student.model_dump(), token=StudentsRepository.encode_jwt(student)
            )
        )
    return DeepFaceRecognizeReturn(verified=True, students=students_to_return)
