from fastapi import APIRouter, HTTPException
from app.schemas.doctor_recommendation import DoctorRecommendationRequest
from app.services.doctor_recommendation_service import recommend_doctor

router = APIRouter()


@router.post("/doctor-recommendation")
def doctor_recommendation(request: DoctorRecommendationRequest):
    try:
        result = recommend_doctor(request.symptoms)
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