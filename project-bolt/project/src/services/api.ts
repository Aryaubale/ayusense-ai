// ===============================
// 🔥 MAIN CHAT FUNCTION
// ===============================
export const getChatResponse = async (
  message: string,
  userHistory?: any[],
  prakriti?: string,
  lang: "en" | "hi" = "en"
) => {
  const RENDER_URL = "https://ayusense-ai.onrender.com/chat";

  try {
    const res = await fetch(RENDER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: message,
        lang,
        history: userHistory || [],
        prakriti: prakriti || "",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || "Backend error");
    }

    if (!data?.response) {
      throw new Error("Empty response from backend");
    }

    return { response: data.response };
  } catch (error) {
    console.warn("⚠️ Backend failed, using fallback AI");

    const contextPrompt = prakriti ? `User's Prakriti: ${prakriti}. ` : "";
    const lowerMessage = message.toLowerCase();

    // ===============================
    // 🧠 FALLBACK RESPONSES (BILINGUAL)
    // ===============================

    if (lowerMessage.includes("headache") || lowerMessage.includes("head")) {
      return {
        response:
          lang === "hi"
            ? `${contextPrompt}सिरदर्द अक्सर वात या पित्त असंतुलन के कारण होता है। गर्म तेल मालिश और आराम करें।`
            : `${contextPrompt}Headache is often due to Vata or Pitta imbalance. Try warm oil massage, hydration, and rest.`,
      };
    }

    if (
      lowerMessage.includes("stress") ||
      lowerMessage.includes("anxiety")
    ) {
      return {
        response:
          lang === "hi"
            ? `${contextPrompt}तनाव वात असंतुलन से जुड़ा हो सकता है। ध्यान और योग करें।`
            : `${contextPrompt}Stress is linked to Vata imbalance. Try meditation and yoga.`,
      };
    }

    if (
      lowerMessage.includes("stomach") ||
      lowerMessage.includes("digestion")
    ) {
      return {
        response:
          lang === "hi"
            ? `${contextPrompt}पाचन सुधारने के लिए अदरक और गर्म पानी लें।`
            : `${contextPrompt}For digestion, try ginger and warm water.`,
      };
    }

    return {
      response:
        lang === "hi"
          ? `${contextPrompt}आयुर्वेदिक जीवनशैली अपनाएं, योग और सही आहार लें।`
          : `${contextPrompt}Follow Ayurvedic lifestyle with proper diet and yoga.`,
    };
  }
};

// ===============================
// 🚨 EMERGENCY DETECTION (FIXED EXPORT SAFE)
// ===============================
export const detectEmergency = (message: string): boolean => {
  if (!message) return false;

  const keywords = [
    "chest pain",
    "heart attack",
    "breathing difficulty",
    "unconscious",
    "severe bleeding",
    "stroke",
    "suicide",
    "high fever",
    "severe pain",
    "can't breathe",
    "not breathing",
  ];

  const lower = message.toLowerCase();
  return keywords.some((k) => lower.includes(k));
};