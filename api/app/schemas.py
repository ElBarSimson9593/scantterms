from pydantic import BaseModel, Field


class AnalyzeRequest(BaseModel):
    text: str = Field(..., min_length=50, max_length=15000)


class Alert(BaseModel):
    category: str
    title: str
    severity: str
    excerpt: str


class AnalyzeResponse(BaseModel):
    risk_level: str
    summary: list[str]
    alerts: list[Alert]
    model: str
