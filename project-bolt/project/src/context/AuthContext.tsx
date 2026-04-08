import React, { createContext, useContext, useState, useEffect } from "react";

// 🏷️ 1. Updated User Interface with new demographic fields and Reminders
interface User {
  _id: string;
  name: string;
  email: string;
  age?: string;
  gender?: string;
  occupation?: string;
  location?: string;
  prakriti?: string;
  stats?: any;
  reminders?: {
    brahmaMuhurta: boolean;
    dinacharya: boolean;
    herbReminder: boolean;
  };
}

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (
    name: string, 
    email: string, 
    password: string, 
    age: string, 
    gender: string, 
    occupation: string, 
    location: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUserPrakriti: (prakritiData: any) => void;
  // 🆕 Added to types
  updateUserReminders: (remindersData: any) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:5000/api";

  useEffect(() => {
    const storedUser = localStorage.getItem("ayusense_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("ayusense_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem("ayusense_user", JSON.stringify(data.user));
        return { success: true };
      }
      return { success: false, error: data.error || "Invalid credentials" };
    } catch (err) {
      return { success: false, error: "Cannot connect to server. Is Flask running?" };
    }
  };

  const signup = async (name, email, password, age, gender, occupation, location) => {
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          email, 
          password, 
          age, 
          gender, 
          occupation, 
          location 
        }),
      });

      const data = await response.json();
      if (data.success) {
        return { success: true };
      }
      return { success: false, error: data.error || "Signup failed" };
    } catch (err) {
      return { success: false, error: "Cannot connect to server. Is Flask running?" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ayusense_user");
  };

  const updateUserPrakriti = (prakritiData: any) => {
    if (user) {
      const updatedUser = { ...user, ...prakritiData };
      setUser(updatedUser);
      localStorage.setItem("ayusense_user", JSON.stringify(updatedUser));
    }
  };

  // 🆕 3. Added New Function for Reminders
  const updateUserReminders = (remindersData: any) => {
    if (user) {
      const updatedUser = { ...user, reminders: remindersData };
      setUser(updatedUser);
      localStorage.setItem("ayusense_user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        login, 
        signup, 
        logout, 
        updateUserPrakriti, 
        updateUserReminders // 🆕 Exported here
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};