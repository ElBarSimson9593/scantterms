from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.gemini import analyze_terms
from app.schemas import AnalyzeRequest, AnalyzeResponse

app = FastAPI(title="ScanTerms API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/api/analyze", response_model=AnalyzeResponse)
def analyze(body: AnalyzeRequest):
    try:
        data = analyze_terms(body.text)
        return AnalyzeResponse(**data)
    except ValueError as exc:
        message = str(exc)
        if "GEMINI_API_KEY" in message:
            raise HTTPException(status_code=500, detail=message) from exc
        raise HTTPException(status_code=422, detail=message) from exc
    except Exception as exc:
        message = str(exc)
        if "429" in message or "quota" in message.lower():
            raise HTTPException(
                status_code=429,
                detail="Límite de Gemini alcanzado. Intenta más tarde.",
            ) from exc
        raise HTTPException(
            status_code=500,
            detail=message or "No se pudo analizar el texto.",
        ) from exc
