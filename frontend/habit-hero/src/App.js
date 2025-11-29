import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import AddHabit from "./pages/AddHabit";
import HabitDetail from "./pages/HabitDetail";
import Analytics from "./pages/Analytics";
import Navbar from "./components/Navbar";

import NotificationPopup from "./components/NotificationPopup";
import useDailyReminder from "./hooks/useDailyReminder";

function App() {
  const message = useDailyReminder();
  const [showPopup, setShowPopup] = useState(true);

  return (
    <BrowserRouter>
      {message && showPopup && (
        <NotificationPopup
          message={message}
          onClose={() => setShowPopup(false)}
        />
      )}

      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddHabit />} />
        <Route path="/habit/:id" element={<HabitDetail />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
