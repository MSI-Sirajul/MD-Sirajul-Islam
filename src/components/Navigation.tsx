
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MoreVertical, X, Home, Cpu, Award, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const routes = [
    { name: t("home"), path: "/", icon: <Home className="h-4 w-4" /> },
    { name: t("skills"), path: "/skills", icon: <Cpu className="h-4 w-4" /> },
    { name: t("certificates"), path: "/certificates", icon: <Award className="h-4 w-4" /> },
    { name: t("about"), path: "/about", icon: <User className="h-4 w-4" /> }
  ];

  const toggleMenu = () => setIsOpen(prev => !prev);

  return (
    <div className="relative">
      <button 
        onClick={toggleMenu}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-background border border-border/50 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="h-5 w-5 text-foreground transition-all duration-300" />
        ) : (
          <MoreVertical className="h-5 w-5 text-foreground transition-all duration-300" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 py-2 glass-morphism rounded-lg overflow-hidden animate-scale-in z-50">
          <nav className="flex flex-col">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={`px-4 py-2 text-sm transition-colors hover:bg-primary/10 flex items-center gap-2
                ${location.pathname === route.path ? 
                  "font-medium bg-gradient-to-r from-primary/10 to-transparent border-l-2 border-primary" : 
                  "font-normal"}`}
                onClick={() => setIsOpen(false)}
              >
                {route.icon}
                {route.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navigation;
