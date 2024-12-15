import requests
from api.repositories.Students import StudentsRepository

class FacialRecognitionRepository:
    def recognize(image):
        pass

    async def verify(request):
        try:
            payload = request.model_dump()
            students = await StudentsRepository.get_all_students()
            for student in students:
                payload["img2_path"] = '/public/' + str(student.image_path)
                response = requests.post("http://deepface:5000/verify", json=payload, headers={"Content-Type": "application/json"})
                if response.json().get("verified"):
                    return {"verified": True, "student": student.model_dump()}

            return {"verified": False}
        except Exception as e:
            return {"error": str(e)}
        
    def represent(request):
        try:
            payload = request.model_dump()
            response = requests.post("http://deepface:5000/represent", json=payload, headers={"Content-Type": "application/json"})

            if response.status_code != 200:
                return {"error": "Erro ao processar a imagem no DeepFace", "details": response.text}
            
            response_data = response.json()
            filtered_results = [
                {"embedding": item["embedding"], "face_confidence": item["face_confidence"]}
                for item in response_data.get("results", [])
            ]

            return {"results": filtered_results}
        except Exception as e:
            return {"error": str(e)}