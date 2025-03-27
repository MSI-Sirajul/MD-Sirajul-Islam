
import React from "react";
import { Github, Linkedin, Mail, Twitter, Instagram } from "lucide-react";

const Index = () => {
  const hobbies = [
    { title: "Programming", description: "Developing innovative solutions", icon: "💻" },
    { title: "Healthcare", description: "Providing medical assistance", icon: "🏥" },
    { title: "Engineering", description: "Building electrical systems", icon: "⚡" },
    { title: "Ethical Hacking", description: "Discovering security vulnerabilities", icon: "🔐" }
  ];

  const socialLinks = [
    { name: "GitHub", icon: <Github className="h-5 w-5" />, url: "https://github.com" },
    { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, url: "https://linkedin.com" },
    { name: "Twitter", icon: <Twitter className="h-5 w-5" />, url: "https://twitter.com" },
    { name: "Instagram", icon: <Instagram className="h-5 w-5" />, url: "https://instagram.com" },
    { name: "Email", icon: <Mail className="h-5 w-5" />, url: "mailto:example@mail.com" },
  ];

  const activities = [
    { title: "Hospital Volunteer", description: "Provided 500+ hours of patient care" },
    { title: "Open Source Contribution", description: "Contributed to 10+ GitHub repositories" },
    { title: "Workshop Host", description: "Led electrical engineering workshops" },
    { title: "Security Researcher", description: "Identified vulnerabilities in web applications" }
  ];

  return (
    <div className="page-transition space-y-12">
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Welcome</h2>
          <p className="text-muted-foreground">
            I'm a multidisciplinary professional with expertise in healthcare, programming, and electrical engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-morphism rounded-2xl overflow-hidden h-80">
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" 
              alt="Programming" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">About Me</h3>
              <p className="text-muted-foreground">
                I combine my passion for healthcare with technical skills in programming and 
                electrical engineering to create innovative solutions. My diverse background 
                allows me to approach problems from unique angles.
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
        <h2 className="text-2xl font-semibold tracking-tight">My Interests</h2>
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
        <h2 className="text-2xl font-semibold tracking-tight">Activity Highlights</h2>
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
