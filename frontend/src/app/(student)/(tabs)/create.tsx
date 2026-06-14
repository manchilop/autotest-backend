import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { createQuestion } from "../../../services/question.service";
import { Choice, CreateQuestionRequest } from "../../../types/question";

const LETTERS = ["A", "B", "C", "D"];

export default function Create() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [choices, setChoices] = useState<Choice[]>([
    { choiceText: "", correct: false },
    { choiceText: "", correct: false },
    { choiceText: "", correct: false },
    { choiceText: "", correct: false },
  ]);

  const setChoiceText = (index: number, text: string) => {
    const updated = [...choices];
    updated[index] = { ...updated[index], choiceText: text };
    setChoices(updated);
  };

  const setCorrect = (index: number) => {
    setChoices(choices.map((c, i) => ({ ...c, correct: i === index })));
  };

  const resetForm = () => {
    setQuestion("");
    setChoices([
      { choiceText: "", correct: false },
      { choiceText: "", correct: false },
      { choiceText: "", correct: false },
      { choiceText: "", correct: false },
    ]);
  };

  const handleSubmit = async () => {
    if (!question.trim()) return Alert.alert("Error", "Question is required");
    if (choices.some((c) => !c.choiceText.trim())) return Alert.alert("Error", "All options are required");
    if (!choices.some((c) => c.correct)) return Alert.alert("Error", "Select the correct answer");

    try {
      setLoading(true);
      const payload: CreateQuestionRequest = { questionText: question, choices };
      await createQuestion(payload);
      Alert.alert("Success", "Question submitted for review!");
      resetForm();
    } catch (error) {
      Alert.alert("Error", "Failed to create question");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Create question</Text>
        <Text style={styles.pageSub}>Contribute to the question bank</Text>
      </View>

      <Text style={styles.label}>Question</Text>
      <TextInput
        placeholder="Write your question here..."
        value={question}
        onChangeText={setQuestion}
        style={styles.input}
        multiline
      />

      <Text style={styles.label}>Answer options</Text>

      {choices.map((choice, index) => (
        <View key={index} style={styles.choiceRow}>
          <Pressable
            style={[styles.letterBadge, choice.correct && styles.letterBadgeCorrect]}
            onPress={() => setCorrect(index)}
          >
            <Text style={[styles.letterText, choice.correct && styles.letterTextCorrect]}>
              {LETTERS[index]}
            </Text>
          </Pressable>

          <TextInput
            placeholder={`Option ${LETTERS[index]}`}
            value={choice.choiceText}
            onChangeText={(text) => setChoiceText(index, text)}
            style={[styles.choiceInput, choice.correct && styles.choiceInputCorrect]}
          />
        </View>
      ))}

      <Text style={styles.help}>Tap a letter to mark the correct answer</Text>

      <Pressable style={[styles.button, loading && styles.buttonDisabled]} onPress={handleSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Submit question →</Text>
        )}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  content: { padding: 20, gap: 4 },
  header: { marginTop: 20, marginBottom: 24 },
  pageTitle: { fontSize: 22, fontWeight: "700", color: "#111827" },
  pageSub: { fontSize: 13, color: "#6B7280", marginTop: 2 },
  label: { fontSize: 12, fontWeight: "600", color: "#6B7280", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8, marginTop: 12 },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 12, padding: 14, fontSize: 15, color: "#111827", minHeight: 80, textAlignVertical: "top", marginBottom: 8 },
  choiceRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
  letterBadge: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#F3F4F6", borderWidth: 1, borderColor: "#E5E7EB", alignItems: "center", justifyContent: "center" },
  letterBadgeCorrect: { backgroundColor: "#3B6D11", borderColor: "#3B6D11" },
  letterText: { fontSize: 13, fontWeight: "600", color: "#6B7280" },
  letterTextCorrect: { color: "#fff" },
  choiceInput: { flex: 1, backgroundColor: "#fff", borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 8, padding: 12, fontSize: 14, color: "#111827" },
  choiceInputCorrect: { borderColor: "#3B6D11", backgroundColor: "#EAF3DE" },
  help: { fontSize: 12, color: "#9CA3AF", marginTop: 4, marginBottom: 20 },
  button: { backgroundColor: "#111827", borderRadius: 12, padding: 14, alignItems: "center" },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "#fff", fontSize: 15, fontWeight: "600" },
});