// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css'; // Global styles
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';
import Auth from './components/Auth'; // Import LoginForm component
import SplashScreen from './components/SplashScreen'; // Import SplashScreen component
import ProfilePanel from './components/ProfilePanel';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

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
          <Route path="/auth" element={<Auth />} /> {/* Add Login page route */}
          {/* Protect the /profile route */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePanel />} /> {/* Add Profile page route */}
          </Route>
        </Routes>
      )}
    </Router>
  );
}

export default App;