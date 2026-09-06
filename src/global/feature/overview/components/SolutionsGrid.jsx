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

const SolutionsGrid = () => {
  const modules = [
    { icon: <ShoppingCart />, title: 'ហាងទិញទំនិញអនឡាញ', desc: 'ហាងឌីជីថលដ៏ស្រស់ស្អាតនិងមានអត្រាលក់ចេញខ្ពស់។' },
    { icon: <Package />, title: 'ការគ្រប់គ្រងស្តុក', desc: 'តាមដានស្តុកទំនិញជាក់ស្តែងនៅគ្រប់ទីតាំងទាំងអស់។' },
    { icon: <Store />, title: 'ប្រព័ន្ធគិតលុយ (POS)', desc: 'ភ្ជាប់ប្រព័ន្ធលក់រាយនៅហាងផ្ទាល់យ៉ាងរលូន។' },
    { icon: <Settings2 />, title: 'គ្រប់គ្រងការបញ្ជាទិញ', desc: 'ស្វ័យប្រវត្តិកម្មលំហូរការងារនិងការរៀបចំអីវ៉ាន់។' },
    { icon: <Users />, title: 'គ្រប់គ្រងអតិថិជន (CRM)', desc: 'ឧបករណ៍កសាងទំនាក់ទំនងយូរអង្វែងជាមួយអតិថិជន។' },
    { icon: <CreditCard />, title: 'ដំណើរការទូទាត់', desc: 'ការគ្រប់គ្រងការទូទាត់ដែលមានសុវត្ថិភាពខ្ពស់។' },
    { icon: <Truck />, title: 'ការដឹកជញ្ជូន', desc: 'ប្រព័ន្ធគ្រប់គ្រងអ្នកដឹកជញ្ជូននិងតាមដានការដឹក។' },
    { icon: <BarChart3 />, title: 'របាយការណ៍ស៊ីជម្រៅ', desc: 'ទិន្នន័យលម្អិតអំពីការលក់និងប្រតិបត្តិការអាជីវកម្ម។' },
    { icon: <UserCircle />, title: 'ការគ្រប់គ្រងបុគ្គលិក', desc: 'សិទ្ធិប្រើប្រាស់និងការតាមដានការងាររបស់បុគ្គលិក។' },
  ];

  return (
    <section id="solutions" className="py-24 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 font-kantumruy">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ប្រព័ន្ធឌីជីថលគ្រប់ជ្រុងជ្រោយ
          </h2>
          <p className="text-lg text-[#94A3B8]">
            Chomnenh ផ្តល់នូវប្រព័ន្ធពេញលេញមួយ។ ប្រើប្រាស់អ្វីដែលអ្នកត្រូវការនៅថ្ងៃនេះ ហើយពង្រីកបន្ថែមមុខងារនៅថ្ងៃស្អែក។
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-kantumruy">
          {modules.map((mod, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl border border-white/10 bg-blue-950 hover:bg-[#0B132B] hover:border-[#D4AF37]/20 transition-all duration-300 group shadow-sm hover:shadow-md cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#D4AF37] text-[#0B132B] group-hover: transition-all">
                {React.cloneElement(mod.icon, { size: 24 })}
              </div>
              <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                {mod.title}
              </h4>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
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
