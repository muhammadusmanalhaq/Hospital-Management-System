from pydantic import BaseModel, Field
from typing import Optional


class DoctorRecommendationRequest(BaseModel):
    symptoms: str = Field(..., min_length=3, max_length=2000)


class AvailableDoctor(BaseModel):
    name: str
    experience_years: Optional[int] = None
    consultation_fee: Optional[float] = None
    qualification: Optional[str] = None


class Recommendation(BaseModel):
    specialist: str
    confidence: float
    available_doctors: list[AvailableDoctor] = []


class DoctorRecommendationData(BaseModel):
    recommendations: list[Recommendation]
    fallback_triggered: bool
    fallback_message: str = ""