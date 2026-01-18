import React, { useState, useRef } from 'react';
import './BeforeAfterSlider.css';

const BeforeAfterSlider = ({ beforeImage, afterImage, altText }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const isDragging = useRef(false);

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div 
      className="before-after-container" 
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchEnd={handleMouseUp}
    >
      <div className="img-layer before-img">
        <img src={beforeImage} alt={`Before ${altText}`} draggable="false" />
        <span className="label-badge before-label">Before Solar</span>
      </div>
      
      <div 
        className="img-layer after-img" 
        style={{ width: `${sliderPosition}%` }}
      >
        <img src={afterImage} alt={`After ${altText}`} draggable="false" />
        <span className="label-badge after-label">After Solar</span>
      </div>

      <div 
        className="slider-handle" 
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="handle-line"></div>
        <div className="handle-circle">
          <i className="fa-solid fa-arrows-left-right"></i>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
