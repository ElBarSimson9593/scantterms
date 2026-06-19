# ScanTerms

[![Expo](https://img.shields.io/badge/Expo-56-000020)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-TypeScript-61DAFB)](https://reactnative.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688)](https://fastapi.tiangolo.com/)
[![Gemini](https://img.shields.io/badge/Gemini-2.5%20Flash-4285F4)](https://ai.google.dev/)

App **React Native (Expo)** + API **FastAPI** para analizar términos y condiciones con **Gemini** y detectar alertas de riesgo.

**Demo en vivo (API):** [scanterms-api.onrender.com/docs](https://scanterms-api.onrender.com/docs)  
**Repositorio:** [github.com/ElBarSimson9593/scantterms](https://github.com/ElBarSimson9593/scantterms)

> Proyecto de portafolio — LegalTech / defensa del consumidor  
> Análisis orientativo por IA. No constituye asesoría legal.  
> La app móvil se muestra en capturas; la API desplegada se prueba en Swagger.

## Qué hace

1. Pegas texto de T&C en la app móvil.
2. La API analiza con Gemini 2.5 Flash.
3. Ves **nivel de riesgo**, **resumen** y **alertas rojas** por categoría.
4. Copias o compartes el resultado.

## Demo en vivo

Prueba la **API desplegada en Render** desde Swagger (pega un texto de T&C y ejecuta `POST /api/analyze`):

**[https://scanterms-api.onrender.com/docs](https://scanterms-api.onrender.com/docs)**

Health check: [scanterms-api.onrender.com/health](https://scanterms-api.onrender.com/health)

> El free tier se duerme tras inactividad (~30–60 s al despertar). La app móvil requiere Expo Go en local; las capturas abajo muestran el flujo completo.

## Capturas

### Pantalla principal

![Pantalla principal](docs/screenshots/home.png)

### Entrada de texto (ejemplo ficticio NovaStream)

![Entrada de T&C](docs/screenshots/input-ejemplo.png)

### Resultado — resumen y nivel de riesgo

![Resumen del análisis](docs/screenshots/resumen.png)

### Alertas rojas por categoría

![Alertas rojas](docs/screenshots/alertas.png)

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
npm install
npx expo start -c
```

**`mobile/.env`** — elige una opción:

| Caso | `EXPO_PUBLIC_API_URL` |
|------|------------------------|
| Celular físico sin API local | `https://scanterms-api.onrender.com` (default) |
| Celular + API en tu PC | `http://192.168.1.84:8001` (tu IP local) |
| Emulador Android | `http://10.0.2.2:8001` |

> **No uses `localhost` en el celular** — apunta al teléfono, no a tu PC.  
> Tras cambiar `.env`, reinicia con `npx expo start -c`.

## API

```http
POST /api/analyze
Content-Type: application/json

{ "text": "..." }
```

## Deploy en Render (free tier)

1. [render.com](https://render.com) → **New** → **Blueprint** → repo `scantterms`.
2. Añade `GEMINI_API_KEY` cuando lo pida.
3. Tras el deploy, prueba [scanterms-api.onrender.com/health](https://scanterms-api.onrender.com/health).
4. En la app móvil (`mobile/.env`): `EXPO_PUBLIC_API_URL=https://scanterms-api.onrender.com`

> El free tier se duerme tras inactividad (~30–60 s al despertar). Sin costo obligatorio.

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
