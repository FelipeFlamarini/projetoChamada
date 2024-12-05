from typing import Annotated
from beanie import Document, Indexed
from pydantic import FilePath


class Image(Document):
    student_ra: Annotated[int, Indexed(unique=True)]
    image_path: FilePath
