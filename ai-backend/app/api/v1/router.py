from fastapi import APIRouter
from app.api.v1 import report_summary, doctor_recommendation

api_router = APIRouter()
api_router.include_router(report_summary.router, prefix="/api/v1/ai", tags=["report-summary"])
api_router.include_router(doctor_recommendation.router, prefix="/api/v1/ai", tags=["doctor-recommendation"])