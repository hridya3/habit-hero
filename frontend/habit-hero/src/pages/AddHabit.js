import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import CATEGORIES from "../data/categories";

export default function AddHabit() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    frequency: "daily",
    start_date: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter a habit name.");
      return;
    }
    if (!form.category) {
      alert("Please select a category.");
      return;
    }
    if (!form.start_date) {
      alert("Please choose a start date.");
      return;
    }

    API.post("habits/", form)
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container" style={{ maxWidth: "600px", margin: "auto" }}>
      <div
        className="card"
        style={{ padding: "30px", borderRadius: "16px", marginTop: "20px" }}
      >
        <h1 style={{ marginBottom: "20px" }}>Add New Habit</h1>

<form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>

  {/* Habit Name */}
  <label style={{ fontWeight: 600 }}>Habit Name</label>
  <input
    type="text"
    placeholder="Ex: Morning Workout"
    onChange={(e) => setForm({ ...form, name: e.target.value })}
    style={{ width: "100%", marginBottom: "16px" , marginLeft: "10px"}}
  />
  <br></br>

  {/* Category */}
  <label style={{ fontWeight: 600 }}>Category</label>
  <select
    onChange={(e) => setForm({ ...form, category: e.target.value })}
    required
    style={{ width: "100%", marginBottom: "16px" , marginLeft: "10px"}}
  >
    <option value="">Select a Category</option>
    {CATEGORIES.map((cat) => (
      <option value={cat.value} key={cat.value}>
        {cat.label}
      </option>
    ))}
  </select>
    <br></br>

  {/* Frequency */}
  <label style={{ fontWeight: 600 }}>Frequency</label>
  <select
    onChange={(e) => setForm({ ...form, frequency: e.target.value })}
    style={{ width: "100%", marginBottom: "16px" , marginLeft: "10px"}}
  >
    <option value="daily">Daily</option>
    <option value="weekly">Weekly</option>
  </select>
    <br></br>

  {/* Start Date */}
  <label style={{ fontWeight: 600 }}>Start Date</label>
  <input
    type="date"
    onChange={(e) => setForm({ ...form, start_date: e.target.value })}
    style={{ width: "100%", marginBottom: "20px", marginLeft: "10px" }}
  />
    <br></br>

  {/* Save Button */}
  <button
    type="submit"
    style={{
      width: "100%",
      padding: "12px",
      background: "#4F46E5",
      color: "white",
      fontWeight: "600",
      borderRadius: "10px",
      transition: "0.25s",
    }}
  >
    Save Habit
  </button>
</form>

      </div>
    </div>
  );
}
