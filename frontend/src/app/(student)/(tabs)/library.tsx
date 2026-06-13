import { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Pressable, FlatList, ActivityIndicator } from "react-native";
import { AuthContext } from "../../../store/AuthContext";
import { getCompletedQuestions } from "../../../services/question.service";
import { LibraryQuestionResponse } from "../../../types/question";

export default function Library() {
  const { authState } = useContext(AuthContext);
  const [questions, setQuestions] = useState<LibraryQuestionResponse[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCompleted();
  }, []);

  const fetchCompleted = async () => {
    try {
      setLoading(true);
      const data = await getCompletedQuestions(authState.token!);
      setQuestions(data);
    } finally {
      setLoading(false);
    }
  };

  const toggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderItem = ({ item }: { item: LibraryQuestionResponse }) => {
    const expanded = expandedId === item.id;
    return (
      <View style={styles.card}>
        <Pressable onPress={() => toggle(item.id)}>
          <Text style={styles.title}>{item.questionText}</Text>
        </Pressable>
        {expanded && (
          <View style={styles.choices}>
            {item.choices.map((c) => (
              <Text key={c.id} style={[styles.choice, c.correct && styles.correct]}>
                {c.choiceText} {c.correct ? "✔" : ""}
              </Text>
            ))}
          </View>
        )}
      </View>
    );
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Library</Text>
      <FlatList
        data={questions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  choices: {
    marginTop: 10,
    gap: 5,
  },
  choice: {
    fontSize: 14,
    color: "#374151",
  },
  correct: {
    color: "#22C55E",
    fontWeight: "700",
  },
});