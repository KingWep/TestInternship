import React from 'react';
import { Link2, Zap, BarChart, Maximize, Clock, Cpu } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const WhyChomnenh = () => {
  const { t } = useTranslation();
  const advantages = [
    { icon: <Link2 className="text-[#D4AF37]" />, title: t('overview.adv1Title'), text: t('overview.adv1Desc') },
    { icon: <Zap className="text-yellow-500" />, title: t('overview.adv2Title'), text: t('overview.adv2Desc') },
    { icon: <BarChart className="text-emerald-500" />, title: t('overview.adv3Title'), text: t('overview.adv3Desc') },
    { icon: <Maximize className="text-purple-500" />, title: t('overview.adv4Title'), text: t('overview.adv4Desc') },
    { icon: <Clock className="text-orange-500" />, title: t('overview.adv5Title'), text: t('overview.adv5Desc') },
    { icon: <Cpu className="text-indigo-500" />, title: t('overview.adv6Title'), text: t('overview.adv6Desc') },
  ];

  return (
    <section className="py-24 bg-blue-600 text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#D4AF37] blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-500 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 font-kantumruy">
          <h2 className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-3">
            {t('overview.whyChooseUs')}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            {t('overview.advantagesTitle')}
          </h3>
          <p className="text-lg text-slate-400">
            {t('overview.advantagesSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 font-kantumruy">
          {advantages.map((adv, idx) => (
            <div key={idx} className="bg-blue-950/50 backdrop-blur-sm border border-blue-900 p-8 rounded-2xl hover:bg-blue-950 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-blue-900/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {adv.icon}
              </div>
              <h4 className="text-xl font-bold mb-3">{adv.title}</h4>
              <p className="text-slate-400 leading-relaxed">
                {adv.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChomnenh;
