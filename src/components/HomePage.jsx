import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import GridOverlay from './GridOverlay'; // Ensure correct path to GridOverlay

import logo from '../assets/logo.svg'; // Import the SVG logo

const HomePage = () => {
  const navigate = useNavigate();
  const [showHomePage, setShowHomePage] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State to track hamburger menu toggle
  const [randomCopy, setRandomCopy] = useState('');
  const isGridEnabled = false; // Toggle grid visibility (set to true/false as needed)

  // Random copywriting content array
  const copywritingOptions = [
    'Do you have the buzzer skills to win?',
    'Test your knowledge and be the champion!',
    'It’s not just a quiz, it’s a challenge!',
    'Ready, set, buzz!',
    'Get your brain buzzing with fun trivia!',
    'Who’s got the fastest fingers in the quiz world?',
    'The quiz starts now – don’t miss out!',
    'Trivia made fun, with a buzzer twist!',
  ];

  // Select a random copywriting message
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * copywritingOptions.length);
    setRandomCopy(copywritingOptions[randomIndex]);

    // Simulate a delay before showing the homepage
    setTimeout(() => {
      setShowHomePage(true); // Make the homepage visible by adding the 'visible' class
    }, 500); // 500ms delay before fading in
  }, []);

  const handleNavigation = (role) => {
    setMenuOpen(false); // Close the menu after navigation
    if (role === 'admin') {
      window.location.href = 'http://localhost:3000/admin';
    } else if (role === 'user') {
      window.location.href = 'http://localhost:3000/';
    } else if (role === 'auth') {
      navigate('/auth'); // Navigate to login page
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev); // Toggle menu on hamburger click
  };

  const handleMouseEnter = () => {
    setMenuOpen(true); // Open the menu when mouse enters
  };

  const handleMouseLeave = () => {
    setMenuOpen(false); // Close the menu when mouse leaves
  };

  return (
    <div id="home-page" className={`home-page ${showHomePage ? 'visible' : ''}`}>
      {/* Include the GridOverlay component if isGridEnabled is true */}
      {isGridEnabled && <GridOverlay isEnabled={isGridEnabled} />}

      <header className="navbar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </div>

        {/* Hamburger Menu for Small Screens */}
        <div
          className="hamburger-menu"
          onClick={toggleMenu} // Toggle menu open/close on click
        >
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div
            className="dropdown-menu"
            onMouseEnter={handleMouseEnter} // Keep menu open when mouse hovers
            onMouseLeave={handleMouseLeave} // Close menu when mouse leaves
          >
            <div className="dropdown-item" onClick={() => handleNavigation('admin')}>
              Admin
            </div>
            <div className="dropdown-item" onClick={() => handleNavigation('user')}>
              User
            </div>
            <div className="dropdown-item" onClick={() => handleNavigation('auth')}>
              Auth
            </div>
          </div>
        )}
      </header>

      <section className="welcome-section">
        <h1>Welcome to Buzzer Quiz Playground</h1>
        <p>Get ready to challenge your knowledge and have fun!</p>
      </section>

      <section className="random-copy-section">
        <p>{randomCopy}</p>
      </section>
    </div>
  );
};

export default HomePage;
