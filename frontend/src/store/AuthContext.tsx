import React, { createContext, useEffect, useState, ReactNode} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthState, LoginResponse } from "../types/auth";

interface AuthContextType {
  authState: AuthState;
  loading: boolean;
  login: (data: LoginResponse) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    user: null,
    expiresIn: null,
  });

  const [loading, setLoading] = useState(true);

  // 🔄 Load session on app start
  useEffect(() => {
    loadStorage();
  }, []);

  const loadStorage = async () => {
    try {
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
    } catch (err) {
      console.log("Error loading auth state:", err);
    } finally {
      setLoading(false);
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

    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("expiresIn");
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};