import React from "react";
import OneRepMaxCalc from "./OneRepMaxCalc";

const Dashboard = ({ preferences, onLogout }) => {
  const mockNutrition = {
    calories: 2400,
    protein: 160,
    carbs: 250,
    fats: 80,
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Hoş Geldin! 🚀</h2>
        <button className="logout-btn" onClick={onLogout}>
          Geri Dön
        </button>
      </div>

      <p style={{ color: "var(--text-muted)" }}>
        Şu anki hedefin:{" "}
        <strong>
          {preferences.goal === "muscle_gain"
            ? "Kas Geliştirmek"
            : preferences.goal === "weight_loss"
              ? "Kilo Vermek"
              : "Formu Korumak"}
        </strong>{" "}
        <br />
        Antrenman Yerin:{" "}
        <strong>{preferences.location === "gym" ? "Spor Salonu" : "Ev"}</strong>
      </p>

      {/* Beslenme Kartı */}
      <div className="nutrition-card">
        <h3 style={{ color: "var(--primary-orange)", marginTop: 0 }}>
          🍏 Günlük Beslenme Hedefin
        </h3>
        <div className="macro-container">
          <div className="macro-item">
            <h4>{mockNutrition.calories}</h4>
            <span>Kalori</span>
          </div>
          <div className="macro-item">
            <h4>{mockNutrition.protein}g</h4>
            <span>Protein</span>
          </div>
          <div className="macro-item">
            <h4>{mockNutrition.carbs}g</h4>
            <span>Karb.</span>
          </div>
          <div className="macro-item">
            <h4>{mockNutrition.fats}g</h4>
            <span>Yağ</span>
          </div>
        </div>
      </div>

      {/* YENİ EKLENEN KISIM: 1RM Hesaplayıcı */}
      <OneRepMaxCalc />
    </div>
  );
};

export default Dashboard;
