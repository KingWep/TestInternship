import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

import {
  MapPin,
  Phone,
  Clock,
} from "lucide-react";

import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-slate-50 pt-8 pb-4 mt-16">
      <Container className="grid grid-row md:grid-cols-3 gap-10">
        <div>
          <h3 className="font-bold text-red-900 mb-3">
            ONE CARE SHOP
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            យើងខ្ញុំផ្តល់ជូនផលិតផលដែលមានគុណភាពនិងសុវត្ថិភាព 100%
          </p>
          <div className="flex gap-3 mt-4">
            <FaFacebook
              size={18}
              className="text-slate-500 hover:text-blue-600 cursor-pointer"
            />
            <FaInstagram
              size={18}
              className="text-slate-500 hover:text-pink-600 cursor-pointer"
            />
            <FaTwitter
              size={18}
              className="text-slate-500 hover:text-sky-500 cursor-pointer"
            />
          </div>
        </div>
        <div>
          <h3 className="font-bold text-red-900 mb-3">
            ព័ត៌មានបន្ថែម
          </h3>

          <ul className="text-sm text-slate-500 space-y-2">
            <li>របៀបបញ្ជាទិញ</li>
            <li>គោលការណ៍ដឹកជញ្ជូន</li>
            <li>ទំនាក់ទំនងយើង</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-red-900 mb-3">
            ទំនាក់ទំនង
          </h3>
          <ul className="text-sm text-slate-500 space-y-2">
            <li className="flex items-center gap-2">
              <MapPin size={16} />
              ភ្នំពេញ, កម្ពុជា
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              +855 88 66 77 456
            </li>
            <li className="flex items-center gap-2">
              <Clock size={16} />
              8:00 AM - 12:00 PM
            </li>
          </ul>
        </div>

      </Container>
    </footer>
  );
}