import logging
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.core.database import SessionLocal

logger = logging.getLogger(__name__)


def save_chat_message(patient_id: int, sender: str, message: str) -> None:
    """
    chat_history table mein message save karta hai. Agar yeh fail ho jaye,
    poori chatbot request crash nahi honi chahiye — sirf log karo aur aage badho.
    """
    db: Session = SessionLocal()
    try:
        db.execute(
            text("""
                INSERT INTO chat_history (patient_id, sender, message)
                VALUES (:patient_id, :sender, :message)
            """),
            {"patient_id": patient_id, "sender": sender, "message": message}
        )
        db.commit()
    except Exception as e:
        logger.error(f"Chat history save fail hui: {e}")
        db.rollback()
    finally:
        db.close()