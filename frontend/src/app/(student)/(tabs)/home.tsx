import { View, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../../../store/AuthContext";

export default function Home() {
  const { authState } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Text style={styles.title}>
        Hello, {authState.user?.email?.split("@")[0] || "Student"}
      </Text>

      <Text style={styles.subtitle}>
        What do you want to do today?
      </Text>

      {/* ACTIONS */}
      <View style={styles.cardContainer}>
        <Pressable
          style={styles.card}
          onPress={() => router.push("/(student)/(tabs)/practice")}
        >
          <Text style={styles.cardTitle}>Practice Questions</Text>
          <Text style={styles.cardText}>
            Train with questions from the platform
          </Text>
        </Pressable>

        <Pressable
          style={styles.card}
          onPress={() => router.push("/(student)/(tabs)/create")}
        >
          <Text style={styles.cardTitle}>Create Question</Text>
          <Text style={styles.cardText}>
            Contribute new questions to the system
          </Text>
        </Pressable>

        <Pressable
          style={styles.card}
          onPress={() => router.push("/(student)/(tabs)/library")}
        >
          <Text style={styles.cardTitle}>My Library</Text>
          <Text style={styles.cardText}>
            Review your answered questions
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
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 20,
  },
  cardContainer: {
    gap: 15,
  },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  cardText: {
    fontSize: 13,
    color: "#6B7280",
  },
});