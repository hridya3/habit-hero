import { useEffect, useState } from "react";
import API from "../api/api";

const QUOTES = [
  "Small steps every day lead to big changes.",
  "Consistency beats intensity. Keep going!",
  "Today's effort is tomorrow's success.",
  "You don't have to be perfect — just present.",
  "Stay focused. Stay determined.",
  "You are one habit away from a better life.",
];

export default function useDailyReminder() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    API.get("habits/")
      .then((res) => {
        const habits = res.data;
        const today = new Date().toISOString().slice(0, 10);

        let pendingHabits = habits.filter(
          (h) => !h.checkins.some((c) => c.date === today)
        );

        let doneHabits = habits.filter(
          (h) => h.checkins.some((c) => c.date === today)
        );

        // If user has pending habits → motivational quote
        if (pendingHabits.length > 0) {
          const quote =
            QUOTES[Math.floor(Math.random() * QUOTES.length)];
          setMessage(
            `You still have habits to complete today. Stay on track!  — "${quote}"`
          );
        }

        // If all done → congratulatory quote
        else if (habits.length > 0) {
          const quote =
            QUOTES[Math.floor(Math.random() * QUOTES.length)];
          setMessage(
            `Great job completing your habits today!  — "${quote}"`
          );
        }
      })
      .catch((err) => console.log("Reminder error:", err));
  }, []);

  return message;
}

