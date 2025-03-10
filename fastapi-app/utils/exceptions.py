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


class JWTExpired(HTTPException):
    """
    Raised when a JWT is expired.
    """

    def __init__(self, detail: str = "JWT expired"):
        super().__init__(status_code=HTTPStatus.UNAUTHORIZED, detail=detail)


class JWTInvalidSignature(HTTPException):
    """
    Raised when a JWT has an invalid signature.
    """

    def __init__(self, detail: str = "JWT invalid signature"):
        super().__init__(status_code=HTTPStatus.UNAUTHORIZED, detail=detail)


class RollcallTokenNotFound(HTTPException):
    """
    Raised when a rollcall token is not found.
    """

    def __init__(self, detail: str = "Rollcall token not found"):
        super().__init__(status_code=HTTPStatus.NOT_FOUND, detail=detail)


class WebsocketNotConnected(HTTPException):
    """
    Raised when a websocket is not connected.
    """

    def __init__(self, detail: str = "Websocket not connected"):
        super().__init__(status_code=HTTPStatus.NOT_FOUND, detail=detail)


class DateAttendanceNotFound(HTTPException):
    """
    Raised when a date is not found in the database.
    """

    def __init__(self, detail: str = "No attendances found for the given date"):
        super().__init__(status_code=HTTPStatus.NOT_FOUND, detail=detail)


class InvalidImage(HTTPException):
    """
    Raised when an image is invalid.
    """

    def __init__(self, detail: str = "Invalid image"):
        super().__init__(status_code=HTTPStatus.BAD_REQUEST, detail=detail)
