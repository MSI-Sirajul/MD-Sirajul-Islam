import React from "react";
import { Github, Linkedin, Mail, Telegram, Facebook, Music } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { name: "GitHub", icon: <Github className="h-5 w-5" />, url: "https://github.com/MSI-Sirajul/" },
    { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, url: "https://bd.linkedin.com/in/sirajul26" },
    { name: "TikTok", icon: <Music className="h-5 w-5" />, url: "https://www.tiktok.com/@feelings_for_u/" },
    { name: "Facebook", icon: <Facebook className="h-5 w-5" />, url: "https://facebook.com/TS.Sirajul26/" },
    { name: "Telegram", icon: <Telegram className="h-5 w-5" />, url: "https://t.me/tech_master26" },
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

  return (
    <div className="page-transition space-y-12">
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">{t("welcome")}</h2>
          <p className="text-muted-foreground">
            I'm a multi talented person, i'm a •student nurse •Professional Graphics Designer •Electrical engineer •Programmer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-morphism rounded-2xl overflow-hidden h-80">
            <img 
              src="https://sirajul26.imgix.net/msi-2.png" 
              alt="Banner" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">{t("about_me")}</h3>
              <p className="text-muted-foreground">
                {t("about_description")}
              </p>
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
        <h2 className="text-2xl font-semibold tracking-tight">{t("my_interests")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {hobbies.map((hobby) => (
            <div key={hobby.title} className="p-6 glass-morphism rounded-xl hover-scale">
              <div className="text-4xl mb-3">{hobby.icon}</div>
              <h3 className="text-lg font-medium">{hobby.title}</h3>
              <p className="text-sm text-muted-foreground">{hobby.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">{t("activity_highlights")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {activities.map((activity) => (
            <div key={activity.title} className="p-6 glass-morphism rounded-xl">
              <h3 className="text-lg font-medium">{activity.title}</h3>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
