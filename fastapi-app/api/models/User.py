from beanie import Document
from pydantic import Field
from fastapi_users_db_beanie import BeanieBaseUser, BaseOAuthAccount


class OAuthAccount(BaseOAuthAccount):
    pass


class User(BeanieBaseUser, Document):
    oauth_accounts: list[OAuthAccount] = Field(default_factory=list)
