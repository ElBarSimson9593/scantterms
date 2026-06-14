import * as Clipboard from "expo-clipboard";
import { useMemo } from "react";
import {
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  CATEGORY_LABELS,
  DISCLAIMER,
  RISK_COLORS,
} from "../lib/constants";
import type { AnalyzeResult } from "../lib/types";

type Props = {
  result: AnalyzeResult;
  onBack: () => void;
};

function formatReport(result: AnalyzeResult): string {
  const lines = [
    "# ScanTerms — Análisis",
    "",
    `Riesgo: ${result.risk_level}`,
    "",
    "## Resumen",
    ...result.summary.map((item) => `- ${item}`),
    "",
    "## Alertas",
  ];

  if (result.alerts.length === 0) {
    lines.push("- Sin alertas destacadas");
  } else {
    for (const alert of result.alerts) {
      lines.push(
        `- [${alert.severity}] ${alert.title}: ${alert.excerpt}`
      );
    }
  }

  lines.push("", DISCLAIMER);
  return lines.join("\n");
}

export default function ResultScreen({ result, onBack }: Props) {
  const report = useMemo(() => formatReport(result), [result]);
  const riskColor = RISK_COLORS[result.risk_level] ?? "#f59e0b";

  async function copyReport() {
    await Clipboard.setStringAsync(report);
  }

  async function shareReport() {
    await Share.share({ message: report });
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
    >
      <Pressable onPress={onBack}>
        <Text style={styles.back}>← Nuevo análisis</Text>
      </Pressable>

      <View style={[styles.riskPill, { backgroundColor: riskColor }]}>
        <Text style={styles.riskText}>
          Riesgo {result.risk_level.toUpperCase()}
        </Text>
      </View>

      <Text style={styles.model}>
        Modelo: {result.model}
      </Text>

      <Text style={styles.sectionTitle}>Resumen</Text>
      {result.summary.map((item, index) => (
        <Text key={`summary-${index}`} style={styles.bullet}>
          • {item}
        </Text>
      ))}

      <Text style={styles.sectionTitle}>
        Alertas rojas ({result.alerts.length})
      </Text>

      {result.alerts.length === 0 ? (
        <Text style={styles.empty}>No se detectaron alertas destacadas.</Text>
      ) : (
        result.alerts.map((alert, index) => (
          <View key={`alert-${index}`} style={styles.alertCard}>
            <Text style={styles.alertCategory}>
              {CATEGORY_LABELS[alert.category] ?? alert.category} ·{" "}
              {alert.severity}
            </Text>
            <Text style={styles.alertTitle}>{alert.title}</Text>
            <Text style={styles.alertExcerpt}>{alert.excerpt}</Text>
          </View>
        ))
      )}

      <View style={styles.actions}>
        <Pressable style={styles.actionButton} onPress={copyReport}>
          <Text style={styles.actionText}>Copiar</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={shareReport}>
          <Text style={styles.actionText}>Compartir</Text>
        </Pressable>
      </View>

      <Text style={styles.disclaimer}>{DISCLAIMER}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: "#09090b" },
  content: { padding: 20, paddingBottom: 40 },
  back: { color: "#a78bfa", fontSize: 14, fontWeight: "600", marginBottom: 16 },
  riskPill: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 8,
  },
  riskText: { color: "#fff", fontWeight: "800", fontSize: 13 },
  model: { color: "#71717a", fontSize: 12, marginBottom: 20 },
  sectionTitle: {
    color: "#fafafa",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 8,
    marginBottom: 10,
  },
  bullet: {
    color: "#d4d4d8",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 6,
  },
  empty: { color: "#a1a1aa", fontSize: 14, marginBottom: 12 },
  alertCard: {
    backgroundColor: "#18181b",
    borderLeftWidth: 4,
    borderLeftColor: "#ef4444",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  alertCategory: {
    color: "#fca5a5",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  alertTitle: {
    color: "#fafafa",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
  },
  alertExcerpt: { color: "#a1a1aa", fontSize: 13, lineHeight: 20 },
  actions: { flexDirection: "row", gap: 10, marginTop: 20, marginBottom: 16 },
  actionButton: {
    flex: 1,
    backgroundColor: "#27272a",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  actionText: { color: "#fafafa", fontWeight: "700" },
  disclaimer: { color: "#71717a", fontSize: 11, lineHeight: 16 },
});
