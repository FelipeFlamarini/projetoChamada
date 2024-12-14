from typing import Optional
from pydantic import BaseModel, FilePath


class StudentBase(BaseModel):
    name: str
    ra: int
    active: bool
    image_path: str


class StudentCreate(StudentBase):
    pass


class StudentRead(StudentBase):
    _id: str


class StudentUpdate(StudentBase):
    name: Optional[str] = None
    ra: Optional[int] = None
    active: Optional[bool] = None
    image_path: Optional[FilePath] = None
