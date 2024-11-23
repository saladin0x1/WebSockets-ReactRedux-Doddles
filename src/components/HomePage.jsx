// src/components/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css'; // Import styles for HomePage

const HomePage = () => {
  const navigate = useNavigate();
  const [showHomePage, setShowHomePage] = useState(false);

  // Function for handling button clicks
  const handleButtonClick = (role) => {
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/user');
    }
  };

  useEffect(() => {
    // Immediately trigger homepage fade-in right after splash fade-out ends
    setTimeout(() => {
      setShowHomePage(true); // Immediately show the homepage
    }, 100); // Triggered after splash screen fade-out (total time should match)

  }, []);

  return (
    <div id="home-page" className={`home-page ${showHomePage ? 'visible' : ''}`}>
      <h1>Welcome to Buzzer Quiz Playground</h1>
      <div className="buttons">
        <button onClick={() => handleButtonClick('admin')}>Admin</button>
        <button onClick={() => handleButtonClick('user')}>User</button>
      </div>
    </div>
  );
};

export default HomePage;
