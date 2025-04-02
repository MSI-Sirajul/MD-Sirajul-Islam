
import React from "react";
import ThemeToggle from "./ThemeToggle";
import RotatingSlogan from "./RotatingSlogan";
import Navigation from "./Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import EditableImage from "./EditableImage";
import EditableContent from "./EditableContent";
import { useAuth } from "@/contexts/AuthContext";
import ProfileButton from "./auth/ProfileButton";

const Header: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const slogans = [
    t("Student Nurse"),
    t("Graphic Desigher"),
    t("Electrical Engineer"),
    t("Programmer")
  ];

  return (
    <header className="fixed top-0 left-0 right-0 p-4 md:p-6 glass-morphism z-50 animate-fade-in">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-full overflow-hidden w-12 h-12 border-2 border-primary/50 flex items-center justify-center bg-background/80 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
            <EditableImage 
              src="https://sirajul26.imgix.net/logo2.gif" 
              alt="MSI" 
              className="w-full h-full object-cover" 
              id="header-logo"
              onSave={(file) => {
                console.log("Saving logo:", file);
                return Promise.resolve(URL.createObjectURL(file));
              }}
            />
          </div>
          
          <div>
            <EditableContent
              as="h1"
              initialValue="MD Sirajul Islam"
              className="text-lg font-medium bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
              id="header-name"
              onSave={(value) => console.log("Saving name:", value)}
            />
            <RotatingSlogan slogans={slogans} />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <ProfileButton userId={user?.id} />
          <ThemeToggle />
          <Navigation />
        </div>
      </div>
    </header>
  );
};

export default Header;
