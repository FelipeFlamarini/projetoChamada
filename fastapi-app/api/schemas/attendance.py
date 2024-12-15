from pydantic import BaseModel
import datetime
from typing import List


class AttendanceReturn(BaseModel):
    date: datetime.date
    times: List[str]
