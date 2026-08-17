from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from typing import Optional
from app.services.report_summary_service import summarize_report_from_file
from app.utils.exceptions import UnrecognizedInputError

router = APIRouter()

MAX_FILE_SIZE = 5 * 1024 * 1024
ALLOWED_TYPES = {"application/pdf", "image/png", "image/jpeg", "image/jpg"}
ALLOWED_IMAGE_SIGNATURES = {"png", "jpeg"}


def detect_image_type(file_bytes: bytes) -> str | None:
    """
    imghdr module Python 3.13 mein remove ho chuka hai (deprecated tha),
    isliye manually magic-byte signatures check kar rahe hain.
    """
    if file_bytes.startswith(b"\x89PNG\r\n\x1a\n"):
        return "png"
    if file_bytes.startswith(b"\xff\xd8\xff"):
        return "jpeg"
    return None


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

    if file.content_type != "application/pdf":
        detected = detect_image_type(file_bytes)
        if detected not in ALLOWED_IMAGE_SIGNATURES:
            raise HTTPException(status_code=422, detail="File content does not match a supported image format")

    try:
        result = summarize_report_from_file(file_bytes, file.content_type, age, gender)
    except UnrecognizedInputError:
        raise HTTPException(
            status_code=422,
            detail={"success": False, "error": {"code": "UNRECOGNIZED_INPUT", "message": "Uploaded file does not appear to be a valid medical report"}},
        )
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except RuntimeError as e:
        raise HTTPException(status_code=502, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="Internal error")

    return {
        "success": True,
        "data": result["data"],
        "meta": {"model_used": result["model"], "provider": result["provider"]},
    }