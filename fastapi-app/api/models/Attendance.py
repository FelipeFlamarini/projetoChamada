from typing import Annotated
from beanie import Document, PydanticObjectId, Indexed
from datetime import date, time


class Attendance(Document):
    student_id: PydanticObjectId
    date: Annotated[date, Indexed()]
    times: list[time]
