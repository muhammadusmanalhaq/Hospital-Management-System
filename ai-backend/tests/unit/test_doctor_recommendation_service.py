import pytest
from app.services.doctor_recommendation_service import _parse_llm_json


def test_parses_clean_json():
    raw = '{"recommendations": [], "fallback_triggered": true, "fallback_message": "test"}'
    result = _parse_llm_json(raw)
    assert result["fallback_triggered"] is True


def test_strips_markdown_code_fence():
    raw = '```json\n{"recommendations": [], "fallback_triggered": false, "fallback_message": ""}\n```'
    result = _parse_llm_json(raw)
    assert result["fallback_triggered"] is False


def test_raises_on_invalid_json():
    raw = "this is not json at all"
    with pytest.raises(ValueError):
        _parse_llm_json(raw)

from unittest.mock import patch
from app.services.doctor_recommendation_service import recommend_doctor


@patch("app.services.doctor_recommendation_service.get_doctors_by_specialization")
@patch("app.services.doctor_recommendation_service.get_department_list")
@patch("app.services.doctor_recommendation_service.call_llm")
def test_rejects_specialist_not_in_list(mock_call_llm, mock_dept_list, mock_doctors):
    # Fake setup: sirf 2 valid specialists hain
    mock_dept_list.return_value = ["Cardiologist", "Ophthalmologist"]

    # Fake LLM response: ek GALAT specialist bol raha hai ("Neurologist" jo list mein nahi hai)
    mock_call_llm.return_value = {
        "text": '{"recommendations": [{"specialist": "Neurologist", "confidence": 0.9}], "fallback_triggered": false, "fallback_message": ""}',
        "provider": "groq",
        "model": "test-model",
    }

    result = recommend_doctor("some symptoms")

    # Assert: Neurologist reject hona chahiye, fallback trigger hona chahiye
    assert result["data"]["fallback_triggered"] is True
    assert result["data"]["recommendations"] == []


@patch("app.services.doctor_recommendation_service.get_doctors_by_specialization")
@patch("app.services.doctor_recommendation_service.get_department_list")
@patch("app.services.doctor_recommendation_service.call_llm")
def test_case_insensitive_match_works(mock_call_llm, mock_dept_list, mock_doctors):
    mock_dept_list.return_value = ["Cardiologist"]
    mock_doctors.return_value = [{"name": "Dr. Test", "experience_years": 5, "consultation_fee": 500, "qualification": "MD"}]

    # LLM ne "cardiologist" (lowercase) bola, real list mein "Cardiologist" hai
    mock_call_llm.return_value = {
        "text": '{"recommendations": [{"specialist": "cardiologist", "confidence": 0.8}], "fallback_triggered": false, "fallback_message": ""}',
        "provider": "groq",
        "model": "test-model",
    }

    result = recommend_doctor("chest pain")

    assert result["data"]["fallback_triggered"] is False
    assert result["data"]["recommendations"][0]["specialist"] == "Cardiologist"  # original DB spelling