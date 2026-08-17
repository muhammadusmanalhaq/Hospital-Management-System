from unittest.mock import patch
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


@patch("app.services.report_summary_service.call_vision_llm")
def test_report_summary_success(mock_vision_llm):
    mock_vision_llm.return_value = {
        "text": '{"summary": "Test summary", "flagged_findings": [], "recommendation": "", "disclaimer": "AI generated"}',
        "provider": "gemini",
        "model": "gemini-3.5-flash",
    }

    fake_png_bytes = b"\x89PNG\r\n\x1a\n" + b"rest_of_fake_data_here"
    fake_file = ("report.png", fake_png_bytes, "image/png")
    response = client.post(
        "/api/v1/ai/report-summary",
        files={"file": fake_file},
        data={"age": "34", "gender": "female"},
    )

    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["summary"] == "Test summary"


def test_report_summary_rejects_unsupported_file_type():
    fake_file = ("report.txt", b"some text content", "text/plain")
    response = client.post("/api/v1/ai/report-summary", files={"file": fake_file})
    assert response.status_code == 415


def test_report_summary_rejects_oversized_file():
    huge_file_bytes = b"x" * (6 * 1024 * 1024)  # 6 MB, limit is 5 MB
    fake_file = ("report.png", huge_file_bytes, "image/png")
    response = client.post("/api/v1/ai/report-summary", files={"file": fake_file})
    assert response.status_code == 413