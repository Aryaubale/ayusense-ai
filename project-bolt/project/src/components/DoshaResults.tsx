import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { FireIcon, BeakerIcon, CloudIcon } from '@heroicons/react/24/outline';

const DOSHA_PROFILES = {
  pitta: { name: "Pitta", color: "#EF4444", secondary: "#FEE2E2", icon: FireIcon, desc: "transformation, metabolism, and heat." },
  vata: { name: "Vata", color: "#3B82F6", secondary: "#DBEAFE", icon: CloudIcon, desc: "movement, nervous system activity, and air." },
  kapha: { name: "Kapha", color: "#10B981", secondary: "#D1FAE5", icon: BeakerIcon, desc: "structure, lubrication, and stability." }
};

export const DoshaResults: React.FC<{ data: any }> = ({ data }) => {
  // 1. DATA NORMALIZER & SORTER: Finds Primary and Secondary Doshas
  const normalizedData = useMemo(() => {
    if (!data || !data.stats) return null;
    
    // Sort all doshas by their percentage value (Highest first)
    const sorted = Object.entries(data.stats)
      .map(([key, val]) => ({
        id: key.toLowerCase() as keyof typeof DOSHA_PROFILES,
        value: Number(val),
        name: key.charAt(0).toUpperCase() + key.slice(1)
      }))
      .sort((a, b) => b.value - a.value);

    const primary = sorted[0];
    const secondary = sorted[1];
    
    // We only show secondary in the title if it's significant (> 15%)
    const isDualType = secondary && secondary.value > 15;

    return { primary, secondary, isDualType, allStats: sorted };
  }, [data]);

  if (!normalizedData) {
    return <div className="p-20 text-center text-amber-900 font-bold">No Analysis Data Found.</div>;
  }

  const { primary, secondary, isDualType, allStats } = normalizedData;
  const primaryProfile = DOSHA_PROFILES[primary.id];
  const secondaryProfile = DOSHA_PROFILES[secondary.id];

  const chartData = allStats.map(item => ({
    name: item.name,
    value: item.value,
    color: DOSHA_PROFILES[item.id]?.color || "#ccc"
  }));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <h2 className="text-2xl text-amber-800 font-bold mb-2">Your Prakriti Analysis</h2>
        
        {/* 🔥 DYNAMIC DUAL TITLE */}
        <h1 className="text-5xl md:text-7xl font-black text-amber-950 leading-tight">
          <span style={{ color: primaryProfile.color }}>{primaryProfile.name}</span>
          {isDualType && (
            <>
              <span className="text-amber-200 mx-2">-</span>
              <span style={{ color: secondaryProfile.color }}>{secondaryProfile.name}</span>
            </>
          )}
        </h1>
        <p className="mt-4 text-amber-700 font-medium">
          {isDualType ? "Dual-Dosha Constitution" : "Single-Dosha Dominance"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Animated Pie Chart */}
        <div className="h-[400px] bg-white rounded-[3rem] shadow-xl border border-amber-50 p-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={80}
                outerRadius={130}
                paddingAngle={5}
                dataKey="value"
                isAnimationActive={true}
                animationBegin={500}
                animationDuration={1500}
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Description Box */}
        <div className="bg-amber-950 text-white p-10 rounded-[3rem] flex flex-col justify-center shadow-2xl">
          <h3 className="text-3xl font-bold mb-4">The {primaryProfile.name}{isDualType ? `-${secondaryProfile.name}` : ''} Blend</h3>
          <p className="text-amber-100 text-lg leading-relaxed">
            Your results show a dominant <strong>{primary.value}% {primaryProfile.name}</strong> nature. 
            This energy primarily governs {primaryProfile.desc} 
            {isDualType && (
              <>
                {" "}Additionally, your strong <strong>{secondary.value}% {secondaryProfile.name}</strong> influence adds traits related to {secondaryProfile.desc}
              </>
            )}
          </p>
          <div className="mt-6 p-4 bg-white/10 rounded-2xl border border-white/20">
             <p className="text-sm italic text-amber-200">
               * Understanding this unique balance helps in choosing the right Ayurvedic diet and lifestyle tailored to your specific elements.
             </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};