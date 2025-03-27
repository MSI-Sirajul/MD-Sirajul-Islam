
import React from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Switch } from "@/components/ui/switch";

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "bn" : "en");
  };

  return (
    <div className="flex items-center gap-2 bg-background/30 rounded-full px-3 py-1.5 border border-border/50 backdrop-blur-sm hover:bg-background/50 transition-all duration-300">
      <Globe className="h-4 w-4 text-primary animate-pulse" />
      <span className={`text-sm font-medium transition-colors ${language === "en" ? "text-primary" : "text-muted-foreground"}`}>EN</span>
      <Switch 
        checked={language === "bn"}
        onCheckedChange={toggleLanguage}
        aria-label="Toggle language"
        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-primary"
      />
      <span className={`text-sm font-medium transition-colors ${language === "bn" ? "text-primary" : "text-muted-foreground"}`}>BN</span>
    </div>
  );
};

export default LanguageToggle;
