import React from 'react';
import './StarBorder.css';

export default function StarBorder({ children, as = 'div', color = 'cyan', speed = '8s', thickness = 2, className = '' }) {
  const Comp = as;
  return (
    <Comp className={`star-border-container ${className}`} style={{ position: 'relative' }}>
      <div className="border-gradient-bottom" style={{ background: `linear-gradient(90deg, ${color}, transparent)`, animationDuration: speed, height: thickness * 2 }} />
      <div className="border-gradient-top" style={{ background: `linear-gradient(270deg, ${color}, transparent)`, animationDuration: speed, height: thickness * 2 }} />
      <div className="inner-content">{children}</div>
    </Comp>
  );
} 