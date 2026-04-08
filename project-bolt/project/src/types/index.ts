export interface User {
  id: string;
  email: string;
  full_name: string;
  prakriti?: string;
  language?: 'en' | 'hi';
  created_at: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  message: string;
  response: string;
  is_voice?: boolean;
  created_at: string;
}

export interface PrakritiResult {
  id: string;
  user_id: string;
  vata_score: number;
  pitta_score: number;
  kapha_score: number;
  dominant_dosha: string;
  recommendations: string[];
  created_at: string;
}

export interface HealthReport {
  id: string;
  user_id: string;
  symptoms: string[];
  diagnosis: string;
  risk_level: 'low' | 'medium' | 'high' | 'emergency';
  recommendations: string[];
  created_at: string;
}

export interface PrakritiQuestion {
  id: string;
  question_en: string;
  question_hi: string;
  options: {
    text_en: string;
    text_hi: string;
    score: { vata: number; pitta: number; kapha: number };
  }[];
}