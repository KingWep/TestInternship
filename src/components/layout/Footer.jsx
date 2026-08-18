import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
} from "react-icons/fa";

import {
  MapPin,
  Phone,
  Clock,
  Mail,
} from "lucide-react";

import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-white text-slate-300 pt-0 pb-4 mt-20 border-t">
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand Column */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-white tracking-wide">
            ONE CARE SHOP
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            យើងខ្ញុំផ្តល់ជូនផលិតផលដែលមានគុណភាពនិងសុវត្ថិភាព 100% សម្រាប់សុខភាពនិងសម្រស់របស់អ្នក។
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="#facebook"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-blue-600 hover:text-white transition-all duration-200"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="#instagram"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-blue-600 hover:text-white transition-all duration-200"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="#telegram"
              aria-label="Telegram"
              className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-sky-500 hover:text-white transition-all duration-200"
            >
              <FaTelegramPlane size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
            ព័ត៌មានបន្ថែម
          </h4>
          <ul className="text-sm space-y-3">
            <li>
              <a href="#how-to-order" className="text-slate-400 hover:text-white transition-colors duration-150">
                របៀបបញ្ជាទិញ
              </a>
            </li>
            <li>
              <a href="#shipping" className="text-slate-400 hover:text-white transition-colors duration-150">
                គោលការណ៍ដឹកជញ្ជូន
              </a>
            </li>
            <li>
              <a href="#contact" className="text-slate-400 hover:text-white transition-colors duration-150">
                ទំនាក់ទំនងយើង
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
            សេវាកម្មអតិថិជន
          </h4>
          <ul className="text-sm space-y-3">
            <li>
              <a href="#faq" className="text-slate-400 hover:text-white transition-colors duration-150">
                សំណួរដែលសួរញឹកញាប់
              </a>
            </li>
            <li>
              <a href="#privacy" className="text-slate-400 hover:text-white transition-colors duration-150">
                គោលការណ៍ឯកជនភាព
              </a>
            </li>
            <li>
              <a href="#terms" className="text-slate-400 hover:text-white transition-colors duration-150">
                លក្ខខណ្ឌសេវាកម្ម
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
            ទំនាក់ទំនង
          </h4>
          <ul className="text-sm space-y-3 text-slate-400">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-red-500 shrink-0 mt-0.5" />
              <span>ភ្នំពេញ, កម្ពុជា</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-red-500 shrink-0" />
              <a href="tel:+855886677456" className="hover:text-white transition-colors">
                +855 88 66 77 456
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Clock size={18} className="text-red-500 shrink-0" />
              <span>8:00 AM - 8:00 PM</span>
            </li>
          </ul>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-slate-300 pt-4">
        <Container className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} One Care Shop. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-slate-400 transition-colors">Privacy</a>
            <a href="#terms" className="hover:text-slate-400 transition-colors">Terms</a>
          </div>
        </Container>
      </div>
    </footer>
  );
}