from fastapi import APIRouter, HTTPException
from app.schemas.report_summary import ReportSummaryRequest
from app.services.report_summary_service import summarize_report

router = APIRouter()


@router.post("/report-summary")
def report_summary(request: ReportSummaryRequest):
    age = request.patient_context.age if request.patient_context else None
    gender = request.patient_context.gender if request.patient_context else None

    try:
        result = summarize_report(request.report_text, age, gender)
    except ValueError as e:
        raise HTTPException(status_code=502, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal error")

    return {
        "success": True,
        "data": result["data"],
        "meta": {
            "model_used": result["model"],
            "provider": result["provider"],
        },
    }