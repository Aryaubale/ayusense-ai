import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon 
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { DoshaResults } from '../components/DoshaResults';
import { useAuth } from "../context/AuthContext";

const questions = [
  { id: "Body Frame", question: "What is your body frame?", options: ["Thin and Lean", "Medium", "Well Built"] },
  { id: "Type of Hair", question: "What is your hair type?", options: ["Dry", "Normal", "Greasy"] },
  { id: "Color of Hair", question: "What is your hair color?", options: ["Black", "Brown", "Grey"] },
  { id: "Skin", question: "What is your skin type?", options: ["Dry,Rough", "Soft,Sweating", "Moist,Greasy"] },
  { id: "Complexion", question: "What is your complexion?", options: ["Dark", "Pinkish", "Glowing"] },
  { id: "Body Weight", question: "What is your body weight?", options: ["Underweight", "Normal", "Overweight"] },
  { id: "Nails", question: "What is your nail color?", options: ["Blackish", "Pinkish", "Redish"] },
  { id: "Size and Color of the Teeth", question: "What are your teeth like?", options: ["Irregular,Blackish", "Medium,Yellowish", "Large,White"] },
  { id: "Pace of Performing Work", question: "What is your pace of performing work?", options: ["Fast", "Medium", "Slow"] },
  { id: "Mental Activity", question: "How would you describe your mental activity?", options: ["Restless", "Aggressive", "Stable"] },
  { id: "Memory", question: "What is your memory like?", options: ["Short term", "Long Term", "Good Memory"] },
  { id: "Sleep Pattern", question: "What is your sleep pattern?", options: ["Less", "Moderate", "Sleepy"] },
  { id: "Weather Conditions", question: "Which weather conditions do you dislike?", options: ["Dislike Cold", "Dislike Heat", "Dislike Moist"] },
  { id: "Reaction under Adverse Situations", question: "How do you react under adverse situations?", options: ["Anxiety", "Anger", "Calm"] },
  { id: "Mood", question: "How would you describe your mood?", options: ["Changes Quickly", "Constant", "Changes Slowly"] },
  { id: "Eating Habit", question: "What are your eating habits?", options: ["Irregular Chewing", "Proper Chewing", "Improper Chewing"] },
  { id: "Hunger", question: "How is your hunger pattern?", options: ["Irregular", "Sudden and Sharp", "Skips Meal"] },
  { id: "Body Temperature", question: "How is your body temperature?", options: ["Less than Normal", "More than Normal", "Normal"] },
  { id: "Joints", question: "How are your joints?", options: ["Weak", "Healthy", "Heavy"] },
  { id: "Nature", question: "How would you describe your nature?", options: ["Jealous,Fearful", "Egoistic,Fearless", "Forgiving,Grateful"] },
  { id: "Body Energy", question: "What is your body energy level?", options: ["Low", "Medium", "High"] },
  { id: "Quality of Voice", question: "What is the quality of your voice?", options: ["Rough", "Fast", "Deep"] },
  { id: "Dreams", question: "What do you often dream about?", options: ["Sky", "Fire", "Water"] },
  { id: "Social Relations", question: "How are your social relations?", options: ["Introvert", "Ambivert", "Extrovert"] },
  { id: "Body Odor", question: "How would you describe your body odor?", options: ["Negligible", "Strong", "Mild"] }
];

