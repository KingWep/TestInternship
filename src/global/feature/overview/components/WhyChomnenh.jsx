import React from 'react';
import { Link2, Zap, BarChart, Maximize, Clock, Cpu } from 'lucide-react';

const WhyChomnenh = () => {
  const advantages = [
    { icon: <Link2 className="text-[#D4AF37]" />, title: 'ប្រព័ន្ធតភ្ជាប់គ្នាតែមួយ', text: 'លែងចាំបាច់ប្រើប្រាស់កម្មវិធីច្រើនផ្សេងគ្នា។ អ្វីៗទាំងអស់ដំណើរការលើមូលដ្ឋានទិន្នន័យតែមួយ។' },
    { icon: <Zap className="text-yellow-500" />, title: 'ងាយស្រួលប្រើប្រាស់', text: 'កម្មវិធីខ្នាតធំ ដែលត្រូវបានរចនាឡើងយ៉ាងសាមញ្ញ ស្រស់ស្អាត និងងាយស្រួលប្រើបំផុត។' },
    { icon: <BarChart className="text-emerald-500" />, title: 'សម្រេចចិត្តតាមទិន្នន័យ', text: 'ធ្វើការសម្រេចចិត្តដោយផ្អែកលើតួលេខជាក់ស្តែង មិនមែនត្រឹមតែការស្មាននោះទេ។' },
    { icon: <Maximize className="text-purple-500" />, title: 'ងាយស្រួលពង្រីកសាខា', text: 'ទោះជាអ្នកមានការបញ្ជាទិញ ១០ ឬ ១០,០០០ ក្នុងមួយថ្ងៃ Chomnenh អាចដំណើរការបានយ៉ាងរលូន។' },
    { icon: <Clock className="text-orange-500" />, title: 'ប្រសិទ្ធភាពអតិបរមា', text: 'ធ្វើស្វ័យប្រវត្តិកម្មលើការងារដដែលៗ ដើម្បីផ្តល់ពេលវេលាឱ្យបុគ្គលិករបស់អ្នកបង្កើតគំនិតថ្មីៗ។' },
    { icon: <Cpu className="text-indigo-500" />, title: 'បច្ចេកវិទ្យាទំនើបចុងក្រោយ', text: 'បង្កើតឡើងដោយហេដ្ឋារចនាសម្ព័ន្ធ Cloud ដែលធានាបាននូវសុវត្ថិភាពនិងដំណើរការ ៩៩.៩%។' },
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
            ហេតុអ្វីត្រូវជ្រើសរើសយើង
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            អត្ថប្រយោជន៍របស់ Chomnenh
          </h3>
          <p className="text-lg text-slate-400">
            យើងមិនត្រឹមតែផ្តល់នូវកម្មវិធីប៉ុណ្ណោះទេ យើងផ្តល់នូវការកែប្រែជាមូលដ្ឋានទៅលើរបៀបដែលអាជីវកម្មរបស់អ្នកដំណើរការ។
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
