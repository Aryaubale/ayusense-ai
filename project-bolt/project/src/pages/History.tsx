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
// 🛑 Removed Supabase import
import { ChatMessage } from '../types';
import { format } from 'date-fns';

export const History: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'chats' | 'prakriti'>('chats');

  // 🌍 Base URL for your Flask Backend
  const API_URL = "http://localhost:5000/api";

  useEffect(() => {
    if (user) {
      loadHistory();
    }
  }, [user]);

  const loadHistory = async () => {
    setLoading(true);
    try {
      // ✅ Fetching history from your NEW MongoDB route
      const response = await fetch(`${API_URL}/chat_history?email=${user?.email}`);
      const data = await response.json();
      
      if (data.success) {
        // Sort chats by date (newest first)
        const sortedChats = data.history.sort((a: any, b: any) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setChatHistory(sortedChats);
      }
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupChatsByDate = (chats: any[]) => {
    const groups: { [key: string]: any[] } = {};
    
    chats.forEach(chat => {
      const date = format(new Date(chat.created_at), 'yyyy-MM-dd');
      if (!groups[date]) {
        groups[date] = [];
      }
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
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('history')}</h1>
        <p className="text-gray-600">Review your past consultations and current assessment</p>
      </motion.div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('chats')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'chats' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                <span>Chat History ({chatHistory.length})</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('prakriti')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'prakriti' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <DocumentTextIcon className="w-5 h-5" />
                <span>Active Assessment</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {activeTab === 'chats' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {chatHistory.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                <ChatBubbleLeftRightIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Chat History</h3>
                <p className="text-gray-500 mb-6">Your consultations will appear here.</p>
              </div>
            ) : (
              groupChatsByDate(chatHistory).map(([date, chats]) => (
                <div key={date} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="w-5 h-5 text-gray-500" />
                      <h3 className="text-lg font-medium text-gray-900">{format(new Date(date), 'MMMM d, yyyy')}</h3>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {chats.map((chat) => (
                      <div key={chat.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-xs">🌿</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 mb-2">{chat.message}</p>
                            <p className="text-sm text-gray-600 mb-3">{chat.response}</p>
                            <div className="flex items-center text-xs text-gray-500">
                              <ClockIcon className="w-3 h-3 mr-1" />
                              {format(new Date(chat.created_at), 'h:mm a')}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}

        {activeTab === 'prakriti' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {!user?.prakriti || user.prakriti === "Not Analyzed" ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                <DocumentTextIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Analysis Found</h3>
                <p className="text-gray-500 mb-6">Take the assessment to unlock your Prakriti profile.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                      <ChartBarIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{user.prakriti} Dominant</h3>
                      <p className="text-sm text-gray-500">Official Analysis from AyuSense AI</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Mapping the stats from your MongoDB object */}
                  {Object.entries(user.stats || {}).map(([dosha, percentage]: [string, any]) => (
                    <div key={dosha} className="text-center p-4 bg-gray-50 rounded-2xl">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                        <div 
                          className={`h-2.5 rounded-full ${
                            dosha === 'vata' ? 'bg-blue-500' : dosha === 'pitta' ? 'bg-red-500' : 'bg-emerald-600'
                          }`} 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-sm font-bold text-gray-900 uppercase">{dosha}</p>
                      <p className="text-xl font-black text-gray-700">{percentage}%</p>
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