export const Prakriti = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const { user, updateUserPrakriti } = useAuth();

  // ✅ FIXED LOGIC: Strict DB Check
  useEffect(() => {
    if (user && user.prakriti && user.prakriti !== "Not Analyzed") {
      setResults({
        dominant_dosha: user.prakriti,
        stats: user.stats
      });
      setShowResults(true);
    } else {
      setResults(null);
      setShowResults(false);
    }
  }, [user]);

  const handleAnswer = (optionIndex: number) => {
    const question = questions[currentQuestion];
    const selectedText = question.options[optionIndex];
    
    setAnswers(prev => ({
      ...prev,
      [question.id]: selectedText
    }));
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    }
  };

  const calculatePrakriti = async () => {
    if (Object.keys(answers).length < questions.length) {
      toast.error("Please answer all questions!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });

      const data = await response.json();

      if (data.success) {
        const finalResults = { 
          dominant_dosha: data.dominant_dosha, 
          stats: data.stats 
        };
        
        if (user?.email) {
          await fetch('http://localhost:5000/api/save_results', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              dominant_dosha: data.dominant_dosha,
              stats: data.stats
            })
          });

          updateUserPrakriti({ 
            prakriti: data.dominant_dosha, 
            stats: data.stats 
          });
        }

        setResults(finalResults);
        setShowResults(true);
        toast.success("Analysis Complete!");
      } else {
        throw new Error(data.error);
      }
    } catch (e) {
      toast.error("AI Server Error. Check Flask.");
    } finally {
      setLoading(false);
    }
  };

  const handleRetake = () => {
    updateUserPrakriti({ prakriti: "Not Analyzed", stats: {} });
    setResults(null);
    setShowResults(false);
    setCurrentQuestion(0);
    setAnswers({});
  };

  // ✅ RESULTS VIEW
  if (showResults && results) {
    return (
      <div className="w-full min-h-screen py-10">
        <DoshaResults data={results} />
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1 }}
          className="text-center mt-12 pb-20"
        >
          <button 
            onClick={handleRetake} 
            className="bg-amber-900 hover:bg-amber-950 text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl transition-all hover:scale-105"
          >
            Retake AI Analysis
          </button>
        </motion.div>
      </div>
    );
  }

  // ⏳ LOADING VIEW
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-24 h-24 border-8 border-amber-200 border-t-amber-900 rounded-full mb-8"
        />
        <h2 className="text-3xl font-bold text-amber-950 animate-pulse">
          AyuSense AI is Analyzing...
        </h2>
      </div>
    );
  }

  // 🧠 QUIZ UI (WHITE BLOCK STRUCTURE)
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 min-h-screen">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-amber-950 mb-4 font-serif">Prakriti Analysis</h1>
        <div className="w-full bg-amber-100 rounded-full h-2.5 mb-2 shadow-inner overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            className="bg-green-600 h-full rounded-full transition-all duration-300" 
          />
        </div>
        <p className="text-amber-800 font-bold uppercase tracking-widest text-xs">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentQuestion}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="bg-white/95 backdrop-blur-md p-10 md:p-16 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-amber-50/50 min-h-[450px] flex flex-col justify-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-amber-950 mb-10 leading-tight">
            {questions[currentQuestion].question}
          </h2>

          <div className="grid gap-4">
            {questions[currentQuestion].options.map((opt, i) => (
              <motion.button 
                key={i}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(i)}
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all text-lg font-semibold ${
                  answers[questions[currentQuestion].id] === opt 
                  ? 'border-green-600 bg-green-50 text-green-900 shadow-sm' 
                  : 'border-amber-50 bg-white hover:border-green-200 text-amber-900 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{opt}</span>
                  {answers[questions[currentQuestion].id] === opt && (
                    <div className="bg-green-600 rounded-full p-1">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-12 items-center px-4">
        <button 
          onClick={() => setCurrentQuestion(c => Math.max(0, c - 1))} 
          disabled={currentQuestion === 0} 
          className="flex items-center text-amber-900 font-bold disabled:opacity-30 hover:text-amber-700 transition-colors"
        >
          <ChevronLeftIcon className="w-6 h-6 mr-1" /> Previous
        </button>
        
        {currentQuestion === questions.length - 1 ? (
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={calculatePrakriti} 
            className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 rounded-full font-black text-xl shadow-lg transition-colors"
          >
            Show Results
          </motion.button>
        ) : (
          <button 
            onClick={() => setCurrentQuestion(c => c + 1)} 
            disabled={!answers[questions[currentQuestion].id]} 
            className="flex items-center text-amber-900 font-bold disabled:opacity-30 hover:text-amber-700 transition-colors"
          >
            Next <ChevronRightIcon className="w-6 h-6 ml-1" />
          </button>
        )}
      </div>
    </div>
  );
};