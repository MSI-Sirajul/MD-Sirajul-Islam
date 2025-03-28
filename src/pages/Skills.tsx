
import React from "react";
import { Code, Heart, Cpu, Shield, Bot, Terminal, Database, Wrench, Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Skills = () => {
  const { t } = useLanguage();
  
  const skillCategories = [
    {
      title: t("Nursing Practice"),
      icon: <Heart className="h-6 w-6 text-primary" />,
      skills: [
        "Patient Care",
        "Medical Assessment",
        "Emergency Response",
        "Health Education",
        "Clinical Documentation"
      ]
    },
    {
      title: t("Programming Knowledge"),
      icon: <Code className="h-6 w-6 text-primary" />,
      skills: [
        "JavaScript/TypeScript",
        "java",
        "Python",
        "HTML/CSS",
      ]
    },
    {
      title: t("Electrical_engineering"),
      icon: <Cpu className="h-6 w-6 text-primary" />,
      skills: [
        "Circuit Repair",
        "Electric Device Repair",
        "Circuit Making",
        "Home Electrical Wireing",
        "PCB Design"
      ]
    },
    {
      title: t("Ethical_hacking"),
      icon: <Shield className="h-6 w-6 text-primary" />,
      skills: [
        "Penetration Testing",
        "Vulnerability Assessment",
        "Network Security",
        "Security Audits",
        "Risk Analysis"
      ]
    },
    {
      title: t("Graphic Design"),
      icon: <Wrench className="h-6 w-6 text-primary" />,
      skills: [
        "Adobe Photoshop",
        "Adobe illustator",
        "Adobe After Effect",
        "Adobe Acrobat"
      ]
    },
    {
      title: t("Office Application"),
      icon: <Wrench className="h-6 w-6 text-primary" />,
      skills: [
        "Microdoft Woard",
        "Microsoft Excel",
        "Microsoft Powerpoint"
      ]
    },
    {
      title: t("Development_tools"),
      icon: <Terminal className="h-6 w-6 text-primary" />,
      skills: [
        "Git/GitHub",
        "Termux",
        "AIDE",
        "VS Code",
        "Línux"
      ]
    },
    {
      title: t("Operating System"),
      icon: <Database className="h-6 w-6 text-primary" />,
      skills: [
        "Wnidows",
        "Linux",
        "Android",
        "Mac OS",
        "DOS"
      ]
    }
  ];

  return (
    <div className="page-transition space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">{t("my_skills")}</h1>
        <p className="text-muted-foreground max-w-3xl">
          {t("skills_description")}
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, index) => (
          <div 
            key={category.title} 
            className="skill-card animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-background/50 border border-border/50">
                {category.icon}
              </div>
              <h2 className="text-xl font-semibold">{category.title}</h2>
            </div>
            
            <ul className="space-y-2">
              {category.skills.map((skill) => (
                <li key={skill} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mt-10 glass-morphism rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4">{t("github_repositories")}</h2>
        <p className="text-muted-foreground mb-6">
          {t("github_description")}
        </p>
        
        <a 
          href="https://github.com/MSI-Sirajul/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background hover:bg-background/80 transition-colors"
        >
          <Github className="h-5 w-5" />
          <span>{t("view_github")}</span>
        </a>
      </section>
    </div>
  );
};

export default Skills;
