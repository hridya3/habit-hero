import React, { useEffect, useState } from "react";
import API from "../api/api";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

export default function Analytics() {
  const [habits, setHabits] = useState([]);
  const [summary, setSummary] = useState({
    totalCheckins: 0,
    streak: 0,
    successRate: 0,
    bestDay: "",
  });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    API.get("habits/")
      .then((res) => {
        setHabits(res.data);
        calculateAnalytics(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const calculateAnalytics = (habitsData) => {
    let allCheckins = [];
    habitsData.forEach(h => {
      allCheckins = [...allCheckins, ...h.checkins];
    });

    // Sort by date
    allCheckins.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Total check-ins
    const totalCheckins = allCheckins.length;

    // Streak Calculation
    let streak = 0;
    let currentStreak = 1;

    for (let i = 1; i < allCheckins.length; i++) {
      const prev = new Date(allCheckins[i - 1].date);
      const curr = new Date(allCheckins[i].date);

      const diff = (curr - prev) / (1000 * 60 * 60 * 24);

      if (diff === 1) {
        currentStreak++;
      } else {
        currentStreak = 1;
      }

      streak = Math.max(streak, currentStreak);
    }

    // Success Rate (last 30 days)
    const last30 = allCheckins.filter((c) => {
      const diff = (new Date() - new Date(c.date)) / (1000 * 60 * 60 * 24);
      return diff <= 30;
    }).length;

    const successRate = ((last30 / 30) * 100).toFixed(1);

    // Best Day of Week
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const dayCount = {};

    allCheckins.forEach(c => {
      const d = new Date(c.date).getDay();
      dayCount[d] = (dayCount[d] || 0) + 1;
    });

    const bestDayIndex = Object.keys(dayCount).reduce((a,b) =>
      dayCount[a] > dayCount[b] ? a : b, 0);
    
    const bestDay = days[bestDayIndex];

    // Prepare chart data (last 14 days)
    const last14days = [];
    for (let i = 14; i >= 0; i--) {
      const day = new Date();
      day.setDate(day.getDate() - i);

      const formatted = day.toISOString().slice(0, 10);

      const count = allCheckins.filter(c => c.date === formatted).length;

      last14days.push({
        date: formatted,
        count: count,
      });
    }

    setSummary({
      totalCheckins,
      streak,
      successRate,
      bestDay,
    });

    setChartData(last14days);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Analytics Dashboard</h1>

    <button
      style={{ background: "#4F46E5", color: "white", marginTop: "20px" }}
      onClick={() => {
        window.open("http://127.0.0.1:8000/api/export-pdf/", "_blank");
      }}
    >
      Export Progress as PDF
    </button>


      <div style={{
        display: "flex",
        gap: "20px",
        marginTop: "20px",
        flexWrap: "wrap"
      }}>
        <Card title="Total Check-ins" value={summary.totalCheckins} />
        <Card title="Best Streak" value={summary.streak + " days"} />
        <Card title="Success Rate (30 days)" value={summary.successRate + "%"} />
        <Card title="Best Day" value={summary.bestDay} />
      </div>

      <h2 style={{ marginTop: "40px" }}>Progress (Last 14 Days)</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="blue" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={{
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      width: "200px",
      background: "#fafafa"
    }}>
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
}
