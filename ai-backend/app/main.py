from fastapi import FastAPI
from app.api.v1.router import api_router

app = FastAPI(title="HMS AI Service")
app.include_router(api_router)


@app.get("/api/v1/ai/health")
def health():
    return {"status": "ok", "service": "hms-ai-service", "version": "1.0.0"}