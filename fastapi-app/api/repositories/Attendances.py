from fastapi import HTTPException
from http import HTTPStatus
import datetime

from api.models.Attendance import Attendance, AttendanceRecord
from api.schemas.attendance import AttendanceStudentReturn, AttendanceDateReturn
from api.repositories.Students import StudentsRepository
import csv
from io import StringIO
from fastapi.responses import StreamingResponse
from utils.exceptions import DocumentNotFound, DateAttendanceNotFound

TIMEZONE_GMT_MINUS_3 = datetime.timezone(datetime.timedelta(hours=-3))


def _get_current_date():
    return datetime.datetime.now(TIMEZONE_GMT_MINUS_3).date()


def _get_current_time():
    return datetime.datetime.now(TIMEZONE_GMT_MINUS_3).time()


class AttendancesRepository:
    @staticmethod
    async def get_attendances_dates() :
        attendances = await Attendance.find().to_list()
        return [
            attendance.date for attendance in attendances
        ]

    @staticmethod
    async def get_attendances_by_student_ra(
        student_ra: int,
    ) -> list[AttendanceStudentReturn]:
        attendances = await Attendance.find_many(
            Attendance.attendance.student_ra == student_ra
        ).to_list()
        return [
            AttendanceDateReturn(
                date=attendance.date, times=attendance.attendance[0].times
            )
            for attendance in attendances
        ]

    @staticmethod
    async def get_attendances_by_date(date: datetime.date):
        attendances = await Attendance.find({"date": date}).to_list()
        if attendances:
            return attendances[0]
    
    @staticmethod
    async def create_attendance(student_ra: int) -> AttendanceStudentReturn:
        if not await StudentsRepository._get_if_student_exists_by_ra(student_ra):
            raise HTTPException(
                status_code=HTTPStatus.NOT_FOUND, detail="Student not found"
            )

        current_date = _get_current_date()
        current_time = _get_current_time().isoformat()

        attendance = await Attendance.find_one(Attendance.date == current_date)
        # TODO: optimize
        if attendance:
            for record in attendance.attendance:
                if record.student_ra == student_ra:
                    record.times.append(current_time)
                    await attendance.save()
                    return AttendanceStudentReturn(
                        date=current_date, ra=student_ra, **record.model_dump()
                    )
            new_record = AttendanceRecord(student_ra=student_ra, times=[current_time])
            attendance.attendance.append(new_record)
            await attendance.save()
            return AttendanceStudentReturn(
                date=current_date, ra=student_ra, **new_record.model_dump()
            )
        else:
            new_attendance = Attendance(
                date=current_date,
                attendance=[
                    AttendanceRecord(student_ra=student_ra, times=[current_time])
                ],
            )
            await new_attendance.insert()
            return AttendanceStudentReturn(
                date=current_date,
                ra=student_ra,
                **new_attendance.attendance[0].model_dump(),
            )

    @staticmethod
    async def create_attendance_csv(date: datetime.date):
        attendance_record = await AttendancesRepository.get_attendances_by_date(date)

        if not attendance_record:
            raise DateAttendanceNotFound()

        output = StringIO()
        writer = csv.writer(output)
        writer.writerow(["Student", "RA", "Times"])

        for record in attendance_record.attendance:
            try:
                student = await StudentsRepository.get_student_by_ra(record.student_ra)
                writer.writerow([student.name, record.student_ra, ", ".join(record.times)])
            except DocumentNotFound:
                try:
                    student = await StudentsRepository.get_student_by_ra(record.student_ra, active=False)
                    writer.writerow([student.name, record.student_ra, ", ".join(record.times)])
                except DocumentNotFound:
                    pass

        output.seek(0)
        return StreamingResponse(output, media_type="text/csv", headers={
            "Content-Disposition": f"attachment; filename=attendance_{date}.csv"
        })

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
