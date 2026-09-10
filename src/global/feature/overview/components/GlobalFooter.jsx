import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaTelegram, FaInstagram, FaTiktok } from 'react-icons/fa';

const GlobalFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1550] border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 font-kantumruy">
          
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <a href="#" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b2f67] to-[#5a1941] shadow-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-white">
                  CHOM<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b8860b] to-[#ffc107]">NENH</span>
                </span>
                <span className="text-[10px] font-semibold text-purple-300 tracking-[2px] uppercase -mt-0.5">
                  Digital Menu System
                </span>
              </div>
            </a>
            <p className="text-purple-200/70 mb-8 max-w-sm leading-relaxed text-sm">
              វេទិកាផ្តល់ដំណោះស្រាយអាជីវកម្មឌីជីថលឈានមុខគេ ដែលផ្តល់នូវហេដ្ឋារចនាសម្ព័ន្ធពីដើមដល់ចប់ សម្រាប់ពាណិជ្ជកម្មនិងប្រតិបត្តិការសម័យទំនើប។
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-purple-200 hover:bg-[#1877F2] hover:text-white transition-all">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-purple-200 hover:bg-[#2563eb] hover:text-white transition-all">
                <FaTelegram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-purple-200 hover:bg-gradient-to-br from-pink-500 to-yellow-500 hover:text-white transition-all">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-purple-200 hover:bg-black hover:text-white transition-all">
                <FaTiktok size={18} />
              </a>
            </div>
          </div>

          {/* Platforms */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6">ប្រព័ន្ធការងារ</h4>
            <ul className="space-y-4">
              <li><a href="/shop" className="text-purple-200/70 hover:text-[#ffc107] transition-colors text-sm">ហាងទិញទំនិញអនឡាញ</a></li>
              <li><a href="/admin" className="text-purple-200/70 hover:text-[#ffc107] transition-colors text-sm">ផ្ទាំងគ្រប់គ្រងអាជីវកម្ម</a></li>
              <li><a href="#" className="text-purple-200/70 hover:text-[#ffc107] transition-colors text-sm">កម្មវិធីទូរស័ព្ទដៃ</a></li>
              <li><a href="#" className="text-purple-200/70 hover:text-[#ffc107] transition-colors text-sm">ការតភ្ជាប់ API</a></li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6">ដំណោះស្រាយ</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-purple-200/70 hover:text-[#ffc107] transition-colors text-sm">ការគ្រប់គ្រងស្តុកទំនិញ</a></li>
              <li><a href="#" className="text-purple-200/70 hover:text-[#ffc107] transition-colors text-sm">ប្រព័ន្ធគិតលុយ (POS)</a></li>
              <li><a href="#" className="text-purple-200/70 hover:text-[#ffc107] transition-colors text-sm">គ្រប់គ្រងអតិថិជន (CRM)</a></li>
              <li><a href="#" className="text-purple-200/70 hover:text-[#ffc107] transition-colors text-sm">ប្រព័ន្ធដឹកជញ្ជូន</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-bold mb-6">ទំនាក់ទំនង</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-[#ffc107] shrink-0 mt-1" size={18} />
                <span className="text-purple-200/70 text-sm">មហាវិថីបច្ចេកវិទ្យា តំបន់នវានុវត្តន៍ ទីក្រុង ភ្នំពេញ</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-[#ffc107] shrink-0" size={18} />
                <span className="text-purple-200/70 text-sm">069 400 142 / 017 300 242</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-[#ffc107] shrink-0" size={18} />
                <span className="text-purple-200/70 text-sm">hello@chomnenh.com</span>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 font-kantumruy">
          <p className="text-purple-200/50 text-sm">
            &copy; {currentYear} Chomnenh Digital Menu. រក្សាសិទ្ធិគ្រប់យ៉ាង។
          </p>
          <div className="flex gap-6 text-sm text-purple-200/50">
            <a href="#" className="hover:text-white transition-colors">គោលការណ៍ឯកជនភាព</a>
            <a href="#" className="hover:text-white transition-colors">លក្ខខណ្ឌនៃការប្រើប្រាស់</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;

