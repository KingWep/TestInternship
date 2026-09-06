import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      num: "០១",
      title: "ការស្វែងរករបស់អតិថិជន",
      description: "អតិថិជនរុករកទំនិញនៅលើហាងអនឡាញរបស់អ្នក ជាមួយនឹងបទពិសោធន៍ដ៏ទាក់ទាញ។",
    },
    {
      num: "០២",
      title: "ការបញ្ជាទិញប្រកបដោយសុវត្ថិភាព",
      description: "ប្រតិបត្តិការទូទាត់រលូន ជាមួយនឹងការបញ្ជាក់ការបញ្ជាទិញភ្លាមៗ។",
    },
    {
      num: "០៣",
      title: "ធ្វើសមកាលកម្មទិន្នន័យ",
      description: "Chomnenh បញ្ជូនទិន្នន័យការបញ្ជាទិញទៅប្រព័ន្ធកណ្តាល និងកាត់ស្តុកដោយស្វ័យប្រវត្តិ។",
    },
    {
      num: "០៤",
      title: "ជូនដំណឹងលើ Dashboard",
      description: "ក្រុមការងាររបស់អ្នកទទួលបានសារជូនដំណឹងភ្លាមៗនៅលើផ្ទាំងគ្រប់គ្រងដើម្បីចាប់ផ្តើមរៀបចំអីវ៉ាន់។",
    },
    {
      num: "០៥",
      title: "ការវិភាគ & កំណើន",
      description: "ទិន្នន័យពីការលក់នឹងត្រូវបញ្ចូលទៅក្នុងរបាយការណ៍ ជួយអ្នកក្នុងការសម្រេចចិត្តប្រកបដោយប្រសិទ្ធភាព។",
    }
  ];

  return (
    <section className="py-24 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 font-kantumruy">
          <h2 className="text-sm font-bold tracking-widest text-indigo-600 uppercase mb-3">
            លំហូរការងារ
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            របៀបដែល Chomnenh ដំណើរការ
          </h3>
          <p className="text-lg text-[#94A3B8]">
            ទិដ្ឋភាពមួយជំហានម្តងៗ អំពីរបៀបដែលទិន្នន័យផ្លាស់ទីដោយសុវត្ថិភាព ពីការចុចទិញរបស់អតិថិជន រហូតដល់របាយការណ៍ប្រាក់ចំណេញរបស់អ្នក។
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
