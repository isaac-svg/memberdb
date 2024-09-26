"use client";
import { verifyPassword } from "@/lib/auth";
import { addUser, getUser, isUserSignedUp } from "@/models/db";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);

  useEffect(() => {
    const checkUserSignedUp = async () => {
      const signedUp = await isUserSignedUp();
      setIsSignedUp(signedUp);
    };
    checkUserSignedUp();
  }, []);

  const login = async (username: string, password: string) => {
    const user = await getUser(username);
    if (user && (await verifyPassword(password, user.password))) {
      setUser(username);
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const signup = async (username: string, password: string) => {
    await addUser(username, password);
    setUser(username);
    setIsSignedUp(true);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
