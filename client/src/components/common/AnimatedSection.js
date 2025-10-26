import React from 'react';
import { useInView } from 'react-intersection-observer';

const AnimatedSection = ({ children, className }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.1,    // Trigger when 10% of the element is visible
  });

  return (
    <div 
      ref={ref} 
      className={`${className} fade-in-section ${inView ? 'is-visible' : ''}`}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;