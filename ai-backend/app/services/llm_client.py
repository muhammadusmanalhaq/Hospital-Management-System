import base64
import logging
from openai import OpenAI
from google import genai
from google.genai import types
from app.core.config import settings

logger = logging.getLogger(__name__)

groq_client = OpenAI(
    api_key=settings.groq_api_key,
    base_url="https://api.groq.com/openai/v1",
)

gemini_client = genai.Client(api_key=settings.gemini_api_key)

# Updated: llama-3.3-70b-versatile deprecated June 17, 2026 — migrated to gpt-oss-120b
GROQ_MODEL = "openai/gpt-oss-120b"
GEMINI_MODEL = "gemini-3.5-flash"


def _call_groq(system_prompt: str, user_message: str) -> str:
    response = groq_client.chat.completions.create(
        model=GROQ_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message},
        ],
        temperature=0.3,
    )
    return response.choices[0].message.content


def _call_gemini(system_prompt: str, user_message: str) -> str:
    response = gemini_client.models.generate_content(
        model=GEMINI_MODEL,
        contents=user_message,
        config={"system_instruction": system_prompt},
    )
    return response.text


def call_llm(system_prompt: str, user_message: str) -> dict:
    try:
        text = _call_groq(system_prompt, user_message)
        return {"text": text, "provider": "groq", "model": GROQ_MODEL}
    except Exception as e:
        logger.warning(f"Groq failed: {e}. Trying Gemini fallback...")
        try:
            text = _call_gemini(system_prompt, user_message)
            return {"text": text, "provider": "gemini", "model": GEMINI_MODEL}
        except Exception as e2:
            logger.error(f"Gemini fallback bhi fail hua: {e2}")
            raise RuntimeError("Both Groq and Gemini failed") from e2


def call_vision_llm(system_prompt: str, user_message: str, file_bytes: bytes, mime_type: str) -> dict:
    """
    Image/PDF ko seedha Gemini ko bhejta hai — koi alag OCR step nahi.
    Note: Sirf Gemini use hota hai yahan — Groq ke current vision models abhi 'preview'
    stage mein hain (unstable, production ke liye recommend nahi), isliye vision ke liye
    sirf Gemini ko primary/only provider rakha hai. Text-only features (Doctor Recommendation,
    Chatbot) abhi bhi Groq+Gemini dono use karenge.
    """
    try:
        response = gemini_client.models.generate_content(
            model=GEMINI_MODEL,
            contents=[
                types.Part.from_bytes(data=file_bytes, mime_type=mime_type),
                user_message,
            ],
            config={"system_instruction": system_prompt},
        )
        return {"text": response.text, "provider": "gemini", "model": GEMINI_MODEL}
    except Exception as e:
        logger.error(f"Gemini vision call failed: {e}")
        raise RuntimeError("Vision-based report reading failed") from e