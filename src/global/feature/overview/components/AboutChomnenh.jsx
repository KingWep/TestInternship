import React from 'react';
import { Network, TrendingUp, Layers } from 'lucide-react';

const AboutChomnenh = () => {
  const features = [
    {
      icon: <Layers className="w-6 h-6 text-[#D4AF37]" />,
      title: "ការផ្លាស់ប្តូរឌីជីថល (Digital Transformation)",
      description: "យើងធ្វើឱ្យប្រតិបត្តិការអាជីវកម្មបែបប្រពៃណីមានភាពទំនើប ដោយផ្តល់នូវហេដ្ឋារចនាសម្ព័ន្ធឌីជីថលដែលជំរុញអាជីវកម្មរបស់អ្នកទៅកាន់អនាគត។",
      bgColor: "bg-[#D4AF37]/10"
    },
    {
      icon: <Network className="w-6 h-6 text-indigo-600" />,
      title: "ប្រព័ន្ធតភ្ជាប់គ្នាតែមួយ",
      description: "លែងមានការបែងចែកទិន្នន័យទៀតហើយ។ ហាងអនឡាញរបស់អតិថិជនអ្នក នឹងតភ្ជាប់ដោយផ្ទាល់ជាមួយផ្ទាំងគ្រប់គ្រងរបស់អ្នកក្នុងពេលជាក់ស្តែង (Real-time)។",
      bgColor: "bg-indigo-50"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
      title: "កំណើនអាជីវកម្ម",
      description: "ដោយស្វ័យប្រវត្តិកម្មដំណើរការការងារ និងការវិភាគទិន្នន័យស៊ីជម្រៅ យើងផ្តល់ឱ្យអ្នកនូវពេលវេលា និងឧបករណ៍ដើម្បីពង្រីកអាជីវកម្មរបស់អ្នក។",
      bgColor: "bg-emerald-50"
    }
  ];

  return (
    <section id="about" className="py-24 bg-blue-600 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 font-kantumruy">
          <h2 className="text-sm font-bold tracking-widest text-[#D4AF37] uppercase mb-3">
            តើអ្វីទៅជា Chomnenh?
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ប្រព័ន្ធកណ្តាលសម្រាប់អាជីវកម្មសម័យទំនើប
          </h3>
          <p className="text-lg text-[#94A3B8] leading-relaxed">
            Chomnenh មិនមែនត្រឹមតែជាកម្មវិធី (Software) នោះទេ។ យើងគឺជាក្រុមហ៊ុនផ្តល់ដំណោះស្រាយអាជីវកម្មឌីជីថលគ្រប់ជ្រុងជ្រោយ ដែលភ្ជាប់ទំនាក់ទំនងរវាងបទពិសោធន៍ទិញទំនិញរបស់អតិថិជន និងប្រតិបត្តិការគ្រប់គ្រងរបស់ក្រុមការងារអ្នក។
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative z-10 font-kantumruy">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-blue-950 rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-white/10 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-4">
                {feature.title}
              </h4>
              <p className="text-[#94A3B8] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutChomnenh;
