// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css'; // Global styles
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';
import SplashScreen from './components/SplashScreen'; // Import SplashScreen component

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false); // Hide splash screen once animation is complete
  };

  return (
    <Router>
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} /> // Show splash screen
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
