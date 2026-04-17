import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  ChatBubbleLeftRightIcon, 
  UserGroupIcon, 
  CheckBadgeIcon 
} from "@heroicons/react/24/outline";

import vaidyaImg from "../assets/vaidya.jfif";

const ConsultVaidya: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#f8f5f0] via-[#f3eee6] to-[#e9dccb]">

      {/* 🌿 SOFT FLOATING BLOBS */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-green-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-120px] right-[-100px] w-[350px] h-[350px] bg-amber-300/30 rounded-full blur-3xl"></div>
      <div className="absolute top-[40%] left-[70%] w-[200px] h-[200px] bg-orange-200/30 rounded-full blur-2xl"></div>

      {/* 🌿 CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 space-y-16">

        {/* HERO */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold text-[#1f1f1f] leading-tight">
              Consult a <span className="text-amber-700">Vaidya</span>
            </h1>

            <p className="text-gray-600 mt-5 text-lg leading-relaxed">
              Choose between instant AI support or personalized Ayurvedic consultation.
            </p>

            <div className="flex gap-4 mt-6">
              <button 
                onClick={() => navigate("/chat")}
                className="px-6 py-3 bg-green-700 text-white rounded-xl font-semibold hover:bg-green-800 transition"
              >
                AI Consultation
              </button>

              <button 
                onClick={() => navigate("/book-appointment")}
                className="px-6 py-3 bg-amber-700 text-white rounded-xl font-semibold hover:bg-amber-800 transition"
              >
                Book Vaidya
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl overflow-hidden shadow-xl"
          >
            <img 
              src={vaidyaImg} 
              alt="vaidya"
              className="w-full h-[350px] object-cover"
            />
          </motion.div>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 gap-8">
          
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-md border border-gray-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-5">
                <ChatBubbleLeftRightIcon className="w-7 h-7 text-green-700" />
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                AI Vaidya
              </h2>

              <p className="text-gray-600 mb-6">
                Instant Ayurvedic suggestions for daily wellness and minor concerns.
              </p>
            </div>

            <button 
              onClick={() => navigate("/chat")}
              className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl font-semibold transition"
            >
              Start Chat →
            </button>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-md border border-gray-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-5">
                <UserGroupIcon className="w-7 h-7 text-amber-800" />
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Human Vaidya
              </h2>

              <p className="text-gray-600 mb-6">
                Detailed consultation with certified Ayurvedic doctors.
              </p>
            </div>

            <button 
              onClick={() => navigate("/book-appointment")}
              className="w-full bg-amber-700 hover:bg-amber-800 text-white py-4 rounded-xl font-semibold transition"
            >
              Book Appointment →
            </button>
          </motion.div>
        </div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Certified Doctors", desc: "BAMS/MD practitioners" },
            { title: "Personalized Care", desc: "Based on your Prakriti" },
            { title: "Authentic Ayurveda", desc: "Trusted remedies" }
          ].map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-sm border border-gray-200 flex gap-3 items-start"
            >
              <CheckBadgeIcon className="w-6 h-6 text-amber-700 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800">{f.title}</h4>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ConsultVaidya;