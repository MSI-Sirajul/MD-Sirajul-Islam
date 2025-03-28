
import React, { useState } from "react";
import { Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Certificates = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { t } = useLanguage();
  
  const certificates = [
    {
      title: "Secondery school certificate (SSC)",
      image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28",
      date: "2023"
    },
    {
      title: "Higher Secondery Certificate (HSC)",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      date: "2022"
    },
    {
      title: "Chairman Certificate",
      image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de",
      date: "2022"
    },
    {
      title: "Graphic Designer",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      date: "2021"
    },
    {
      title: "National ID Card (NID)",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8",
      date: "2021"
    },
    {
      title: "Birth Certificate",
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f",
      date: "2020"
    },
    {
      title: "Python for Data Science",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
      date: "2020"
    },
    {
      title: "Cloud Computing",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8",
      date: "2019"
    },
    {
      title: "Network Security Fundamentals",
      image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de",
      date: "2019"
    },
    {
      title: "Mobile App Development",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3",
      date: "2018"
    }
  ];

  const handleDownload = (title: string) => {
    // In a real app, this would trigger the certificate download
    alert(`Downloading certificate: ${title}`);
  };

  return (
    <div className="page-transition space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">{t("my_certificates")}</h1>
        <p className="text-muted-foreground max-w-3xl">
          {t("certificates_description")}
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((certificate, index) => (
          <div 
            key={certificate.title}
            className="certificate-card animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="overflow-hidden">
              <img 
                src={certificate.image} 
                alt={certificate.title} 
                className="certificate-image"
              />
            </div>
            
            <div className="p-4">
              <h3 className="font-medium text-lg">{certificate.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{certificate.date}</p>
              
              <button
                onClick={() => handleDownload(certificate.title)}
                className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-background/80 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>{t("download")}</span>
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Certificates;
