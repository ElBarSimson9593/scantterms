import { API_URL, assertApiUrlReachable } from "./constants";
import type { AnalyzeResult } from "./types";

export async function analyzeTerms(text: string): Promise<AnalyzeResult> {
  assertApiUrlReachable();

  const response = await fetch(`${API_URL}/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail || "No se pudo analizar el texto.");
  }

  return data as AnalyzeResult;
}
