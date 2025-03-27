
import React from "react";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  BookOpen,
  Award
} from "lucide-react";

const About = () => {
  const socialLinks = [
    { name: "GitHub", icon: <Github className="h-5 w-5" />, url: "https://github.com" },
    { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, url: "https://linkedin.com" },
    { name: "Twitter", icon: <Twitter className="h-5 w-5" />, url: "https://twitter.com" },
    { name: "Instagram", icon: <Instagram className="h-5 w-5" />, url: "https://instagram.com" }
  ];

  const contactInfo = [
    { icon: <Mail className="h-5 w-5" />, label: "Email", value: "sirajul@example.com" },
    { icon: <Phone className="h-5 w-5" />, label: "Phone", value: "+1 234 567 890" },
    { icon: <MapPin className="h-5 w-5" />, label: "Location", value: "New York, USA" }
  ];

  const experiences = [
    {
      title: "Senior Healthcare Provider",
      company: "Metro Hospital",
      period: "2020 - Present",
      description: "Providing specialized healthcare services and emergency response."
    },
    {
      title: "Software Developer",
      company: "Tech Innovations Inc.",
      period: "2018 - 2020",
      description: "Developed full-stack applications and maintained critical systems."
    },
    {
      title: "Electrical Engineer",
      company: "Power Systems Ltd.",
      period: "2016 - 2018",
      description: "Designed and implemented electrical systems for commercial projects."
    }
  ];

  const education = [
    {
      degree: "Master's in Electrical Engineering",
      institution: "Technical University",
      year: "2016"
    },
    {
      degree: "Bachelor's in Nursing",
      institution: "Health Sciences University",
      year: "2014"
    },
    {
      degree: "Certification in Cybersecurity",
      institution: "National Security Institute",
      year: "2019"
    }
  ];

  return (
    <div className="page-transition space-y-10">
      <section className="flex flex-col md:flex-row gap-6 md:gap-10">
        <div className="md:w-1/3">
          <div className="glass-morphism rounded-2xl overflow-hidden mb-6">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" 
              alt="MD Sirajul Islam" 
              className="w-full aspect-square object-cover"
            />
          </div>
          
          <div className="flex justify-center gap-3 mb-6">
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
          
          <div className="glass-morphism rounded-xl p-5 space-y-4">
            <h3 className="text-lg font-medium">Contact Information</h3>
            <ul className="space-y-3">
              {contactInfo.map((info) => (
                <li key={info.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center border border-border/50 bg-background/50">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    <p className="font-medium">{info.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="md:w-2/3 space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">MD Sirajul Islam</h1>
            <p className="text-muted-foreground">
              A multidisciplinary professional with expertise in healthcare, programming, and engineering.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">About Me</h2>
            <p className="text-muted-foreground">
              I am a versatile professional with a unique combination of skills in healthcare, programming, and electrical engineering. 
              With a passion for innovation and problem-solving, I bridge the gap between healthcare and technology 
              to create meaningful solutions that improve lives.
            </p>
            <p className="text-muted-foreground">
              My background in nursing has given me deep insights into healthcare needs, while my engineering and 
              programming expertise allows me to develop technical solutions. I'm also dedicated to cybersecurity, 
              ensuring that digital systems remain secure and trustworthy.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">Experience</h2>
            </div>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.title} className="glass-morphism rounded-xl p-4">
                  <h3 className="font-medium">{exp.title}</h3>
                  <p className="text-sm text-muted-foreground">{exp.company} | {exp.period}</p>
                  <p className="text-sm mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">Education</h2>
            </div>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.degree} className="glass-morphism rounded-xl p-4">
                  <h3 className="font-medium">{edu.degree}</h3>
                  <p className="text-sm text-muted-foreground">{edu.institution} | {edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
