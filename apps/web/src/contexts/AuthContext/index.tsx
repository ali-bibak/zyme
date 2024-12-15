import type React from "react";
import { type ReactNode, createContext, useEffect, useState } from "react";
import {
  isTokenAvailable,
  removeToken,
  setToken,
} from "../../utils/tokenUtils";

export type Role = "ADMIN" | "USER" | "GUEST";
export interface AuthContextType {
  isAuthenticated: boolean;
  userRoles: Role[];
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    isTokenAvailable(),
  );

  const login = (token: string) => {
    setToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    setIsAuthenticated(isTokenAvailable());
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userRoles: ["USER"], login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
