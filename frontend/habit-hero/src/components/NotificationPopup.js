import React, { useEffect } from "react";

export default function NotificationPopup({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={popupStyles}>
      <strong style={{ fontSize: "16px" }}>📣 Reminder</strong>
      <p style={{ marginTop: "8px" }}>{message}</p>
    </div>
  );
}

const popupStyles = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  background: "#4F46E5",
  color: "white",
  padding: "16px 22px",
  borderRadius: "10px",
  boxShadow: "0 5px 18px rgba(0,0,0,0.25)",
  zIndex: 9999, // HIGH PRIORITY TO BE VISIBLE
  maxWidth: "300px",
};
