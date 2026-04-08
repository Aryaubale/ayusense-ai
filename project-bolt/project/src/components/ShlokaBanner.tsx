import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const shlokas = [
  {
    sanskrit: "स्वस्थस्य स्वास्थ्य रक्षणं आतुरस्य विकार प्रशमनम् ॥",
    english: "Preserve the health of the healthy and cure the diseases of the ill."
  },
  {
    sanskrit: "रोगाः सर्वे अपि मन्दाग्नौ ॥",
    english: "All diseases arise from weak digestion."
  },
  {
    sanskrit: "अजीर्णे भोजनं विषम् ॥",
    english: "Eating without digestion is like poison."
  },
  {
    sanskrit: "लङ्घनं परम् औषधम् ॥",
    english: "Fasting/light eating is the best medicine."
  },
  {
    sanskrit: "नित्यं हिताहारविहारसेवी ॥",
    english: "Proper diet and lifestyle lead to health."
  },
  {
    sanskrit: "समदोषः समाग्निश्च समधातुमलक्रियः ॥",
    english: "Balance in body systems defines health."
  }
];

const ShlokaBanner: React.FC = () => {
  const location = useLocation();
  const [shloka, setShloka] = useState(shlokas[0]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const random = shlokas[Math.floor(Math.random() * shlokas.length)];
    setShloka(random);

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [location.pathname]); // 🔥 triggers on route change

  return (
    <div
      className={`transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
      }`}
    >
      <div className="mx-6 mt-3 bg-green-100/80 border border-green-200 rounded-lg p-3 shadow-sm text-center">
        
        <p className="text-green-900 text-sm font-medium">
          {shloka.sanskrit}
        </p>

        <p className="text-green-700 text-xs mt-1">
          {shloka.english}
        </p>

      </div>
    </div>
  );
};

export default ShlokaBanner;