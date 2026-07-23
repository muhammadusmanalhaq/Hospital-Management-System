from pydantic import BaseModel, Field
from typing import Optional, Literal


class ConversationTurn(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatbotRequest(BaseModel):
    session_id: str
    message: str = Field(..., min_length=1, max_length=2000)
    patient_id: Optional[int] = None
    conversation_history: list[ConversationTurn] = []


class ChatbotData(BaseModel):
    reply: str
    intent_detected: str
    redirected_to_doctor: bool