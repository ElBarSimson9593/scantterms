import json
import os
import re

import google.generativeai as genai

from app.constants import ALERT_CATEGORIES, GEMINI_MODEL, MAX_TEXT_CHARS

CATEGORIES_LIST = ", ".join(ALERT_CATEGORIES)


def _get_model():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY no configurada")
    genai.configure(api_key=api_key)
    return genai.GenerativeModel(os.getenv("GEMINI_MODEL", GEMINI_MODEL))


def _extract_json(raw: str) -> dict:
    text = raw.strip()
    fence = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", text)
    if fence:
        text = fence.group(1).strip()
    return json.loads(text)


def analyze_terms(text: str) -> dict:
    clipped = text[:MAX_TEXT_CHARS]
    model = _get_model()

    prompt = f"""Eres un asistente que analiza términos y condiciones en español para consumidores.
NO eres abogado. Devuelve SOLO JSON válido, sin markdown ni texto extra.

Analiza el texto y responde con este esquema exacto:
{{
  "risk_level": "bajo" | "medio" | "alto",
  "summary": ["bullet 1", "bullet 2", "..."],
  "alerts": [
    {{
      "category": "<una de: {CATEGORIES_LIST}>",
      "title": "título corto en español",
      "severity": "baja" | "media" | "alta",
      "excerpt": "cita o parafraseo breve del texto problemático"
    }}
  ]
}}

Reglas:
- summary: 3 a 5 bullets en lenguaje simple para un usuario no experto.
- alerts: solo cláusulas realmente riesgosas; si no hay, devuelve [].
- category debe ser exactamente uno de los valores permitidos.
- risk_level: alto si hay alertas severity alta; medio si hay media; bajo si pocas o ninguna.

Texto a analizar:
\"\"\"
{clipped}
\"\"\"
"""

    result = model.generate_content(prompt)
    raw = result.text or ""
    if not raw.strip():
        raise ValueError("Gemini no devolvió respuesta")

    data = _extract_json(raw)

    if data.get("risk_level") not in ("bajo", "medio", "alto"):
        data["risk_level"] = "medio"

    alerts = data.get("alerts") or []
    cleaned = []
    for alert in alerts:
        cat = alert.get("category", "")
        if cat not in ALERT_CATEGORIES:
            continue
        cleaned.append(
            {
                "category": cat,
                "title": str(alert.get("title", "Alerta"))[:120],
                "severity": alert.get("severity", "media")
                if alert.get("severity") in ("baja", "media", "alta")
                else "media",
                "excerpt": str(alert.get("excerpt", ""))[:500],
            }
        )

    summary = data.get("summary") or []
    if isinstance(summary, str):
        summary = [summary]

    return {
        "risk_level": data["risk_level"],
        "summary": [str(s) for s in summary[:6]],
        "alerts": cleaned,
        "model": os.getenv("GEMINI_MODEL", GEMINI_MODEL),
    }
