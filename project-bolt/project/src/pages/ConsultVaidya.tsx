import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  ChatBubbleLeftRightIcon, 
  UserGroupIcon, 
  CheckBadgeIcon 
} from "@heroicons/react/24/outline";

const ConsultVaidya: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        
        {/* 🌿 Title Section - Enhanced for background visibility */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-950">
              🧘‍♂️ Consult Our Vaidyas
            </h1>
          </div>
          <p className="text-amber-900/90 mt-4 text-lg max-w-2xl mx-auto font-medium">
            Choose between our instant AI wellness assistant or a dedicated 1-on-1 session with a certified Ayurvedic practitioner.
          </p>
        </motion.div>

        {/* 🧩 Selection Cards - Balanced Glassmorphism */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          
          {/* 🤖 AI Consultation Card */}
          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white/80 backdrop-blur-lg p-8 rounded-[2.5rem] shadow-xl border border-green-100 flex flex-col justify-between group transition-all"
          >
            <div>
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-all duration-300">
                <ChatBubbleLeftRightIcon className="w-8 h-8 text-green-700 group-hover:text-white" />
              </div>
              <h2 className="text-3xl font-bold text-green-900 mb-3">AI Vaidya</h2>
              <p className="text-gray-700 mb-8 leading-relaxed font-medium">
                Get instant answers for general health queries, Prakriti-based diet suggestions, and traditional home remedies 24/7.
              </p>
            </div>
            <button 
              onClick={() => navigate("/chat")}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-green-200 transition-all active:scale-95 text-lg"
            >
              Start Instant Chat
            </button>
          </motion.div>

          {/* 👨‍⚕️ Human Vaidya Card */}
          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white/80 backdrop-blur-lg p-8 rounded-[2.5rem] shadow-xl border border-amber-100 flex flex-col justify-between group transition-all"
          >
            <div>
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-700 transition-all duration-300">
                <UserGroupIcon className="w-8 h-8 text-amber-800 group-hover:text-white" />
              </div>
              <h2 className="text-3xl font-bold text-amber-900 mb-3">Human Vaidya</h2>
              <p className="text-gray-700 mb-8 leading-relaxed font-medium">
                Deep-dive consultations for long-term health planning, pulse diagnosis (Nadi Pariksha), and complex health conditions.
              </p>
            </div>
            <button 
              onClick={() => navigate("/book-appointment")}
              className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-5 rounded-2xl shadow-lg shadow-amber-200 transition-all active:scale-95 text-lg"
            >
              Book Appointment
            </button>
          </motion.div>
        </div>

        {/* 🌟 Trust Features - Subtle Glass containers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Certified Doctors", desc: "BAMS/MD qualified practitioners" },
            { title: "Personalized Care", desc: "Plans tailored to your Prakriti" },
            { title: "Authentic Herbs", desc: "Genuine Ayurvedic recommendations" }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-amber-100/50 shadow-sm"
            >
              <div className="bg-amber-100 p-2 rounded-lg">
                <CheckBadgeIcon className="w-6 h-6 text-amber-800" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-950">{feature.title}</h4>
                <p className="text-xs text-amber-900/70 font-medium">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ConsultVaidya;