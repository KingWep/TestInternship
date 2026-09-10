import React from 'react';
import { useTranslation } from 'react-i18next';

const HowItWorks = () => {
  const { t } = useTranslation();
  const steps = [
    {
      num: t('overview.step1Num'),
      title: t('overview.step1Title'),
      description: t('overview.step1Desc'),
    },
    {
      num: t('overview.step2Num'),
      title: t('overview.step2Title'),
      description: t('overview.step2Desc'),
    },
    {
      num: t('overview.step3Num'),
      title: t('overview.step3Title'),
      description: t('overview.step3Desc'),
    },
    {
      num: t('overview.step4Num'),
      title: t('overview.step4Title'),
      description: t('overview.step4Desc'),
    },
    {
      num: t('overview.step5Num'),
      title: t('overview.step5Title'),
      description: t('overview.step5Desc'),
    }
  ];

  return (
    <section className="py-24 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 font-kantumruy">
          <h2 className="text-sm font-bold tracking-widest text-indigo-600 uppercase mb-3">
            {t('overview.workflow')}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('overview.howItWorksTitle')}
          </h3>
          <p className="text-lg text-[#94A3B8]">
            {t('overview.howItWorksSubtitle')}
          </p>
        </div>

        <div className="relative font-kantumruy">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-blue-950/50 rounded-2xl border-2 border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl mb-6 shadow-sm group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-300">
                  {step.num}
                </div>
                <h4 className="font-bold text-white text-lg mb-3">
                  {step.title}
                </h4>
                <p className="text-[#94A3B8] text-sm leading-relaxed px-2">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
