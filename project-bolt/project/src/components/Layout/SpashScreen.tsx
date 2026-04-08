import React, { useEffect, useState } from "react";

const shlokas = [
  {
    sanskrit: "स्वस्थस्य स्वास्थ्य रक्षणं आतुरस्य विकार प्रशमनम् ॥",
    english: "Preserve the health of the healthy and cure the diseases of the ill."
  },
  {
    sanskrit: "धर्मार्थकाममोक्षाणामारोग्यं मूलमुत्तमम् ॥",
    english: "Health is the foundation of all goals of life."
  },
  {
    sanskrit: "शरीरमाद्यं खलु धर्मसाधनम् ॥",
    english: "The body is the primary means to achieve life’s purpose."
  },
  {
    sanskrit: "रोगाः सर्वे अपि मन्दाग्नौ ॥",
    english: "All diseases arise from weak digestion."
  },
  {
    sanskrit: "आहारसम्भवं वस्तु रोगाश्च आहारसम्भवाः ॥",
    english: "Both the body and diseases originate from food."
  },
  {
    sanskrit: "नित्यं हिताहारविहारसेवी ॥",
    english: "One who follows proper diet and lifestyle remains healthy."
  },
  {
    sanskrit: "मात्राशी स्यात् हिताशी च ॥",
    english: "One should eat in proper quantity and what is beneficial."
  },
  {
    sanskrit: "अजीर्णे भोजनं विषम् ॥",
    english: "Eating without digestion is like poison."
  },
  {
    sanskrit: "लङ्घनं परम् औषधम् ॥",
    english: "Light eating/fasting is the best medicine."
  },
  {
    sanskrit: "सात्म्यं नाम हितं यद् यत् ॥",
    english: "That which suits the body is beneficial."
  },
  {
    sanskrit: "दोषधातुमलमूलं हि शरीरम् ॥",
    english: "The body is sustained by doshas, tissues, and wastes."
  },
  {
    sanskrit: "समदोषः समाग्निश्च समधातुमलक्रियः ॥",
    english: "Balance of doshas, digestion, and body functions defines health."
  },
  {
    sanskrit: "आयुः कामयमानेन धर्मार्थसुखसाधनम् ॥",
    english: "One desiring long life must follow healthy practices."
  },
  {
    sanskrit: "वातपित्तकफाः दोषाः ॥",
    english: "Vata, Pitta, and Kapha are the fundamental energies."
  },
  {
    sanskrit: "अग्निः सर्वेषां जीवनम् ॥",
    english: "Digestive fire is the basis of life."
  },
  {
    sanskrit: "यथा पिण्डे तथा ब्रह्माण्डे ॥",
    english: "The body reflects the universe."
  },
  {
    sanskrit: "विकारो धातुवैषम्यम् ॥",
    english: "Disease arises from imbalance in body elements."
  },
  {
    sanskrit: "बलं हि अल्पं अल्पेन वर्धते ॥",
    english: "Strength increases gradually."
  },
  {
    sanskrit: "शुद्धे शरीरं स्वास्थ्यं भवति ॥",
    english: "Purity of the body leads to health."
  },
  {
    sanskrit: "मनः प्रसादः स्वास्थ्यकारणम् ॥",
    english: "A calm mind is essential for health."
  },
  {
    sanskrit: "आचार रसायनम् आयुः वर्धयति ॥",
    english: "Right conduct enhances longevity."
  },
  {
    sanskrit: "हिताहितं सुखं दुःखमायुस्तस्य हिताहितम् ॥",
    english: "Knowing what is beneficial defines health."
  },
  {
    sanskrit: "निद्रा युक्ता बलवर्धिनी ॥",
    english: "Proper sleep increases strength."
  },
  {
    sanskrit: "अतियोगः सर्वत्र वर्जनीयः ॥",
    english: "Excess should always be avoided."
  },
  {
    sanskrit: "व्यायामात् लभते स्वास्थ्यं ॥",
    english: "Exercise brings health."
  },
  {
    sanskrit: "कालभोजनं आरोग्यकरम् ॥",
    english: "Timely eating promotes health."
  },
  {
    sanskrit: "जीर्णे भोजनं अमृतम् ॥",
    english: "Eating after digestion is like nectar."
  },
  {
    sanskrit: "स्वस्थः स्यात् संयत इन्द्रियः ॥",
    english: "Self-control leads to good health."
  },
  {
    sanskrit: "प्रकृतिः रक्षणीया सर्वदा ॥",
    english: "One must always protect their natural constitution."
  }
];

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);
  const [shloka, setShloka] = useState(shlokas[0]);

  useEffect(() => {
    // pick random shloka
    const random = shlokas[Math.floor(Math.random() * shlokas.length)];
    setShloka(random);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onFinish, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-green-50 z-50 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-center px-6 max-w-xl">

        {/* Sanskrit */}
        <h1 className="text-2xl md:text-3xl font-semibold text-green-900 mb-4 leading-relaxed">
          {shloka.sanskrit}
        </h1>

        {/* English */}
        <p className="text-green-700 text-sm md:text-base">
          {shloka.english}
        </p>

      </div>
    </div>
  );
};

export default SplashScreen;