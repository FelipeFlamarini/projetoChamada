from fastapi import APIRouter, Depends

from api.repositories.user_manager import current_user

from api.schemas.user import UserRead

users_router = APIRouter()


@users_router.get("/me")
async def get_current_user(current_user=Depends(current_user)) -> UserRead:
    return current_user
