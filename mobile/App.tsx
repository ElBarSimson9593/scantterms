import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import HomeScreen from "./components/HomeScreen";
import ResultScreen from "./components/ResultScreen";
import { analyzeTerms } from "./lib/api";
import type { AnalyzeResult } from "./lib/types";

export default function App() {
  const [screen, setScreen] = useState<"home" | "result">("home");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AnalyzeResult | null>(null);

  async function handleAnalyze(text: string) {
    setLoading(true);
    setError("");
    try {
      const data = await analyzeTerms(text);
      setResult(data);
      setScreen("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  }

  function handleBack() {
    setScreen("home");
    setResult(null);
    setError("");
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#09090b" }}>
        <StatusBar style="light" />
        {screen === "home" || !result ? (
          <HomeScreen
            onAnalyze={handleAnalyze}
            loading={loading}
            error={error}
          />
        ) : (
          <ResultScreen result={result} onBack={handleBack} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
