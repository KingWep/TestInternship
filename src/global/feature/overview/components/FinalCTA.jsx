import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const FinalCTA = () => {
  return (
    <section className="py-24 bg-blue-600">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] bg-blue-950 text-white overflow-hidden shadow-2xl shadow-blue-900/50 font-kantumruy">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 opacity-50" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 opacity-50" />
          
          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0B132B]/50/10 backdrop-blur-sm border border-white/20 text-white mb-8">
              <Sparkles size={32} />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              តើអ្នកត្រៀមខ្លួនក្នុងការដំឡើង <br className="hidden md:block" /> ហេដ្ឋារចនាសម្ព័ន្ធអាជីវកម្មរបស់អ្នកហើយឬនៅ?
            </h2>
            
            <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl">
              ចូលរួមជាមួយក្រុមហ៊ុនដែលកំពុងដំណើរការអាជីវកម្មរបស់ពួកគេទាំងស្រុងនៅលើ Chomnenh។ ចាប់ផ្តើមការផ្លាស់ប្តូរឌីជីថលរបស់អ្នកនៅថ្ងៃនេះ។
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a href="/shop" className="px-8 py-4 rounded-xl bg-amber-400 text-blue-950 hover:bg-amber-500 font-bold text-lg transition-colors flex items-center justify-center gap-2 group shadow-lg">
                ចាប់ផ្តើមឥឡូវនេះ
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="px-8 py-4 rounded-xl bg-blue-950 border border-white/20 hover:bg-blue-900 text-white font-bold text-lg transition-colors flex items-center justify-center">
                ទំនាក់ទំនងផ្នែកលក់
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
