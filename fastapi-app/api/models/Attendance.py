from typing import Annotated, List
from beanie import Document, Indexed
from pydantic import BaseModel
from datetime import date


class AttendanceRecord(BaseModel):
    student_ra: Annotated[int, Indexed(unique=True)]
    times: List[str] # datetime.time is incompatible


class Attendance(Document):
    date: Annotated[date, Indexed(unique=True)]
    attendance: List[AttendanceRecord] = []
