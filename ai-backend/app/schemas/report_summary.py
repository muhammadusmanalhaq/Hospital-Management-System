from pydantic import BaseModel, Field
from typing import Optional


class PatientContext(BaseModel):
    age: Optional[int] = None
    gender: Optional[str] = None


class ReportSummaryRequest(BaseModel):
    report_text: str = Field(..., min_length=1, max_length=8000)
    patient_context: Optional[PatientContext] = None


class FlaggedFinding(BaseModel):
    test: str
    value: str
    status: str


class ReportSummaryData(BaseModel):
    summary: str
    flagged_findings: list[FlaggedFinding]
    recommendation: str
    disclaimer: str


class ReportSummaryResponse(BaseModel):
    success: bool
    data: ReportSummaryData
    meta: dict