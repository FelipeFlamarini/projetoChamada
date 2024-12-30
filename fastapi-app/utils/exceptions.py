from fastapi import HTTPException
from http import HTTPStatus


############### HTTP EXCEPTIONS ##################
class DefaultHTTPException(HTTPException):
    """
    Default HTTP exception.
    """

    def __init__(self, status_code: int = 400, detail: str = "Bad Request"):
        super().__init__(status_code=status_code, detail=detail)


class DocumentNotFound(HTTPException):
    """
    Raised when a document is not found in the database.
    """

    def __init__(self, detail: str = "Document not found"):
        super().__init__(status_code=HTTPStatus.NOT_FOUND, detail=detail)


class DuplicateDocument(HTTPException):
    """
    Raised when attempting to insert a document that already exists.
    """

    def __init__(self, detail: str = "Duplicate document"):
        super().__init__(status_code=HTTPStatus.CONFLICT, detail=detail)


class InvalidDocument(HTTPException):
    """
    Raised when a document does not meet the required schema or validation rules.
    """

    def __init__(self, detail: str = "Invalid document"):
        super().__init__(status_code=HTTPStatus.BAD_REQUEST, detail=detail)


class InvalidBase64(HTTPException):
    """
    Raised when a base64 string is invalid.
    """

    def __init__(self, detail: str = "Invalid base64 string"):
        super().__init__(status_code=HTTPStatus.BAD_REQUEST, detail=detail)


class InvalidCSV(HTTPException):
    """
    Raised when a CSV file is invalid.
    """

    def __init__(self, detail: str = "Invalid CSV file"):
        super().__init__(status_code=HTTPStatus.BAD_REQUEST, detail=detail)


class VectorNotFound(HTTPException):
    """
    Raised when a vector is not found in the index.
    """

    def __init__(self, detail: str = "Vector not found"):
        super().__init__(status_code=HTTPStatus.NOT_FOUND, detail=detail)


class FaceNotFound(HTTPException):
    """
    Raised when a face is not found in the image.
    """

    def __init__(self, detail: str = "Face not found"):
        super().__init__(status_code=HTTPStatus.BAD_REQUEST, detail=detail)
