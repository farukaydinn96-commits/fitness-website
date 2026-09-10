import React, { useState } from "react";

const Onboarding = ({ onComplete }) => {
  const [goal, setGoal] = useState("");
  const [location, setLocation] = useState("");
  const [equipment, setEquipment] = useState("");

  const handleSubmit = () => {
    if (!goal || !location || !equipment) {
      alert("Please complete all selections to continue!"); // Uyarıyı da İngilizce yaptık
      return;
    }

    // Seçimleri Dashboard'a gönderiyoruz
    onComplete({ goal, location, equipment });
  };

  return (
    <div className="onboarding-container fade-in show">
      <h2>Build Your Custom Plan</h2>

      {/* 1. SORU: HEDEF */}
      <div className="question-block">
        <label>What is your primary goal?</label>
        <div className="selection-grid">
          <div
            className={`selection-card ${goal === "muscle" ? "active" : ""}`}
            onClick={() => setGoal("muscle")}
          >
            <span className="icon">💪</span>
            <p>Build Muscle</p>
          </div>
          <div
            className={`selection-card ${goal === "weightloss" ? "active" : ""}`}
            onClick={() => setGoal("weightloss")}
          >
            <span className="icon">🔥</span>
            <p>Lose Weight</p>
          </div>
          <div
            className={`selection-card ${goal === "maintain" ? "active" : ""}`}
            onClick={() => setGoal("maintain")}
          >
            <span className="icon">⚡</span>
            <p>Stay Fit</p>
          </div>
        </div>
      </div>

      {/* 2. SORU: MEKAN (2'li ızgara) */}
      <div className="question-block">
        <label>Where will you train?</label>
        <div
          className="selection-grid"
          style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
        >
          <div
            className={`selection-card ${location === "gym" ? "active" : ""}`}
            onClick={() => setLocation("gym")}
          >
            <span className="icon">🏋️‍♂️</span>
            <p>Gym Facility</p>
          </div>
          <div
            className={`selection-card ${location === "home" ? "active" : ""}`}
            onClick={() => setLocation("home")}
          >
            <span className="icon">🏠</span>
            <p>Home / Outdoors</p>
          </div>
        </div>
      </div>

      {/* 3. SORU: EKİPMAN */}
      <div className="question-block">
        <label>Available equipment?</label>
        <div className="selection-grid">
          <div
            className={`selection-card ${equipment === "bodyweight" ? "active" : ""}`}
            onClick={() => setEquipment("bodyweight")}
          >
            <span className="icon">🧘‍♂️</span>
            <p>Bodyweight</p>
          </div>
          <div
            className={`selection-card ${equipment === "dumbbells" ? "active" : ""}`}
            onClick={() => setEquipment("dumbbells")}
          >
            <span className="icon">🎒</span>
            <p>Dumbbells Only</p>
          </div>
          <div
            className={`selection-card ${equipment === "full" ? "active" : ""}`}
            onClick={() => setEquipment("full")}
          >
            <span className="icon">⚙️</span>
            <p>Full Equipment</p>
          </div>
        </div>
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        Generate My Program
      </button>
    </div>
  );
};

export default Onboarding;
