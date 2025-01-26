from enum import Enum

from pydantic import BaseModel


class RollcallAction(str, Enum):
    reset_token = "reset_token"
    start = "start"
    stop = "stop"


class RollcallMessage(BaseModel):
    action: RollcallAction
    recognize_token: str = None
