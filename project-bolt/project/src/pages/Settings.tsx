import React, { useState, useEffect } from "react";
import { 
  UserCircleIcon, 
  BellIcon, 
  ShieldCheckIcon, 
  SparklesIcon, 
  ArrowPathIcon 
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

export const Settings = () => {
  const navigate = useNavigate();
  const { user, updateUserReminders } = useAuth();
  const [prakritiResult, setPrakritiResult] = useState<string>("Not Analyzed");

  // 🧬 Logic to calculate Dual-Dosha from Stats
  useEffect(() => {
    // 1. Try to get stats from user object (Best practice)
    const stats = user?.stats;
    
    // 2. Fallback to localStorage if state is refreshing
    const backupStats = JSON.parse(localStorage.getItem('ayusense_last_prakriti') || '{}')?.stats;
    
    const finalStats = stats || backupStats;

    if (finalStats && Object.keys(finalStats).length > 0) {
      // Sort doshas by percentage
      const sorted = Object.entries(finalStats)
        .sort(([, a], [, b]) => (b as number) - (a as number));
      
      const primary = sorted[0][0];
      const secondary = sorted[1][0];
      const primaryVal = sorted[0][1] as number;
      const secondaryVal = sorted[1][1] as number;

      // 🔥 DUAL-DOSHA LOGIC: If gap is less than 15%, show both
      const isDual = (primaryVal - secondaryVal) < 15;

      const formattedName = isDual 
        ? `${primary.charAt(0).toUpperCase() + primary.slice(1)}-${secondary.charAt(0).toUpperCase() + secondary.slice(1)}`
        : primary.charAt(0).toUpperCase() + primary.slice(1);

      setPrakritiResult(formattedName);
    } else if (user?.prakriti) {
      setPrakritiResult(user.prakriti);
    }
  }, [user]);

  // 🔔 Sync Toggles to MongoDB
  const handleToggle = async (id: string) => {
    if (!user) return;

    const currentReminders = user.reminders || {
      brahmaMuhurta: true,
      dinacharya: true,
      herbReminder: true,
    };

    const updatedReminders = {
      ...currentReminders,
      [id]: !currentReminders[id as keyof typeof currentReminders]
    };

    try {
      const response = await fetch('http://localhost:5000/api/update_reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          reminders: updatedReminders,
        }),
      });

      if (response.ok) {
        updateUserReminders(updatedReminders);
        toast.success("Preferences saved to cloud!");
      }
    } catch (err) {
      toast.error("Failed to sync settings");
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 px-4 md:px-8">
      
      {/* Header */}
      <div className="mb-10 p-6 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 inline-block">
        <h1 className="text-4xl font-bold text-amber-950 font-serif">Settings</h1>
        <p className="text-amber-900/80 font-medium italic">Your personalized Ayurvedic profile and controls.</p>
      </div>

      <div className="space-y-8">
        
        {/* Wellness Profile (Dual-Dosha Optimized) */}
        <section className="bg-white/80 backdrop-blur-lg p-8 rounded-[2.5rem] shadow-xl border border-amber-100/50 transition-all hover:shadow-2xl">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 bg-amber-100 rounded-lg">
              <UserCircleIcon className="w-6 h-6 text-amber-800" />
            </div>
            <h2 className="text-2xl font-bold text-amber-900">Wellness Profile</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-amber-50/50 rounded-2xl border border-amber-100">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">Current Prakriti</p>
              <p className="text-3xl font-black text-amber-950 tracking-tight">{prakritiResult}</p>
            </div>
            <button 
              onClick={() => navigate('/prakriti')}
              className="flex items-center justify-center space-x-3 p-6 border-2 border-dashed border-amber-300 rounded-2xl text-amber-800 hover:bg-amber-100 hover:border-amber-400 transition-all group"
            >
              <ArrowPathIcon className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
              <span className="font-bold uppercase text-sm">Retake AI Analysis</span>
            </button>
          </div>
        </section>

        {/* Dinacharya Reminders */}
        <section className="bg-white/80 backdrop-blur-lg p-8 rounded-[2.5rem] shadow-xl border border-green-100/50 transition-all">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 bg-green-100 rounded-lg">
              <BellIcon className="w-6 h-6 text-green-800" />
            </div>
            <h2 className="text-2xl font-bold text-amber-900">Dinacharya Reminders</h2>
          </div>
          
          <div className="divide-y divide-amber-100/50">
            {[
              { id: 'brahmaMuhurta', label: 'Brahma Muhurta (Early Wakeup)', desc: 'Notifications for the Sattva-rich 4:30 AM window.' },
              { id: 'dinacharya', label: 'Daily Dhyana', desc: 'Prompts for Agni ignition and mindful routine.' },
              { id: 'herbReminder', label: 'Herb Schedule', desc: 'Timing alerts for Triphala or Ashwagandha.' }
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between py-6 group">
                <div className="pr-4">
                  <p className="font-bold text-amber-950 text-lg">{item.label}</p>
                  <p className="text-sm text-amber-800/60 leading-relaxed max-w-xs">{item.desc}</p>
                </div>
                <button
                  onClick={() => handleToggle(item.id)}
                  className={`w-16 h-8 flex items-center rounded-full p-1 transition-all duration-300 ${
                    user?.reminders?.[item.id as keyof typeof user.reminders] ? "bg-green-600 shadow-lg" : "bg-gray-200"
                  }`}
                >
                  <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                    user?.reminders?.[item.id as keyof typeof user.reminders] ? "translate-x-8" : ""
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* AI Privacy */}
        <section className="bg-white/80 backdrop-blur-lg p-8 rounded-[2.5rem] shadow-xl border border-amber-100/50 transition-all">
          <div className="flex items-center space-x-3 mb-8">
             <div className="p-2 bg-amber-100 rounded-lg">
              <SparklesIcon className="w-6 h-6 text-amber-800" />
            </div>
            <h2 className="text-2xl font-bold text-amber-900">AI Vaidya & Privacy</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-amber-800 mb-2 ml-1">Response Depth</label>
              <select className="bg-amber-50/50 border border-amber-200 text-amber-950 font-bold rounded-xl p-4 outline-none transition-all focus:ring-2 focus:ring-green-500">
                <option>General Wellness (Simple)</option>
                <option>Detailed (Includes Sanskrit Terms)</option>
                <option>Scriptural (References Ayurveda Texts)</option>
              </select>
            </div>

            <button className="w-full text-center px-4 py-4 rounded-2xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-bold flex items-center justify-center space-x-2 border border-red-100">
              <ShieldCheckIcon className="w-5 h-5" />
              <span>Clear AI Chat History</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};