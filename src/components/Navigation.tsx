
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MoreVertical, X } from "lucide-react";

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const routes = [
    { name: "Home", path: "/" },
    { name: "Skills", path: "/skills" },
    { name: "Certificates", path: "/certificates" },
    { name: "About", path: "/about" }
  ];

  const toggleMenu = () => setIsOpen(prev => !prev);

  return (
    <div className="relative">
      <button 
        onClick={toggleMenu}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-background border border-border/50 shadow-sm transition-all duration-300 hover:shadow-md"
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
                className={`px-4 py-2 text-sm transition-colors hover:bg-accent
                ${location.pathname === route.path ? "font-medium" : "font-normal"}`}
                onClick={() => setIsOpen(false)}
              >
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
