import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import WelcomePopup from "../components/WelcomePopup";

const API_URL = "http://localhost:5000/api";

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [recentChats, setRecentChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (user) {
      loadDashboardData();
      if (!localStorage.getItem("seenWelcome")) {
        setTimeout(() => setShowPopup(true), 600);
      }
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      const res = await fetch(`${API_URL}/chat_history?email=${user?.email}`);
      const data = await res.json();
      if (data.success) {
        setRecentChats(
          data.history
            .sort(
              (a: any, b: any) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
            .slice(0, 3)
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f3efe7]">
        <div className="w-10 h-10 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#f3efe7] min-h-screen">

      {/* 🌿 POPUP */}
      {showPopup && (
        <WelcomePopup
          onClose={() => {
            localStorage.setItem("seenWelcome", "true");
            setShowPopup(false);
          }}
        />
      )}

      {/* 🌿 HERO (ONLY CHANGE = BEIGE BACKGROUND) */}
      <section className="grid md:grid-cols-2 gap-10 px-10 py-12 items-center bg-[#e8dfcf]">

        {/* LEFT */}
        <div>
          <h1 className="text-5xl md:text-6xl font-bold text-green-900 leading-tight">
            Natural Healing <br /> with Ayurveda
          </h1>

          <p className="mt-6 text-lg text-[#7a4b2c] max-w-xl">
            Discover the ancient wisdom of Ayurveda with personalized insights,
            herbs, and natural wellness solutions.
          </p>

          <button
            onClick={() => navigate("/prakriti")}
            className="mt-8 bg-green-700 text-white px-6 py-3 rounded-xl"
          >
            Explore →
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <img
            src="/src/assets/hero.jfif"
            className="rounded-3xl w-full h-[380px] object-cover"
          />

          {/* ✅ BADGE */}
          <div className="absolute bottom-5 left-5 bg-white rounded-xl px-4 py-3 shadow-lg flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
              ✔
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">
                Doctor Verified
              </p>
              <p className="text-xs text-gray-500">
                Trusted Ayurvedic Guidance
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* 🔥 QUICK ACTIONS */}
      <section className="px-6 mt-12 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">

          {/* 🟢 CARD 1 */}
          <div
            onClick={() => navigate("/chat")}
            className="rounded-2xl p-5 h-[150px] flex flex-col justify-between text-white cursor-pointer hover:scale-[1.02] transition"
            style={{
              background: "#8a8f5a", // olive
            }}
          >
            <ChatBubbleLeftRightIcon className="w-6 h-6 opacity-80" />
            <h3 className="text-sm font-semibold">
              AI Consultation
            </h3>
          </div>

          {/* ⚫ CARD 2 */}
          <div
            onClick={() => navigate("/consult-vaidya")}
            className="rounded-2xl p-5 h-[150px] flex flex-col justify-between text-white cursor-pointer hover:scale-[1.02] transition"
            style={{
              background: "#2f3221", // dark
            }}
          >
            <UserGroupIcon className="w-6 h-6 opacity-80" />
            <h3 className="text-sm font-semibold">
              Book a Vaidya
            </h3>
          </div>

          {/* 🟢 CARD 3 */}
          <div
            onClick={() => navigate("/prakriti")}
            className="rounded-2xl p-5 h-[150px] flex flex-col justify-between text-white cursor-pointer hover:scale-[1.02] transition"
            style={{
              background: "#4b4f2f", // darker olive variation
            }}
          >
            <DocumentTextIcon className="w-6 h-6 opacity-80" />
            <h3 className="text-sm font-semibold">
              Ayurveda Basics
            </h3>
          </div>

        </div>
      </section>

      {/* 💬 RECENT CHATS */}
      <section className="px-10 pt-16 pb-16">
        <p className="text-xs uppercase text-gray-500 mb-4">
          {t("recentChats")}
        </p>

        <div className="bg-white rounded-2xl shadow-sm border">
          {recentChats.length > 0 ? (
            recentChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => navigate("/chat")}
                className="p-4 border-b hover:bg-gray-50 cursor-pointer"
              >
                {chat.message}
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No conversations yet 🌿
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default Dashboard;