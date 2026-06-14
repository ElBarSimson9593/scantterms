# ScanTerms — PRD (MVP v0.1)

## Problema

Los términos y condiciones son largos, legales y difíciles de leer. La gente acepta sin entender cobros ocultos, renovaciones automáticas o cláusulas de privacidad abusivas.

## Solución

App **React Native (Expo)** que recibe texto de T&C, lo analiza con **Gemini API** y muestra un resumen simple + **alertas rojas** por categoría de riesgo.

> **Disclaimer obligatorio:** análisis orientativo generado por IA. No constituye asesoría legal.

## Decisiones de producto

| Decisión | Valor |
|----------|--------|
| Nombre | **ScanTerms** |
| Plataforma | React Native (Expo) |
| Cuándo | Antes de postular a TuMatch |
| Presupuesto APIs | $0 (Gemini free tier) |
| Modelo IA | `gemini-2.5-flash` |

## Arquitectura MVP

```
┌─────────────────────┐      POST /analyze       ┌─────────────────────┐
│  ScanTerms Mobile   │  ─────────────────────►  │  FastAPI (proxy)    │
│  Expo + TypeScript  │  ◄─────────────────────  │  GEMINI_API_KEY     │
└─────────────────────┘      JSON resultado      └─────────────────────┘
```

La API key **no va en la app móvil** — solo en el backend local (mismo patrón que MeetScribe, pero con cliente RN).

## Alcance MVP v0.1 — INCLUIDO

### Mobile (Expo)

- Pantalla **Inicio**: textarea para pegar T&C + botón Analizar
- Pantalla **Resultado**:
  - Nivel de riesgo: `bajo` | `medio` | `alto`
  - Resumen (3–5 bullets en lenguaje simple)
  - Alertas rojas por categoría (lista con icono + título + extracto)
  - Botón copiar / compartir resultado
- Disclaimer visible en inicio y resultado
- UI oscura, legible en móvil
- Límite entrada: **15.000 caracteres**

### Backend (FastAPI mínimo)

- `POST /api/analyze` — body `{ "text": "..." }`
- Respuesta JSON estructurada (ver contrato abajo)
- Validación de longitud y texto vacío
- Manejo de errores Gemini (429, modelo, etc.)

### Datos de demo (repo)

- 2 T&C ficticios en `docs/samples/` (no empresas reales)
- 1 ejemplo de salida esperada en `docs/evidence/`

### Repo

- `README.md` con instrucciones (Expo + API)
- `.env.example` para backend
- Capturas en `docs/evidence/screenshots/`
- Tests básicos del endpoint FastAPI

## Categorías de alerta (fijas en prompt)

1. `hidden_fees` — Cobros / tarifas ocultas
2. `auto_renewal` — Renovación automática / cancelación difícil
3. `privacy` — Privacidad / venta o uso amplio de datos
4. `liability_waiver` — Renuncia a derechos / arbitraje forzoso
5. `limited_liability` — Responsabilidad limitada de la empresa
6. `unilateral_changes` — Cambios unilaterales del contrato

## Contrato API (respuesta)

```json
{
  "risk_level": "medio",
  "summary": ["...", "..."],
  "alerts": [
    {
      "category": "auto_renewal",
      "title": "Renovación automática",
      "severity": "alta",
      "excerpt": "El servicio se renueva automáticamente..."
    }
  ],
  "model": "gemini-2.5-flash"
}
```

## Fuera de alcance v0.1

- Foto / cámara → OCR
- Pegar URL y scrapear página
- Login, historial, base de datos
- Análisis legal con referencias a ley chilena
- Publicación en App Store / Play Store
- Deploy cloud del backend (opcional v0.2)

## Criterios de aceptación

1. Pegar texto de demo → app muestra resumen + alertas + riesgo.
2. Backend corre local; app apunta a `http://10.0.2.2:8000` (Android emulator) o IP LAN (dispositivo físico).
3. Disclaimer visible.
4. README + capturas + repo público en GitHub.
5. Probar con 1 T&C real corto en local (no subir al repo por copyright).

## Stack

| Capa | Tecnología |
|------|------------|
| Mobile | Expo SDK 52+, React Native, TypeScript |
| Navegación | Expo Router |
| Backend | FastAPI, Python 3.11+ |
| IA | `@google/generative-ai` / `gemini-2.5-flash` |
| Estilo mobile | StyleSheet nativo (sin dependencias pesadas) |

## Estructura de carpetas

```
ScanTerms/
├── mobile/          # Expo app
├── api/             # FastAPI proxy Gemini
├── docs/
│   ├── PRD.md
│   ├── samples/     # T&C ficticios
│   └── evidence/    # capturas + salida demo
├── README.md
└── .env.example
```

## Ángulo TuMatch (para CV, no en README)

Patrón de análisis de documentos con IA — aplicable a contratos de arriendo, mandatos y términos de plataformas inmobiliarias.

## Estimación

| Fase | Tiempo |
|------|--------|
| Scaffold Expo + FastAPI | 1 día |
| Pantallas + navegación | 1–2 días |
| Integración Gemini + prompt | 1 día |
| Demo samples + capturas + README | 1 día |
| **Total MVP** | **~4–5 días** |

## Issues futuras (v0.2+)

- OCR con cámara (expo-camera + Gemini Vision)
- Deploy API en Render
- Comparar dos versiones de un contrato
- Filtro por jurisdicción (Chile)
