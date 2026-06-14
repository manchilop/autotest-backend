import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { getQuestionsByStatus } from "../../../services/question.service";
import { QuestionResponse } from "../../../types/question";

export default function Library() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [approved, setApproved] = useState<QuestionResponse[]>([]);
  const [rejected, setRejected] = useState<QuestionResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const [approvedData, rejectedData] = await Promise.all([
        getQuestionsByStatus("APPROVED"),
        getQuestionsByStatus("REJECTED"),
      ]);
      setApproved(approvedData);
      setRejected(rejectedData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderQuestion = (question: QuestionResponse, dot: "green" | "red") => (
    <Pressable
      key={question.id}
      style={styles.card}
      onPress={() => setExpandedId(expandedId === question.id ? null : question.id)}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.dot, dot === "green" ? styles.dotGreen : styles.dotRed]} />
        <Text style={styles.questionText}>{question.questionText}</Text>
        <Text style={styles.chevron}>{expandedId === question.id ? "↓" : "›"}</Text>
      </View>

      {expandedId === question.id && (
        <View style={styles.choices}>
          {question.choices.map((choice) => (
            <View key={choice.id} style={styles.choiceRow}>
              {choice.correct && <Text style={styles.check}>✓</Text>}
              <Text style={[styles.choiceText, choice.correct && styles.correctChoice]}>
                {choice.choiceText}
              </Text>
            </View>
          ))}
        </View>
      )}
    </Pressable>
  );

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Question library</Text>
      <Text style={styles.pageSub}>All reviewed questions</Text>

      <View style={styles.statRow}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Approved</Text>
          <Text style={[styles.statValue, styles.green]}>{approved.length}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Rejected</Text>
          <Text style={[styles.statValue, styles.red]}>{rejected.length}</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Approved</Text>
        <View style={styles.badgeGreen}>
          <Text style={styles.badgeGreenText}>{approved.length}</Text>
        </View>
      </View>
      {approved.length === 0
        ? <Text style={styles.empty}>No approved questions</Text>
        : approved.map((q) => renderQuestion(q, "green"))}

      <View style={[styles.sectionHeader, { marginTop: 24 }]}>
        <Text style={styles.sectionTitle}>Rejected</Text>
        <View style={styles.badgeRed}>
          <Text style={styles.badgeRedText}>{rejected.length}</Text>
        </View>
      </View>
      {rejected.length === 0
        ? <Text style={styles.empty}>No rejected questions</Text>
        : rejected.map((q) => renderQuestion(q, "red"))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F8FAFC" },
  pageTitle: { fontSize: 22, fontWeight: "700", color: "#111827", marginTop: 20, marginBottom: 2 },
  pageSub: { fontSize: 13, color: "#6B7280", marginBottom: 20 },
  statRow: { flexDirection: "row", gap: 10, marginBottom: 24 },
  stat: { flex: 1, backgroundColor: "#F3F4F6", borderRadius: 10, padding: 14 },
  statLabel: { fontSize: 12, color: "#6B7280", marginBottom: 4 },
  statValue: { fontSize: 24, fontWeight: "700" },
  green: { color: "#3B6D11" },
  red: { color: "#A32D2D" },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  sectionTitle: { fontSize: 12, fontWeight: "600", color: "#6B7280", textTransform: "uppercase", letterSpacing: 1 },
  badgeGreen: { backgroundColor: "#EAF3DE", borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2 },
  badgeGreenText: { fontSize: 11, fontWeight: "600", color: "#3B6D11" },
  badgeRed: { backgroundColor: "#FCEBEB", borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2 },
  badgeRedText: { fontSize: 11, fontWeight: "600", color: "#A32D2D" },
  card: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 12, marginBottom: 8, overflow: "hidden" },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 10, padding: 14 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  dotGreen: { backgroundColor: "#639922" },
  dotRed: { backgroundColor: "#E24B4A" },
  questionText: { flex: 1, fontSize: 14, color: "#111827" },
  chevron: { fontSize: 18, color: "#9CA3AF" },
  choices: { borderTopWidth: 1, borderTopColor: "#E5E7EB", padding: 12, gap: 6 },
  choiceRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  choiceText: { fontSize: 13, color: "#6B7280" },
  correctChoice: { color: "#3B6D11", fontWeight: "600" },
  check: { fontSize: 14, color: "#639922" },
  empty: { fontSize: 13, color: "#9CA3AF", paddingVertical: 12 },
});