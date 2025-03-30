
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import EditableImage from "@/components/EditableImage";
import EditableContent from "@/components/EditableContent";
import { useEdit } from "@/contexts/EditContext";

const Certificates = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { t } = useLanguage();
  const { isEditMode } = useEdit();
  
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
      image: "https://sirajul26.imgix.net/chairman.png",
      date: "2022"
    },
    {
      title: "Graphic Designer",
      image: "https://sirajul26.imgix.net/graphic.png",
      date: "2021"
    },
    {
      title: "National ID Card (NID)",
      image: "https://sirajul26.imgix.net/nid.png",
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

  return (
    <div className="page-transition space-y-8">
      <section className="space-y-4">
        <EditableContent 
          as="h1"
          initialValue={t("my_certificates")} 
          className="text-3xl font-bold tracking-tight"
          onSave={(value) => console.log("Saving:", value)}
        />
        <EditableContent
          initialValue={t("certificates_description")}
          className="text-muted-foreground max-w-3xl"
          onSave={(value) => console.log("Saving:", value)}
        />
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
              <EditableImage 
                src={certificate.image} 
                alt={certificate.title} 
                className="certificate-image"
                onSave={(file) => {
                  console.log("Saving image:", file);
                  return Promise.resolve(URL.createObjectURL(file));
                }}
              />
            </div>
            
            <div className="p-4">
              <EditableContent
                as="h3"
                initialValue={certificate.title}
                className="font-medium text-lg"
                onSave={(value) => console.log("Saving:", value)}
              />
              <EditableContent
                initialValue={certificate.date}
                className="text-sm text-muted-foreground"
                onSave={(value) => console.log("Saving:", value)}
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Certificates;
