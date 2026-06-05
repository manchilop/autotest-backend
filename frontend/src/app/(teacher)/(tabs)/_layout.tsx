import { Tabs } from "expo-router";

export default function TeacherTabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="reviews" options={{ title: "Reviews" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}