import logging
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.core.database import SessionLocal

logger = logging.getLogger(__name__)

# PLACEHOLDER — koi "hospital_info" table abhi schema mein nahi hai.
# Team se confirm karna: yeh static rahega ya kisi table se aayega?
STATIC_HOSPITAL_INFO = {
    "visiting_hours": "10:00 AM - 6:00 PM, all days",
    "emergency_contact": "Available 24/7 at the hospital front desk",
    "departments_available": "Cardiology, Ophthalmology",  # abhi ke liye real DB se bhi le sakte hain
}


def get_doctor_schedules() -> list[dict]:
    """
    doctor_schedules table se real availability fetch karta hai, users se JOIN
    karke doctor ka naam bhi saath deta hai.
    """
    db: Session = SessionLocal()
    try:
        result = db.execute(text("""
            SELECT u.name, d.specialization, ds.day_of_week, ds.start_time, ds.end_time
            FROM doctor_schedules ds
            JOIN doctors d ON ds.doctor_id = d.doctor_id
            JOIN users u ON d.user_id = u.user_id
            WHERE u.is_active = TRUE
        """))
        return [
            {
                "doctor_name": row[0],
                "specialization": row[1],
                "day": row[2],
                "start_time": str(row[3]),
                "end_time": str(row[4]),
            }
            for row in result
        ]
    except Exception as e:
        logger.error(f"Doctor schedules fetch fail hui: {e}")
        return []
    finally:
        db.close()


def build_context_block() -> str:
    schedules = get_doctor_schedules()
    schedule_lines = [
        f"- {s['doctor_name']} ({s['specialization']}): {s['day']} {s['start_time']}-{s['end_time']}"
        for s in schedules
    ] or ["No schedule data currently available."]

    return (
        f"Visiting Hours: {STATIC_HOSPITAL_INFO['visiting_hours']}\n"
        f"Emergency Contact: {STATIC_HOSPITAL_INFO['emergency_contact']}\n"
        f"Departments Available: {STATIC_HOSPITAL_INFO['departments_available']}\n"
        f"Doctor Schedules:\n" + "\n".join(schedule_lines)
    )