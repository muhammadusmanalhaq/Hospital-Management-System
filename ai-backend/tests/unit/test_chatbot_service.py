from unittest.mock import patch, MagicMock
from app.services.chatbot_service import chat, MAX_HISTORY_TURNS


@patch("app.services.chatbot_service.save_chat_message")
@patch("app.services.chatbot_service.build_context_block")
@patch("app.services.chatbot_service.call_llm")
def test_chat_saves_history_when_patient_id_given(mock_call_llm, mock_context, mock_save):
    mock_context.return_value = "Visiting hours: 10-6"
    mock_call_llm.return_value = {
        "text": '{"reply": "Our hours are 10-6", "intent_detected": "hospital_info_query", "redirected_to_doctor": false}',
        "provider": "groq",
        "model": "test-model",
    }

    result = chat(session_id="s1", message="What are your hours?", patient_id=1, conversation_history=[])

    assert result["data"]["reply"] == "Our hours are 10-6"
    assert mock_save.call_count == 2  # ek patient message ke liye, ek bot reply ke liye


@patch("app.services.chatbot_service.save_chat_message")
@patch("app.services.chatbot_service.build_context_block")
@patch("app.services.chatbot_service.call_llm")
def test_chat_does_not_save_history_when_no_patient_id(mock_call_llm, mock_context, mock_save):
    mock_context.return_value = "Visiting hours: 10-6"
    mock_call_llm.return_value = {
        "text": '{"reply": "test", "intent_detected": "unknown", "redirected_to_doctor": false}',
        "provider": "groq",
        "model": "test-model",
    }

    chat(session_id="s1", message="hi", patient_id=None, conversation_history=[])

    mock_save.assert_not_called()  # patient_id na hone pe save bilkul call nahi honi chahiye


@patch("app.services.chatbot_service.save_chat_message")
@patch("app.services.chatbot_service.build_context_block")
@patch("app.services.chatbot_service.call_llm")
def test_conversation_history_trimmed_to_max_turns(mock_call_llm, mock_context, mock_save):
    mock_context.return_value = "context"
    mock_call_llm.return_value = {
        "text": '{"reply": "ok", "intent_detected": "unknown", "redirected_to_doctor": false}',
        "provider": "groq",
        "model": "test-model",
    }

    # MAX_HISTORY_TURNS se zyada turns bhejo
    fake_turn = MagicMock(role="user", content="old message")
    long_history = [fake_turn] * (MAX_HISTORY_TURNS + 5)

    chat(session_id="s1", message="latest", patient_id=None, conversation_history=long_history)

    # call_llm ko diya gaya user_message check karo — sirf last MAX_HISTORY_TURNS aane chahiye
    call_args = mock_call_llm.call_args
    user_message_sent = call_args.kwargs["user_message"]
    assert user_message_sent.count("old message") == MAX_HISTORY_TURNS