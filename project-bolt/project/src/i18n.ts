import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      Dashboard: "Dashboard",
      Chat: "Chat",
      Prakriti: "Prakriti",
      History: "History",
      Settings: "Settings",
      Logout: "Logout"
    }
  },
  hi: {
    translation: {
      Dashboard: "डैशबोर्ड",
      Chat: "चैट",
      Prakriti: "प्रकृति",
      History: "इतिहास",
      Settings: "सेटिंग्स",
      Logout: "लॉगआउट"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;