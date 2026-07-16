from fastapi import APIRouter
from app.api.v1 import report_summary

api_router = APIRouter()
api_router.include_router(report_summary.router, prefix="/api/v1/ai", tags=["report-summary"])