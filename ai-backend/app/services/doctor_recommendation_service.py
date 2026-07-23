import json
from app.services.llm_client import call_llm
from app.services.department_service import get_department_list, get_doctors_by_specialization
from app.prompts.doctor_recommendation_prompt import build_system_prompt, build_user_message


def _parse_llm_json(raw_text: str) -> dict:
    raw_text = raw_text.strip()
    if raw_text.startswith("```"):
        raw_text = raw_text.strip("`").replace("json\n", "", 1)
    try:
        return json.loads(raw_text)
    except json.JSONDecodeError:
        raise ValueError("Model did not return valid JSON")


def recommend_doctor(symptoms: str) -> dict:
    departments = get_department_list()
    system_prompt = build_system_prompt(departments)
    user_message = build_user_message(symptoms)

    result = call_llm(system_prompt=system_prompt, user_message=user_message)
    parsed = _parse_llm_json(result["text"])

    normalized_departments = {d.strip().lower(): d for d in departments}

    valid_recommendations = []
    for rec in parsed.get("recommendations", []):
        specialist_raw = rec.get("specialist", "").strip().lower()
        if specialist_raw in normalized_departments:
            specialist_name = normalized_departments[specialist_raw]
            doctors = get_doctors_by_specialization(specialist_name)
            if doctors:
                rec["specialist"] = specialist_name
                rec["available_doctors"] = doctors
                valid_recommendations.append(rec)

    if not valid_recommendations:
        return {
            "data": {
                "recommendations": [],
                "fallback_triggered": True,
                "fallback_message": "We recommend booking with a General Physician who can refer you further.",
            },
            "provider": result["provider"],
            "model": result["model"],
        }

    return {
        "data": {
            "recommendations": valid_recommendations,
            "fallback_triggered": False,
            "fallback_message": "",
        },
        "provider": result["provider"],
        "model": result["model"],
    }