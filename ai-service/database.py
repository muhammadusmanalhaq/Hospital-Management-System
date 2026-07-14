# database.py
# MySQL connection setup for the FastAPI AI service.
# Drop this file into ai-service/database.py and import get_db() in your routes.
#
# Install: pip install sqlalchemy pymysql python-dotenv --break-system-packages

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME")
DB_SSL = os.getenv("DB_SSL", "false").lower() == "true"

DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Most hosted MySQL providers (Aiven, TiDB Cloud) require SSL.
# The exact ssl arg format can vary slightly by provider — check their
# connection docs if this throws an SSL error, you may need a CA cert path.
connect_args = {"ssl": {"ssl_mode": "REQUIRED"}} if DB_SSL else {}

engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True,   # avoids "MySQL server has gone away" on idle connections
    pool_recycle=280,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    """FastAPI dependency — use as: def route(db: Session = Depends(get_db))"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
