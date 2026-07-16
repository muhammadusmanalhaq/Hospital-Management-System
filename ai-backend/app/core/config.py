from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    groq_api_key: str
    gemini_api_key: str
    internal_service_key: str = "dev-secret-change-later"

    class Config:
        env_file = ".env"


settings = Settings()