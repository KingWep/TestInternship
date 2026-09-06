import React from 'react';
import { XCircle, CheckCircle } from 'lucide-react';

const BusinessImpact = () => {
  const before = [
    "ប្រើប្រាស់ឯកសារដោយដៃ និងប្រព័ន្ធមិនភ្ជាប់គ្នា",
    "បាត់បង់ទិន្នន័យអតិថិជនរវាងប្រព័ន្ធផ្សេងៗ",
    "ការកាត់ស្តុកយឺតយ៉ាវ បណ្តាលឱ្យអស់ទំនិញលក់",
    "មានកំហុសច្រើនក្នុងការរៀបចំការបញ្ជាទិញ",
    "មិនអាចតាមដានដំណើរការអាជីវកម្មពិតប្រាកដ"
  ];

  const after = [
    "ស្វ័យប្រវត្តិកម្មតាំងពីអតិថិជនចុចទិញរហូតដល់ការដឹកជញ្ជូន",
    "ប្រព័ន្ធគ្រប់គ្រងអតិថិជនតែមួយដែលមានប្រវត្តិពេញលេញ",
    "ស្តុកទំនិញត្រូវបានកាត់ភ្លាមៗនៅគ្រប់ទីកន្លែង",
    "លំហូរការងាររលូន និងគ្មានកំហុសក្នុងការរៀបចំអីវ៉ាន់",
    "របាយការណ៍ច្បាស់លាស់ និងការវិភាគកម្រិតខ្ពស់"
  ];

  return (
    <section id="impact" className="py-24 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 font-kantumruy">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ផ្លាស់ប្តូរប្រតិបត្តិការរបស់អ្នក
          </h2>
          <p className="text-lg text-[#94A3B8]">
            ស្វែងយល់ពីឥទ្ធិពលផ្ទាល់នៃការបញ្ចូលប្រព័ន្ធ Chomnenh ទៅក្នុងអាជីវកម្មរបស់អ្នក។
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-5xl mx-auto font-kantumruy">
          {/* Before */}
          <div className="bg-red-50/50 rounded-3xl p-8 lg:p-10 border border-red-100">
            <h3 className="text-2xl font-bold text-red-900 mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                <XCircle size={24} />
              </span>
              មុនពេលប្រើ Chomnenh
            </h3>
            
            <ul className="space-y-6">
              {before.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1 w-2 h-2 rounded-full bg-red-400 shrink-0" />
                  <span className="text-red-900/80 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="bg-emerald-50 rounded-3xl p-8 lg:p-10 border border-emerald-100 shadow-xl shadow-emerald-100/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <h3 className="text-2xl font-bold text-emerald-900 mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <CheckCircle size={24} />
              </span>
              ក្រោយពេលប្រើ Chomnenh
            </h3>
            
            <ul className="space-y-6 relative z-10">
              {after.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="text-emerald-900 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessImpact;
