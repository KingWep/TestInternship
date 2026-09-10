import React from 'react';
import { Phone, PlayCircle, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FinalCTA = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 font-kantumruy">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ទំនាក់ទំនងយើងខ្ញុំ
          </h2>
          <p className="text-lg text-gray-500">
            មានសំណួរ ឬចង់ចាប់ផ្តើមប្រើប្រាស់? សូមទំនាក់ទំនងយើងខ្ញុំតាមរយៈទូរស័ព្ទ ឬ Telegram
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 font-kantumruy">
          {/* Phone Card */}
          <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#8b2f67]/10 text-[#8b2f67] flex items-center justify-center mb-6">
              <Phone size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">លេខទូរស័ព្ទទំនាក់ទំនង</h3>
            <div className="flex flex-col gap-3 font-bold text-gray-800 text-lg">
              <p>069 400 142</p>
              <p>017 300 242</p>
            </div>
          </div>

          {/* YouTube Card */}
          <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#dc2626]/10 text-[#dc2626] flex items-center justify-center mb-6">
              <PlayCircle size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">ឆានែល YouTube</h3>
            <p className="text-gray-500 mb-8 px-4 text-sm leading-relaxed">
              ទស្សនាវីដេអូបង្រៀន និងព័ត៌មានថ្មីៗពីពួកយើង
            </p>
            <a href="#" className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#dc2626] text-white hover:bg-[#b91c1c] font-medium transition-colors flex items-center justify-center gap-2">
              <PlayCircle size={18} />
              ចូលមើល YouTube
            </a>
          </div>

          {/* Telegram Card */}
          <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#2563eb]/10 text-[#2563eb] flex items-center justify-center mb-6">
              <Send size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">ឆានែល Telegram</h3>
            <p className="text-gray-500 mb-8 px-4 text-sm leading-relaxed">
              ទំនាក់ទំនងរហ័ស និងប្រឹក្សាយោបល់ជាមួយក្រុមការងារយើងខ្ញុំ
            </p>
            <a href="#" className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#2563eb] text-white hover:bg-[#1d4ed8] font-medium transition-colors flex items-center justify-center gap-2">
              <Send size={18} />
              ឆាតចូល Telegram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
