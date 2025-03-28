
import React, { useState } from "react";
import { Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Certificates = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { t } = useLanguage();
  
  const certificates = [
    {
      title: "Secondery school certificate (SSC)",
      image: "https://sirajul26.imgix.net/ssc2.png",
      date: "2023"
    },
    {
      title: "Higher Secondery Certificate (HSC)",
      image: "https://sirajul26.imgix.net/hsc.png",
      date: "2022"
    },
    {
      title: "Chairman Certificate",
      image: "/src/images/Screenshot_2022_1030_123921.png",
      date: "2022"
    },
    {
      title: "Graphic Designer",
      image: "https://sirajul26.imgix.net/graphic.png",
      date: "2021"
    },
    {
      title: "National ID Card (NID)",
      image: "/src/images/Screenshot_2022_1030_180123.png",
      date: "2021"
    },
    {
      title: "Birth Certificate",
      image: "/src/images/Screenshot_2022_1030_180202.png",
      date: "2020"
    },
    {
      title: "Python for Data Science",
      image: "/src/images/download~2.png",
      date: "2020"
    },
    {
      title: "Cloud Computing",
      image: "/src/images/1711088129469.jpg",
      date: "2019"
    },
    {
      title: "Network Security Fundamentals",
      image: "/src/images/lv_0_20241203222524.gif",
      date: "2019"
    },
    {
      title: "Mobile App Development",
      image: "/src/images/Google-Avater.gif",
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
