import { useContext } from "react";
import { Button } from "react-native";
import { router } from "expo-router";
import { AuthContext } from "../../../store/AuthContext";

export default function ProfileScreen() {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  return <Button title="Logout" onPress={handleLogout} />;
}