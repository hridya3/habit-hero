import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useParams, useNavigate } from "react-router-dom";
import CATEGORIES from "../data/categories";

export default function HabitDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [habit, setHabit] = useState(null);
  const [note, setNote] = useState("");
  const [editing, setEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    API.get(`habits/${id}/`)
      .then((res) => setHabit(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  // Mark today as done with note
  const markTodayAsDone = () => {
    if (note.trim() === "") {
      alert("Please enter a note before marking done.");
      return;
    }

    API.post("checkins/", {
      habit: id,
      date: today,
      note: note,
    })
      .then(() => {
        API.get(`habits/${id}/`).then((res) => setHabit(res.data));
        setNote("");
      })
      .catch((err) => console.error(err));
  };

  // Save edited habit
  const handleEditHabit = () => {
    API.put(`habits/${id}/`, {
      name: habit.name,
      category: habit.category,
      frequency: habit.frequency,
      start_date: habit.start_date,
    })
      .then(() => {
        alert("Habit updated successfully!");
        setEditing(false);
      })
      .catch((err) => console.log(err));
  };

  // Delete habit
  const handleDeleteHabit = () => {
    API.delete(`habits/${id}/`)
      .then(() => {
        alert("Habit deleted.");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  if (!habit) return <h2>Loading...</h2>;

  const categoryInfo = CATEGORIES.find((c) => c.value === habit.category);

  return (
    <div style={{ padding: "20px" }}>
      <h1>{habit.name}</h1>

      <span
        style={{
          background: categoryInfo?.color,
          padding: "6px 12px",
          borderRadius: "12px",
          color: "white",
          fontWeight: 600,
          fontSize: "14px",
          display: "inline-block",
          marginBottom: "10px",
        }}
      >
        {categoryInfo?.label || habit.category}
      </span>

      <p>Frequency: {habit.frequency}</p>

      {/* Edit + Delete buttons */}
      <div style={{ display: "flex", gap: "10px", marginTop: "20px", width: "30%" }}>
        <button
          style={{ background: "#10B981", flex: 1 }}
          onClick={() => setEditing(true)}
        >
          Edit Habit
        </button>

        <button
          style={{ background: "#EF4444", flex: 1 }}
          onClick={() => setShowDeleteModal(true)}
        >
          Delete Habit
        </button>
      </div>

      {/* Edit Habit Form */}
      {editing && (
        <div className="card" style={{ marginTop: "20px", padding: "20px" }}>
          <h3>Edit Habit</h3>

          <input
            type="text"
            value={habit.name}
            onChange={(e) => setHabit({ ...habit, name: e.target.value })}
            style={{ width: "100%" }}
          />

          {/* Category Dropdown */}
          <select
            value={habit.category}
            onChange={(e) => setHabit({ ...habit, category: e.target.value })}
            style={{ width: "100%", marginTop: "10px" }}
          >
            {CATEGORIES.map((cat) => (
              <option value={cat.value} key={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          <select
            value={habit.frequency}
            onChange={(e) => setHabit({ ...habit, frequency: e.target.value })}
            style={{ width: "100%", marginTop: "10px" }}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>

          <input
            type="date"
            value={habit.start_date}
            onChange={(e) =>
              setHabit({ ...habit, start_date: e.target.value })
            }
            style={{ width: "100%", marginTop: "10px" }}
          />

          <button
            style={{
              width: "100%",
              marginTop: "10px",
              background: "#4F46E5",
            }}
            onClick={handleEditHabit}
          >
            Save Changes
          </button>
        </div>
      )}

      <h3 style={{ marginTop: "20px" }}>Check-ins</h3>

      <ul>
        {habit.checkins.map((c) => (
          <li key={c.id}>
            {c.date} – {c.note || "No note"}
          </li>
        ))}
      </ul>

      <h3 style={{ marginTop: "20px" }}>Daily Check-in</h3>

      {!habit.checkins.some((c) => c.date === today) && (
        <input
          type="text"
          placeholder="Write today's note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{ width: "30%", marginTop: "10px", marginBottom: "10px" }}
        />
      )}
          <br></br>

      {habit.checkins.some((c) => c.date === today) ? (
        <button
          style={{
            width: "30%",
            background: "#10B981",
            cursor: "not-allowed",
            opacity: 0.6,
            marginTop: "10px",
          }}
          disabled
        >
          ✔ Already marked as done today
        </button>
      ) : (
        <button
          style={{
            width: "30%",
            background: "#4F46E5",
            marginTop: "10px",
          }}
          onClick={markTodayAsDone}
        >
          Mark as Done Today
        </button>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h2>Delete Habit?</h2>
            <p style={{ color: "#6B7280" }}>
              This action cannot be undone.
            </p>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                style={{ background: "#EF4444", flex: 1 }}
                onClick={handleDeleteHabit}
              >
                Yes, Delete
              </button>

              <button
                style={{ background: "#374151", flex: 1 }}
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Modal Styles */
const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.35)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalBox = {
  background: "#fff",
  padding: "30px",
  borderRadius: "12px",
  width: "300px",
  boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
};
