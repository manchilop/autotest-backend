import { View, Text, StyleSheet, Pressable } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../../store/AuthContext";
import { router } from "expo-router";

export default function Profile() {
  const { authState, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <Text>Email: {authState.user?.email}</Text>
      <Text>Role: {authState.user?.role}</Text>

      <Pressable style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
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
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#EF4444",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});