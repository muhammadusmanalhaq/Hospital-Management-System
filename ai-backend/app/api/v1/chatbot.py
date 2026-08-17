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
    except RuntimeError as e:
        raise HTTPException(status_code=502, detail="Both LLM providers are currently unavailable")
    except ValueError as e:
        raise HTTPException(status_code=500, detail="Model returned an invalid response")
    except Exception:
        raise HTTPException(status_code=500, detail="Internal error")

    return {
        "success": True,
        "data": result["data"],
        "meta": {"model_used": result["model"], "provider": result["provider"]},
    }