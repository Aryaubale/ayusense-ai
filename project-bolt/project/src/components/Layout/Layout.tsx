import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import ShlokaBanner from "../ShlokaBanner";
import { Sidebar } from "./Sidebar"; // ✅ IMPORTANT: use your sidebar

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { i18n } = useTranslation();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f7f4ee]">

      {/* ✅ SIDEBAR (FIXED) */}
      <Sidebar />

      {/* ✅ MAIN CONTENT */}
      <div className="flex-1 flex flex-col ml-64 overflow-hidden">

        {/* 🔝 TOP BAR */}
        <header className="h-14 flex items-center justify-between px-6 border-b bg-white shadow-sm">

          {/* Page Title */}
          <span className="text-sm font-semibold text-gray-600 capitalize">
            {location.pathname.replace("/", "") || "dashboard"}
          </span>

          {/* Right Actions */}
          <div className="flex items-center gap-4">

            {/* 🌐 Language */}
            <button
              onClick={() =>
                i18n.changeLanguage(i18n.language === "en" ? "hi" : "en")
              }
              className="text-sm text-gray-500 hover:text-gray-900 transition"
            >
              🌐 {i18n.language === "en" ? "हिंदी" : "English"}
            </button>

            {/* 👤 Profile */}
            <button
              onClick={() => navigate("/profile")}
              className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold"
            >
              {user?.name?.charAt(0)?.toUpperCase()}
            </button>
          </div>
        </header>

        {/* 📜 SHLOKA */}
        <ShlokaBanner />

        {/* 📦 PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto px-6 py-6">
          {children}
        </main>

      </div>
    </div>
  );
};

export default Layout;