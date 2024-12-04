from typing import Optional
from pydantic import BaseModel


class StudentBase(BaseModel):
    name: str
    ra: int
    active: bool


class StudentCreate(StudentBase):
    pass


class StudentRead(StudentBase):
    _id: str


class StudentUpdate(StudentBase):
    name: Optional[str] = None
    ra: Optional[int] = None
    active: Optional[bool] = None
