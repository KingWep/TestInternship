import React, { useState } from 'react';
import './global.css';

import { translations } from './translations';
import GlobalNavbar from './components/GlobalNavbar';
import HeroSection from './components/HeroSection';
import WhyUsSection from './components/WhyUsSection';
import BusinessesSection from './components/BusinessesSection';
import FeaturesSection from './components/FeaturesSection';
import CustomersSection from './components/CustomersSection';
import MobileAppSection from './components/MobileAppSection';
import ContactSection from './components/ContactSection';

const GlobalPage = () => {
  const [lang, setLang] = useState('km');

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'km' ? 'en' : 'km'));
  };

  const t = translations[lang] || translations.km;

  return (
    <div className={`global-overview-root min-h-screen text-[#333] bg-[#e8e8e8] ${lang === 'en' ? 'lang-en' : ''}`}>
      {/* Top Navigation */}
      <GlobalNavbar
        lang={lang}
        onToggleLang={toggleLanguage}
        t={t}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero & Read Box */}
        <HeroSection t={t} />

        {/* Why Us Section (#why-us) */}
        <WhyUsSection t={t} />

        {/* Businesses Section (#businesses) */}
        <BusinessesSection t={t} />

        {/* Features Section (#features) */}
        <FeaturesSection t={t} />

        {/* Customers Section (#customers) */}
        <CustomersSection t={t} />

        {/* Mobile App Section (#mobile-app) */}
        <MobileAppSection t={t} />

        {/* Contact Section (#contact) */}
        <ContactSection t={t} />
      </main>
    </div>
  );
};

export default GlobalPage;
