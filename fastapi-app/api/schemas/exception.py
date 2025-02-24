from pydantic import BaseModel


class HTTPExceptionSchema(BaseModel):
    detail: str
