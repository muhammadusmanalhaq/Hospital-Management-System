from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    groq_api_key: str
    gemini_api_key: str
    internal_service_key: str = "dev-secret-change-later"

    db_user: str
    db_password: str
    db_host: str
    db_port: str = "3306"
    db_name: str
    db_ssl: bool = False

    class Config:
        env_file = ".env"


settings = Settings()