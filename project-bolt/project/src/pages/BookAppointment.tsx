import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const VAIDYAS = [
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    specialty: "Nadi Pariksha & Internal Medicine",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400&h=400",
    desc: "Expert in pulse diagnosis and root-cause healing."
  },
  {
    id: 2,
    name: "Vaidya Rajesh Iyer",
    specialty: "Panchakarma Specialist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=400",
    desc: "Specializes in traditional detoxification therapies."
  },
  {
    id: 3,
    name: "Dr. Meera Kulkarni",
    specialty: "Women's Health & Nutrition",
    image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=400&h=400",
    desc: "Focuses on hormonal balance and lifestyle corrections."
  }
];

export const BookAppointment: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white p-8">
      <button onClick={() => navigate(-1)} className="mb-6 text-green-700 font-medium">
        ← Back
      </button>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Select a Practitioner</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        {VAIDYAS.map((v) => (
          <motion.div 
            key={v.id}
            whileHover={{ y: -5 }}
            className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            <img src={v.image} alt={v.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="font-bold text-lg">{v.name}</h3>
              <p className="text-green-600 text-sm font-semibold mb-3">{v.specialty}</p>
              <p className="text-gray-500 text-sm mb-6">{v.desc}</p>
              <button className="w-full bg-gray-900 text-white py-2 rounded-xl font-medium">
                Book Appointment
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};