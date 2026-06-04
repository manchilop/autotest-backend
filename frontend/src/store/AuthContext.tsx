import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthState, LoginResponse } from "../types/auth";
import { User } from "../types/user";

interface AuthContextType {
  authState: AuthState;
  login: (data: LoginResponse) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(null as any);

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    expiresIn: null,
    user: null,
  });

  // 🔄 Load session on app start
  useEffect(() => {
    loadStorage();
  }, []);

  const loadStorage = async () => {
    const token = await AsyncStorage.getItem("token");
    const user = await AsyncStorage.getItem("user");
    const expiresIn = await AsyncStorage.getItem("expiresIn");

    if (token && user && expiresIn) {
      setAuthState({
        token,
        user: JSON.parse(user),
        expiresIn: Number(expiresIn),
      });
    }
  };

  // 🔐 LOGIN
  const login = async (data: LoginResponse) => {
    const newState: AuthState = {
      token: data.token,
      user: data.user,
      expiresIn: data.expiresIn,
    };

    setAuthState(newState);

    await AsyncStorage.setItem("token", data.token);
    await AsyncStorage.setItem("user", JSON.stringify(data.user));
    await AsyncStorage.setItem("expiresIn", String(data.expiresIn));
  };

  // 🚪 LOGOUT
  const logout = async () => {
    setAuthState({
      token: null,
      user: null,
      expiresIn: null,
    });

    await AsyncStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};