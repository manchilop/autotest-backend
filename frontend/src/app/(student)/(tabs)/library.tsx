import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";

type Question = {
  id: number;
  text: string;
  choices: {
    text: string;
    isCorrect: boolean;
  }[];
};

const mockData: Question[] = [
  {
    id: 1,
    text: "What is polymorphism?",
    choices: [
      { text: "Option A", isCorrect: false },
      { text: "Option B", isCorrect: false },
      { text: "Option C", isCorrect: true },
      { text: "Option D", isCorrect: false },
    ],
  },
  {
    id: 2,
    text: "What is HTTP?",
    choices: [
      { text: "Protocol", isCorrect: true },
      { text: "Language", isCorrect: false },
      { text: "Database", isCorrect: false },
      { text: "OS", isCorrect: false },
    ],
  },
];

export default function Library() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderItem = ({ item }: { item: Question }) => {
    const expanded = expandedId === item.id;

    return (
      <View style={styles.card}>
        <Pressable onPress={() => toggle(item.id)}>
          <Text style={styles.title}>{item.text}</Text>
        </Pressable>

        {expanded && (
          <View style={styles.choices}>
            {item.choices.map((c, i) => (
              <Text
                key={i}
                style={[
                  styles.choice,
                  c.isCorrect && styles.correct,
                ]}
              >
                {c.text} {c.isCorrect ? "✔" : ""}
              </Text>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Library</Text>

      <FlatList
        data={mockData}
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