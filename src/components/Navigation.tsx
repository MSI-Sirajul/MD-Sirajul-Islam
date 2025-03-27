
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MoreVertical, X, Home, Cpu, Award, User, Globe, Type } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont, fontOptions } from "@/contexts/FontContext";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { font, setFont, currentFontName } = useFont();

  const routes = [
    { name: t("home"), path: "/", icon: <Home className="h-4 w-4" /> },
    { name: t("skills"), path: "/skills", icon: <Cpu className="h-4 w-4" /> },
    { name: t("certificates"), path: "/certificates", icon: <Award className="h-4 w-4" /> },
    { name: t("about"), path: "/about", icon: <User className="h-4 w-4" /> }
  ];

  const toggleMenu = () => setIsOpen(prev => !prev);
  const toggleLanguage = () => setLanguage(language === "en" ? "bn" : "en");

  const handleFontChange = (value: string) => {
    setFont(value);
  };

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
        <div className="absolute top-full right-0 mt-2 w-64 py-2 glass-morphism rounded-lg overflow-hidden animate-scale-in z-50">
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
            
            <div className="border-t border-border/30 mt-2 pt-2">
              {/* Language Toggle */}
              <div className="px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary animate-pulse" />
                  <span className="text-sm">{t("language")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${language === "en" ? "text-primary font-medium" : "text-muted-foreground"}`}>EN</span>
                  <Switch 
                    checked={language === "bn"}
                    onCheckedChange={toggleLanguage}
                    aria-label="Toggle language"
                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-primary"
                  />
                  <span className={`text-xs ${language === "bn" ? "text-primary font-medium" : "text-muted-foreground"}`}>BN</span>
                </div>
              </div>
              
              {/* Font Selection */}
              <div className="px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Type className="h-4 w-4 text-primary" />
                  <span className="text-sm">{t("font")}</span>
                </div>
                <Select value={font} onValueChange={handleFontChange}>
                  <SelectTrigger className="w-[120px] h-8 text-xs">
                    <SelectValue placeholder={currentFontName} />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-xs">
                        {option.displayName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navigation;
