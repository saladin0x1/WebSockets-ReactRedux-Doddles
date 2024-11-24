// src/components/GridOverlay.jsx
import React from 'react';
import '../styles/GridOverlay.css'; // Make sure your styles are imported

const GridOverlay = ({ isEnabled }) => {
  if (!isEnabled) return null; // Don't render anything if isEnabled is false
  
  return (
    <div className="grid-overlay">
      {/* Render 9 grid lines */}
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="grid-line"></div>
      ))}
    </div>
  );
};

export default GridOverlay;
