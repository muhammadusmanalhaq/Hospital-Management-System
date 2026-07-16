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

    # Kabhi kabhi LLM ```json ... ``` wrap kar deta hai, usko saaf karo
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