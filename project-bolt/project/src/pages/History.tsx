import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ClockIcon, 
  ChatBubbleLeftRightIcon, 
  DocumentTextIcon,
  ChartBarIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { format } from 'date-fns';

export const History: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'chats' | 'prakriti'>('chats');

  const API_URL = "http://localhost:5000/api";

  useEffect(() => {
    if (user) {
      loadHistory();
    }
  }, [user]);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/chat_history?email=${user?.email}`);
      const data = await response.json();

      if (data.success) {
        const sortedChats = data.history.sort(
          (a: any, b: any) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setChatHistory(sortedChats);
      }
    } catch (error) {
      console.error("Error loading history:", error);
    } finally {
      setLoading(false);
    }
  };

  const groupChatsByDate = (chats: any[]) => {
    const groups: { [key: string]: any[] } = {};

    chats.forEach(chat => {
      const date = format(new Date(chat.created_at), 'yyyy-MM-dd');
      if (!groups[date]) groups[date] = [];
      groups[date].push(chat);
    });

    return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">

      {/* HEADER */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('history')}
        </h1>
        <p className="text-gray-600">
          Review your past consultations and current assessment
        </p>
      </motion.div>

      {/* TABS */}
      <div className="mb-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">

          <button
            onClick={() => setActiveTab('chats')}
            className={`py-4 px-1 border-b-2 text-sm font-medium ${
              activeTab === 'chats'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500'
            }`}
          >
            <div className="flex items-center space-x-2">
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              <span>Chat History ({chatHistory.length})</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('prakriti')}
            className={`py-4 px-1 border-b-2 text-sm font-medium ${
              activeTab === 'prakriti'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500'
            }`}
          >
            <div className="flex items-center space-x-2">
              <DocumentTextIcon className="w-5 h-5" />
              <span>Active Assessment</span>
            </div>
          </button>

        </nav>
      </div>

      {/* CONTENT */}
      <div className="space-y-8">

        {/* CHAT TAB */}
        {activeTab === 'chats' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">

            {chatHistory.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border">
                <ChatBubbleLeftRightIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium">No Chat History</h3>
                <p className="text-gray-500">Your consultations will appear here.</p>
              </div>
            ) : (
              groupChatsByDate(chatHistory).map(([date, chats]) => (
                <div key={date} className="bg-white rounded-2xl border overflow-hidden">

                  {/* DATE HEADER */}
                  <div className="bg-gray-50 px-6 py-4 border-b">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="w-5 h-5 text-gray-500" />
                      <h3 className="font-medium">
                        {format(new Date(date), 'MMMM d, yyyy')}
                      </h3>
                    </div>
                  </div>

                  {/* CHATS */}
                  <div className="divide-y">
                    {chats.map((chat) => (
                      <div key={chat.id} className="p-6 hover:bg-gray-50">

                        <p className="font-medium text-gray-900 mb-2">
                          {chat.message}
                        </p>

                        <p className="text-gray-600 mb-3">
                          {chat.response}
                        </p>

                        <div className="flex items-center text-xs text-gray-500">
                          <ClockIcon className="w-3 h-3 mr-1" />
                          {format(new Date(chat.created_at), 'h:mm a')}
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              ))
            )}

          </motion.div>
        )}

        {/* PRAKRITI TAB */}
        {activeTab === 'prakriti' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

            {!user?.prakriti || user.prakriti === "Not Analyzed" ? (
              <div className="text-center py-12 bg-white rounded-2xl border">
                <DocumentTextIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium">No Analysis Found</h3>
                <p className="text-gray-500">Take assessment to unlock profile.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border p-8">

                <h3 className="text-2xl font-bold mb-6">
                  {user.prakriti} Dominant
                </h3>

                <div className="grid grid-cols-3 gap-6">
                  {Object.entries(user.stats || {}).map(([dosha, percentage]: any) => (
                    <div key={dosha} className="text-center">

                      <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
                        <div
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                      <p className="font-bold uppercase">{dosha}</p>
                      <p>{percentage}%</p>

                    </div>
                  ))}
                </div>

              </div>
            )}

          </motion.div>
        )}

      </div>
    </div>
  );
};

// ✅ IMPORTANT FIX (THIS SOLVES YOUR ERROR)
export default History;