import React from "react";
import { motion, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import tridosha from "../assets/tridosha.jfif";

/**
 * HumanPrakriti Component
 * * A comprehensive guide to Ayurvedic Doshas and Prakriti.
 * Integrated with Framer Motion for smooth scroll-based animations.
 */
export const HumanPrakriti = () => {
  const navigate = useNavigate();

  // Animation variants for consistent "fade up" effect
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        background:
          "linear-gradient(135deg, #f5f0e8 0%, #e8d5b7 30%, #d4b896 60%, #c4a882 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-12">
        
        {/* 🌿 Main Header Section */}
        <motion.div
          className="text-center"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 drop-shadow-sm">
            🌿 Know Your Constitution
          </h1>
          <p className="text-amber-800 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
            In Ayurveda, every individual has a unique constitution known as
            <span className="font-bold text-amber-950"> Prakriti</span>, 
            determined by the foundational balance of Vata, Pitta, and Kapha at the moment of conception.
          </p>
        </motion.div>

        {/* 🖼️ Hero Image Section */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-100/50 w-72 md:w-80">
            <img 
              src={tridosha} 
              alt="The Tridosha: Vata, Pitta, and Kapha" 
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" 
            />
          </div>
        </motion.div>

        {/* 📜 TRIDOSHA FOUNDATION */}
        <motion.section
          className="bg-amber-50/80 backdrop-blur-sm rounded-2xl p-8 shadow-md border border-amber-100"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-2">
            🌿 The Tridosha System
          </h2>
          <p className="text-gray-800 mb-4 leading-relaxed">
            In classical Ayurveda, the concept of Tridosha forms the foundation of health and disease.
            The three doshas—Vata, Pitta, and Kapha—are subtle biological energies derived from the 
            five elements (Ether, Air, Fire, Water, Earth) and govern all bodily and mental functions.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-amber-600">•</span> Determines physical, mental, and emotional traits.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600">•</span> Unique balance = <b>Prakriti</b> (Natural constitution).
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600">•</span> Imbalance = <b>Vikriti</b> (Current state of health).
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600">•</span> True health is the dynamic balance of all three.
            </li>
          </ul>
        </motion.section>

        {/* 🌬️ VATA DOSHA */}
        <motion.section
          className="bg-blue-50/70 rounded-2xl p-8 shadow-md border border-blue-100"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-blue-800 mb-3 flex items-center gap-2">🌬️ Vata Dosha</h2>
          <p className="text-gray-700 mb-4 italic">Elements: Air & Space</p>
          <p className="text-gray-800 mb-4">
            Vata represents movement. It is the driving force behind the other two doshas and controls 
            all biological activity, from the blinking of an eye to the beating of the heart.
          </p>
          <div className="bg-white/40 p-4 rounded-xl space-y-2">
            <p className="text-sm"><b>Functions:</b> Breathing, circulation, nerve impulses, and elimination.</p>
            <p className="text-sm"><b>Qualities:</b> Light, dry, cold, mobile, and rough.</p>
            <p className="text-sm text-green-800"><b>Balanced:</b> Creativity, flexibility, and quick learning.</p>
            <p className="text-sm text-red-800"><b>Imbalanced:</b> Anxiety, insomnia, dry skin, and bloating.</p>
          </div>
        </motion.section>

        {/* 🔥 PITTA DOSHA */}
        <motion.section
          className="bg-orange-50/70 rounded-2xl p-8 shadow-md border border-orange-100"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-orange-800 mb-3 flex items-center gap-2">🔥 Pitta Dosha</h2>
          <p className="text-gray-700 mb-4 italic">Elements: Fire & Water</p>
          <p className="text-gray-800 mb-4">
            Pitta governs transformation. It manages heat, metabolism, and energy production 
            throughout the body and mind.
          </p>
          <div className="bg-white/40 p-4 rounded-xl space-y-2">
            <p className="text-sm"><b>Functions:</b> Digestion, body temperature, and visual perception.</p>
            <p className="text-sm"><b>Qualities:</b> Hot, sharp, intense, light, and slightly oily.</p>
            <p className="text-sm text-green-800"><b>Balanced:</b> Sharp intelligence, leadership, and strong digestion.</p>
            <p className="text-sm text-red-800"><b>Imbalanced:</b> Irritability, acidity, inflammation, and skin rashes.</p>
          </div>
        </motion.section>

        {/* 🌊 KAPHA DOSHA */}
        <motion.section
          className="bg-emerald-50/70 rounded-2xl p-8 shadow-md border border-emerald-100"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-emerald-800 mb-3 flex items-center gap-2">🌊 Kapha Dosha</h2>
          <p className="text-gray-700 mb-4 italic">Elements: Earth & Water</p>
          <p className="text-gray-800 mb-4">
            Kapha provides structure, lubrication, and stability. it is the "glue" that holds 
            the cells together and forms the physical body.
          </p>
          <div className="bg-white/40 p-4 rounded-xl space-y-2">
            <p className="text-sm"><b>Functions:</b> Immunity, joint lubrication, and tissue growth.</p>
            <p className="text-sm"><b>Qualities:</b> Heavy, slow, cool, oily, and stable.</p>
            <p className="text-sm text-green-800"><b>Balanced:</b> Calmness, endurance, loyalty, and strength.</p>
            <p className="text-sm text-red-800"><b>Imbalanced:</b> Lethargy, weight gain, congestion, and attachment.</p>
          </div>
        </motion.section>

        {/* ⚖️ UNDERSTANDING PRAKRITI */}
        <motion.section
          className="bg-amber-100/40 rounded-2xl p-8 shadow-inner border border-amber-200"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-amber-900 mb-4">⚖️ What is Prakriti?</h2>
          <p className="text-gray-800 mb-4">
            Prakriti is your "blueprint." While your environment changes, your Prakriti 
            stays constant. Understanding it allows you to make lifestyle choices that 
            harmonize with your true nature.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="p-3 bg-white/50 rounded-lg"><b>Fixed at Birth:</b> Does not change over time.</div>
            <div className="p-3 bg-white/50 rounded-lg"><b>Dual-Dosha:</b> Most people are a combination of two doshas.</div>
            <div className="p-3 bg-white/50 rounded-lg"><b>Prevention:</b> Helps identify which illnesses you are prone to.</div>
            <div className="p-3 bg-white/50 rounded-lg"><b>Personalized:</b> Explains why "one size fits all" diets don't work.</div>
          </div>
        </motion.section>

        {/* 🌿 THE 7 TYPES OF PRAKRITI */}
        <motion.section
          className="bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-amber-100"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-amber-900 mb-6">🌿 Common Prakriti Combinations</h2>
          <div className="grid grid-cols-1 gap-4 text-gray-800">
            <div className="border-l-4 border-blue-400 pl-4">
              <p><b>Vata–Pitta:</b> High energy and intellect. Quick to act but prone to burnout and acidity.</p>
            </div>
            <div className="border-l-4 border-cyan-400 pl-4">
              <p><b>Vata–Kapha:</b> Gentle and sensitive. May struggle with coldness and slow digestion.</p>
            </div>
            <div className="border-l-4 border-orange-400 pl-4">
              <p><b>Pitta–Kapha:</b> Robust health and great stamina. Strong-willed but can be overly competitive.</p>
            </div>
            <div className="border-l-4 border-amber-600 pl-4">
              <p><b>Pitta–Vata:</b> Sharp, focused, and organized. Prone to stress-related skin issues.</p>
            </div>
            <div className="border-l-4 border-green-400 pl-4">
              <p><b>Kapha–Vata:</b> Deeply calm and introspective. Prone to respiratory congestion.</p>
            </div>
            <div className="border-l-4 border-emerald-600 pl-4">
              <p><b>Kapha–Pitta:</b> Methodical and resilient. May experience sluggishness or weight gain.</p>
            </div>
            <div className="mt-4 p-4 bg-amber-200/50 rounded-xl text-center">
              <p className="font-bold text-amber-900">🌟 Sama Prakriti</p>
              <p className="text-sm">A rare and ideal state where all three doshas are present in equal proportions, leading to perfect harmony.</p>
            </div>
          </div>
        </motion.section>

        {/* 🎯 FINAL CALL TO ACTION (CTA) */}
        <motion.div
          className="text-center py-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block p-1 rounded-3xl bg-gradient-to-r from-amber-500 to-orange-600">
            <div className="bg-white rounded-[22px] px-10 py-8">
              <h3 className="text-2xl text-amber-900 font-bold mb-4">
                Ready to find your balance?
              </h3>
              <p className="text-gray-600 mb-6">
                Take our detailed assessment to discover your unique Ayurvedic constitution.
              </p>
              <motion.button
                onClick={() => navigate("/prakriti")}
                className="bg-amber-700 hover:bg-amber-800 text-white font-bold px-10 py-4 rounded-2xl text-lg shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Take Prakriti Assessment →
              </motion.button>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};