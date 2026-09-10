import React from 'react';
import { Link2, Zap, BarChart, Maximize, Clock, Cpu } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const WhyChomnenh = () => {
  const { t } = useTranslation();
  const advantages = [
    { icon: <Clock className="text-[#8b2f67] w-6 h-6" />, title: t('overview.adv1Title'), text: t('overview.adv1Desc') },
    { icon: <Zap className="text-[#742555] w-6 h-6" />, title: t('overview.adv2Title'), text: t('overview.adv2Desc') },
    { icon: <BarChart className="text-[#5a1941] w-6 h-6" />, title: t('overview.adv3Title'), text: t('overview.adv3Desc') },
    { icon: <Maximize className="text-[#8b2f67] w-6 h-6" />, title: t('overview.adv4Title'), text: t('overview.adv4Desc') },
    { icon: <Link2 className="text-[#ffc107] w-6 h-6" />, title: t('overview.adv5Title'), text: t('overview.adv5Desc') },
    { icon: <Cpu className="text-[#742555] w-6 h-6" />, title: t('overview.adv6Title'), text: t('overview.adv6Desc') },
  ];

  return (
    <section className="py-24 bg-[#f8f9fa] relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-50 pointer-events-none z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#ffc107]/5 blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#8b2f67]/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 font-kantumruy">
          <h2 className="text-sm font-bold tracking-widest text-[#8b2f67] uppercase mb-3">
            {t('overview.whyChooseUs')}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            {t('overview.advantagesTitle')}
          </h3>
          <p className="text-lg text-gray-600">
            {t('overview.advantagesSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 font-kantumruy">
          {advantages.map((adv, idx) => (
            <div key={idx} className="bg-white border border-gray-100 p-6 rounded-2xl hover:border-[#8b2f67]/30 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 group flex items-start gap-5 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-[#8b2f67]/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-[#8b2f67]/10 transition-transform">
                {adv.icon}
              </div>
              <div>
                <h4 className="text-lg font-bold mb-1 text-gray-900 group-hover:text-[#8b2f67] transition-colors">{adv.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {adv.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChomnenh;
