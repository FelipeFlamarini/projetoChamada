from typing import Annotated
from beanie import Document, Indexed


class Student(Document):
    name: str
    ra: Annotated[int, Indexed(unique=True)]
    active: bool = True

    class Settings:
        use_state_management = True
        primary_key = "ra"
