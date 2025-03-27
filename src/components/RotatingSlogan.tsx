
import React, { useState, useEffect } from "react";

interface RotatingSloganProps {
  slogans: string[];
  interval?: number;
}

const RotatingSlogan: React.FC<RotatingSloganProps> = ({ 
  slogans, 
  interval = 3000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const changeSlogan = () => {
      setIsVisible(false);
      
      const timer = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slogans.length);
        setIsVisible(true);
      }, 300);
      
      return () => clearTimeout(timer);
    };

    const intervalId = setInterval(changeSlogan, interval);
    return () => clearInterval(intervalId);
  }, [slogans, interval]);

  return (
    <div className="h-6 relative overflow-hidden">
      <span 
        className={`absolute left-0 top-0 text-sm font-light tracking-wide transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent
        ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-2'}`}
      >
        ""{slogans[currentIndex]}""
      </span>
    </div>
  );
};

export default RotatingSlogan;
