import motor.motor_asyncio
from fastapi_users_db_beanie import BeanieUserDatabase
from fastapi_users_db_beanie.access_token import BeanieAccessTokenDatabase

from api.models.User import User, OAuthAccount
from api.models.AccessToken import AccessToken

import os

DATABASE_URL = os.getenv("MONGO_URL")
client = motor.motor_asyncio.AsyncIOMotorClient(
    DATABASE_URL, uuidRepresentation="standard"
)
db = client["projetoChamada"]


async def get_user_db():
    yield BeanieUserDatabase(User, OAuthAccount)


async def get_access_token_db():
    yield BeanieAccessTokenDatabase(AccessToken)
