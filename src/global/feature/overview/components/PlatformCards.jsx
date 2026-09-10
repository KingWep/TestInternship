import React from 'react';
import { ShoppingBag, LayoutDashboard, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PlatformCards = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-[#e8e8e8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 font-kantumruy">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t('overview.platformTitle')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('overview.platformSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto font-kantumruy">
          {/* E-Commerce Card */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 border border-gray-200 shadow-[0_10px_25px_rgba(0,0,0,0.05)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffc107]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="w-16 h-16 bg-[#ffc107]/20 rounded-2xl flex items-center justify-center mb-8">
              <ShoppingBag className="w-8 h-8 text-[#8b2f67]" />
            </div>
            
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              {t('overview.platformEcomTitle')}
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              {t('overview.platformEcomDesc')}
            </p>
            
            <ul className="space-y-4 mb-10 relative z-10">
              {[t('overview.platformEcomFeat1'), t('overview.platformEcomFeat2'), t('overview.platformEcomFeat3'), t('overview.platformEcomFeat4')].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#8b2f67] shrink-0" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            
            <a href="/shop" className="inline-flex items-center justify-center gap-2 w-full py-4 bg-[#ffc107] text-gray-900 hover:bg-[#8b2f67] hover:text-white rounded-xl font-bold transition-colors relative z-10">
              {t('overview.platformEcomBtn')}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* Dashboard Card */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 border border-gray-200 shadow-[0_10px_25px_rgba(0,0,0,0.05)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#8b2f67]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="w-16 h-16 bg-[#8b2f67]/10 rounded-2xl flex items-center justify-center mb-8 border border-[#8b2f67]/20">
              <LayoutDashboard className="w-8 h-8 text-[#8b2f67]" />
            </div>
            
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              {t('overview.platformDashTitle')}
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              {t('overview.platformDashDesc')}
            </p>
            
            <ul className="space-y-4 mb-10 relative z-10">
              {[t('overview.platformDashFeat1'), t('overview.platformDashFeat2'), t('overview.platformDashFeat3'), t('overview.platformDashFeat4')].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#8b2f67] shrink-0" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            
            <a href="/login" className="inline-flex items-center justify-center gap-2 w-full py-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 rounded-xl font-bold transition-colors relative z-10">
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
