import { View, Text, StyleSheet, Pressable } from "react-native";

export default function Practice() {
  return (
    <View style={styles.container}>
      <Text style={styles.counter}>Question 1 / 10</Text>

      <Text style={styles.question}>
        What is polymorphism in OOP?
      </Text>

      <View style={styles.options}>
        {["A", "B", "C", "D"].map((opt) => (
          <Pressable key={opt} style={styles.option}>
            <Text>{opt}. Option example</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Submit Answer</Text>
      </Pressable>

      <Text style={styles.feedback}> </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8FAFC",
  },
  counter: {
    color: "#6B7280",
    marginBottom: 10,
  },
  question: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },
  options: {
    gap: 10,
  },
  option: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  feedback: {
    marginTop: 20,
    fontSize: 16,
  },
});