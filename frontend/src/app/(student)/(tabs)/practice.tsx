import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { getNextQuestion, answerQuestion } from "../../../services/question.service";
import { PracticeQuestionResponse } from "../../../types/question";

const LETTERS = ["A", "B", "C", "D", "E"];

export default function PracticeScreen() {
  const [question, setQuestion] = useState<PracticeQuestionResponse | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNext();
  }, []);

  const fetchNext = async () => {
    try {
      setLoading(true);
      setSelectedChoice(null);
      setCorrect(null);
      const data = await getNextQuestion();
      setQuestion(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (choiceId: number) => {
    if (selectedChoice !== null) return;
    setSelectedChoice(choiceId);
    try {
      const data = await answerQuestion(question!.id, choiceId);
      setCorrect(data.correct);
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!question) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyTitle}>No questions available</Text>
        <Text style={styles.emptySubtitle}>Check back later</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Practice</Text>
        <Text style={styles.pageSubtitle}>Answer and learn at your own pace</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.questionSection}>
          <Text style={styles.questionText}>{question.questionText}</Text>
        </View>

        <View style={styles.choicesSection}>
          {question.choices.map((choice, index) => (
            <TouchableOpacity
              key={choice.id}
              style={[
                styles.choice,
                selectedChoice === choice.id && (correct ? styles.choiceCorrect : styles.choiceIncorrect),
              ]}
              onPress={() => handleAnswer(choice.id)}
              activeOpacity={0.8}
            >
              <View style={[
                styles.letter,
                selectedChoice === choice.id && (correct ? styles.letterCorrect : styles.letterIncorrect),
              ]}>
                <Text style={styles.letterText}>{LETTERS[index]}</Text>
              </View>
              <Text style={styles.choiceText}>{choice.choiceText}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {selectedChoice !== null && (
        <>
          <View style={[styles.feedback, correct ? styles.feedbackCorrect : styles.feedbackWrong]}>
            <Text style={correct ? styles.feedbackIcon : styles.feedbackIconWrong}>
              {correct ? "✓" : "✕"}
            </Text>
            <Text style={[styles.feedbackText, !correct && styles.feedbackTextWrong]}>
              {correct ? "Correct! Well done 🎉" : "Incorrect, keep trying 💪"}
            </Text>
          </View>
          <TouchableOpacity style={styles.nextButton} onPress={fetchNext}>
            <Text style={styles.nextButtonText}>Next question →</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  content: { padding: 20, gap: 12 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { marginTop: 20, marginBottom: 8 },
  pageTitle: { fontSize: 22, fontWeight: "700", color: "#111827" },
  pageSubtitle: { fontSize: 13, color: "#6B7280", marginTop: 2 },
  card: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 12, overflow: "hidden" },
  questionSection: { padding: 20, borderBottomWidth: 1, borderBottomColor: "#E5E7EB" },
  questionText: { fontSize: 17, fontWeight: "600", color: "#111827", lineHeight: 25 },
  choicesSection: { padding: 12, gap: 8 },
  choice: { backgroundColor: "#F3F4F6", borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 8, padding: 12, flexDirection: "row", alignItems: "center", gap: 10 },
  choiceCorrect: { borderColor: "#3B6D11", backgroundColor: "#EAF3DE" },
  choiceIncorrect: { borderColor: "#A32D2D", backgroundColor: "#FCEBEB" },
  letter: { width: 26, height: 26, borderRadius: 13, backgroundColor: "#fff", borderWidth: 1, borderColor: "#E5E7EB", alignItems: "center", justifyContent: "center" },
  letterCorrect: { backgroundColor: "#3B6D11", borderColor: "#3B6D11" },
  letterIncorrect: { backgroundColor: "#A32D2D", borderColor: "#A32D2D" },
  letterText: { fontSize: 12, fontWeight: "600", color: "#6B7280" },
  choiceText: { fontSize: 14, color: "#111827", flex: 1 },
  feedback: { borderRadius: 12, padding: 14, flexDirection: "row", alignItems: "center", gap: 10 },
  feedbackCorrect: { backgroundColor: "#EAF3DE" },
  feedbackWrong: { backgroundColor: "#FCEBEB" },
  feedbackIcon: { fontSize: 16, color: "#3B6D11", fontWeight: "700" },
  feedbackIconWrong: { fontSize: 16, color: "#A32D2D", fontWeight: "700" },
  feedbackText: { fontSize: 14, fontWeight: "600", color: "#3B6D11" },
  feedbackTextWrong: { color: "#A32D2D" },
  nextButton: { backgroundColor: "#111827", borderRadius: 12, padding: 14, alignItems: "center" },
  nextButtonText: { color: "#fff", fontSize: 15, fontWeight: "600" },
  emptyTitle: { fontSize: 20, fontWeight: "700", color: "#111827" },
  emptySubtitle: { fontSize: 14, color: "#6B7280", marginTop: 6 },
});