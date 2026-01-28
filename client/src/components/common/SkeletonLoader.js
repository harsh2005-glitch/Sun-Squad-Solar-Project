import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = ({ type = 'text', height, width, count = 1, className = '', style = {} }) => {
  const elements = [];
  for (let i = 0; i < count; i++) {
    const combinedStyle = {
        height: height,
        width: width,
        ...style
    };
    elements.push(
      <div 
        key={i} 
        className={`skeleton skeleton-${type} ${className}`} 
        style={combinedStyle}
      ></div>
    );
  }
  return <>{elements}</>;
};

export default SkeletonLoader;
