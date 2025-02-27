from typing import Annotated
from beanie import Document, Indexed
from pydantic import FilePath, Field


# TODO: verify RA
class Student(Document):
    name: str
    ra: Annotated[int, Indexed(unique=True)] = Field(gt=0)
    active: bool = True
    image_path: FilePath | None
