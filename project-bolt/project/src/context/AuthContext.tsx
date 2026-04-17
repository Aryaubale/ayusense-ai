import React, { createContext, useContext, useState, useEffect } from "react";

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
  login: (email: string, password: string) => Promise<any>;
  signup: (name: string, email: string, password: string, age: string, gender: string, occupation: string, location: string) => Promise<any>;
  logout: () => void;
  updateUserPrakriti: (data: any) => void;
  updateUserReminders: (data: any) => void;

  // 🔥 OTP FLOW FUNCTIONS
  forgotPassword: (email: string) => Promise<any>;
  verifyOTP: (email: string, otp: string) => Promise<any>;
  resetPassword: (email: string, password: string) => Promise<any>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // In production (Render), this will change to your public URL
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

  // ================= LOGIN =================
  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem("ayusense_user", JSON.stringify(data.user));
      }
      return data;
    } catch {
      return { success: false, error: "Connection to server failed." };
    }
  };

  // ================= SIGNUP =================
  const signup = async (name: string, email: string, password: string, age: string, gender: string, occupation: string, location: string) => {
    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, age, gender, occupation, location }),
      });
      return await res.json();
    } catch {
      return { success: false, error: "Signup failed. Check your connection." };
    }
  };

  // ================= LOGOUT =================
  const logout = () => {
    setUser(null);
    localStorage.removeItem("ayusense_user");
  };

  // ================= UPDATE METHODS =================
  const updateUserPrakriti = (data: any) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem("ayusense_user", JSON.stringify(updated));
  };

  const updateUserReminders = (data: any) => {
    if (!user) return;
    const updated = { ...user, reminders: data };
    setUser(updated);
    localStorage.setItem("ayusense_user", JSON.stringify(updated));
  };

  // ================= 🔥 OTP FLOW (ENHANCED) =================

  const forgotPassword = async (email: string) => {
    try {
      const res = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      return await res.json();
    } catch (err) {
      return { success: false, error: "Could not send OTP. Try again later." };
    }
  };

  const verifyOTP = async (email: string, otp: string) => {
    try {
      const res = await fetch(`${API_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      return await res.json();
    } catch (err) {
      return { success: false, error: "Verification failed." };
    }
  };

  const resetPassword = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      return await res.json();
    } catch (err) {
      return { success: false, error: "Password update failed." };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      signup,
      logout,
      updateUserPrakriti,
      updateUserReminders,
      forgotPassword,
      verifyOTP,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};