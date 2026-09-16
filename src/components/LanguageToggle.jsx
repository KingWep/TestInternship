import React from "react";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";

const LanguageToggle = ({ className = "" }) => {
  const { i18n } = useTranslation();
  const isKhmer = i18n.language === "km";

  const toggleLanguage = () => {
    const newLang = isKhmer ? "en" : "km";
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  return (
    <div
      onClick={toggleLanguage}
      className={`flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1 cursor-pointer hover:bg-white/20 transition-all shadow-sm select-none ${className}`}
      title="Toggle Language"
    >
      <div
        className={`flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-300 ${!isKhmer
            ? "bg-white text-[#2212ac] shadow-sm"
            : "text-white hover:text-white/80"
          }`}
      >
        <ReactCountryFlag countryCode="US" svg className="rounded-full w-4 h-4 object-cover" />
        EN
      </div>
      <div
        className={`flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-300 ${isKhmer
            ? "bg-white text-[#2212ac] shadow-sm"
            : "text-white hover:text-white/80"
          }`}
      >
        <ReactCountryFlag countryCode="KH" svg className="rounded-full w-4 h-4 object-cover" />
        KH
      </div>
    </div>
  );
};

export default LanguageToggle;
