
import React, { createContext, useContext, useState } from "react";

type FontOption = {
  name: string;
  value: string;
  displayName: string;
};

export const fontOptions: FontOption[] = [
  { name: "sans", value: "font-sans", displayName: "Sans" },
  { name: "serif", value: "font-serif", displayName: "Serif" },
  { name: "mono", value: "font-mono", displayName: "Mono" },
  { name: "poppins", value: "font-poppins", displayName: "Poppins" },
  { name: "playfair", value: "font-playfair", displayName: "Playfair" },
];

type FontContextType = {
  font: string;
  setFont: (font: string) => void;
  currentFontName: string;
};

const FontContext = createContext<FontContextType>({
  font: fontOptions[0].value,
  setFont: () => {},
  currentFontName: fontOptions[0].displayName,
});

export const useFont = () => useContext(FontContext);

export const FontProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [font, setFont] = useState<string>(fontOptions[0].value);
  
  const currentFontOption = fontOptions.find(option => option.value === font) || fontOptions[0];
  const currentFontName = currentFontOption.displayName;

  return (
    <FontContext.Provider value={{ font, setFont, currentFontName }}>
      {children}
    </FontContext.Provider>
  );
};
