# ScanTerms

App **React Native (Expo)** + API **FastAPI** para analizar términos y condiciones con **Gemini** y detectar alertas de riesgo.

> Análisis orientativo por IA. No constituye asesoría legal.

## Qué hace

1. Pegas texto de T&C en la app móvil.
2. La API analiza con Gemini 2.5 Flash.
3. Ves **nivel de riesgo**, **resumen** y **alertas rojas** por categoría.
4. Copias o compartes el resultado.

## Estructura

```
ScanTerms/
├── mobile/     Expo + TypeScript
├── api/        FastAPI (GEMINI_API_KEY solo aquí)
└── docs/       PRD, samples, evidencia
```

## Requisitos

- Node.js 20+
- Python 3.11+
- Cuenta Google AI Studio (free tier)
- Expo Go en el celular (opcional) o emulador Android

## 1. Backend (API)

```bash
cd api
cp .env.example .env
# Edita .env con tu GEMINI_API_KEY

python -m venv .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Verifica: http://localhost:8000/health

## 2. Mobile (Expo)

```bash
cd mobile
cp .env.example .env
# EXPO_PUBLIC_API_URL = IP de tu PC en la red local
# Ejemplo: http://192.168.1.84:8000
# Emulador Android: http://10.0.2.2:8000

npm install
npx expo start
```

Escanea el QR con **Expo Go** o presiona `a` para emulador Android.

## API

```http
POST /api/analyze
Content-Type: application/json

{ "text": "..." }
```

## Samples de demo

- [docs/samples/ficticio-novastream.txt](docs/samples/ficticio-novastream.txt)
- [docs/samples/ficticio-fittrack.txt](docs/samples/ficticio-fittrack.txt)

La app incluye botón **Cargar ejemplo ficticio**.

## Stack

| Capa | Tecnología |
|------|------------|
| Mobile | Expo 56, React Native, TypeScript |
| API | FastAPI, Gemini 2.5 Flash |
| Costo | $0 (free tier) |

## Autor

**Osvaldo Andrés Díaz Guzmán** — Backend e IA aplicada

## Proyectos relacionados

- [SentimentTrend Bot](https://github.com/ElBarSimson9593/sentiment-trend-bot)
- [MeetScribe AI](https://github.com/ElBarSimson9593/meetscribe-ai)
