import { Redirect } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";

export default function Index() {
  const { authState, loading } = useContext(AuthContext);

  if (loading) {
    return null;
  }

  if (!authState.token) {
    return <Redirect href="/(auth)/login" />;
  }

  if (authState.user?.role === "STUDENT") {
    return <Redirect href="/(student)/(tabs)/home" />;
  }

  return <Redirect href="/(teacher)/(tabs)/home" />;
}