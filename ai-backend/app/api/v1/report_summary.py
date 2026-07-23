from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from typing import Optional
from app.services.report_summary_service import summarize_report_from_file

router = APIRouter()

MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB
ALLOWED_TYPES = {"application/pdf", "image/png", "image/jpeg", "image/jpg"}


@router.post("/report-summary")
async def report_summary(
    file: UploadFile = File(...),
    age: Optional[int] = Form(None),
    gender: Optional[str] = Form(None),
):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=415, detail=f"Unsupported file type: {file.content_type}")

    file_bytes = await file.read()
    if len(file_bytes) > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="File too large (max 5MB)")

    try:
        result = summarize_report_from_file(file_bytes, file.content_type, age, gender)
    except ValueError as e:
        raise HTTPException(status_code=502, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="Internal error")

    return {
        "success": True,
        "data": result["data"],
        "meta": {
            "model_used": result["model"],
            "provider": result["provider"],
        },
    }