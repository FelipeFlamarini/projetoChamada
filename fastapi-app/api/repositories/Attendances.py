from fastapi import HTTPException
from http import HTTPStatus
import datetime

from api.models.Attendance import Attendance, AttendanceRecord
from api.schemas.attendance import AttendanceReturn
from api.repositories.Students import StudentsRepository

TIMEZONE_GMT_MINUS_3 = datetime.timezone(datetime.timedelta(hours=-3))


def get_current_date():
    return datetime.datetime.now(TIMEZONE_GMT_MINUS_3).date()


def get_current_time():
    return datetime.datetime.now(TIMEZONE_GMT_MINUS_3).time()


class AttendancesRepository:
    @staticmethod
    async def get_attendances_by_student_ra(student_ra: int):
        attendances = await Attendance.find_many(
            Attendance.attendance.student_ra == student_ra
        ).to_list()
        return [
            AttendanceReturn(date=attendance.date, times=attendance.attendance[0].times)
            for attendance in attendances
        ]

    @staticmethod
    async def get_attendances_by_date(date: datetime.date):
        return await Attendance.find_one(Attendance.date == date)

    @staticmethod
    async def create_attendance(student_ra: int):
        if not await StudentsRepository._get_if_student_exists_by_ra(student_ra):
            raise HTTPException(
                status_code=HTTPStatus.NOT_FOUND, detail="Student not found"
            )

        current_date = get_current_date()
        current_time = get_current_time().isoformat()

        attendance = await Attendance.find_one(Attendance.date == current_date)
        # TODO: optimize
        if attendance:
            for record in attendance.attendance:
                if record.student_ra == student_ra:
                    record.times.append(current_time)
                    await attendance.save()
                    return record
            new_record = AttendanceRecord(student_ra=student_ra, times=[current_time])
            attendance.attendance.append(new_record)
            await attendance.save()
            return new_record
        else:
            new_attendance = Attendance(
                date=current_date,
                attendance=[
                    AttendanceRecord(student_ra=student_ra, times=[current_time])
                ],
            )
            await new_attendance.insert()
            return new_attendance.attendance[0]

    @staticmethod
    async def delete_attendance(student_ra: int, date: datetime.date, time: str):
        attendance = await Attendance.find_one(
            Attendance.date == date, Attendance.attendance.student_ra == student_ra
        )
        if not attendance:
            raise HTTPException(
                status_code=HTTPStatus.NOT_FOUND, detail="Attendance not found"
            )
        try:
            attendance.attendance[0].times.remove(time)
            return await attendance.save()
        except ValueError:
            raise HTTPException(HTTPStatus.NOT_FOUND, detail="Time not found")
