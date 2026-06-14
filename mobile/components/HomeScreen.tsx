import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  DISCLAIMER,
  MAX_TEXT_CHARS,
  MIN_TEXT_CHARS,
} from "../lib/constants";
import SAMPLE_NOVASTREAM from "../lib/sample";

type Props = {
  onAnalyze: (text: string) => void;
  loading: boolean;
  error: string;
};

export default function HomeScreen({
  onAnalyze,
  loading,
  error,
}: Props) {
  const [text, setText] = useState("");

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.badge}>ScanTerms</Text>
      <Text style={styles.title}>Lee antes de aceptar</Text>
      <Text style={styles.subtitle}>
        Pega los términos y condiciones. Gemini detecta cláusulas riesgosas y
        resume en lenguaje simple.
      </Text>

      <View style={styles.disclaimerBox}>
        <Text style={styles.disclaimer}>{DISCLAIMER}</Text>
      </View>

      <Text style={styles.label}>Texto de T&C</Text>
      <TextInput
        style={styles.input}
        multiline
        textAlignVertical="top"
        placeholder="Pega aquí el texto completo o una sección relevante…"
        placeholderTextColor="#71717a"
        value={text}
        onChangeText={(value) => setText(value.slice(0, MAX_TEXT_CHARS))}
      />
      <Text style={styles.counter}>
        {text.length.toLocaleString()} / {MAX_TEXT_CHARS.toLocaleString()}
      </Text>

      <Pressable
        style={styles.sampleButton}
        onPress={() => setText(SAMPLE_NOVASTREAM)}
      >
        <Text style={styles.sampleButtonText}>Cargar ejemplo ficticio</Text>
      </Pressable>

      <Pressable
        style={[styles.primaryButton, loading && styles.buttonDisabled]}
        disabled={loading || text.trim().length < MIN_TEXT_CHARS}
        onPress={() => onAnalyze(text.trim())}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.primaryButtonText}>Analizar con Gemini</Text>
        )}
      </Pressable>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: "#09090b" },
  content: { padding: 20, paddingBottom: 40 },
  badge: {
    color: "#a78bfa",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  title: {
    color: "#fafafa",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 8,
  },
  subtitle: {
    color: "#a1a1aa",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  disclaimerBox: {
    backgroundColor: "#18181b",
    borderColor: "#3f3f46",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  disclaimer: { color: "#d4d4d8", fontSize: 12, lineHeight: 18 },
  label: { color: "#e4e4e7", fontSize: 14, fontWeight: "600", marginBottom: 8 },
  input: {
    minHeight: 220,
    backgroundColor: "#18181b",
    borderColor: "#3f3f46",
    borderWidth: 1,
    borderRadius: 14,
    color: "#f4f4f5",
    fontSize: 14,
    lineHeight: 20,
    padding: 14,
  },
  counter: {
    color: "#71717a",
    fontSize: 12,
    textAlign: "right",
    marginTop: 6,
    marginBottom: 12,
  },
  sampleButton: {
    alignSelf: "flex-start",
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#52525b",
  },
  sampleButtonText: { color: "#d4d4d8", fontSize: 13, fontWeight: "600" },
  primaryButton: {
    backgroundColor: "#7c3aed",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonDisabled: { opacity: 0.6 },
  primaryButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  error: {
    color: "#fca5a5",
    marginTop: 12,
    backgroundColor: "#450a0a",
    borderRadius: 10,
    padding: 12,
    fontSize: 13,
  },
});
