import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  ChatBubbleLeftRightIcon, 
  DocumentTextIcon, 
  ClockIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  LanguageIcon,
  UserGroupIcon, 
  InformationCircleIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export const Sidebar: React.FC = () => {
  const { signOut, user } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const navItems = [
    { to: '/dashboard', icon: HomeIcon, label: t('dashboard') },
    { to: '/profile', icon: UserIcon, label: 'My Profile' },
    { to: '/chat', icon: ChatBubbleLeftRightIcon, label: t('chat') },
    { to: '/human-prakriti', icon: InformationCircleIcon, label: 'About Prakriti' },
    { to: '/prakriti', icon: DocumentTextIcon, label: t('prakriti') },
    { to: '/consult-vaidya', icon: UserGroupIcon, label: 'Consult Vaidya' },
    { to: '/history', icon: ClockIcon, label: t('history') },
  ];

  return (
    <div className="w-64 h-screen fixed flex flex-col shadow-xl bg-[#8a8f5a] text-white">

      {/* 🌿 LOGO */}
      <div className="p-6 bg-[#e8dfcf] text-[#2f3221]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#2f3221] rounded-xl flex items-center justify-center">
            <span className="text-white text-lg">🌿</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold">Ayusense AI</h1>
            <p className="text-xs">Wellness Platform</p>
          </div>
        </div>
      </div>

      {/* 👤 USER */}
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#2f3221] rounded-full flex items-center justify-center text-white font-semibold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">
              {user?.name}
            </p>
            <p className="text-xs text-white/70 truncate">
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* 📌 NAVIGATION */}
      <nav className="flex-1 px-4 py-2 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-[#e8dfcf] text-[#2f3221] shadow-md'
                  : 'text-white/80 hover:bg-[#4b4f2f] hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* ⚙️ BOTTOM ACTIONS (NO BORDER = NO LINE ISSUE) */}
      <div className="p-4 space-y-2">

        {/* 🌐 LANGUAGE */}
        <button
          onClick={toggleLanguage}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:bg-[#4b4f2f] transition"
        >
          <LanguageIcon className="w-5 h-5" />
          <span className="text-sm">
            {language === 'en' ? 'हिंदी (Hindi)' : 'English'}
          </span>
        </button>

        {/* ⚙️ SETTINGS */}
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              isActive
                ? 'bg-[#e8dfcf] text-[#2f3221]'
                : 'text-white/80 hover:bg-[#4b4f2f]'
            }`
          }
        >
          <Cog6ToothIcon className="w-5 h-5" />
          <span className="text-sm">{t('settings')}</span>
        </NavLink>

        {/* 🚪 SIGN OUT */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-200 hover:bg-red-500/20 transition"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span className="text-sm">{t('signOut')}</span>
        </button>

      </div>
    </div>
  );
};