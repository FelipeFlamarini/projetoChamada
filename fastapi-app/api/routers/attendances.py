from typing import Annotated
import datetime
from http import HTTPStatus

from fastapi import APIRouter, Form, Depends

from api.repositories.Students import StudentsRepository
from api.repositories.Attendances import AttendancesRepository
from api.repositories.user_manager import current_active_verified_user

from api.schemas.attendance import AttendanceStudentReturn
from api.schemas.exception import HTTPExceptionSchema


attendances_router = APIRouter()


@attendances_router.get(
    "/attendance-dates",
    responses={HTTPStatus.NOT_FOUND: {"model": HTTPExceptionSchema}},
)
async def get_attendances_dates(active_user=Depends(current_active_verified_user)):
    return await AttendancesRepository.get_attendances_dates()


@attendances_router.post(
    "/",
    responses={
        HTTPStatus.NOT_FOUND: {"model": HTTPExceptionSchema},
        HTTPStatus.UNAUTHORIZED: {"model": HTTPExceptionSchema},
    },
)
async def create_attendance(jwt: Annotated[str, Form(...)]) -> AttendanceStudentReturn:
    student = StudentsRepository.decode_jwt(jwt)
    return await AttendancesRepository.create_attendance(student["ra"])


@attendances_router.post(
    "/csv", responses={HTTPStatus.NOT_FOUND: {"model": HTTPExceptionSchema}}
)
async def create_attendance_csv_by_date(
    date: Annotated[str, Form(...)], active_user=Depends(current_active_verified_user)
):
    parsed_date = datetime.datetime.strptime(date, "%Y-%m-%d").date()
    return await AttendancesRepository.create_attendance_csv(parsed_date)
