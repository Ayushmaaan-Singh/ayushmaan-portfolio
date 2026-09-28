import React, { useEffect, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState(''); // '' | 'hover' | 'view'
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      
      // Check for project card hover
      if (target.closest('.project-card')) {
        setCursorState('view');
      } 
      // Check for standard interactive elements
      else if (target.closest('a, button, .btn-primary, .btn-secondary, .nav-link')) {
        setCursorState('hover');
      } 
      else {
        setCursorState('');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      className={`custom-cursor ${cursorState}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      {cursorState === 'view' && <span className="cursor-text">VIEW</span>}
    </div>
  );
};

export default CustomCursor;
