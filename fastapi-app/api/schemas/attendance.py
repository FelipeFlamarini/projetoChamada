from pydantic import BaseModel
import datetime
from typing import List


class _AttendanceBase(BaseModel):
    date: datetime.date
    times: List[str]


class AttendanceStudentReturn(_AttendanceBase):
    ra: int


class AttendanceDateReturn(_AttendanceBase):
    pass
