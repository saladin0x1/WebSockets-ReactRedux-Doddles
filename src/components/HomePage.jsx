// src/components/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css'; // Import styles for HomePage

const HomePage = () => {
  const navigate = useNavigate();

  // Function for handling button clicks
  const handleButtonClick = (role) => {
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/user');
    }
  };

  return (
    <div className="home-page">
      <h1>Welcome to Buzzer Quiz Playground</h1>
      <div className="buttons">
        <button onClick={() => handleButtonClick('admin')}>Admin</button>
        <button onClick={() => handleButtonClick('user')}>User</button>
      </div>
    </div>
  );
};

export default HomePage;
