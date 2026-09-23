import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Platform } from "react-native";

const api = axios.create({
  // Ajuste para que funcione en emuladores de Android y iOS/Web
  baseURL: Platform.OS === 'android' ? "http://10.0.2.2:8080" : "http://192.168.1.251:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 REQUEST INTERCEPTOR → attach JWT
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🚨 RESPONSE INTERCEPTOR → handle auth errors globally
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // clear session
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("expiresIn");

      // redirect to login
      router.replace("/(auth)/login");
    }

    return Promise.reject(error);
  }
);

export default api;