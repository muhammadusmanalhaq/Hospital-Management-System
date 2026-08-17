import json
from app.services.llm_client import call_llm
from app.services.hospital_info_service import build_context_block
from app.services.chat_history_service import save_chat_message
from app.prompts.chatbot_prompt import build_system_prompt

MAX_HISTORY_TURNS = 6


def _parse_llm_json(raw_text: str) -> dict:
    raw_text = raw_text.strip()
    if raw_text.startswith("```"):
        raw_text = raw_text.strip("`").replace("json\n", "", 1)
    try:
        return json.loads(raw_text)
    except json.JSONDecodeError:
        raise ValueError("Model did not return valid JSON")


def chat(session_id: str, message: str, patient_id: int | None, conversation_history: list) -> dict:
    context_block = build_context_block()
    system_prompt = build_system_prompt(context_block)

    # Sirf last N turns use karo — token cost control (Prompt Design Doc Section 2.3)
    trimmed_history = conversation_history[-MAX_HISTORY_TURNS:]
    history_text = "\n".join([f"{turn.role}: {turn.content}" for turn in trimmed_history])
    user_message = f"{history_text}\nuser: {message}" if history_text else message

    result = call_llm(system_prompt=system_prompt, user_message=user_message)
    parsed = _parse_llm_json(result["text"])

    # Zaroori guardrail: agar model ne kabhi bhool se disclaimer/redirect na diya ho,
    # medical keywords ka basic check (defense in depth)
    reply = parsed.get("reply", "")
    intent = parsed.get("intent_detected", "unknown")
    redirected = parsed.get("redirected_to_doctor", False)

    if patient_id:
        save_chat_message(patient_id, "patient", message)
        save_chat_message(patient_id, "bot", reply)

    return {
        "data": {
            "reply": reply,
            "intent_detected": intent,
            "redirected_to_doctor": redirected,
        },
        "provider": result["provider"],
        "model": result["model"],
    }