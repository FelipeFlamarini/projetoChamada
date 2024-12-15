from api.models.Attendance import Attendance, AttendanceRecord
import datetime


def get_current_date():
    return datetime.datetime.now().date()


def get_current_time():
    return datetime.datetime.now().time()


class AttendancesRepository:
    @staticmethod
    async def get_attendances_by_student_ra(student_ra: int):
        pass

    @staticmethod
    async def get_attendances_by_date(date: datetime.date):
        return await Attendance.find_one(Attendance.date == date)

    @staticmethod
    async def create_attendance(student_ra: int):
        current_date = get_current_date()
        current_time = get_current_time().isoformat()

        attendance = await Attendance.find_one(Attendance.date == current_date)

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
