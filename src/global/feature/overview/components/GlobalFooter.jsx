import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const GlobalFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-950 border-t border-blue-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 font-kantumruy">
          
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37] flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="font-bold text-2xl tracking-tight text-white">
                CHOMNENH
              </span>
            </a>
            <p className="text-slate-400 mb-8 max-w-sm leading-relaxed">
              វេទិកាផ្តល់ដំណោះស្រាយអាជីវកម្មឌីជីថលឈានមុខគេ ដែលផ្តល់នូវហេដ្ឋារចនាសម្ព័ន្ធពីដើមដល់ចប់ សម្រាប់ពាណិជ្ជកម្មនិងប្រតិបត្តិការសម័យទំនើប។
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-slate-400 hover:bg-amber-400 text-[#0B132B] hover: transition-all">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-slate-400 hover:bg-amber-400 hover:text-white transition-all">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:text-white transition-all">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Platforms */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6">ប្រព័ន្ធការងារ</h4>
            <ul className="space-y-4">
              <li><a href="/shop" className="text-slate-400 hover:text-blue-400 transition-colors">ហាងទិញទំនិញអនឡាញ</a></li>
              <li><a href="/admin" className="text-slate-400 hover:text-blue-400 transition-colors">ផ្ទាំងគ្រប់គ្រងអាជីវកម្ម</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">កម្មវិធីទូរស័ព្ទដៃ</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">ការតភ្ជាប់ API</a></li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6">ដំណោះស្រាយ</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">ការគ្រប់គ្រងស្តុកទំនិញ</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">ប្រព័ន្ធគិតលុយ (POS)</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">គ្រប់គ្រងអតិថិជន (CRM)</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">ប្រព័ន្ធដឹកជញ្ជូន</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-bold mb-6">ទំនាក់ទំនង</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-[#D4AF37] shrink-0 mt-1" size={18} />
                <span className="text-slate-400">មហាវិថីបច្ចេកវិទ្យា តំបន់នវានុវត្តន៍ ទីក្រុង ភ្នំពេញ</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-[#D4AF37] shrink-0" size={18} />
                <span className="text-slate-400">+855 12 345 678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-[#D4AF37] shrink-0" size={18} />
                <span className="text-slate-400">hello@chomnenh.com</span>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-blue-900 flex flex-col md:flex-row justify-between items-center gap-4 font-kantumruy">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} Chomnenh Inc. រក្សាសិទ្ធិគ្រប់យ៉ាង។
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">គោលការណ៍ឯកជនភាព</a>
            <a href="#" className="hover:text-white transition-colors">លក្ខខណ្ឌនៃការប្រើប្រាស់</a>
            <a href="#" className="hover:text-white transition-colors">ការកំណត់ Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;
