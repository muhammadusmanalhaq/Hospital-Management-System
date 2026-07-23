import json
from app.services.llm_client import call_llm
from app.prompts.report_summary_prompt import REPORT_SUMMARY_SYSTEM_PROMPT, build_user_message


def summarize_report(report_text: str, age: int | None = None, gender: str | None = None) -> dict:
    user_message = build_user_message(report_text, age, gender)

    result = call_llm(
        system_prompt=REPORT_SUMMARY_SYSTEM_PROMPT,
        user_message=user_message,
    )

    raw_text = result["text"].strip()

    
    if raw_text.startswith("```"):
        raw_text = raw_text.strip("`").replace("json\n", "", 1)

    try:
        parsed = json.loads(raw_text)
    except json.JSONDecodeError:
        raise ValueError("Model did not return valid JSON")

    if "error" in parsed:
        raise ValueError(f"Model reported: {parsed['error']}")

    return {
        "data": parsed,
        "provider": result["provider"],
        "model": result["model"],
    }


import json
from app.services.llm_client import call_llm, call_vision_llm
from app.prompts.report_summary_prompt import REPORT_SUMMARY_SYSTEM_PROMPT, build_user_message


def _parse_llm_json(raw_text: str) -> dict:
    raw_text = raw_text.strip()
    if raw_text.startswith("```"):
        raw_text = raw_text.strip("`").replace("json\n", "", 1)

    try:
        parsed = json.loads(raw_text)
    except json.JSONDecodeError:
        raise ValueError("Model did not return valid JSON")

    if "error" in parsed:
        raise ValueError(f"Model reported: {parsed['error']}")

    return parsed


def summarize_report(report_text: str, age: int | None = None, gender: str | None = None) -> dict:
    user_message = build_user_message(report_text, age, gender)
    result = call_llm(system_prompt=REPORT_SUMMARY_SYSTEM_PROMPT, user_message=user_message)
    parsed = _parse_llm_json(result["text"])
    return {"data": parsed, "provider": result["provider"], "model": result["model"]}


def summarize_report_from_file(file_bytes: bytes, mime_type: str, age: int | None = None, gender: str | None = None) -> dict:
    context_line = f"Patient context: age={age}, gender={gender}\n" if age or gender else ""
    user_message = f"{context_line}Read the attached medical report and summarize it as per your instructions."

    result = call_vision_llm(
        system_prompt=REPORT_SUMMARY_SYSTEM_PROMPT,
        user_message=user_message,
        file_bytes=file_bytes,
        mime_type=mime_type,
    )
    parsed = _parse_llm_json(result["text"])
    return {"data": parsed, "provider": result["provider"], "model": result["model"]}