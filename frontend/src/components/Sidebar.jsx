import React from "react";

const Sidebar = ({ isOpen, toggleSidebar, navigateTo, handleLogout }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        &times;
      </button>

      <div className="sidebar-content">
        <h3 style={{ color: "var(--primary-orange)", letterSpacing: "2px" }}>
          MENU
        </h3>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigateTo("dashboard");
          }}
        >
          🏋️‍♂️ My Workouts
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigateTo("onboarding");
          }}
        >
          📋 Create Plan
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigateTo("home");
          }}
        >
          🏠 Home
        </a>
        <a href="#" onClick={(e) => e.preventDefault()}>
          ⚙️ Settings
        </a>

        <a
          href="#"
          style={{ color: "#ff4444", marginTop: "20px", fontWeight: "700" }}
          onClick={(e) => {
            e.preventDefault();
            handleLogout();
          }}
        >
          Logout
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
