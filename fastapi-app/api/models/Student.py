from typing import Annotated
from beanie import Document, Indexed
from pydantic import FilePath


class Student(Document):
    name: str
    ra: Annotated[int, Indexed(unique=True)]
    active: bool = True
    image_path: FilePath = None
