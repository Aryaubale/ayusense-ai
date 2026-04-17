import React, { useState, useEffect } from "react";
import { 
  UserCircleIcon, 
  BellIcon, 
  SparklesIcon, 
  ArrowPathIcon 
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

type ReminderType = "brahmaMuhurta" | "dinacharya" | "herbReminder";

export const Settings = () => {
  const navigate = useNavigate();
  const { user, updateUserReminders } = useAuth();

  const [prakritiResult, setPrakritiResult] = useState<string>("Not Analyzed");

  // ✅ LOCAL STATE (FIX FOR TOGGLE ISSUE)
  const defaultReminders = {
    brahmaMuhurta: true,
    dinacharya: true,
    herbReminder: true,
  };

  const [reminders, setReminders] = useState(defaultReminders);

  // 🧬 Sync user reminders into local state
  useEffect(() => {
    if (user?.reminders) {
      setReminders(user.reminders);
    }
  }, [user]);

  // 🧬 Prakriti logic
  useEffect(() => {
    const stats = user?.stats;
    const backupStats = JSON.parse(localStorage.getItem('ayusense_last_prakriti') || '{}')?.stats;
    const finalStats = stats || backupStats;

    if (finalStats && Object.keys(finalStats).length > 0) {
      const sorted = Object.entries(finalStats)
        .sort(([, a], [, b]) => (b as number) - (a as number));

      const primary = sorted[0][0];
      const secondary = sorted[1][0];
      const primaryVal = sorted[0][1] as number;
      const secondaryVal = sorted[1][1] as number;

      const isDual = (primaryVal - secondaryVal) < 15;

      const format = (d: string) => d.charAt(0).toUpperCase() + d.slice(1);

      setPrakritiResult(
        isDual ? `${format(primary)}-${format(secondary)}` : format(primary)
      );
    } else if (user?.prakriti) {
      setPrakritiResult(user.prakriti);
    }
  }, [user]);

  // 🔔 FIXED TOGGLE (OPTIMISTIC UI)
  const handleToggle = async (id: ReminderType) => {
    if (!user) return;

    const updatedReminders = {
      ...reminders,
      [id]: !reminders[id],
    };

    // 🔥 instant UI update
    setReminders(updatedReminders);

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
      } else {
        toast.error("Failed to update settings");
      }
    } catch (err) {
      toast.error("Server error while updating");
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 px-4 md:px-8">

      {/* HEADER */}
      <div className="mb-10 p-6 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 inline-block">
        <h1 className="text-4xl font-bold text-amber-950 font-serif">Settings</h1>
        <p className="text-amber-900/80 font-medium italic">
          Your personalized Ayurvedic profile and controls.
        </p>
      </div>

      <div className="space-y-8">

        {/* 🧬 PROFILE */}
        <section className="bg-white/80 backdrop-blur-lg p-8 rounded-[2.5rem] shadow-xl border border-amber-100/50">
          <div className="flex items-center space-x-3 mb-8">
            <UserCircleIcon className="w-6 h-6 text-amber-800" />
            <h2 className="text-2xl font-bold text-amber-900">Wellness Profile</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-amber-50 rounded-2xl border">
              <p className="text-xs font-bold text-amber-600 uppercase mb-1">
                Current Prakriti
              </p>
              <p className="text-3xl font-black text-amber-950">
                {prakritiResult}
              </p>
            </div>

            <button 
              onClick={() => navigate('/prakriti')}
              className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-amber-300 rounded-2xl hover:bg-amber-100 transition"
            >
              <ArrowPathIcon className="w-6 h-6" />
              <span className="font-bold">Retake AI Analysis</span>
            </button>
          </div>
        </section>

        {/* 🔔 REMINDERS */}
        <section className="bg-white/80 backdrop-blur-lg p-8 rounded-[2.5rem] shadow-xl border border-green-100/50">
          <div className="flex items-center space-x-3 mb-8">
            <BellIcon className="w-6 h-6 text-green-800" />
            <h2 className="text-2xl font-bold text-amber-900">
              Dinacharya Reminders
            </h2>
          </div>

          <div className="divide-y">
            {[
              { id: "brahmaMuhurta", label: "Brahma Muhurta" },
              { id: "dinacharya", label: "Daily Routine" },
              { id: "herbReminder", label: "Herb Schedule" },
            ].map((item) => (
              <div key={item.id} className="flex justify-between py-5">
                <p className="font-semibold">{item.label}</p>

                <button
                  onClick={() => handleToggle(item.id as ReminderType)}
                  className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
                    reminders[item.id as ReminderType]
                      ? "bg-green-600"
                      : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`bg-white w-5 h-5 rounded-full shadow transform transition ${
                      reminders[item.id as ReminderType]
                        ? "translate-x-7"
                        : ""
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 🔐 PRIVACY */}
        <section className="bg-white/80 backdrop-blur-lg p-8 rounded-[2.5rem] shadow-xl border border-amber-100/50">
          <div className="flex items-center space-x-3 mb-8">
            <SparklesIcon className="w-6 h-6 text-amber-800" />
            <h2 className="text-2xl font-bold text-amber-900">
              AI & Privacy
            </h2>
          </div>

          <button className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-bold">
            Clear Chat History
          </button>
        </section>

      </div>
    </div>
  );
};