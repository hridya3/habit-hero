import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="logo">Habit Hero</div>
      <div className="links">
        <Link to="/">Dashboard</Link>
        <Link to="/add">Add Habit</Link>
        <Link to="/analytics">Analytics</Link>
      </div>
    </nav>
  );
}
