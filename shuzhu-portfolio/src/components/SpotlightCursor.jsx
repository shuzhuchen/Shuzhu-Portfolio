import React, { useEffect, useState } from "react";
import "../App.css";

export default function SpotlightCursor({ isDark = true }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMove = (e) => {
      document.documentElement.style.setProperty("--x", e.clientX + "px");
      document.documentElement.style.setProperty("--y", e.clientY + "px");
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Define colors based on theme
  const spotlightColors = isDark ? {
    primary: 'rgba(250, 233, 121, 0.4)',
    secondary: 'rgba(250, 233, 121, 0.25)',
    tertiary: 'rgba(250, 233, 121, 0.1)',
    quaternary: 'rgba(250, 233, 121, 0.05)',
    dotColor: 'rgba(250, 233, 121, 0.9)',
    dotShadow: 'rgba(250, 233, 121, 0.5)'
  } : {
    primary: 'rgba(251, 146, 60, 0.4)',
    secondary: 'rgba(251, 146, 60, 0.25)',
    tertiary: 'rgba(251, 146, 60, 0.1)',
    quaternary: 'rgba(251, 146, 60, 0.05)',
    dotColor: 'rgba(234, 88, 12, 0.9)',
    dotShadow: 'rgba(234, 88, 12, 0.5)'
  };

  return (
    <>
      <div 
        className="cursor-spotlight"
        style={{
          background: `radial-gradient(
            circle 120px at var(--x) var(--y),
            ${spotlightColors.primary} 0%,
            ${spotlightColors.secondary} 25%,
            ${spotlightColors.tertiary} 50%,
            ${spotlightColors.quaternary} 70%,
            transparent 85%
          )`
        }}
      />
      <div 
        className={`cursor-dot ${isClicking ? 'active' : ''}`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          background: spotlightColors.dotColor,
          boxShadow: `0 0 10px ${spotlightColors.dotShadow}`
        }}
      />
    </>
  );
}