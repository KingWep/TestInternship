import React from 'react';
import { ArrowRight, Play, Globe, ShieldCheck, Code, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-blue-600">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#2a2c64] text-[#0B132B]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-40 right-0 w-72 h-72 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/50 border border-blue-800/50 backdrop-blur-sm mb-8 text-blue-200">
            <span className="flex h-2 w-2 rounded-full bg-blue-400"></span>
            <span>{t('overview.heroTag')}</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight font-kantumruy leading-tight">
            {t('overview.heroTitle1')} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-yellow-400 to-[#D4AF37]">
              {t('overview.heroTitle2')}
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-blue-100 mb-12 max-w-2xl mx-auto font-kantumruy leading-relaxed">
            {t('overview.heroDesc')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-[#D4AF37] hover:bg-yellow-500 text-[#0B132B] rounded-xl font-bold transition-all hover:scale-105">
              {t('overview.heroBtn1')}
              <ArrowRight size={20} />
            </button>
            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-900/40 hover:bg-blue-800/60 border border-blue-700/50 text-white rounded-xl font-bold backdrop-blur-sm transition-all hover:scale-105 group">
              <Play size={20} className="group-hover:text-[#D4AF37] transition-colors" />
              {t('overview.heroBtn2')}
            </button>
          </div>

          {/* Visual Mockup Preview */}
          <div className="relative mx-auto mt-10 rounded-2xl md:rounded-[2.5rem] border border-white/10 bg-blue-950 shadow-2xl p-2 md:p-4 animate-fade-in-up delay-200">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80 pointer-events-none rounded-2xl md:rounded-[2.5rem] z-10"></div>
            <div className="rounded-xl md:rounded-[2rem] overflow-hidden bg-blue-900 border border-white/10 flex aspect-video relative">
              {/* E-commerce UI representation */}
              <div className="w-1/3 border-r border-white/10 p-4 bg-blue-900/50/50 relative hidden md:block">
                 <div className="h-4 bg-white/10 rounded w-24 mb-4"></div>
                 <div className="grid grid-cols-2 gap-2 mb-4">
                   <div className="h-20 bg-[#D4AF37]/10 rounded"></div>
                   <div className="h-20 bg-[#D4AF37]/10 rounded"></div>
                 </div>
                 <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
                 <div className="h-4 bg-white/10 rounded w-2/3"></div>
              </div>
              {/* Dashboard UI representation */}
              <div className="flex-1 p-4 md:p-6 bg-blue-900 relative">
                 <div className="flex justify-between items-center mb-6">
                   <div className="h-6 bg-white/10 rounded w-40"></div>
                   <div className="h-8 w-8 bg-white/10 rounded-full"></div>
                 </div>
                 <div className="grid grid-cols-3 gap-4 mb-6">
                   <div className="h-24 bg-blue-900/50 rounded-xl shadow-sm border border-white/10"></div>
                   <div className="h-24 bg-blue-900/50 rounded-xl shadow-sm border border-white/10"></div>
                   <div className="h-24 bg-blue-900/50 rounded-xl shadow-sm border border-white/10"></div>
                 </div>
                 <div className="h-48 bg-blue-900/50 rounded-xl shadow-sm border border-white/10"></div>
              </div>
              {/* Connecting element */}
              <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-blue-900/50 rounded-full shadow-lg flex items-center justify-center border border-white/10 z-20 hidden md:flex">
                <div className="w-8 h-8 bg-[#D4AF37] text-[#0B132B] rounded-full flex items-center justify-center ">
                  <Sparkles size={14} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-blue-200/60 text-sm font-medium font-kantumruy">
            <div className="flex items-center gap-2"><Globe size={18} /> {t('overview.heroFeature1')}</div>
            <div className="flex items-center gap-2"><ShieldCheck size={18} /> {t('overview.heroFeature2')}</div>
            <div className="flex items-center gap-2"><Code size={18} /> {t('overview.heroFeature3')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
