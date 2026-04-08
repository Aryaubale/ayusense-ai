import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { 
  PaperAirplaneIcon, 
  MicrophoneIcon, 
  ExclamationTriangleIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { getChatResponse, detectEmergency } from '../services/api';
// 🛑 Removed Supabase import
import { ChatMessage } from '../types';
import toast from 'react-hot-toast';

interface ChatMessageUI extends ChatMessage {
  isLoading?: boolean;
}

export const Chat: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const [messages, setMessages] = useState<ChatMessageUI[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emergencyAlert, setEmergencyAlert] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // 🌍 Base URL for your Flask Backend
  const API_URL = "http://localhost:5000/api";

  useEffect(() => {
    loadChatHistory();
    initializeSpeechRecognition();
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 🔄 1. Load History from MongoDB instead of Supabase
  const loadChatHistory = async () => {
    if (!user?.email) return;
    try {
      const response = await fetch(`${API_URL}/chat_history?email=${user.email}`);
      const data = await response.json();
      if (data.success) {
        setMessages(data.history);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const initializeSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };
      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast.error('Speech recognition error.');
      };
      recognitionRef.current.onend = () => setIsListening(false);
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // 💬 2. Send Message and Save to MongoDB
  const handleSendMessage = async (customMessage?: string) => {
    const msgToSend = customMessage || inputMessage;
    if (!msgToSend.trim() || isLoading) return;

    const userMessage = msgToSend.trim();
    setInputMessage('');
    setIsLoading(true);

    // Emergency Detection
    if (detectEmergency(userMessage)) {
      setEmergencyAlert(true);
      setTimeout(() => setEmergencyAlert(false), 10000);
    }

    const tempId = Date.now().toString();
    const newMessage: ChatMessageUI = {
      id: tempId,
      user_id: user?._id || '', // Using MongoDB _id
      message: userMessage,
      response: '',
      created_at: new Date().toISOString(),
      isLoading: true,
    };

    setMessages(prev => [...prev, newMessage]);

    try {
      // Step A: Get AI Response from Flask
      const { response } = await getChatResponse(userMessage);

      // Step B: Save to MongoDB via Flask
      const saveResponse = await fetch(`${API_URL}/save_chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
          message: userMessage,
          response: response
        }),
      });

      const saveData = await saveResponse.json();

      if (saveData.success) {
        setMessages(prev => prev.map(msg => 
          msg.id === tempId ? { ...saveData.chat, isLoading: false } : msg
        ));
      } else {
        // Fallback if save fails but AI worked
        setMessages(prev => prev.map(msg => 
          msg.id === tempId ? { ...newMessage, response, isLoading: false } : msg
        ));
      }
    } catch (error) {
      console.error('Chat Error:', error);
      toast.error('Failed to connect to AI server.');
      setMessages(prev => prev.filter(msg => msg.id !== tempId));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Navigation Header */}
      <div className="bg-gray-50/50 p-2 border-b flex items-center justify-between">
        <button onClick={() => navigate("/dashboard")} className="text-xs text-green-700 font-medium px-3 py-1 hover:bg-green-50 rounded-lg">
          ← Dashboard
        </button>
        <span className="text-sm font-semibold text-gray-500 pr-4">AyuSense AI Chat</span>
      </div>

      {/* Emergency Alert */}
      <AnimatePresence>
        {emergencyAlert && (
          <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} className="bg-red-600 text-white p-3 text-center z-50">
            <div className="flex justify-center items-center gap-2">
              <ExclamationTriangleIcon className="w-5 h-5" />
              <span className="text-sm font-medium">Please seek immediate medical attention for severe symptoms.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-y-auto flex flex-col">
        {/* Quote Banner */}
        <div className="m-4 p-4 rounded-xl bg-green-50 border border-green-100 text-center">
          <p className="text-green-800 font-serif text-lg italic">नित्यं हिताहारविहारसेवी ॥</p>
          <p className="text-green-600 text-xs mt-1">Health comes from balanced living.</p>
        </div>

        <div className="flex-1 p-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 shadow-sm border border-green-200">
                <CpuChipIcon className="w-10 h-10" />
              </div>
              <div className="max-w-md">
                <h2 className="text-2xl font-bold text-gray-800">Welcome, {user?.name?.split(' ')[0]}</h2>
                <p className="text-gray-500 mt-2">How can AyuSense help your wellness journey today?</p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 mt-4">
                {['I have a headache', 'Feeling stressed', 'Better digestion tips'].map((chip) => (
                  <button 
                    key={chip}
                    onClick={() => handleSendMessage(chip)}
                    className="px-6 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-green-300 hover:bg-green-50 transition-all shadow-sm"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6 pb-10">
              {messages.map((message) => (
                <div key={message.id} className="space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-green-600 text-white p-3 px-5 rounded-2xl rounded-tr-none shadow-sm max-w-[80%]">
                      {message.message}
                    </div>
                  </div>
                  <div className="flex justify-start items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center shrink-0 border border-green-200">
                      <span className="text-xs">🌿</span>
                    </div>
                    <div className="bg-gray-100 text-gray-800 p-4 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] border border-gray-200">
                      {message.isLoading ? (
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap">{message.response}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Bar */}
      <div className="p-4 bg-white border-t">
        <div className="max-w-4xl mx-auto flex gap-3 items-center bg-gray-100 p-1.5 pl-4 rounded-2xl border border-gray-200">
          <input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 bg-transparent border-none focus:ring-0 text-gray-700 py-2 outline-none"
            placeholder="Describe your concern..."
          />
          <button 
            onClick={() => isListening ? stopListening() : startListening()}
            className={`p-2 rounded-xl transition-colors ${isListening ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-green-600 hover:bg-green-50'}`}
          >
            <MicrophoneIcon className="w-6 h-6" />
          </button>
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-green-600 hover:bg-green-700 text-white p-2.5 rounded-xl disabled:opacity-50 transition-all shadow-md active:scale-95"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[10px] text-gray-400 text-center mt-2">Consult a professional for serious medical issues.</p>
      </div>
    </div>
  );
};