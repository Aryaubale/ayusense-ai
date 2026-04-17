import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import tridosha from "../assets/tridosha2.jfif";
import video from "../assets/video_constitution.mp4"; // ✅ FIXED NAME

export const HumanPrakriti = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f5f0] to-[#e7dbc8] font-sans">

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-16">

        {/* 🌿 HERO */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h1 className="text-5xl font-bold text-[#2c2c2c] leading-tight">
              Know Your <span className="text-amber-700">Prakriti</span>
            </h1>
            <p className="mt-5 text-gray-600 text-lg leading-relaxed">
              Your body has a natural blueprint. Ayurveda calls it{" "}
              <b>Prakriti</b> — the balance of Vata, Pitta and Kapha.
            </p>

            <button
              onClick={() => navigate("/prakriti")}
              className="mt-6 px-8 py-3 bg-amber-700 text-white rounded-xl font-semibold hover:bg-amber-800 transition"
            >
              Start Assessment →
            </button>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl">
            <img src={tridosha} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* 🌿 DOSHA CARDS */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-bold text-blue-700">🌬️ Vata</h2>
            <p className="text-sm text-gray-500 mb-3">Air + Space</p>
            <p className="text-gray-700 text-sm">
              Controls movement, breathing, circulation.
            </p>
            <ul className="mt-3 text-sm text-gray-600 space-y-1">
              <li>✔ Creative & energetic</li>
              <li>⚠ Anxiety & dryness</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-bold text-orange-600">🔥 Pitta</h2>
            <p className="text-sm text-gray-500 mb-3">Fire + Water</p>
            <p className="text-gray-700 text-sm">
              Controls digestion and metabolism.
            </p>
            <ul className="mt-3 text-sm text-gray-600 space-y-1">
              <li>✔ Sharp & focused</li>
              <li>⚠ Anger & acidity</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-bold text-green-700">🌊 Kapha</h2>
            <p className="text-sm text-gray-500 mb-3">Earth + Water</p>
            <p className="text-gray-700 text-sm">
              Provides structure and stability.
            </p>
            <ul className="mt-3 text-sm text-gray-600 space-y-1">
              <li>✔ Calm & strong</li>
              <li>⚠ Sluggish & heavy</li>
            </ul>
          </div>

        </div>

        {/* 🌿 PRAKRITI INFO */}
        <div className="bg-white rounded-3xl p-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ⚖️ What is Prakriti?
          </h2>

          <div className="grid md:grid-cols-2 gap-6 text-gray-600 text-sm">
            <div>✔ Fixed at birth</div>
            <div>✔ Unique to every person</div>
            <div>✔ Helps prevent diseases</div>
            <div>✔ Guides diet & lifestyle</div>
          </div>
        </div>

        {/* 🌿 TYPES */}
        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Vata–Pitta: energetic but burnout prone",
            "Vata–Kapha: calm but low digestion",
            "Pitta–Kapha: strong but heavy",
            "Kapha–Vata: stable but slow",
            "Kapha–Pitta: resilient but stubborn",
            "Pitta–Vata: sharp but stressed"
          ].map((type, i) => (
            <div key={i} className="bg-white p-5 rounded-xl shadow-sm text-gray-700">
              {type}
            </div>
          ))}
        </div>

        {/* 🌿 FINAL CTA */}
        <div className="text-center pt-10">
          <h3 className="text-2xl font-bold text-gray-800">
            Discover your balance
          </h3>
          <p className="text-gray-500 mt-2">
            Take the test and understand your body better
          </p>

          <button
            onClick={() => navigate("/prakriti")}
            className="mt-5 px-10 py-4 bg-black text-white rounded-2xl font-semibold hover:scale-105 transition"
          >
            Take Test →
          </button>
        </div>

        {/* 🎥 VIDEO SECTION (BOTTOM — FIXED, NO CROPPING) */}
        <div className="pt-16">
          <div className="rounded-3xl overflow-hidden shadow-2xl bg-black flex justify-center items-center">
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full max-h-[500px] object-contain"
            />
          </div>
        </div>

      </div>
    </div>
  );
};