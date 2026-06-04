import { useState, useContext } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { login as loginService } from "../../services/auth.service";
import { AuthContext } from "../../store/AuthContext";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      // 🔌 call backend
      const response = await loginService(email, password);

      // 💾 save session
      await login(response);

      // 🚀 redirect by role
      if (response.user.role === "STUDENT") {
        router.replace("/(student)/(tabs)/home");
      } else {
        router.replace("/(teacher)/(tabs)/home");
      }
    } catch (err) {
      setError("Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AutoTest</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button
        title={loading ? "Logging in..." : "Login"}
        onPress={handleLogin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});