import React from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  BookOpen,
  Award,
  Linkedin
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditableContent from "@/components/EditableContent";

const About = () => {
  const { t } = useLanguage();
  
  const socialLinks = [
    { name: "GitHub", icon: <img src="https://sirajul16.imgix.net/github.png" alt="GitHub" className="h-8 w-8" />, url: "https://github.com/MSI-Sirajul/" },
    { name: "LinkedIn", icon: <img src="https://sirajul16.imgix.net/linkdin1.png" alt="LinkedIn" className="h-8 w-8" />, url: "https://bd.linkedin.com/in/sirajul26" },
    { name: "Facebook", icon: <img src="https://sirajul16.imgix.net/facebook1.png" alt="Facebook" className="h-8 w-9" />, url: "https://facebook.com/TS.Sirajul26/" },
    { name: "Telegram", icon: <img src="https://sirajul16.imgix.net/tele1.png" alt="Telegram" className="h-8 w-8" />, url: "https://t.me/tech_master26" },
    { name: "Tiktok", icon: <img src="https://sirajul16.imgix.net/tiktok1.png" alt="TikTok" className="h-8 w-8" />, url: "https://www.tiktok.com/@itz_sirajul26/" }
  ];

  const contactInfo = [
    { icon: <Mail className="h-5 w-5" />, label: t("email"), value: "sirajul4516@gmail.com" },
    { icon: <Phone className="h-5 w-5" />, label: t("phone"), value: "+880 1629-744516" },
    { icon: <MapPin className="h-5 w-5" />, label: t("location"), value: "Chattgram, Bangladesh" }
  ];

  const experiences = [
    {
      title: "Student Nurse",
      company: "TMSS Nursing institute",
      period: "2022 - Present",
      description: "Diploma in Nursing Science and Midwifery."
    },
    {
      title: "Graphics Designer",
      company: "Gazi-Laboratories unani Bangladesh",
      period: "DEC-2022 - APR-2023",
      description: "Graphic Designer and Computer Operator"
    },
    {
      title: "Software Developer",
      company: "Personal use Only (Hobby).",
      period: "2018 - Present",
      description: "Developed Basic android app for personal use."
    },
    {
      title: "Electrical Engineer",
      company: "Personal Work experience",
      period: "2016 - Present",
      description: "Repairing electronic device's and able to set-up home electric supply."
    }
  ];

  const education = [
    {
      degree: "Diploma Nursing. ",
      institution: "TMSS Nursing Institute",
      year: "2022 - Present"
    },
    
    {
       degree: "Graphic Designer",
       institution: "Unity Corporation",
       year: "Mar-2022 - Aug-2022"
    },
     
    {
      degree: "Electrical Engineer",
      institution: "Hobby",
      year: "2016"
    },

    {
      degree: "Basic Hacking Knowledge",
      institution: "Personal Practice only",
      year: "2019 - Present"
    }
  ];

  return (
    <div className="page-transition space-y-10">
      <section className="flex flex-col md:flex-row gap-6 md:gap-10">
        <div className="md:w-1/3">
          <div className="glass-morphism rounded-2xl overflow-hidden mb-6">
            <img 
              src="https://sirajul26.imgix.net/msi.jpg" 
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
            <h3 className="text-lg font-medium">{t("contact_information")}</h3>
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

          <div className="glass-morphism rounded-xl p-5 mt-6 overflow-hidden">
            <h3 className="text-lg font-medium mb-4">LinkedIn Profile</h3>
            <div className="flex flex-col items-center">
              <div className="w-full">
                <div className="linkedin-badge">
                  <div className="badge-header bg-[#0077b5] p-3 rounded-t-lg">
                    <Linkedin className="h-6 w-6 text-white" />
                  </div>
                  <div className="badge-content p-4 bg-white rounded-b-lg text-center">
                    <div className="badge-avatar mb-2">
                      <img 
                        src="https://sirajul26.imgix.net/msi.jpg" 
                        alt="LinkedIn Profile" 
                        className="w-16 h-16 rounded-full mx-auto border-2 border-[#0077b5]"
                      />
                    </div>
                    <h4 className="text-gray-900 font-medium">MD Sirajul Islam</h4>
                    <p className="text-sm text-gray-600 mb-2">Student Nurse | Graphics Designer</p>
                    <a 
                      href="https://bd.linkedin.com/in/sirajul26" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-[#0077b5] text-white rounded-md text-sm font-medium hover:bg-[#00669c] transition-colors"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:w-2/3 space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">MD Sirajul Islam</h1>
            <p className="text-muted-foreground">
              <EditableContent
                id="about-intro"
                initialValue="I'm a multi talented person, i'm a • student nurse (Health Care Provider) • Professional Graphics Designer • Electrical engineer • Programmer."
              />
            </p>
          </div>
          
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="about">About Me</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-4">
              <EditableContent
                id="about-me-1"
                initialValue="I am a versatile professional with a unique combination of skills in healthcare, Graphics Design, programming, and electrical engineering. With a passion for innovation and problem-solving, I bridge the gap between healthcare and technology to create meaningful solutions that improve lives."
              />
              <EditableContent
                id="about-me-2"
                initialValue="My background in nursing has given me deep insights into healthcare needs, while my engineering and programming expertise allows me to develop technical solutions. I'm also dedicated to cybersecurity, ensuring that digital systems remain secure and trustworthy."
              />
            </TabsContent>

            <TabsContent value="experience" className="space-y-4">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold">{t("experience")}</h2>
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
            </TabsContent>

            <TabsContent value="education" className="space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold">{t("education")}</h2>
              </div>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.degree} className="glass-morphism rounded-xl p-4">
                    <h3 className="font-medium">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground">{edu.institution} | {edu.year}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default About;
