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

  const renderQuestion = (question: QuestionResponse) => (
    <Pressable
      key={question.id}
      style={styles.card}
      onPress={() =>
        setExpandedId(expandedId === question.id ? null : question.id)
      }
    >
      <Text style={styles.question}>{question.questionText}</Text>

      {expandedId === question.id && (
        <View style={styles.choices}>
          {question.choices.map((choice) => (
            <Text
              key={choice.id}
              style={choice.correct ? styles.correctChoice : styles.choice}
            >
              {choice.choiceText}
            </Text>
          ))}
        </View>
      )}
    </Pressable>
  );

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Approved Questions</Text>
      {approved.length === 0 && <Text style={styles.empty}>No approved questions</Text>}
      {approved.map(renderQuestion)}

      <Text style={styles.title}>Rejected Questions</Text>
      {rejected.length === 0 && <Text style={styles.empty}>No rejected questions</Text>}
      {rejected.map(renderQuestion)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8FAFC",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
    marginTop: 15,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  question: {
    fontWeight: "600",
  },
  choices: {
    marginTop: 10,
  },
  choice: {
    paddingVertical: 4,
  },
  correctChoice: {
    paddingVertical: 4,
    color: "green",
    fontWeight: "700",
  },
  empty: {
    color: "#9CA3AF",
    marginBottom: 10,
  },
});