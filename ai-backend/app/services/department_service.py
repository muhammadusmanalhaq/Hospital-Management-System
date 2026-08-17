import logging
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.core.database import SessionLocal

logger = logging.getLogger(__name__)

FALLBACK_DEPARTMENT_LIST = [
    "General Physician", "Cardiologist", "Dermatologist", "Neurologist",
    "Orthopedic Surgeon", "Pediatrician", "Gynecologist", "ENT Specialist",
    "Psychiatrist", "Pulmonologist",
]


def get_department_list() -> list[str]:
    """
    doctors.specialization se UNIQUE specialist names fetch karta hai — LLM ko
    batane ke liye konsi specializations exist karti hain (departments.name se nahi,
    kyunki wo field-level naam hain jaise "Cardiology", jabke specialization
    doctor-level designation hai jaise "Cardiologist").
    """
    db: Session = SessionLocal()
    try:
        result = db.execute(text("SELECT DISTINCT specialization FROM doctors"))
        names = [row[0] for row in result if row[0]]
        if not names:
            logger.warning("Doctors table mein specialization data nahi mila, fallback list use ho rahi hai")
            return FALLBACK_DEPARTMENT_LIST
        return names
    except Exception as e:
        logger.error(f"Specialization list fetch fail hui: {e}. Fallback list use ho rahi hai.")
        return FALLBACK_DEPARTMENT_LIST
    finally:
        db.close()


def get_doctors_by_specialization(specialization: str) -> list[dict]:
    """
    Ek specific specialization ke sab ACTIVE doctors ka naam, experience, fee, qualification
    fetch karta hai. users table se JOIN zaroori hai kyunki doctor ka naam users table mein
    hai, doctors table mein sirf specialization/experience/fee/qualification hai.
    """
    db: Session = SessionLocal()
    try:
        result = db.execute(
            text("""
                SELECT u.name, d.experience_years, d.consultation_fee, d.qualification
                FROM doctors d
                JOIN users u ON d.user_id = u.user_id
                WHERE d.specialization = :specialization
                  AND u.is_active = TRUE
            """),
            {"specialization": specialization}
        )
        return [
            {
                "name": row[0],
                "experience_years": row[1],
                "consultation_fee": float(row[2]) if row[2] is not None else None,
                "qualification": row[3],
            }
            for row in result
        ]
    except Exception as e:
        logger.error(f"Doctors fetch fail hui specialization={specialization}: {e}")
        return []
    finally:
        db.close()