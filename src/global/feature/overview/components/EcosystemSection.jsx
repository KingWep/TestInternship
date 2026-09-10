import React from 'react';
import { ShoppingBag, Database, LayoutDashboard, ArrowRight, Server } from 'lucide-react';

const EcosystemSection = () => {
  return (
    <section id="ecosystem" className="py-24 bg-[#742555] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 font-kantumruy">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ប្រព័ន្ធការងាររបស់ Chomnenh
          </h2>
          <p className="text-lg text-purple-200">
            លំហូរទិន្នន័យយ៉ាងរលូនរវាងអតិថិជន ប្រព័ន្ធកណ្តាល និងក្រុមការងារគ្រប់គ្រងរបស់អ្នក។
          </p>
        </div>

        {/* Desktop View (Horizontal Flow) */}
        <div className="hidden lg:flex items-center justify-between max-w-5xl mx-auto font-kantumruy">
          {/* Customer / E-Commerce */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-24 h-24 rounded-2xl bg-[#5a1941] border-2 border-[#8b2f67] shadow-lg flex items-center justify-center relative z-10 mb-4 group hover:scale-105 transition-transform">
              <ShoppingBag className="w-10 h-10 text-[#ffc107]" />
            </div>
            <h4 className="font-bold text-white text-lg">អតិថិជន</h4>
            <p className="text-sm text-purple-200 text-center mt-1">ហាងទិញទំនិញអនឡាញ</p>
          </div>

          <div className="flex-1 flex justify-center text-purple-300">
            <div className="w-full h-1 bg-gradient-to-r from-purple-400 to-purple-300 relative">
              <ArrowRight className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#8b2f67] w-6 h-6 bg-white rounded-full" />
            </div>
          </div>

          {/* Central System */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-28 h-28 rounded-full bg-[#8b2f67] shadow-xl shadow-[#8b2f67]/30 flex items-center justify-center relative z-10 mb-4 group hover:scale-105 transition-transform">
              <Server className="w-12 h-12 text-white" />
            </div>
            <h4 className="font-bold text-white text-lg">ប្រព័ន្ធកណ្តាល (Core)</h4>
            <p className="text-sm text-purple-200 text-center mt-1">ដំណើរការ & ផ្ទុកទិន្នន័យ</p>
          </div>

          <div className="flex-1 flex justify-center text-purple-300">
            <div className="w-full h-1 bg-gradient-to-r from-purple-300 to-[#ffc107] relative">
              <ArrowRight className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#8b2f67] w-6 h-6 bg-white rounded-full" />
            </div>
          </div>

          {/* Business Management */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-24 h-24 rounded-2xl bg-[#5a1941] border-2 border-[#ffc107] shadow-lg flex items-center justify-center relative z-10 mb-4 group hover:scale-105 transition-transform">
              <LayoutDashboard className="w-10 h-10 text-[#ffc107]" />
            </div>
            <h4 className="font-bold text-white text-lg">ម្ចាស់អាជីវកម្ម</h4>
            <p className="text-sm text-purple-200 text-center mt-1">ផ្ទាំងគ្រប់គ្រង (Dashboard)</p>
          </div>
        </div>

        {/* Mobile View (Vertical Flow) */}
        <div className="lg:hidden flex flex-col items-center gap-8 max-w-sm mx-auto font-kantumruy">
          <div className="flex items-center gap-6 w-full bg-[#5a1941]/50 p-6 rounded-2xl shadow-sm border border-white/10">
            <div className="w-16 h-16 rounded-xl bg-[#ffc107]/10 flex items-center justify-center flex-shrink-0">
              <ShoppingBag className="w-8 h-8 text-[#ffc107]" />
            </div>
            <div>
              <h4 className="font-bold text-white">១. សម្រាប់អតិថិជន</h4>
              <p className="text-sm text-purple-200">មើលនិងបញ្ជាទិញទំនិញ</p>
            </div>
          </div>

          <ArrowRight className="w-8 h-8 text-purple-300 rotate-90" />

          <div className="flex items-center gap-6 w-full bg-[#8b2f67] p-6 rounded-2xl shadow-lg">
            <div className="w-16 h-16 rounded-xl bg-black/20 flex items-center justify-center flex-shrink-0">
              <Server className="w-8 h-8 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-white">២. ប្រព័ន្ធកណ្តាល</h4>
              <p className="text-sm text-purple-100">ធ្វើសមកាលកម្មពេលវេលាជាក់ស្តែង</p>
            </div>
          </div>

          <ArrowRight className="w-8 h-8 text-[#ffc107] rotate-90" />

          <div className="flex items-center gap-6 w-full bg-[#5a1941]/50 p-6 rounded-2xl shadow-sm border border-white/10">
            <div className="w-16 h-16 rounded-xl bg-[#ffc107]/10 flex items-center justify-center flex-shrink-0">
              <LayoutDashboard className="w-8 h-8 text-[#ffc107]" />
            </div>
            <div>
              <h4 className="font-bold text-white">៣. ផ្ទាំងគ្រប់គ្រង</h4>
              <p className="text-sm text-purple-200">ការវិភាគ & គ្រប់គ្រងប្រតិបត្តិការ</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EcosystemSection;
