
import React, { createContext, useState, useContext, ReactNode } from "react";

type Language = "en" | "bn";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  en: {
    // Home page
    "welcome": "Welcome",
    "about_me": "About Me",
    "about_description": "I combine my passion for healthcare with technical skills in programming and electrical engineering to create innovative solutions. My diverse background allows me to approach problems from unique angles.",
    "my_interests": "My Interests",
    "activity_highlights": "Activity Highlights",
    
    // Skills page
    "my_skills": "My Skills",
    "skills_description": "As a multidisciplinary professional, I've developed expertise across various fields including healthcare, programming, engineering, and cybersecurity. Below are the key skills I've acquired throughout my career.",
    "github_repositories": "GitHub Repositories",
    "github_description": "I've built and contributed to numerous repositories showcasing my technical skills and problem-solving abilities. My projects range from healthcare applications to electronic design tools and security utilities.",
    "view_github": "View My GitHub Profile",
    
    // Categories
    "healthcare": "Healthcare",
    "programming": "Programming",
    "electrical_engineering": "Electrical Engineering", 
    "ethical_hacking": "Ethical Hacking",
    "mechanical_engineering": "Mechanical Engineering",
    "microelectronics": "Microelectronics",
    "development_tools": "Development Tools",
    "data_management": "Data Management",
    
    // Certificates page
    "my_certificates": "My Certificates",
    "certificates_description": "These certificates represent my commitment to continuous learning and professional development across healthcare, technology, and engineering disciplines.",
    "download": "Download",
    
    // About page
    "contact_information": "Contact Information",
    "email": "Email",
    "phone": "Phone",
    "location": "Location",
    "experience": "Experience",
    "education": "Education",
    
    // Navigation
    "home": "Home",
    "skills": "Skills",
    "certificates": "Certificates",
    "about": "About"
  },
  bn: {
    // Home page
    "welcome": "স্বাগতম",
    "about_me": "আমার সম্পর্কে",
    "about_description": "আমি স্বাস্থ্যসেবার প্রতি আমার আবেগকে প্রোগ্রামিং এবং বৈদ্যুতিক প্রকৌশলে টেকনিকাল দক্ষতার সাথে সংযুক্ত করে উদ্ভাবনী সমাধান তৈরি করি। আমার বিভিন্ন পটভূমি আমাকে সমস্যাগুলিকে অনন্য কোণ থেকে দেখতে সাহায্য করে।",
    "my_interests": "আমার আগ্রহসমূহ",
    "activity_highlights": "কার্যক্রমের হাইলাইটস",
    
    // Skills page
    "my_skills": "আমার দক্ষতাসমূহ",
    "skills_description": "একজন বহুমুখী পেশাদার হিসাবে, আমি স্বাস্থ্যসেবা, প্রোগ্রামিং, প্রকৌশল এবং সাইবার নিরাপত্তা সহ বিভিন্ন ক্ষেত্রে দক্ষতা অর্জন করেছি। নিচে আমার ক্যারিয়ারে অর্জিত মূল দক্ষতাগুলি রয়েছে।",
    "github_repositories": "গিটহাব রিপোজিটরি",
    "github_description": "আমি আমার প্রযুক্তিগত দক্ষতা এবং সমস্যা সমাধানের ক্ষমতা প্রদর্শনকারী অসংখ্য রিপোজিটরি তৈরি করেছি এবং অবদান রেখেছি। আমার প্রকল্পগুলি স্বাস্থ্যসেবা অ্যাপ্লিকেশন থেকে শুরু করে ইলেকট্রনিক ডিজাইন টুল এবং সিকিউরিটি ইউটিলিটি পর্যন্ত বিস্তৃত।",
    "view_github": "আমার গিটহাব প্রোফাইল দেখুন",
    
    // Categories
    "healthcare": "স্বাস্থ্যসেবা",
    "programming": "প্রোগ্রামিং",
    "electrical_engineering": "বৈদ্যুতিক প্রকৌশল", 
    "ethical_hacking": "এথিক্যাল হ্যাকিং",
    "mechanical_engineering": "মেকানিকাল ইঞ্জিনিয়ারিং",
    "microelectronics": "মাইক্রোইলেকট্রনিক্স",
    "development_tools": "ডেভেলপমেন্ট টুলস",
    "data_management": "ডাটা ম্যানেজমেন্ট",
    
    // Certificates page
    "my_certificates": "আমার সার্টিফিকেটসমূহ",
    "certificates_description": "এই সার্টিফিকেটগুলি স্বাস্থ্যসেবা, প্রযুক্তি এবং প্রকৌশল বিষয়ে আমার অবিরাম শিক্ষা এবং পেশাদার উন্নয়নের প্রতিশ্রুতি প্রতিনিধিত্ব করে।",
    "download": "ডাউনলোড",
    
    // About page
    "contact_information": "যোগাযোগের তথ্য",
    "email": "ইমেইল",
    "phone": "ফোন",
    "location": "অবস্থান",
    "experience": "অভিজ্ঞতা",
    "education": "শিক্ষা",
    
    // Navigation
    "home": "হোম",
    "skills": "দক্ষতা",
    "certificates": "সার্টিফিকেট",
    "about": "পরিচিতি"
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
