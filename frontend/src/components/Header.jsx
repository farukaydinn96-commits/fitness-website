import React from "react";

const Header = ({ toggleSidebar, navigateTo, toggleTheme, isDarkMode }) => {
  return (
    <header className="main-header">
      <div
        className="logo"
        style={{ cursor: "pointer" }}
        onClick={() => navigateTo("home")}
      >
        <h1>
          FIT<span>CORE</span>
        </h1>
      </div>

      <nav className="nav-menu">
        <a
          href="/"
          className="desktop-link"
          onClick={(e) => {
            e.preventDefault();
            navigateTo("home");
          }}
        >
          HOME
        </a>
        <a
          href="/training"
          className="desktop-link"
          onClick={(e) => {
            e.preventDefault();
            navigateTo("onboarding");
          }}
        >
          TRAINING
        </a>
        <a
          href="/dashboard"
          className="desktop-link"
          onClick={(e) => {
            e.preventDefault();
            navigateTo("dashboard");
          }}
        >
          DASHBOARD
        </a>

        {/* Gece/Gündüz Teması Butonu */}
        <button
          className="theme-btn"
          onClick={toggleTheme}
          title="Temayı Değiştir"
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>

        <button className="hamburger-btn" onClick={toggleSidebar}>
          <span style={{ fontSize: "32px", fontWeight: "300" }}>=</span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
