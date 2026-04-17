import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  AcademicCapIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import WelcomePopup from "../components/WelcomePopup";

// 🎥 1. IMPORT YOUR VIDEO HERE
import pillarVideo from "../assets/Video_anim.mp4";

// 🌿 Import the aesthetic CSS
import "./Dashboard.css";

const API_URL = "http://localhost:5000/api";

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [recentChats, setRecentChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

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
      if (!user?.email) return;
      const res = await fetch(`${API_URL}/chat_history?email=${user.email}`);
      const data = await res.json();
      if (data.success) {
        setRecentChats(
          data.history
            .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
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
      <div className="flex items-center justify-center min-h-screen bg-[#fdfbf7]">
        <div className="w-10 h-10 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#fdfbf7] min-h-screen font-sans text-gray-900 overflow-x-hidden">
      {showPopup && (
        <WelcomePopup
          onClose={() => {
            localStorage.setItem("seenWelcome", "true");
            setShowPopup(false);
          }}
        />
      )}

      {/* 🌿 HERO SECTION */}
      <section className="relative px-10 py-20 flex flex-col md:flex-row items-center gap-12 overflow-hidden animate-reveal">
        <div className="z-10 flex-1">
          <span className="text-green-700 font-medium tracking-widest uppercase text-xs mb-4 block">Modern Wellness</span>
          <h1 className="text-6xl md:text-7xl font-serif text-[#1a2e1a] leading-[1.1]">
            Ancient Wisdom, <br />
            <span className="italic font-light">Digital Soul.</span>
          </h1>
          <p className="mt-8 text-lg text-gray-600 max-w-lg leading-relaxed font-sans">
            Your personalized guide to Ayurveda. Discover your Prakriti and heal naturally in a modern world.
          </p>
          <div className="mt-10 flex gap-4">
            <button
              onClick={() => navigate("/prakriti")}
              className="bg-[#1a2e1a] text-white px-8 py-4 rounded-full flex items-center gap-2 hover:bg-green-900 transition-all shadow-xl font-sans"
            >
              Get Started <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 relative w-full">
           <div className="absolute -top-10 -right-10 w-64 h-64 bg-blur-green opacity-50" />
           <img
             src="/src/assets/hero.jfif"
             className="rounded-[2.5rem] w-full h-[500px] object-cover shadow-2xl grayscale-[20%] hover:grayscale-0 transition-all duration-700"
             alt="Ayurveda Aesthetic"
           />
        </div>
      </section>

      {/* 🎥 VIDEO SECTION (USING THE IMPORTED VIDEO) */}
      <section className="px-10 py-24 bg-[#f4f1ea]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 w-full group video-zoom-container">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[9/16] md:aspect-video bg-gray-200">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="w-full h-full object-cover scale-105 transition-transform duration-1000"
              >
                {/* 🌿 2. USE THE IMPORTED VARIABLE HERE */}
                <source src={pillarVideo} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500" />
            </div>
          </div>
          
          <div className="flex-1">
             <h3 className="text-green-800 font-sans font-semibold mb-4 text-sm tracking-widest">THE 4 PILLARS</h3>
             <h2 className="text-4xl md:text-5xl font-serif text-[#1a2e1a] mb-6 italic">
               "Ayurveda was never out of trend."
             </h2>
             <p className="text-gray-600 font-sans text-lg mb-8 leading-relaxed">
               Health isn't a temporary goal; it's a foundation built on Aahara, Nidra, Brahmacharya, and Vihara.
             </p>
             <div className="grid grid-cols-2 gap-6">
                {['Aahara', 'Nidra', 'Vihara', 'Energy'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-[#1a2e1a] font-sans font-medium border-b border-gray-300 pb-2">
                    <SparklesIcon className="w-4 h-4 text-green-600" /> {item}
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* 🧩 BENTO ACTIONS */}
      <section className="px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <div 
            onClick={() => navigate("/chat")}
            className="md:col-span-2 group relative overflow-hidden bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer"
          >
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-green-50 rounded-full group-hover:scale-150 transition-transform duration-700" />
            <ChatBubbleLeftRightIcon className="w-10 h-10 text-green-800 mb-6" />
            <h3 className="text-2xl font-serif text-gray-800">AI Consultation</h3>
            <p className="text-gray-500 font-sans mt-2">Chat with our intelligence trained on ancient texts.</p>
          </div>

          <div 
            onClick={() => navigate("/prakriti")}
            className="group bg-[#1a2e1a] rounded-[2rem] p-8 text-white flex flex-col justify-between hover:bg-green-950 transition-all cursor-pointer shadow-lg"
          >
            <AcademicCapIcon className="w-8 h-8 opacity-50" />
            <div>
              <h3 className="text-xl font-sans font-medium">Analyze Prakriti</h3>
              <p className="text-sm opacity-60 mt-2 font-sans">Know your Dosha</p>
            </div>
          </div>

          <div 
            onClick={() => navigate("/consult-vaidya")}
            className="group bg-[#e8dfcf] rounded-[2rem] p-8 flex flex-col justify-between hover:bg-[#dfd4c0] transition-all cursor-pointer border border-gray-200"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
               <ArrowRightIcon className="w-4 h-4 text-gray-800" />
            </div>
            <h3 className="text-xl font-sans font-medium text-gray-800">Book a Vaidya</h3>
          </div>
        </div>
      </section>

      {/* 💬 RECENT CONVERSATIONS */}
      <section className="px-10 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-sans font-semibold uppercase tracking-widest text-gray-400">Journal</h3>
            <button className="text-xs font-sans text-green-700 font-bold border-b border-green-700">View All</button>
          </div>
          
          <div className="space-y-4">
            {recentChats.length > 0 ? (
              recentChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => navigate("/chat")}
                  className="group bg-white p-6 rounded-2xl border border-gray-100 flex items-center justify-between hover:border-green-200 transition-all cursor-pointer shadow-sm hover:shadow-md"
                >
                  <span className="text-gray-700 font-sans truncate max-w-md">{chat.message}</span>
                  <span className="text-xs font-sans text-gray-400 group-hover:text-green-600 transition-colors">Open Chat →</span>
                </div>
              ))
            ) : (
              <div className="bg-white/50 border border-dashed border-gray-200 p-12 rounded-3xl text-center text-gray-400 font-sans">
                Begin your healing journey to see history here 🌿
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;