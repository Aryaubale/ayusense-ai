import React, { useEffect, useState } from "react";

const WelcomePopup: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("seenWelcome");

    if (!hasSeen) {
      setShow(true);
      localStorage.setItem("seenWelcome", "true");
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">

      {/* Background blur */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Popup */}
      <div className="relative bg-white rounded-xl p-6 w-[90%] max-w-md text-center shadow-xl">

        <h2 className="text-xl font-semibold text-green-800 mb-3">
          🌿 Discover Your Prakriti
        </h2>

        <p className="text-gray-600 text-sm mb-4">
          Understanding your body constitution (Vata, Pitta, Kapha) is the first step toward a balanced and healthy life.
        </p>

        <button
          onClick={() => setShow(false)}
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Know Your Constitution
        </button>

      </div>
    </div>
  );
};

export default WelcomePopup;