
import React, { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Facebook, Music, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEdit } from "@/contexts/EditContext";
import EditableContent from "@/components/EditableContent";
import EditableImage from "@/components/EditableImage";
import AuthPopup from "@/components/auth/AuthPopup";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { t } = useLanguage();
  const { isEditMode } = useEdit();
  const { user } = useAuth();
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  // Show auth popup after 10 seconds if user is not logged in
  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        setShowAuthPopup(true);
      }, 10000); // 10 seconds
      
      return () => clearTimeout(timer);
    }
  }, [user]);

  const socialLinks = [
    { name: "GitHub", icon: <Github className="h-5 w-5" />, url: "https://github.com/MSI-Sirajul/" },
    { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, url: "https://bd.linkedin.com/in/sirajul26" },
    { name: "TikTok", icon: <Music className="h-5 w-5" />, url: "https://www.tiktok.com/@feelings_for_u/" },
    { name: "Facebook", icon: <Facebook className="h-5 w-5" />, url: "https://facebook.com/TS.Sirajul26/" },
    { name: "Telegram", icon: <MessageCircle className="h-5 w-5" />, url: "https://t.me/tech_master26" },
    { name: "Email", icon: <Mail className="h-5 w-5" />, url: "mailto:sirajul4516@gmail.com" },
  ];

  const activities = [
    { title: "Student Nurse", description: "Work 6+ Month with patient care" },
    { title: "Graphic Design", description: "i'm a professional graphic design have 6+ month work expriance"},
    { title: "Github Repository Developer", description: "Develop to 10+ usefull GitHub repositories" },
    { title: "Repair And make Electrict circut", description: "Repair personal usase electrict device able to make iot and eletrict circut" },
    { title: "Programming", description: "Build up basic android app and have basic ethical hacking Knowledge" }
  ];
  
  const hobbies = [
    { title: t("programming"), description: "Developing innovative solutions", icon: "💻" },
    { title: t("healthcare"), description: "Be a Professional Senior Stuff Nurse", icon: "🏥" },
    { title: t("electrical_engineering"), description: "Building electrical Circute and iot device", icon: "⚡" },
    { title: t("ethical_hacking"), description: "Discovering security vulnerabilities", icon: "🔐" }
  ];

  // In the future, these handlers would update data in Supabase
  const handleContentSave = (field: string, value: string) => {
    console.log(`Saving ${field}:`, value);
    // This is where we would save to Supabase
  };

  const handleImageSave = async (file: File) => {
    console.log("Image to upload:", file);
    // In the future, this would upload to Supabase Storage
    // For now, we just return a temporary URL
    return URL.createObjectURL(file);
  };

  return (
    <div className="page-transition space-y-12">
      <section className="space-y-6">
        <div className="space-y-2">
          <EditableContent
            as="h2"
            initialValue={t("welcome")}
            className="text-3xl font-bold tracking-tight"
            onSave={(value) => handleContentSave("welcome", value)}
          />
          <EditableContent
            initialValue="I'm a multi talented person, i'm a •student nurse •Professional Graphics Designer •Electrical engineer •Programmer."
            className="text-muted-foreground"
            onSave={(value) => handleContentSave("intro", value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-morphism rounded-2xl overflow-hidden h-auto">
            <EditableImage
              src="https://sirajul26.imgix.net/msi.jpg"
              alt="MD Sirajul Islam"
              className="w-full h-full object-cover"
              id="profile-image"
              onSave={handleImageSave}
            />
          </div>
          
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <EditableContent
                as="h3"
                initialValue={t("about_me")}
                className="text-xl font-semibold"
                onSave={(value) => handleContentSave("about_me", value)}
              />
              <EditableContent
                initialValue={t("about_description")}
                className="text-muted-foreground"
                onSave={(value) => handleContentSave("about_description", value)}
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all duration-300"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <EditableContent
          as="h2"
          initialValue={t("my_interests")}
          className="text-2xl font-semibold tracking-tight"
          onSave={(value) => handleContentSave("my_interests", value)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {hobbies.map((hobby, index) => (
            <div key={hobby.title} className="p-6 glass-morphism rounded-xl hover-scale">
              <div className="text-4xl mb-3">{hobby.icon}</div>
              <EditableContent
                as="h3"
                initialValue={hobby.title}
                className="text-lg font-medium"
                onSave={(value) => handleContentSave(`hobby_${index}_title`, value)}
              />
              <EditableContent
                initialValue={hobby.description}
                className="text-sm text-muted-foreground"
                onSave={(value) => handleContentSave(`hobby_${index}_description`, value)}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <EditableContent
          as="h2"
          initialValue={t("activity_highlights")}
          className="text-2xl font-semibold tracking-tight"
          onSave={(value) => handleContentSave("activity_highlights", value)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {activities.map((activity, index) => (
            <div key={activity.title} className="p-6 glass-morphism rounded-xl">
              <EditableContent
                as="h3"
                initialValue={activity.title}
                className="text-lg font-medium"
                onSave={(value) => handleContentSave(`activity_${index}_title`, value)}
              />
              <EditableContent
                initialValue={activity.description}
                className="text-sm text-muted-foreground"
                onSave={(value) => handleContentSave(`activity_${index}_description`, value)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Auth popup that shows after 10 seconds if not logged in */}
      <AuthPopup 
        isOpen={showAuthPopup} 
        onOpenChange={setShowAuthPopup} 
      />
    </div>
  );
};

export default Index;
