import React from 'react';
import { ShoppingBag, LayoutDashboard, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PlatformCards = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 font-kantumruy">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('overview.platformTitle')}
          </h2>
          <p className="text-lg text-[#94A3B8]">
            {t('overview.platformSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto font-kantumruy">
          {/* E-Commerce Card */}
          <div className="bg-blue-950 rounded-3xl p-8 lg:p-12 border border-white/10 shadow-xl shadow-gray-200/40 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-2xl flex items-center justify-center mb-8">
              <ShoppingBag className="w-8 h-8 text-[#D4AF37]" />
            </div>
            
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              {t('overview.platformEcomTitle')}
            </h3>
            <p className="text-[#94A3B8] mb-8 text-lg">
              {t('overview.platformEcomDesc')}
            </p>
            
            <ul className="space-y-4 mb-10">
              {[t('overview.platformEcomFeat1'), t('overview.platformEcomFeat2'), t('overview.platformEcomFeat3'), t('overview.platformEcomFeat4')].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#D4AF37] shrink-0" />
                  <span className="text-[#94A3B8] font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            
            <a href="/shop" className="inline-flex items-center justify-center gap-2 w-full py-4 bg-amber-400 text-blue-950 hover:bg-amber-500 rounded-xl font-bold transition-colors">
              {t('overview.platformEcomBtn')}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* Dashboard Card */}
          <div className="bg-blue-950 rounded-3xl p-8 lg:p-12 border border-blue-900 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="w-16 h-16 bg-blue-900 rounded-2xl flex items-center justify-center mb-8 border border-blue-800">
              <LayoutDashboard className="w-8 h-8 text-indigo-400" />
            </div>
            
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              {t('overview.platformDashTitle')}
            </h3>
            <p className="text-[#94A3B8] mb-8 text-lg">
              {t('overview.platformDashDesc')}
            </p>
            
            <ul className="space-y-4 mb-10">
              {[t('overview.platformDashFeat1'), t('overview.platformDashFeat2'), t('overview.platformDashFeat3'), t('overview.platformDashFeat4')].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-indigo-400 shrink-0" />
                  <span className="text-white font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            
            <a href="/login" className="inline-flex items-center justify-center gap-2 w-full py-4 bg-blue-950 border border-white/20 hover:bg-blue-900 text-white rounded-xl font-bold transition-colors">
              {t('overview.platformDashBtn')}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformCards;
