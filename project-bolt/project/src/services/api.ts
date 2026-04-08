import axios from 'axios';
import { supabase } from '../lib/supabase';

const api = axios.create();

// OpenAI API for chatbot
export const getChatResponse = async (message: string, userHistory?: any[], prakriti?: string) => {
  try {
    // Simulate OpenAI API call with mock response
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
    
    const contextPrompt = prakriti 
      ? `User's Prakriti (Ayurvedic constitution): ${prakriti}. `
      : '';
    
    // Mock Ayurvedic AI responses based on common symptoms
    const responses = {
      headache: `${contextPrompt}Based on Ayurvedic principles, headaches can be caused by aggravated Vata or Pitta dosha. 

**Possible Causes:**
- Stress and anxiety (Vata imbalance)
- Heat and acidity (Pitta imbalance)
- Poor digestion

**Recommendations:**
- Practice Pranayama (breathing exercises)
- Apply sesame oil to temples
- Drink warm water with ginger
- Avoid spicy and fried foods
- Get adequate sleep

**Herbs:** Brahmi, Shankhpushpi, Jatamansi`,
      
      stress: `${contextPrompt}Stress is primarily a Vata disorder in Ayurveda.

**Ayurvedic Treatment:**
- Abhyanga (oil massage) with warm sesame oil
- Meditation and yoga
- Ashwagandha and Brahmi herbs
- Warm milk with turmeric before sleep
- Regular sleep schedule

**Diet:** Warm, cooked foods; avoid cold and dry foods`,
      
      digestion: `${contextPrompt}Digestive issues often stem from weakened Agni (digestive fire).

**Recommendations:**
- Drink warm water with lemon in the morning
- Eat largest meal at midday when Agni is strongest
- Take Triphala before sleep
- Avoid cold drinks during meals
- Include ginger, cumin, and coriander in cooking

**Practice:** Eat mindfully and avoid overeating`,
      
      default: `${contextPrompt}Thank you for sharing your symptoms. In Ayurveda, we believe in treating the root cause rather than just symptoms.

**General Ayurvedic Principles:**
- Balance your doshas through proper diet and lifestyle
- Follow daily routines (Dinacharya)
- Practice yoga and meditation
- Use natural herbs and remedies
- Maintain strong digestive fire (Agni)

Please consult with a qualified Ayurvedic practitioner for personalized treatment. Would you like specific advice for any particular symptoms?`
    };

    // Simple keyword matching for demo
    const lowerMessage = message.toLowerCase();
    let response = responses.default;
    
    if (lowerMessage.includes('headache') || lowerMessage.includes('head')) {
      response = responses.headache;
    } else if (lowerMessage.includes('stress') || lowerMessage.includes('anxiety')) {
      response = responses.stress;
    } else if (lowerMessage.includes('digestion') || lowerMessage.includes('stomach') || lowerMessage.includes('acidity')) {
      response = responses.digestion;
    }

    return { response };
  } catch (error) {
    console.error('Chat API Error:', error);
    return { 
      response: 'I apologize, but I am having trouble processing your request right now. Please try again later or consult with a qualified Ayurvedic practitioner.' 
    };
  }
};

// Prakriti ML API
export const getPrakritiPrediction = async (answers: number[]) => {
  try {
    // Simulate ML API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock calculation based on answers
    const vataScore = answers.slice(0, 5).reduce((sum, val) => sum + val, 0);
    const pittaScore = answers.slice(5, 10).reduce((sum, val) => sum + val, 0);
    const kaphaScore = answers.slice(10, 15).reduce((sum, val) => sum + val, 0);
    
    const total = vataScore + pittaScore + kaphaScore;
    const vataPercentage = (vataScore / total) * 100;
    const pittaPercentage = (pittaScore / total) * 100;
    const kaphaPercentage = (kaphaScore / total) * 100;
    
    let dominantDosha = 'Vata';
    if (pittaPercentage > vataPercentage && pittaPercentage > kaphaPercentage) {
      dominantDosha = 'Pitta';
    } else if (kaphaPercentage > vataPercentage && kaphaPercentage > pittaPercentage) {
      dominantDosha = 'Kapha';
    }
    
    const recommendations = {
      Vata: [
        'Follow regular routines',
        'Eat warm, cooked foods',
        'Practice gentle yoga',
        'Use sesame oil for massage',
        'Avoid cold and dry foods'
      ],
      Pitta: [
        'Stay cool and calm',
        'Eat sweet, bitter foods',
        'Avoid spicy and acidic foods',
        'Practice moderation',
        'Use coconut oil for massage'
      ],
      Kapha: [
        'Stay active and energetic',
        'Eat light, spicy foods',
        'Exercise regularly',
        'Avoid heavy, oily foods',
        'Use mustard oil for massage'
      ]
    };
    
    return {
      vata_score: Math.round(vataPercentage),
      pitta_score: Math.round(pittaPercentage),
      kapha_score: Math.round(kaphaPercentage),
      dominant_dosha: dominantDosha,
      recommendations: recommendations[dominantDosha as keyof typeof recommendations]
    };
  } catch (error) {
    console.error('Prakriti API Error:', error);
    throw new Error('Failed to get Prakriti prediction');
  }
};

// Emergency detection
export const detectEmergency = (message: string): boolean => {
  const emergencyKeywords = [
    'chest pain', 'heart attack', 'breathing difficulty', 'unconscious',
    'severe bleeding', 'stroke', 'allergic reaction', 'poisoning',
    'high fever', 'suicide', 'severe pain'
  ];
  
  const lowerMessage = message.toLowerCase();
  return emergencyKeywords.some(keyword => lowerMessage.includes(keyword));
};