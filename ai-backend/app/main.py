from fastapi import FastAPI

app = FastAPI(title="HMS AI Service")

@app.get("/api/v1/ai/health")
def health():
    return {"status": "ok", "service": "hms-ai-service", "version": "1.0.0"}