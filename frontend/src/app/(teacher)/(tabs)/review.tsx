import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";

import {
  getPendingQuestions,
  approveQuestion,
  rejectQuestion,
} from "../../../services/question.service";

import { LibraryQuestionResponse } from "../../../types/question";

export default function Review() {
  const [questions, setQuestions] = useState<LibraryQuestionResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const data = await getPendingQuestions();
      setQuestions(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const currentQuestion = questions[0];

  const removeCurrentQuestion = () => {
    setQuestions((prev) => prev.slice(1));
  };

  const handleApprove = async () => {
    if (!currentQuestion) return;

    try {
      await approveQuestion(currentQuestion.id);
      removeCurrentQuestion();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async () => {
    if (!currentQuestion) return;

    try {
      await rejectQuestion(currentQuestion.id);
      removeCurrentQuestion();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSkip = () => {
    if (!currentQuestion) return;

    setQuestions((prev) => [
      ...prev.slice(1),
      prev[0],
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!currentQuestion) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyTitle}>
          No pending questions
        </Text>

        <Text style={styles.emptySubtitle}>
          All questions have been reviewed.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Review Questions
      </Text>

      <View style={styles.card}>
        <Text style={styles.question}>
          {currentQuestion.questionText}
        </Text>

        <View style={styles.choices}>
          {currentQuestion.choices.map(
            (choice, index) => (
              <View
                key={index}
                style={styles.choice}
              >
                <Text
                  style={
                    choice.correct
                      ? styles.correctChoice
                      : styles.choiceText
                  }
                >
                  {choice.choiceText}
                </Text>
              </View>
            )
          )}
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={[
            styles.button,
            styles.rejectButton,
          ]}
          onPress={handleReject}
        >
          <Text style={styles.buttonText}>
            Reject
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.button,
            styles.skipButton,
          ]}
          onPress={handleSkip}
        >
          <Text style={styles.buttonText}>
            Skip
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.button,
            styles.approveButton,
          ]}
          onPress={handleApprove}
        >
          <Text style={styles.buttonText}>
            Approve
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },

  question: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },

  choices: {
    gap: 10,
  },

  choice: {
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 8,
  },

  choiceText: {
    fontSize: 16,
  },

  correctChoice: {
    fontSize: 16,
    color: "#16A34A",
    fontWeight: "700",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    gap: 10,
  },

  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  rejectButton: {
    backgroundColor: "#DC2626",
  },

  skipButton: {
    backgroundColor: "#6B7280",
  },

  approveButton: {
    backgroundColor: "#16A34A",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
  },

  emptySubtitle: {
    marginTop: 10,
    color: "#6B7280",
  },
});