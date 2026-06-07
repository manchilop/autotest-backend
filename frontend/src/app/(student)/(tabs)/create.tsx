import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";

import { createQuestion } from "../../../services/question.service";
import { Choice, CreateQuestionRequest } from "../../../types/question";

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
    updated[index].choiceText = text;
    setChoices(updated);
  };

  const setCorrect = (index: number) => {
    const updated = choices.map((c, i) => ({
      ...c,
      correct: i === index,
    }));
    setChoices(updated);
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
    try {
      setLoading(true);

      if (!question.trim()) {
        Alert.alert("Error", "Question is required");
        return;
      }

      if (choices.some((c) => !c.choiceText.trim())) {
        Alert.alert("Error", "All options are required");
        return;
      }

      if (!choices.some((c) => c.correct)) {
        Alert.alert("Error", "Select the correct answer");
        return;
      }

      const payload: CreateQuestionRequest = {
        questionText: question,
        choices,
      };

      await createQuestion(payload);

      Alert.alert("Success", "Question created successfully");

      resetForm();
    } catch (error) {
      console.log("Create question error:", error);
      Alert.alert("Error", "Failed to create question");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Question</Text>

      <TextInput
        placeholder="Question"
        value={question}
        onChangeText={setQuestion}
        style={styles.input}
      />

      <Text style={styles.section}>Choices</Text>

      {choices.map((choice, index) => (
        <View key={index} style={styles.choiceRow}>
          <TextInput
            placeholder={`Option ${index + 1}`}
            value={choice.choiceText}
            onChangeText={(text) => setChoiceText(index, text)}
            style={styles.choiceInput}
          />

          <Pressable
            style={[
              styles.radio,
              choice.correct && styles.radioSelected,
            ]}
            onPress={() => setCorrect(index)}
          >
            {choice.correct && <View style={styles.radioDot} />}
          </Pressable>
        </View>
      ))}

      <Text style={styles.help}>
        Tap circle to mark correct answer
      </Text>

      <Pressable
        style={[
          styles.button,
          loading && { opacity: 0.6 },
        ]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            Submit Question
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8FAFC",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 15,
  },
  section: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  choiceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  choiceInput: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#2563EB",
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: {
    borderColor: "#2563EB",
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#2563EB",
  },
  help: {
    marginTop: 10,
    fontSize: 12,
    color: "#6B7280",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#22C55E",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});