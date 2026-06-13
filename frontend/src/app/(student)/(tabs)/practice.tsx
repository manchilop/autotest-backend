import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../../../store/AuthContext";
import { getNextQuestion, answerQuestion } from "../../../services/question.service";
import { QuestionResponse } from "../../../types/question";

export default function PracticeScreen() {
  const { authState } = useContext(AuthContext);
  const token = authState.token!;

  const [question, setQuestion] = useState<QuestionResponse | null>(null);
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
      const data = await getNextQuestion(token);
      setQuestion(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (choiceId: number) => {
    if (selectedChoice !== null) return; // ya respondió
    setSelectedChoice(choiceId);
    try {
      const data = await answerQuestion(question!.id, choiceId, token);
      setCorrect(data.correct);
    } catch (e) {
      console.error(e);
    }
  };

  const getChoiceStyle = (choiceId: number) => {
    if (selectedChoice === null) return styles.choice;
    if (choiceId === selectedChoice) {
      return [styles.choice, correct ? styles.correct : styles.incorrect];
    }
    return styles.choice;
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
        <Text>No hay preguntas disponibles</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.questionText}</Text>

      <View style={styles.choices}>
        {question.choices.map((choice) => (
          <TouchableOpacity
            key={choice.id}
            style={getChoiceStyle(choice.id)}
            onPress={() => handleAnswer(choice.id)}
          >
            <Text style={styles.choiceText}>{choice.choiceText}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedChoice !== null && (
        <View style={styles.feedback}>
          <Text style={correct ? styles.feedbackCorrect : styles.feedbackIncorrect}>
            {correct ? "¡Correcto! 🎉" : "Incorrecto 😞"}
          </Text>
          <TouchableOpacity style={styles.nextButton} onPress={fetchNext}>
            <Text style={styles.nextButtonText}>Siguiente →</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 10,
  },
  choices: {
    gap: 12,
  },
  choice: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 16,
  },
  correct: {
    borderColor: "#22c55e",
    backgroundColor: "#dcfce7",
  },
  incorrect: {
    borderColor: "#ef4444",
    backgroundColor: "#fee2e2",
  },
  choiceText: {
    fontSize: 16,
  },
  feedback: {
    alignItems: "center",
    gap: 12,
    marginTop: 10,
  },
  feedbackCorrect: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#22c55e",
  },
  feedbackIncorrect: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ef4444",
  },
  nextButton: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 10,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});