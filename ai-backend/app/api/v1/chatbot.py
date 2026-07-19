from fastapi import APIRouter, HTTPException
from app.schemas.chatbot import ChatbotRequest
from app.services.chatbot_service import chat

router = APIRouter()


@router.post("/chatbot")
def chatbot(request: ChatbotRequest):
    try:
        result = chat(
            session_id=request.session_id,
            message=request.message,
            patient_id=request.patient_id,
            conversation_history=request.conversation_history,
        )
    except ValueError as e:
        raise HTTPException(status_code=502, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="Internal error")

    return {
        "success": True,
        "data": result["data"],
        "meta": {
            "model_used": result["model"],
            "provider": result["provider"],
        },
    }