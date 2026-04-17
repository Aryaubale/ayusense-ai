import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  PaperAirplaneIcon, 
  MicrophoneIcon, 
  StopIcon, 
  ChevronLeftIcon,
  TrashIcon 
} from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";
import { getChatResponse, detectEmergency } from "../services/api";
import toast from "react-hot-toast";
import bgImage from "../assets/finalbackg.jpeg";

interface IWindow extends Window {
  webkitSpeechRecognition: any;
}
const { webkitSpeechRecognition } = (window as unknown) as IWindow;

export const Chat: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [lang, setLang] = useState<"en" | "hi">("en");

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [typingTimer, setTypingTimer] = useState<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Base API URL
  const API_URL = "http://localhost:5000/api";

  // ================= DELETE MESSAGE (FIXED TO MATCH BACKEND) =================
  const deleteMessage = async (id: string) => {
    try {
      // ✅ Changed endpoint to /delete_message to match your friend's code
      const response = await fetch(`${API_URL}/delete_message`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: user?.email, 
          id: id // ✅ Changed chatId to id to match your friend's data.get("id")
        }),
      });

      if (response.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        toast.success("Message deleted");
      } else {
        toast.error("Failed to delete from history");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Network Error: Could not delete");
    }
  };

  // ================= TRANSLITERATION =================
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputMessage(val);
    if (lang === "hi" && val.length > 0) {
      const words = val.trimEnd().split(" ");
      const lastWord = words[words.length - 1];
      if (lastWord.length > 0) {
        clearTimeout(typingTimer);
        const timer = setTimeout(() => fetchSuggestions(lastWord), 100);
        setTypingTimer(timer);
      } else {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (word: string) => {
    try {
      const res = await fetch(`https://inputtools.google.com/request?text=${word}&itc=hi-t-i0-und&num=5`);
      const data = await res.json();
      if (data[0] === "SUCCESS") setSuggestions(data[1][0][1]);
    } catch (err) {
      console.error("Transliteration error", err);
    }
  };

  const selectSuggestion = (sug: string) => {
    const words = inputMessage.split(" ");
    words[words.length - 1] = sug;
    setInputMessage(words.join(" ") + " ");
    setSuggestions([]);
    inputRef.current?.focus();
  };

  // ================= CHAT HISTORY LOADING =================
  useEffect(() => {
    if (!user?.email) return;
    fetch(`${API_URL}/chat_history?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => { if (data.success) setMessages(data.history); });
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speakText = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = voices.find(v => lang === "hi" ? v.lang.includes("hi") : v.lang.includes("en"));
    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.lang = lang === "hi" ? "hi-IN" : "en-US";
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (!webkitSpeechRecognition) return toast.error("Browser not supported");
    const recognition = new webkitSpeechRecognition();
    recognition.lang = lang === "hi" ? "hi-IN" : "en-US";
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e: any) => {
      setInputMessage(e.results[0][0].transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
  };

  // ================= SEND MESSAGE =================
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    const msg = inputMessage;
    setInputMessage("");
    setSuggestions([]);
    setIsLoading(true);
    if (detectEmergency(msg)) toast.error("⚠️ Emergency Alert!");

    const id = Date.now().toString();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages(prev => [...prev, { id, message: msg, response: "", isLoading: true, time: timestamp }]);

    try {
      const enrichedMessage =
        user?.prakriti && user.prakriti !== "Not Analyzed"
          ? `You are an Ayurvedic doctor. User Prakriti: ${user.prakriti}\n\nGive a structured answer including:\n- Cause\n- Remedy\n- Diet\n- Lifestyle\n\nQuestion: ${msg}`
          : msg;

      const { response } = await getChatResponse(enrichedMessage, [], user?.prakriti || "", lang);

      // ✅ POST to /save_chat
      await fetch(`${API_URL}/save_chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
          message: msg,
          response: response
        }),
      });

      setMessages(prev => prev.map(m => m.id === id ? { ...m, response, isLoading: false } : m));
    } catch (err) {
      toast.error("Network Error");
      setMessages(prev => prev.filter(m => m.id !== id));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full relative overflow-hidden flex flex-col font-sans">
      <img src={bgImage} className="absolute w-full h-full object-cover" alt="background" />
      <div className="relative z-10 flex flex-col h-full bg-slate-900/40 backdrop-blur-[2px]">
        
        {/* HEADER */}
        <header className="bg-white/95 backdrop-blur-md px-4 py-3 flex justify-between items-center border-b border-teal-100 shadow-sm">
          <button onClick={() => navigate("/dashboard")} className="flex items-center text-teal-800 hover:text-teal-600 transition-colors font-medium">
            <ChevronLeftIcon className="w-5 h-5 mr-1" /> Back
          </button>
          <div className="text-center">
            <h1 className="font-bold text-teal-900 text-lg tracking-tight">AyuSense AI</h1>
            <p className="text-[10px] text-teal-600 font-bold uppercase tracking-widest">Ayurvedic Assistant</p>
          </div>
          <button onClick={() => { setLang(lang === "en" ? "hi" : "en"); setSuggestions([]); }} className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md transition-all active:scale-95">
            {lang === "en" ? "EN" : "हिन्दी"}
          </button>
        </header>

        {/* CHAT AREA */}
        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div key={m.id} className="group animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex flex-col items-end mb-4">
                <div className="flex items-center gap-2 group">
                  <button onClick={() => deleteMessage(m.id)} className="opacity-0 group-hover:opacity-100 p-1 text-white/50 hover:text-red-400 transition-all">
                    <TrashIcon className="w-4 h-4" />
                  </button>
                  <div className="bg-teal-600 text-white px-4 py-2.5 rounded-2xl rounded-tr-none shadow-md">
                    <p className="text-sm leading-relaxed">{m.message}</p>
                  </div>
                </div>
                <span className="text-[10px] text-white/70 mt-1 mr-1">{m.time}</span>
              </div>
              <div className="flex justify-start items-start gap-2 mb-6">
                <div className="bg-white/95 border border-teal-50 px-4 py-3 rounded-2xl rounded-bl-none max-w-[85%] relative shadow-lg">
                  {!m.isLoading && (
                    <div className="absolute -top-3 -right-3 flex gap-1">
                       <button onClick={() => speakText(m.response)} className="bg-white text-teal-600 rounded-full shadow-lg p-1.5 hover:scale-110 transition-transform border border-teal-100">
                        🔊
                      </button>
                    </div>
                  )}
                  {m.isLoading ? (
                    <div className="flex gap-1 py-1">
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  ) : (
                    <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-line">{m.response}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </main>

        {/* INPUT SECTION */}
        <footer className="p-4 bg-white/95 backdrop-blur-md border-t border-teal-100 relative">
          {suggestions.length > 0 && (
            <div className="absolute bottom-[100%] left-0 w-full bg-teal-50/95 backdrop-blur-sm border-t border-teal-200 p-2 flex gap-2 overflow-x-auto no-scrollbar shadow-inner z-50">
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => selectSuggestion(s)} className="bg-white px-4 py-1.5 rounded-lg border border-teal-200 hover:bg-teal-600 hover:text-white text-teal-800 font-medium text-sm transition-colors whitespace-nowrap shadow-sm">
                  {s}
                </button>
              ))}
            </div>
          )}
          <div className="max-w-4xl mx-auto flex gap-3 items-center">
            <button onClick={isListening ? () => recognitionRef.current.stop() : startListening} className={`p-3 rounded-2xl transition-all shadow-sm ${isListening ? "bg-red-500 animate-pulse scale-110" : "bg-teal-50 hover:bg-teal-100"}`}>
              {isListening ? <StopIcon className="w-6 h-6 text-white" /> : <MicrophoneIcon className="w-6 h-6 text-teal-700" />}
            </button>
            <div className="flex-1 relative">
              <input ref={inputRef} value={inputMessage} onChange={handleInputChange} onKeyDown={(e) => e.key === "Enter" && sendMessage()} className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-2xl outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200/50 transition-all text-sm" placeholder={lang === "en" ? "Describe your symptoms..." : "अपनी समस्या बताएं..."} />
            </div>
            <button onClick={sendMessage} disabled={isLoading || !inputMessage.trim()} className="bg-teal-800 hover:bg-teal-900 disabled:bg-slate-300 text-white p-3.5 rounded-2xl transition-all shadow-md active:scale-95">
              <PaperAirplaneIcon className="w-6 h-6 -rotate-45" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Chat;