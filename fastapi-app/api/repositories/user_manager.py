from typing import Optional

from beanie import PydanticObjectId
from fastapi import Depends, Request
from fastapi.responses import RedirectResponse
from httpx_oauth.clients.google import GoogleOAuth2
from fastapi_users import BaseUserManager, FastAPIUsers
from fastapi_users.authentication import (
    AuthenticationBackend,
    CookieTransport,
)
from fastapi_users.authentication.strategy.db import (
    AccessTokenDatabase,
    DatabaseStrategy,
)
from fastapi_users_db_beanie import BeanieUserDatabase, ObjectIDIDMixin

from api.models.User import User
from api.models.AccessToken import AccessToken
from utils.db import get_user_db, get_access_token_db

import os

__SECRET__ = os.getenv("USER_TOKEN_SECRET_KEY")
__GOOGLE_CLIENT_ID__ = os.getenv("OAUTH_GOOGLE_CLIENT_ID")
__GOOGLE_CLIENT_SECRET__ = os.getenv("OAUTH_GOOGLE_CLIENT_SECRET")
__URL_REDIRECT_AFTER_LOGIN__ = os.getenv("OAUTH_URL_REDIRECT_AFTER_LOGIN")
__COOKIE_SECURE__ = os.getenv("COOKIE_SECURE", "false").lower() in ("true", "1", "yes")

google_oauth_client = GoogleOAuth2(__GOOGLE_CLIENT_ID__, __GOOGLE_CLIENT_SECRET__)


class AutoRedirectCookieTransport(CookieTransport):
    async def get_login_response(self, token: str) -> RedirectResponse:
        response = RedirectResponse(__URL_REDIRECT_AFTER_LOGIN__, status_code=302)
        return self._set_login_cookie(response, token)

    async def get_logout_response(self) -> RedirectResponse:
        response = RedirectResponse(__URL_REDIRECT_AFTER_LOGIN__, status_code=302)
        return self._set_logout_cookie(response)


class UserManager(ObjectIDIDMixin, BaseUserManager[User, PydanticObjectId]):
    reset_password_token_secret = __SECRET__
    verification_token_secret = __SECRET__


async def get_user_manager(user_db: BeanieUserDatabase = Depends(get_user_db)):
    yield UserManager(user_db)


cookie_transport = AutoRedirectCookieTransport(
    cookie_max_age=60 * 60 * 24, cookie_secure=__COOKIE_SECURE__
)


def get_database_strategy(
    access_token_db: AccessTokenDatabase[AccessToken] = Depends(get_access_token_db),
) -> DatabaseStrategy:
    return DatabaseStrategy(access_token_db, lifetime_seconds=3600)


auth_backend = AuthenticationBackend(
    name="jwt",
    transport=cookie_transport,
    get_strategy=get_database_strategy,
)

fastapi_users = FastAPIUsers[User, PydanticObjectId](get_user_manager, [auth_backend])

current_user = fastapi_users.current_user()
current_active_verified_user = fastapi_users.current_user(active=True, verified=True)
current_admin_user = fastapi_users.current_user(superuser=True)
