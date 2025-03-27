
import React from "react";
import ThemeToggle from "./ThemeToggle";
import RotatingSlogan from "./RotatingSlogan";
import Navigation from "./Navigation";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const Header: React.FC = () => {
  const { t } = useLanguage();
  
  const slogans = [
    t("healthcare"),
    t("programming"),
    t("electrical_engineering")
  ];

  return (
    <header className="fixed top-0 left-0 right-0 p-4 md:p-6 glass-morphism z-50 animate-fade-in">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-full overflow-hidden w-12 h-12 border-2 border-primary/50 flex items-center justify-center bg-background/80 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">MSI</span>
          </div>
          
          <div>
            <h1 className="text-lg font-medium bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">MD Sirajul Islam</h1>
            <RotatingSlogan slogans={slogans} />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <ThemeToggle />
          <Navigation />
        </div>
      </div>
    </header>
  );
};

export default Header;
