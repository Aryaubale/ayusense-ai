import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserCircleIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  BriefcaseIcon, 
  CakeIcon,
  IdentificationIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

export const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const profileFields = [
    { label: 'Full Name', value: user.name, icon: UserCircleIcon },
    { label: 'Email Address', value: user.email, icon: EnvelopeIcon },
    { label: 'Age', value: user.age ? `${user.age} Years` : 'Not Set', icon: CakeIcon },
    { label: 'Gender', value: user.gender || 'Not Set', icon: IdentificationIcon },
    { label: 'Occupation', value: user.occupation || 'Not Set', icon: BriefcaseIcon },
    { label: 'Location', value: user.location || 'Not Set', icon: MapPinIcon },
  ];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] shadow-xl border border-green-50 overflow-hidden"
      >
        {/* Header/Banner */}
        <div className="h-32 bg-gradient-to-r from-green-600 to-emerald-700" />
        
        <div className="px-8 pb-12">
          {/* Profile Picture Placeholder */}
          <div className="relative -mt-16 mb-6">
            <div className="w-32 h-32 bg-white rounded-3xl p-2 shadow-lg">
              <div className="w-full h-full bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                <span className="text-4xl font-bold">{user.name?.charAt(0)}</span>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-500">Ayurvedic Wellness Explorer</p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {profileFields.map((field, idx) => (
              <div key={idx} className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-green-600 shadow-sm">
                  <field.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {field.label}
                  </p>
                  <p className="text-lg font-medium text-gray-800">
                    {field.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Prakriti Badge */}
          <div className="mt-12 p-6 rounded-3xl bg-green-600 text-white flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Stored Prakriti</p>
              <p className="text-2xl font-bold">{user.prakriti || "Not Analyzed"}</p>
            </div>
            <div className="text-4xl">🌿</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};