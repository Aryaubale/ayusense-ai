import { AYURVEDIC_REMINDERS } from "../data/reminders";

export const startReminderEngine = (user: any) => {

  const sendReminderToUser = async (message: string) => {
    try {
      await fetch("http://localhost:5000/api/send-reminder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          message: message,
        }),
      });
    } catch (err) {
      console.error("Reminder failed");
    }
  };

  const interval = setInterval(() => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // HH:MM

    AYURVEDIC_REMINDERS.forEach((category) => {

      // ✅ check if user enabled this reminder
      if (!user.reminders?.[category.id]) return;

      category.tasks.forEach((task) => {
        if (task.time === currentTime) {
          sendReminderToUser(task.msg);
        }
      });

    });

  }, 60000); // every 1 min

  return interval;
};