import React, { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";
import CATEGORIES from "../data/categories";

export default function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    API.get("habits/")
      .then((res) => setHabits(res.data))
      .catch((err) => console.error("Error fetching habits:", err));
  }, []);

  // Apply category filter
  const filteredHabits =
    filter === "all"
      ? habits
      : habits.filter((h) => h.category === filter);

  return (
    <div className="container">
      <h1 style={{ marginBottom: "30px" }}>Your Habits</h1>

      {/* Top Buttons */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Link to="/add">
          <button>+ Add New Habit</button>
        </Link>

        <Link to="/analytics">
          <button>View Analytics</button>
        </Link>

        {/* Category Filter */}
        <select
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #D1D5DB",
          }}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Habit Cards */}
      <div className="flex" style={{ marginTop: "20px" }}>
        {filteredHabits.length === 0 && (
          <p>No habits added yet.</p>
        )}

        {filteredHabits.map((habit) => {
          const categoryInfo = CATEGORIES.find(
            (c) => c.value === habit.category
          );

          return (
            <div key={habit.id} className="card" style={{ width: "300px" }}>
              <h2>{habit.name}</h2>

              {/* Category badge */}
              <span
                style={{
                  background: categoryInfo?.color || "#999",
                  padding: "5px 10px",
                  borderRadius: "12px",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: 600,
                  display: "inline-block",
                  marginBottom: "10px",
                }}
              >
                {categoryInfo?.label || habit.category}
              </span>

              <p style={{ color: "#6B7280" }}>
                Frequency: {habit.frequency}
              </p>

              <Link to={`/habit/${habit.id}`}>
                <button style={{ marginTop: "10px", width: "100%" }}>
                  View Details
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
