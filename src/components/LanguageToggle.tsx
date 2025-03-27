
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
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-foreground" />
      <span className="text-sm font-medium">EN</span>
      <Switch 
        checked={language === "bn"}
        onCheckedChange={toggleLanguage}
        aria-label="Toggle language"
      />
      <span className="text-sm font-medium">BN</span>
    </div>
  );
};

export default LanguageToggle;
