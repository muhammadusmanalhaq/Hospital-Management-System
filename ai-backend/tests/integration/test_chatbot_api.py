from unittest.mock import patch
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


@patch("app.services.chatbot_service.save_chat_message")
@patch("app.services.chatbot_service.build_context_block")
@patch("app.services.chatbot_service.call_llm")
def test_chatbot_success(mock_call_llm, mock_context, mock_save):
    mock_context.return_value = "Visiting hours: 10-6"
    mock_call_llm.return_value = {
        "text": '{"reply": "Our hours are 10-6", "intent_detected": "hospital_info_query", "redirected_to_doctor": false}',
        "provider": "groq",
        "model": "test-model",
    }

    response = client.post("/api/v1/ai/chatbot", json={
        "session_id": "test1",
        "message": "What are your hours?",
    })

    assert response.status_code == 200
    data = response.json()
    assert data["data"]["reply"] == "Our hours are 10-6"


@patch("app.services.chatbot_service.save_chat_message")
@patch("app.services.chatbot_service.build_context_block")
@patch("app.services.chatbot_service.call_llm")
def test_chatbot_medical_question_redirects(mock_call_llm, mock_context, mock_save):
    mock_context.return_value = "context"
    mock_call_llm.return_value = {
        "text": '{"reply": "I cannot give medical advice.", "intent_detected": "medical_question", "redirected_to_doctor": true}',
        "provider": "groq",
        "model": "test-model",
    }

    response = client.post("/api/v1/ai/chatbot", json={
        "session_id": "test1",
        "message": "What should I take for a fever?",
    })

    data = response.json()
    assert data["data"]["redirected_to_doctor"] is True


def test_chatbot_rejects_empty_message():
    response = client.post("/api/v1/ai/chatbot", json={"session_id": "test1", "message": ""})
    assert response.status_code == 422