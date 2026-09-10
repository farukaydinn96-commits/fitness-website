import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Onboarding from "./components/Onboarding";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import CustomCursor from "./components/CustomCursor";
import "./App.css";

function App() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [userPreferences, setUserPreferences] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const navigateTo = (screen) => {
    if (screen === "dashboard" && !userPreferences) {
      alert("Please create a plan first!");
      setCurrentScreen("onboarding");
    } else {
      setCurrentScreen(screen);
    }
    setIsSidebarOpen(false);
  };

  const finishOnboarding = (secimler) => {
    setUserPreferences(secimler);
    navigateTo("dashboard");
  };

  const handleLogout = () => {
    setUserPreferences(null);
    navigateTo("home");
  };

  return (
    <div className={`app-wrapper ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      {/* Özel İmleç */}
      <CustomCursor />

      <Header
        toggleSidebar={toggleSidebar}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        navigateTo={navigateTo}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        navigateTo={navigateTo}
        handleLogout={handleLogout}
      />

      <main className="main-content">
        {currentScreen === "home" && (
          <Hero
            onStart={() => navigateTo("onboarding")}
            onNavigate={navigateTo}
          />
        )}
        {currentScreen === "onboarding" && (
          <Onboarding onComplete={finishOnboarding} />
        )}
        {currentScreen === "dashboard" && (
          <Dashboard preferences={userPreferences} onLogout={handleLogout} />
        )}
      </main>

      {currentScreen !== "home" && <Footer />}
    </div>
  );
}

export default App;
