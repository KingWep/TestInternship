import React from 'react';
import { ArrowRight, Sparkles, Code, Globe, ShieldCheck } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-blue-600">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#2a2c64] text-[#0B132B]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-40 right-0 w-72 h-72 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400 border border-[#D4AF37]/20 text-[#D4AF37] font-medium text-sm mb-8 animate-fade-in-up font-kantumruy">
            <Sparkles size={16} />
            <span>ប្រព័ន្ធឌីជីថលជំនាន់ថ្មី</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.2] mb-6 font-kantumruy">
            ផ្តល់ថាមពលដល់អាជីវកម្មតាមរយៈ <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-200">
              ដំណោះស្រាយឌីជីថល
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-[#94A3B8] mb-10 max-w-3xl mx-auto leading-relaxed font-kantumruy">
            Chomnenh ភ្ជាប់ប្រតិបត្តិការទាំងមូលរបស់អ្នក។ ពីហាងអនឡាញដ៏ទាក់ទាញសម្រាប់អតិថិជន រហូតដល់ផ្ទាំងគ្រប់គ្រងដ៏មានអានុភាពសម្រាប់ក្រុមការងាររបស់អ្នក។
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="#ecosystem" className="w-full sm:w-auto px-8 py-4 rounded-full bg-amber-400 text-blue-950 hover:bg-amber-500 font-semibold text-lg transition-all shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2 group font-kantumruy">
              ស្វែងយល់ពីប្រព័ន្ធរបស់យើង
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#solutions" className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-950 border border-white/10 hover:bg-blue-900 text-white font-semibold text-lg transition-all flex items-center justify-center gap-2 font-kantumruy">
              មើលដំណោះស្រាយ
            </a>
          </div>

          {/* Visual Mockup Preview */}
          <div className="relative mx-auto mt-10 rounded-2xl md:rounded-[2.5rem] border border-white/10 bg-blue-950 shadow-2xl p-2 md:p-4 animate-fade-in-up delay-200">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80 pointer-events-none rounded-2xl md:rounded-[2.5rem] z-10"></div>
            <div className="rounded-xl md:rounded-[2rem] overflow-hidden bg-blue-900 border border-white/10 flex aspect-video relative">
              {/* E-commerce UI representation */}
              <div className="w-1/3 border-r border-white/10 p-4 bg-blue-900/50/50 relative hidden md:block">
                 <div className="h-4 bg-white/10 rounded w-24 mb-4"></div>
                 <div className="grid grid-cols-2 gap-2 mb-4">
                   <div className="h-20 bg-[#D4AF37]/10 rounded"></div>
                   <div className="h-20 bg-[#D4AF37]/10 rounded"></div>
                 </div>
                 <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
                 <div className="h-4 bg-white/10 rounded w-2/3"></div>
              </div>
              {/* Dashboard UI representation */}
              <div className="flex-1 p-4 md:p-6 bg-blue-900 relative">
                 <div className="flex justify-between items-center mb-6">
                   <div className="h-6 bg-white/10 rounded w-40"></div>
                   <div className="h-8 w-8 bg-white/10 rounded-full"></div>
                 </div>
                 <div className="grid grid-cols-3 gap-4 mb-6">
                   <div className="h-24 bg-blue-900/50 rounded-xl shadow-sm border border-white/10"></div>
                   <div className="h-24 bg-blue-900/50 rounded-xl shadow-sm border border-white/10"></div>
                   <div className="h-24 bg-blue-900/50 rounded-xl shadow-sm border border-white/10"></div>
                 </div>
                 <div className="h-48 bg-blue-900/50 rounded-xl shadow-sm border border-white/10"></div>
              </div>
              
              {/* Connecting element */}
              <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-blue-900/50 rounded-full shadow-lg flex items-center justify-center border border-white/10 z-20 hidden md:flex">
                <div className="w-8 h-8 bg-[#D4AF37] text-[#0B132B] rounded-full flex items-center justify-center ">
                  <Sparkles size={14} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-[#94A3B8] font-medium font-kantumruy">
            <div className="flex items-center gap-2"><Globe size={18} /> ប្រព័ន្ធ Cloud</div>
            <div className="flex items-center gap-2"><ShieldCheck size={18} /> សុវត្ថិភាពខ្ពស់</div>
            <div className="flex items-center gap-2"><Code size={18} /> បច្ចេកវិទ្យាទំនើប</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
