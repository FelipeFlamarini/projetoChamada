from typing import Optional
from pydantic import BaseModel, FilePath

from api.models.Student import Student


class _StudentBase(BaseModel):
    name: str
    ra: int
    active: bool
    image_path: str


class StudentRead(_StudentBase):
    _id: str


class StudentUpdate(_StudentBase):
    name: Optional[str] = None
    ra: Optional[int] = None
    active: Optional[bool] = None
    image_path: Optional[FilePath | None] = None


class StudentNotCreated(BaseModel):
    name: str
    ra: int
    reason: str


class StudentsCreatingStream(BaseModel):
    progress: float


class StudentsCreatedByCSV(BaseModel):
    students_created: list[Student]
    students_not_created: list[StudentNotCreated]
