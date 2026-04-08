import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    chat: 'AI Chat',
    prakriti: 'Prakriti Test',
    history: 'History',
    settings: 'Settings',
    signOut: 'Sign Out',
    
    // Dashboard
    welcomeBack: 'Welcome back',
    yourPrakriti: 'Your Prakriti',
    recentChats: 'Recent Chats',
    healthInsights: 'Health Insights',
    riskLevel: 'Risk Level',
    
    // Chat
    typeMessage: 'Type your message...',
    speakToChat: 'Speak to chat',
    analyzing: 'Analyzing...',
    
    // Prakriti
    prakritiTest: 'Prakriti Assessment',
    startTest: 'Start Test',
    nextQuestion: 'Next Question',
    previousQuestion: 'Previous',
    completeTest: 'Complete Test',
    
    // Common
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    emergency: 'Emergency',
    seekMedicalAttention: 'Seek immediate medical attention',
  },
  hi: {
    // Navigation
    dashboard: 'डैशबोर्ड',
    chat: 'एआई चैट',
    prakriti: 'प्रकृति टेस्ट',
    history: 'इतिहास',
    settings: 'सेटिंग्स',
    signOut: 'साइन आउट',
    
    // Dashboard
    welcomeBack: 'वापसी पर स्वागत है',
    yourPrakriti: 'आपकी प्रकृति',
    recentChats: 'हाल की चैट',
    healthInsights: 'स्वास्थ्य जानकारी',
    riskLevel: 'जोखिम स्तर',
    
    // Chat
    typeMessage: 'अपना संदेश टाइप करें...',
    speakToChat: 'चैट करने के लिए बोलें',
    analyzing: 'विश्लेषण कर रहे हैं...',
    
    // Prakriti
    prakritiTest: 'प्रकृति मूल्यांकन',
    startTest: 'टेस्ट शुरू करें',
    nextQuestion: 'अगला प्रश्न',
    previousQuestion: 'पिछला',
    completeTest: 'टेस्ट पूरा करें',
    
    // Common
    loading: 'लोड हो रहा है...',
    save: 'सेव करें',
    cancel: 'रद्द करें',
    emergency: 'आपातकाल',
    seekMedicalAttention: 'तुरंत चिकित्सा सहायता लें',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};