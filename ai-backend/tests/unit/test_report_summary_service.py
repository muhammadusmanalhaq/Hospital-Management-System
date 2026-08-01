import pytest
from unittest.mock import patch
from app.services.report_summary_service import _parse_llm_json, summarize_report_from_file
from app.utils.exceptions import UnrecognizedInputError


def test_parses_clean_json():
    raw = '{"summary": "test", "flagged_findings": [], "recommendation": "", "disclaimer": "AI generated"}'
    result = _parse_llm_json(raw)
    assert result["summary"] == "test"


def test_strips_markdown_code_fence():
    raw = '```json\n{"summary": "test", "flagged_findings": [], "recommendation": "", "disclaimer": "AI generated"}\n```'
    result = _parse_llm_json(raw)
    assert result["summary"] == "test"


def test_raises_on_invalid_json():
    raw = "not valid json"
    with pytest.raises(ValueError):
        _parse_llm_json(raw)


def test_raises_on_model_reported_error():
    raw = '{"error": "UNRECOGNIZED_INPUT"}'
    with pytest.raises(UnrecognizedInputError):
        _parse_llm_json(raw)


@patch("app.services.report_summary_service.call_vision_llm")
def test_summarize_report_from_file_success(mock_vision_llm):
    mock_vision_llm.return_value = {
        "text": '{"summary": "Hemoglobin is low", "flagged_findings": [{"test": "Hemoglobin", "value": "10.2", "status": "low"}], "recommendation": "See a doctor", "disclaimer": "AI generated, not a diagnosis"}',
        "provider": "gemini",
        "model": "gemini-3.5-flash",
    }

    result = summarize_report_from_file(file_bytes=b"fake_image_bytes", mime_type="image/png", age=34, gender="female")

    assert result["data"]["summary"] == "Hemoglobin is low"
    assert result["data"]["flagged_findings"][0]["status"] == "low"
    assert result["provider"] == "gemini"


@patch("app.services.report_summary_service.call_vision_llm")
def test_summarize_report_from_file_raises_on_bad_input(mock_vision_llm):
    mock_vision_llm.return_value = {
        "text": '{"error": "UNRECOGNIZED_INPUT"}',
        "provider": "gemini",
        "model": "gemini-3.5-flash",
    }

    with pytest.raises(UnrecognizedInputError):
        summarize_report_from_file(file_bytes=b"random_bytes", mime_type="image/png")


from app.utils.exceptions import UnrecognizedInputError

def test_raises_unrecognized_input_error_on_model_error():
    raw = '{"error": "UNRECOGNIZED_INPUT"}'
    with pytest.raises(UnrecognizedInputError):
        _parse_llm_json(raw)