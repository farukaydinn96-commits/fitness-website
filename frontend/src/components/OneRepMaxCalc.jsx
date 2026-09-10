import React, { useState } from "react";

const OneRepMaxCalc = () => {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [maxWeight, setMaxWeight] = useState(null);

  const calculate1RM = (e) => {
    e.preventDefault();
    if (weight > 0 && reps > 0) {
      const calculatedMax = weight * (1 + reps / 30);
      setMaxWeight(calculatedMax.toFixed(1));
    }
  };

  return (
    <div className="calculator-card">
      <h3 style={{ color: "var(--primary-orange)", marginTop: 0 }}>
        🏋️‍♂️ 1RM Hesaplayıcı
      </h3>
      <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
        Tek seferde kaldırabileceğin maksimum ağırlığı bul.
      </p>

      <form onSubmit={calculate1RM} className="calc-form">
        <div className="input-group">
          <label>Kaldırılan Ağırlık (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Örn: 80"
            required
            min="1"
          />
        </div>
        <div className="input-group">
          <label>Tekrar Sayısı</label>
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            placeholder="Örn: 8"
            required
            min="1"
            max="30"
          />
        </div>
        <button type="submit" className="calc-btn">
          Hesapla
        </button>
      </form>

      {maxWeight && (
        <div className="calc-result">
          <p>Tahmini Maksimum Ağırlığın:</p>
          <h2>
            {maxWeight}{" "}
            <span style={{ fontSize: "18px", color: "var(--text-muted)" }}>
              kg
            </span>
          </h2>
        </div>
      )}
    </div>
  );
};

export default OneRepMaxCalc;
