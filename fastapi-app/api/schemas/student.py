from typing import Optional
from pydantic import BaseModel, FilePath


class _StudentBase(BaseModel):
    name: str
    ra: int
    active: bool
    image_path: str


class StudentCreate(_StudentBase):
    pass


class StudentRead(_StudentBase):
    _id: str


class StudentUpdate(_StudentBase):
    name: Optional[str] = None
    ra: Optional[int] = None
    active: Optional[bool] = None
    image_path: Optional[FilePath | None] = None


class StudentCreated(_StudentBase):
    pass


class StudentNotCreated(BaseModel):
    name: str
    ra: int
    reason: str


class StudentsCreatedByCSV(BaseModel):
    students_created: list[StudentCreated]
    students_not_created: list[StudentNotCreated]
