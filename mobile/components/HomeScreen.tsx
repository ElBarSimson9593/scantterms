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
import { theme } from "../lib/theme";

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
      <View style={styles.heroAccent} />
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
        placeholderTextColor={theme.textFaint}
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
          <ActivityIndicator color={theme.white} />
        ) : (
          <Text style={styles.primaryButtonText}>Analizar con Gemini</Text>
        )}
      </Pressable>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: theme.bg },
  content: { padding: 20, paddingBottom: 40 },
  heroAccent: {
    width: 48,
    height: 4,
    borderRadius: 999,
    backgroundColor: theme.brand,
    marginBottom: 16,
  },
  badge: {
    color: theme.brandSoft,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  title: {
    color: theme.text,
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 8,
  },
  subtitle: {
    color: theme.textSoft,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  disclaimerBox: {
    backgroundColor: theme.surface,
    borderColor: theme.brandStrong,
    borderWidth: 1,
    borderLeftWidth: 4,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  disclaimer: { color: theme.textMuted, fontSize: 12, lineHeight: 18 },
  label: {
    color: theme.textMuted,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    minHeight: 220,
    backgroundColor: theme.surface,
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 14,
    color: theme.text,
    fontSize: 14,
    lineHeight: 20,
    padding: 14,
  },
  counter: {
    color: theme.textFaint,
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
    borderColor: theme.borderMuted,
  },
  sampleButtonText: {
    color: theme.textMuted,
    fontSize: 13,
    fontWeight: "600",
  },
  primaryButton: {
    backgroundColor: theme.brandStrong,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonDisabled: { opacity: 0.6 },
  primaryButtonText: { color: theme.white, fontSize: 16, fontWeight: "700" },
  error: {
    color: theme.error,
    marginTop: 12,
    backgroundColor: theme.errorBg,
    borderRadius: 10,
    padding: 12,
    fontSize: 13,
  },
});
