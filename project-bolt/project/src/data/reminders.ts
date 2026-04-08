// Define what a single task looks like
export interface ReminderTask {
  time: string;
  msg: string;
  subtitle: string;
}

// Define what a category (like Brahma Muhurta) looks like
export interface ReminderCategory {
  id: "brahmaMuhurta" | "dinacharya" | "herbReminder"; // These match your MongoDB keys exactly
  title: string;
  icon: string;
  color: string;
  tasks: ReminderTask[];
}

export const AYURVEDIC_REMINDERS: ReminderCategory[] = [
  { 
    id: 'brahmaMuhurta', 
    title: 'Brahma Muhurta', 
    icon: '🌅',
    color: '#F59E0B', 
    tasks: [
      { time: '04:30', msg: 'Rise with the Sages! The world is quiet and your mind is clear. Perfect time for Dhyana.', subtitle: 'Sattva Rising' },
      { time: '05:00', msg: 'Internal Shower Time! Sip warm water to flush yesterday’s toxins (Ama) away.', subtitle: 'Detox Start' },
      { time: '22:00', msg: 'Enter the Healing Zone. Your liver starts its deep detox now. Sweet dreams!', subtitle: 'Cellular Repair' }
    ]
  },
  { 
    id: 'dinacharya', 
    title: 'Daily Routine', 
    icon: '☀️',
    color: '#10B981', 
    tasks: [
      { time: '06:00', msg: 'Ignite the Inner Fire! A quick stretch and warm water to wake up your Agni.', subtitle: 'Metabolic Spark' },
      { time: '12:30', msg: 'Peak Performance Fuel. The Sun is high and your Agni is strongest. Eat your main meal now!', subtitle: 'Power Lunch' },
      { time: '19:00', msg: 'Sun Setting, Stomach Resting. Keep it light so your body can focus on sleep.', subtitle: 'Light Evening' }
    ]
  },
  { 
    id: 'herbReminder', 
    title: 'Herb Schedule', 
    icon: '🌿',
    color: '#3B82F6', 
    tasks: [
      { time: '07:00', msg: 'The Immunity Shield. Warm Ginger & Tulsi tea to guard your health and spark metabolism.', subtitle: 'Immune Boost' },
      { time: '21:00', msg: 'Golden Recovery. Sip your Turmeric milk for anti-inflammatory muscle and joint repair.', subtitle: 'Anti-Inflammatory' },
      { time: '21:45', msg: 'The Great Cleanse. Triphala with warm water to reset your system for a fresh tomorrow.', subtitle: 'Digestive Reset' }
    ]
  }
];