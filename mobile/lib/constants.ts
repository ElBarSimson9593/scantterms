import Constants from "expo-constants";
import { Platform } from "react-native";

const PRODUCTION_API = "https://scanterms-api.onrender.com";

const extra = Constants.expoConfig?.extra as { apiUrl?: string } | undefined;

export const API_URL = (
  process.env.EXPO_PUBLIC_API_URL ??
  extra?.apiUrl ??
  PRODUCTION_API
).replace(/\/$/, "");

export function assertApiUrlReachable(): void {
  if (
    Platform.OS !== "web" &&
    /localhost|127\.0\.0\.1/i.test(API_URL)
  ) {
    throw new Error(
      "En el celular no funciona localhost. Edita mobile/.env con la IP de tu PC " +
        "(ej. http://192.168.1.84:8001) o usa la API en Render, y reinicia: npx expo start -c"
    );
  }
}

export const MAX_TEXT_CHARS = 15000;
export const MIN_TEXT_CHARS = 50;

export const DISCLAIMER =
  "Análisis orientativo generado por IA. No constituye asesoría legal.";

export const CATEGORY_LABELS: Record<string, string> = {
  hidden_fees: "Cobros ocultos",
  auto_renewal: "Renovación automática",
  privacy: "Privacidad / datos",
  liability_waiver: "Renuncia a derechos",
  limited_liability: "Responsabilidad limitada",
  unilateral_changes: "Cambios unilaterales",
};

export const RISK_COLORS: Record<string, string> = {
  bajo: "#22c55e",
  medio: "#f59e0b",
  alto: "#ef4444",
};
