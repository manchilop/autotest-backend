import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";

export default function Library() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const approved = [
    {
      id: 1,
      questionText: "What is Java?",
      choices: [
        { choiceText: "Language", isCorrect: true },
        { choiceText: "Database", isCorrect: false },
      ],
    },
  ];

  const rejected = [
    {
      id: 2,
      questionText: "2 + 2 = ?",
      choices: [
        { choiceText: "5", isCorrect: true },
        { choiceText: "4", isCorrect: false },
      ],
    },
  ];

  const renderQuestion = (question: any) => (
    <Pressable
      key={question.id}
      style={styles.card}
      onPress={() =>
        setExpandedId(
          expandedId === question.id ? null : question.id
        )
      }
    >
      <Text style={styles.question}>
        {question.questionText}
      </Text>

      {expandedId === question.id && (
        <View style={styles.choices}>
          {question.choices.map((choice: any, index: number) => (
            <Text
              key={index}
              style={
                choice.isCorrect
                  ? styles.correctChoice
                  : styles.choice
              }
            >
              {choice.choiceText}
            </Text>
          ))}
        </View>
      )}
    </Pressable>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Approved Questions</Text>

      {approved.map(renderQuestion)}

      <Text style={styles.title}>Rejected Questions</Text>

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
});