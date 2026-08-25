import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
} from "react-icons/fa";

import {
  MapPin,
  Phone,
  Clock,
} from "lucide-react";

import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-white text-slate-300 pt-8 pb-4 mt-20 border-t flex-col">
      <Container>
        <div className="flex flex-wrap justify-between gap-x-8 gap-y-10 mb-5">
          <div className="space-y-3 w-full sm:w-[calc(50%-1rem)] lg:w-[260px]">
            <h3 className="font-bold text-lg text-red-900 tracking-wide">
              ONE CARE SHOP
            </h3>
            <p className="text-sm text-black leading-relaxed">
              យើងខ្ញុំផ្តល់ជូនផលិតផលដែលមានគុណភាពនិងសុវត្ថិភាព 100% សម្រាប់សុខភាពនិងសម្រស់របស់អ្នក។
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.facebook.com/share/1EzGQtkvGq/?mibextid=wwXIfr"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-200"
              >
                <FaFacebookF size={16} />
              </a>
              <a
                href="https://www.instagram.com/valverdexteam?igsh=NHB6NGo0bGNzNWU5&igsi=NHB6NGo0bGNzNWU5"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-200"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="https://t.me/thadev168"
                aria-label="Telegram"
                className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-sky-500 transition-all duration-200"
              >
                <FaTelegramPlane size={16} />
              </a>
            </div>
          </div>

          <div className="w-full sm:w-[calc(50%-1rem)] lg:w-auto">
            <h4 className="font-semibold text-red-900 mb-3 text-sm uppercase tracking-wider">
              ព័ត៌មានបន្ថែម
            </h4>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#how-to-order" className="text-black hover:text-red-900 transition-colors duration-150 block">
                  របៀបបញ្ជាទិញ
                </a>
              </li>
              <li>
                <a href="#shipping" className="text-black hover:text-red-900 transition-colors duration-150 block">
                  គោលការណ៍ដឹកជញ្ជូន
                </a>
              </li>
              <li>
                <a href="#contact" className="text-black hover:text-red-900 transition-colors duration-150 block">
                  ទំនាក់ទំនងយើង
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-[calc(50%-1rem)] lg:w-auto">
            <h4 className="font-semibold text-red-900 mb-3 text-sm uppercase tracking-wider">
              សេវាកម្មអតិថិជន
            </h4>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#faq" className="text-black hover:text-red-900 transition-colors duration-150 block">
                  សំណួរដែលសួរញឹកញាប់
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-black hover:text-red-900 transition-colors duration-150 block">
                  គោលការណ៍ឯកជនភាព
                </a>
              </li>
              <li>
                <a href="#terms" className="text-black hover:text-red-900 transition-colors duration-150 block">
                  លក្ខខណ្ឌសេវាកម្ម
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-[calc(50%-1rem)] lg:w-auto">
            <h4 className="font-semibold text-red-900 mb-3 text-sm uppercase tracking-wider">
              ទំនាក់ទំនង
            </h4>
            <ul className="text-sm space-y-2 text-black">
              <li className="flex items-start gap-2.5">
                <MapPin size={18} className="text-red-500 shrink-0 mt-0.5" />
                <span>ភ្នំពេញ, កម្ពុជា</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={18} className="text-red-500 shrink-0" />
                <a href="tel:+855886677456" className="hover:text-red-900 transition-colors">
                  +855 88 66 77 456
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={18} className="text-red-500 shrink-0" />
                <span>8:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>

        </div>
      </Container>

      <div className="border-t border-slate-200 pt-4 pb-2">
        <Container className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} One Care Shop. រក្សាសិទ្ធិគ្រប់យ៉ាង។</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-black transition-colors">ឯកជនភាព</a>
            <a href="#terms" className="hover:text-black transition-colors">លក្ខខណ្ឌ</a>
          </div>
        </Container>
      </div>
    </footer>
  );
}