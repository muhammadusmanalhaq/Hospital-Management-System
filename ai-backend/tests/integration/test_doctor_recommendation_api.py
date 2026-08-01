from unittest.mock import patch
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


@patch("app.services.doctor_recommendation_service.get_doctors_by_specialization")
@patch("app.services.doctor_recommendation_service.get_department_list")
@patch("app.services.doctor_recommendation_service.call_llm")
def test_doctor_recommendation_success(mock_call_llm, mock_dept_list, mock_doctors):
    mock_dept_list.return_value = ["Cardiologist"]
    mock_doctors.return_value = [{"name": "Dr. Test", "experience_years": 5, "consultation_fee": 500, "qualification": "MD"}]
    mock_call_llm.return_value = {
        "text": '{"recommendations": [{"specialist": "Cardiologist", "confidence": 0.9}], "fallback_triggered": false, "fallback_message": ""}',
        "provider": "groq",
        "model": "test-model",
    }

    response = client.post("/api/v1/ai/doctor-recommendation", json={"symptoms": "chest pain"})

    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["recommendations"][0]["specialist"] == "Cardiologist"


def test_doctor_recommendation_empty_symptoms_rejected():
    response = client.post("/api/v1/ai/doctor-recommendation", json={"symptoms": ""})
    assert response.status_code == 422  # Pydantic validation error, min_length=3


def test_health_check():
    response = client.get("/api/v1/ai/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"