import { View, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";

export default function Home() {
  const pendingQuestions = 14;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello Teacher</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          You have {pendingQuestions} pending questions to review
        </Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/(teacher)/(tabs)/review")}
      >
        <Text style={styles.buttonText}>Review Questions</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/(teacher)/(tabs)/library")}
      >
        <Text style={styles.buttonText}>Question Library</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/(teacher)/(tabs)/profile")}
      >
        <Text style={styles.buttonText}>Profile</Text>
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
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});