
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("theme") === "dark" || 
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    setIsDark(isDarkMode);
    
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const newTheme = !prev;
      if (newTheme) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newTheme;
    });
  };

  return (
    <button 
      onClick={toggleTheme} 
      className="w-10 h-10 rounded-full flex items-center justify-center bg-background border border-border/50 shadow-sm transition-all duration-300 hover:shadow-md"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Moon className="h-5 w-5 text-foreground transition-all duration-300" />
      ) : (
        <Sun className="h-5 w-5 text-foreground transition-all duration-300" />
      )}
    </button>
  );
};

export default ThemeToggle;
