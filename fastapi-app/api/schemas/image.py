from pydantic import BaseModel, Base64Str

class ImageCreate(BaseModel):
    student_ra: int
    image_base64: Base64Str