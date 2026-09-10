import React from 'react';
import { 
  ShoppingCart, 
  Package, 
  CreditCard, 
  Truck, 
  Users, 
  BarChart3, 
  UserCircle, 
  Settings2,
  Store
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SolutionsGrid = () => {
  const { t } = useTranslation();
  const modules = [
    { icon: <ShoppingCart />, title: t('overview.mod1Title'), desc: t('overview.mod1Desc') },
    { icon: <Package />, title: t('overview.mod2Title'), desc: t('overview.mod2Desc') },
    { icon: <Store />, title: t('overview.mod3Title'), desc: t('overview.mod3Desc') },
    { icon: <Settings2 />, title: t('overview.mod4Title'), desc: t('overview.mod4Desc') },
    { icon: <Users />, title: t('overview.mod5Title'), desc: t('overview.mod5Desc') },
    { icon: <CreditCard />, title: t('overview.mod6Title'), desc: t('overview.mod6Desc') },
    { icon: <Truck />, title: t('overview.mod7Title'), desc: t('overview.mod7Desc') },
    { icon: <BarChart3 />, title: t('overview.mod8Title'), desc: t('overview.mod8Desc') },
    { icon: <UserCircle />, title: t('overview.mod9Title'), desc: t('overview.mod9Desc') },
  ];

  return (
    <section id="solutions" className="py-24 bg-[#e8e8e8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 font-kantumruy">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t('overview.solutionsTitle')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('overview.solutionsSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-kantumruy">
          {modules.map((mod, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl border border-gray-200 bg-white hover:border-[#8b2f67]/30 transition-all duration-300 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-[#8b2f67]/10 text-[#8b2f67] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#8b2f67] group-hover:text-white transition-all">
                {React.cloneElement(mod.icon, { size: 24 })}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#8b2f67] transition-colors">
                {mod.title}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {mod.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsGrid;
