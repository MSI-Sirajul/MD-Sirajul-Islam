
import React from "react";
import ThemeToggle from "./ThemeToggle";
import RotatingSlogan from "./RotatingSlogan";
import Navigation from "./Navigation";

const Header: React.FC = () => {
  const slogans = [
    "Health care provider",
    "Programmer",
    "Electrical engineer"
  ];

  return (
    <header className="fixed top-0 left-0 right-0 p-4 md:p-6 glass-morphism z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-full overflow-hidden w-12 h-12 border border-border/50 flex items-center justify-center bg-background/50">
            <span className="text-lg font-semibold">MSI</span>
          </div>
          
          <div>
            <h1 className="text-lg font-medium">MD Sirajul Islam</h1>
            <RotatingSlogan slogans={slogans} />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Navigation />
        </div>
      </div>
    </header>
  );
};

export default Header;
