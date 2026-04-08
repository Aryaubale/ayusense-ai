import { PrakritiQuestion } from '../types';

export const prakritiQuestions: PrakritiQuestion[] = [
  {
    id: '1',
    question_en: 'How would you describe your body frame?',
    question_hi: 'आप अपने शरीर की बनावट का वर्णन कैसे करेंगे?',
    options: [
      {
        text_en: 'Thin, light build',
        text_hi: 'पतला, हल्का शरीर',
        score: { vata: 3, pitta: 1, kapha: 0 }
      },
      {
        text_en: 'Medium build',
        text_hi: 'मध्यम शरीर',
        score: { vata: 1, pitta: 3, kapha: 1 }
      },
      {
        text_en: 'Heavy, solid build',
        text_hi: 'भारी, मजबूत शरीर',
        score: { vata: 0, pitta: 1, kapha: 3 }
      }
    ]
  },
  {
    id: '2',
    question_en: 'How is your sleep pattern?',
    question_hi: 'आपका नींद का पैटर्न कैसा है?',
    options: [
      {
        text_en: 'Light, interrupted sleep',
        text_hi: 'हल्की, टूटी हुई नींद',
        score: { vata: 3, pitta: 1, kapha: 0 }
      },
      {
        text_en: 'Moderate, sound sleep',
        text_hi: 'मध्यम, अच्छी नींद',
        score: { vata: 1, pitta: 3, kapha: 1 }
      },
      {
        text_en: 'Deep, long sleep',
        text_hi: 'गहरी, लंबी नींद',
        score: { vata: 0, pitta: 1, kapha: 3 }
      }
    ]
  },
  {
    id: '3',
    question_en: 'What is your appetite like?',
    question_hi: 'आपकी भूख कैसी है?',
    options: [
      {
        text_en: 'Variable, sometimes hungry',
        text_hi: 'बदलती रहती है, कभी भूख',
        score: { vata: 3, pitta: 1, kapha: 0 }
      },
      {
        text_en: 'Strong, regular appetite',
        text_hi: 'मजबूत, नियमित भूख',
        score: { vata: 1, pitta: 3, kapha: 1 }
      },
      {
        text_en: 'Slow, can skip meals',
        text_hi: 'धीमी, खाना छोड़ सकते हैं',
        score: { vata: 0, pitta: 1, kapha: 3 }
      }
    ]
  },
  {
    id: '4',
    question_en: 'How do you handle stress?',
    question_hi: 'आप तनाव से कैसे निपटते हैं?',
    options: [
      {
        text_en: 'Get anxious, worry a lot',
        text_hi: 'चिंतित हो जाते हैं, बहुत चिंता',
        score: { vata: 3, pitta: 1, kapha: 0 }
      },
      {
        text_en: 'Get irritated, angry',
        text_hi: 'चिड़चिड़ाते हैं, गुस्सा आता है',
        score: { vata: 1, pitta: 3, kapha: 1 }
      },
      {
        text_en: 'Stay calm, don\'t react much',
        text_hi: 'शांत रहते हैं, ज्यादा प्रतिक्रिया नहीं',
        score: { vata: 0, pitta: 1, kapha: 3 }
      }
    ]
  },
  {
    id: '5',
    question_en: 'What is your energy level like?',
    question_hi: 'आपका ऊर्जा स्तर कैसा है?',
    options: [
      {
        text_en: 'Variable, comes in bursts',
        text_hi: 'बदलता रहता है, झटकों में आती है',
        score: { vata: 3, pitta: 1, kapha: 0 }
      },
      {
        text_en: 'Moderate, steady',
        text_hi: 'मध्यम, स्थिर',
        score: { vata: 1, pitta: 3, kapha: 1 }
      },
      {
        text_en: 'Low but steady',
        text_hi: 'कम लेकिन स्थिर',
        score: { vata: 0, pitta: 1, kapha: 3 }
      }
    ]
  },
  {
    id: '6',
    question_en: 'How is your skin?',
    question_hi: 'आपकी त्वचा कैसी है?',
    options: [
      {
        text_en: 'Dry, rough',
        text_hi: 'सूखी, खुरदरी',
        score: { vata: 3, pitta: 1, kapha: 0 }
      },
      {
        text_en: 'Warm, oily, sensitive',
        text_hi: 'गर्म, तैलीय, संवेदनशील',
        score: { vata: 1, pitta: 3, kapha: 1 }
      },
      {
        text_en: 'Cool, thick, smooth',
        text_hi: 'ठंडी, मोटी, चिकनी',
        score: { vata: 0, pitta: 1, kapha: 3 }
      }
    ]
  },
  {
    id: '7',
    question_en: 'How do you prefer the weather?',
    question_hi: 'आप कैसा मौसम पसंद करते हैं?',
    options: [
      {
        text_en: 'Warm, humid weather',
        text_hi: 'गर्म, नम मौसम',
        score: { vata: 3, pitta: 1, kapha: 0 }
      },
      {
        text_en: 'Cool, dry weather',
        text_hi: 'ठंडा, सूखा मौसम',
        score: { vata: 1, pitta: 3, kapha: 1 }
      },
      {
        text_en: 'Warm, dry weather',
        text_hi: 'गर्म, सूखा मौसम',
        score: { vata: 0, pitta: 1, kapha: 3 }
      }
    ]
  },
  {
    id: '8',
    question_en: 'How do you speak?',
    question_hi: 'आप कैसे बोलते हैं?',
    options: [
      {
        text_en: 'Fast, frequent talking',
        text_hi: 'तेज, बार-बार बोलना',
        score: { vata: 3, pitta: 1, kapha: 0 }
      },
      {
        text_en: 'Sharp, precise speech',
        text_hi: 'तीखा, सटीक भाषण',
        score: { vata: 1, pitta: 3, kapha: 1 }
      },
      {
        text_en: 'Slow, thoughtful speech',
        text_hi: 'धीमा, विचारशील भाषण',
        score: { vata: 0, pitta: 1, kapha: 3 }
      }
    ]
  },
  {
    id: '9',
    question_en: 'How is your memory?',
    question_hi: 'आपकी याददाश्त कैसी है?',
    options: [
      {
        text_en: 'Quick to learn, quick to forget',
        text_hi: 'जल्दी सीखते हैं, जल्दी भूल जाते हैं',
        score: { vata: 3, pitta: 1, kapha: 0 }
      },
      {
        text_en: 'Sharp, clear memory',
        text_hi: 'तेज, साफ याददाश्त',
        score: { vata: 1, pitta: 3, kapha: 1 }
      },
      {
        text_en: 'Slow to learn, long retention',
        text_hi: 'धीरे सीखते हैं, लंबे समय तक याद रखते हैं',
        score: { vata: 0, pitta: 1, kapha: 3 }
      }
    ]
  },
  {
    id: '10',
    question_en: 'How do you make decisions?',
    question_hi: 'आप निर्णय कैसे लेते हैं?',
    options: [
      {
        text_en: 'Quick, often change mind',
        text_hi: 'जल्दी, अक्सर मन बदलते हैं',
        score: { vata: 3, pitta: 1, kapha: 0 }
      },
      {
        text_en: 'Decisive, logical',
        text_hi: 'निर्णायक, तर्कसंगत',
        score: { vata: 1, pitta: 3, kapha: 1 }
      },
      {
        text_en: 'Slow, deliberate',
        text_hi: 'धीमा, सोच-समझकर',
        score: { vata: 0, pitta: 1, kapha: 3 }
      }
    ]
  }
];