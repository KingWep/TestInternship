import React from 'react';
import './global.css';

import GlobalNavbar from './components/GlobalNavbar';
import HeroSection from './components/HeroSection';
import AboutChomnenh from './components/AboutChomnenh';
import EcosystemSection from './components/EcosystemSection';
import PlatformCards from './components/PlatformCards';
import HowItWorks from './components/HowItWorks';
import SolutionsGrid from './components/SolutionsGrid';
import WhyChomnenh from './components/WhyChomnenh';
import BusinessImpact from './components/BusinessImpact';
import FinalCTA from './components/FinalCTA';
import GlobalFooter from './components/GlobalFooter';

const GlobalPage = () => {
  return (
    <div className="min-h-screen text-[#333] bg-[#e8e8e8]" style={{ fontFamily: "'Kantumruy Pro', sans-serif" }}>
      <GlobalNavbar />
      <main>
        <HeroSection />
        <AboutChomnenh />
        <EcosystemSection />
        <PlatformCards />
        <HowItWorks />
        <SolutionsGrid />
        <WhyChomnenh />
        <BusinessImpact />
        <FinalCTA />
      </main>
      <GlobalFooter />
    </div>
  );
};

export default GlobalPage;
