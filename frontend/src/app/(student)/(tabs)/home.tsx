import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../store/AuthContext";
import { getCompletedQuestions } from "../../../services/question.service";

export default function Home() {
  const { authState } = useContext(AuthContext);
  const name = authState.user?.email?.split("@")[0] || "Student";
  const [answeredCount, setAnsweredCount] = useState<number | null>(null);

  useEffect(() => {
    getCompletedQuestions()
      .then((data) => setAnsweredCount(data.length))
      .catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Welcome back,</Text>
      <Text style={styles.name}>{name} 👋</Text>
      <Text style={styles.subtitle}>What do you want to do today?</Text>

      <View style={styles.statRow}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Questions answered</Text>
          <Text style={[styles.statValue, styles.purple]}>
            {answeredCount ?? "—"}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Quick actions</Text>

      <Pressable style={styles.actionBtn} onPress={() => router.push("/(student)/(tabs)/practice")}>
        <View style={[styles.actionIcon, styles.iconPurple]}>
          <Text style={styles.iconText}>🧠</Text>
        </View>
        <View style={styles.actionContent}>
          <Text style={styles.actionLabel}>Practice questions</Text>
          <Text style={styles.actionSub}>Train with questions from the platform</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </Pressable>

      <Pressable style={styles.actionBtn} onPress={() => router.push("/(student)/(tabs)/create")}>
        <View style={[styles.actionIcon, styles.iconAmber]}>
          <Text style={styles.iconText}>✏️</Text>
        </View>
        <View style={styles.actionContent}>
          <Text style={styles.actionLabel}>Create question</Text>
          <Text style={styles.actionSub}>Contribute new questions to the system</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </Pressable>

      <Pressable style={styles.actionBtn} onPress={() => router.push("/(student)/(tabs)/library")}>
        <View style={[styles.actionIcon, styles.iconTeal]}>
          <Text style={styles.iconText}>📚</Text>
        </View>
        <View style={styles.actionContent}>
          <Text style={styles.actionLabel}>My library</Text>
          <Text style={styles.actionSub}>Review your answered questions</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC", padding: 20 },
  greeting: { fontSize: 13, color: "#6B7280", marginTop: 20 },
  name: { fontSize: 22, fontWeight: "700", color: "#111827", marginBottom: 6 },
  subtitle: { fontSize: 14, color: "#6B7280", marginBottom: 24 },
  statRow: { flexDirection: "row", gap: 10, marginBottom: 24 },
  stat: { flex: 1, backgroundColor: "#F3F4F6", borderRadius: 10, padding: 14 },
  statLabel: { fontSize: 12, color: "#6B7280", marginBottom: 4 },
  statValue: { fontSize: 24, fontWeight: "700" },
  purple: { color: "#534AB7" },
  teal: { color: "#0F6E56" },
  sectionTitle: { fontSize: 12, fontWeight: "600", color: "#6B7280", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 },
  actionBtn: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 12, padding: 14, flexDirection: "row", alignItems: "center", marginBottom: 8 },
  actionIcon: { width: 36, height: 36, borderRadius: 8, alignItems: "center", justifyContent: "center", marginRight: 12 },
  iconPurple: { backgroundColor: "#EEEDFE" },
  iconAmber: { backgroundColor: "#FAEEDA" },
  iconTeal: { backgroundColor: "#E1F5EE" },
  iconText: { fontSize: 18 },
  actionContent: { flex: 1 },
  actionLabel: { fontSize: 15, fontWeight: "600", color: "#111827" },
  actionSub: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  chevron: { fontSize: 20, color: "#9CA3AF" },
});