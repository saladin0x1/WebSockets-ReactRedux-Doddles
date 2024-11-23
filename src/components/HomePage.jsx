import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import logo from '../assets/logo.svg'; // Import the SVG logo

const HomePage = () => {
  const navigate = useNavigate();
  const [showHomePage, setShowHomePage] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State to track hamburger menu toggle

  useEffect(() => {
    setTimeout(() => {
      setShowHomePage(true); // Simulate a delay before showing the homepage
    }, 300); // 500ms delay to allow the splash screen to fade out
  }, []);

  const handleNavigation = (role) => {
    setMenuOpen(false); // Close the menu after navigation
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/user');
    }
  };

  return (
    <div id="home-page" className={`home-page ${showHomePage ? 'visible' : ''}`}>
      <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </div>
        <div
          className="hamburger-menu"
          onClick={() => setMenuOpen(!menuOpen)} // Toggle menu open/close
        >
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        {menuOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item" onClick={() => handleNavigation('admin')}>
              Admin
            </div>
            <div className="dropdown-item" onClick={() => handleNavigation('user')}>
              User
            </div>
          </div>
        )}
      </nav>
      <h1>Welcome to Buzzer Quiz Playground</h1>
    </div>
  );
};

export default HomePage;
