import React, { useEffect, useState } from 'react';
import '../styles/SplashScreen.css';

const SplashScreen = ({ onComplete }) => {
  const [isSplashFinished, setSplashFinished] = useState(false);

  useEffect(() => {
    // Start the text transition after the box animation
    const textTimeout = setTimeout(() => {
      document.querySelector('.marter-text').style.transform = 'translateX(0)';
      document.querySelector('.marter-text').style.opacity = '1';
    }, 1500); // Adjusted delay for text transition

    return () => clearTimeout(textTimeout);
  }, []);

  useEffect(() => {
    // Start the fade-out transition after splash screen is done
    const timer = setTimeout(() => {
      setSplashFinished(true); // Start the fade-out effect
      setTimeout(() => {
        onComplete(); // Trigger transition to homepage after fade-out completes
      }, 1300); // Fade-out time adjusted to 1300ms for smoother transition
    }, 2000); // Total splash screen duration (slightly longer to match transitions)

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`splash-container ${isSplashFinished ? 'fade-out' : ''}`}>
      {/* Full-screen 3x3 grid overlay */}
      <div className="grid-overlay">
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
      </div>

      <svg className="splash-svg" width="350" height="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 100">
        {/* Background behind the 'S' box */}
        <rect className="box-background" x="5" y="5" width="90" height="90" />
        
        {/* Blocky "S" symbol on top of the white box */}
        <path d="M30 30 H70 V40 H40 V50 H70 V70 H30 V60 H60 V50 H30 Z" />
        
        {/* 'MARTER' text */}
        <text
          className="marter-text"
          x="105"
          y="69.5"
          fontSize="55"
          fontFamily="'Inter', sans-serif"
          fontWeight="600"
          textAnchor="start"
          fill="black"
        >
          MARTER
        </text>
      </svg>
    </div>
  );
};

export default SplashScreen;
