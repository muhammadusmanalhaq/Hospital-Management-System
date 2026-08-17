from fastapi import APIRouter, HTTPException
from app.schemas.doctor_recommendation import DoctorRecommendationRequest
from app.services.doctor_recommendation_service import recommend_doctor

router = APIRouter()


@router.post("/doctor-recommendation")
def doctor_recommendation(request: DoctorRecommendationRequest):
    try:
        result = recommend_doctor(request.symptoms)
    except RuntimeError as e:
        # Order necessary: RuntimeError  catch first (provider failure)
        raise HTTPException(status_code=502, detail="Both LLM providers are currently unavailable")
    except ValueError as e:
        # Model provided malformed JSON  — internal parsing issue, not provider issue
        raise HTTPException(status_code=500, detail="Model returned an invalid response")
    except Exception:
        raise HTTPException(status_code=500, detail="Internal error")

    return {
        "success": True,
        "data": result["data"],
        "meta": {"model_used": result["model"], "provider": result["provider"]},
    }