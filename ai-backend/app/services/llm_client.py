import logging
from openai import OpenAI
from google import genai
from app.core.config import settings

logger = logging.getLogger(__name__)

# Groq OpenAI-compatible endpoint use karta hai
groq_client = OpenAI(
    api_key=settings.groq_api_key,
    base_url="https://api.groq.com/openai/v1",
)

# Gemini apna alag SDK use karta hai
gemini_client = genai.Client(api_key=settings.gemini_api_key)

GROQ_MODEL = "llama-3.3-70b-versatile"
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
    """
    Groq ko pehle try karta hai. Agar fail ho, Gemini try karta hai.
    Dono fail hon toh error raise karta hai.
    """
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