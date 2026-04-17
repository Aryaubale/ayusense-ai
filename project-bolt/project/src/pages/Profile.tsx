import React from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import bgImage from "../assets/illustration.jfif";

export const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen flex">

      {/* 🌿 LEFT SIDE IMAGE (VISIBLE ON DESKTOP ONLY) */}
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* 🌿 RIGHT SIDE PROFILE SECTION */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#fdfbf7] px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white p-10 rounded-[2rem] shadow-2xl"
        >
          {/* Heading */}
          <h1 className="text-2xl font-semibold text-gray-700 mb-1">
            Hello there,
          </h1>
          <h2 className="text-3xl font-bold text-green-800 mb-8">
            {user.name}
          </h2>

          {/* Fields */}
          <div className="space-y-6">

            <div>
              <label className="text-xs text-gray-400 uppercase">Email</label>
              <input
                value={user.email}
                readOnly
                className="w-full border-b border-gray-300 py-2 text-gray-700 outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase">Age</label>
              <input
                value={user.age || "Not Set"}
                readOnly
                className="w-full border-b border-gray-300 py-2 outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase">Gender</label>
              <input
                value={user.gender || "Not Set"}
                readOnly
                className="w-full border-b border-gray-300 py-2 outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase">Occupation</label>
              <input
                value={user.occupation || "Not Set"}
                readOnly
                className="w-full border-b border-gray-300 py-2 outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase">Location</label>
              <input
                value={user.location || "Not Set"}
                readOnly
                className="w-full border-b border-gray-300 py-2 outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase">Prakriti</label>
              <input
                value={user.prakriti || "Vata"}
                readOnly
                className="w-full border-b border-gray-300 py-2 outline-none"
              />
            </div>

          </div>

          {/* Button */}
          <button
            className="mt-8 w-full bg-gradient-to-r from-yellow-400 to-orange-400 
                       text-white py-3 rounded-xl font-semibold shadow-md 
                       hover:scale-105 transition"
          >
            UPDATE PROFILE
          </button>
        </motion.div>

      </div>

    </div>
  );
};