import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaTiktok,
  FaYoutube,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { MapPin, Phone, Clock, Globe } from "lucide-react";

import Container from "./Container";
import { useParams } from "react-router-dom";
import { usePublicSettingsQuery } from "../../../queries/settings/useSettingQueries";

export default function Footer() {
  const { shop_code } = useParams();
  const { data: settingData, isLoading } = usePublicSettingsQuery(shop_code);
  const shopName = settingData?.shop_name || "Shop";
  // const supportFile = settingData?.support || "support.pdf";
  // console.log("SupportFile", supportFile);

  const socialMediaLinks = settingData?.social_media || [];
  console.log("SocialMediaLinks", socialMediaLinks);

  // Maps icon value strings (saved from GeneralSettings) to React icon components
  const socialIconMap = {
    "fa-telegram": <FaTelegramPlane size={16} className="text-white" />,
    "fa-facebook": <FaFacebookF size={16} className="text-white" />,
    "fa-tiktok": <FaTiktok size={16} className="text-white" />,
    "fa-instagram": <FaInstagram size={16} className="text-white" />,
    "fa-twitter": <FaTwitter size={16} className="text-white" />,
    "fa-youtube": <FaYoutube size={16} className="text-white" />,
    "fa-linkedin": <FaLinkedinIn size={16} className="text-white" />,
    "fa-globe": <Globe size={16} className="text-white" />,
  };

  return (
    <footer className="bg-white text-slate-300 pt-8 pb-4 mt-8 border-t flex-col">
      <Container>
        <div className="flex flex-wrap justify-between gap-x-8 gap-y-10 mb-5">
          <div className="space-y-3 w-full sm:w-[calc(50%-1rem)] lg:w-[260px]">
            <h3 className="font-bold text-lg text-red-900 tracking-wide">
              {isLoading ? "..." : shopName}
            </h3>
            <p className="text-sm text-black leading-relaxed">
              យើងខ្ញុំផ្តល់ជូនផលិតផលដែលមានគុណភាពនិងសុវត្ថិភាព 100%
              សម្រាប់សុខភាពនិងសម្រស់របស់អ្នក។
            </p>
            <div className="flex items-center gap-3 pt-1">
              {socialMediaLinks.map((social, index) => {
                console.log("SocialMedia", social);
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.title}
                    title={social.title}
                    className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white transition-all duration-200"
                  >
                    {socialIconMap[social.icon] ?? (
                      <Globe size={16} className="text-white" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="w-full sm:w-[calc(50%-1rem)] lg:w-auto">
            <h4 className="font-semibold text-red-900 mb-3 text-sm uppercase tracking-wider">
              ព័ត៌មានបន្ថែម
            </h4>
            <ul className="text-sm space-y-2">
              <li>
                <a
                  href={settingData?.support || "#"}
                  target="_blank" // បើកនៅ Tab ថ្មី
                  rel="noopener noreferrer" // ការពាររឿង Security (Best Practice ពេលប្រើ target="_blank")
                  download={false} // ទុកជា False បើចង់ឱ្យវាបង្ហាញមើល (Preview) ក្នុង Browser ផ្ទាល់
                  className="text-black hover:text-red-900 transition-colors duration-150 block"
                >
                  របៀបបញ្ជាទិញ
                </a>
              </li>
              <li>
                <a
                  href={settingData?.support || "#"}
                  target="_blank" // បើកនៅ Tab ថ្មី
                  rel="noopener noreferrer" // ការពាររឿង Security (Best Practice ពេលប្រើ target="_blank")
                  download={false} // ទុកជា False បើចង់ឱ្យវាបង្ហាញមើល (Preview) ក្នុង Browser ផ្ទាល់
                  className="text-black hover:text-red-900 transition-colors duration-150 block"
                >
                  គោលការណ៍ដឹកជញ្ជូន
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
                <a
                  href={settingData?.support || "#"}
                  target="_blank" // បើកនៅ Tab ថ្មី
                  rel="noopener noreferrer" // ការពាររឿង Security (Best Practice ពេលប្រើ target="_blank")
                  download={false} // ទុកជា False បើចង់ឱ្យវាបង្ហាញមើល (Preview) ក្នុង Browser ផ្ទាល់
                  className="text-black hover:text-red-900 transition-colors duration-150 block"
                >
                  គោលការណ៍ឯកជនភាព
                </a>
              </li>
              <li>
                 <a
                  href={settingData?.support || "#"}
                  target="_blank" // បើកនៅ Tab ថ្មី
                  rel="noopener noreferrer" // ការពាររឿង Security (Best Practice ពេលប្រើ target="_blank")
                  download={false} // ទុកជា False បើចង់ឱ្យវាបង្ហាញមើល (Preview) ក្នុង Browser ផ្ទាល់
                  className="text-black hover:text-red-900 transition-colors duration-150 block"
                >
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
                <span>{settingData?.address || "ភ្នំពេញ, កម្ពុជា"}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={18} className="text-red-500 shrink-0" />
                <a
                  href="tel:+855886677456"
                  className="hover:text-red-900 transition-colors"
                >
                  {settingData?.phone || "+855 88 667 7456"}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-slate-200 pt-4 pb-2">
        <Container className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} រក្សាសិទ្ធិគ្រប់យ៉ាង។ អភិវឌ្ឍដោយ{" "}
            <span className="font-medium text-slate-700">CHOMNENH DIGITAL</span>
          </p>
          <div className="flex gap-6">
            <a href="https://www.facebook.com/share/1CcNFUiYWy/?mibextid=wwXIfr" className="hover:text-black transition-colors">
              ឯកជនភាព
            </a>
            <a href="https://www.facebook.com/share/1CcNFUiYWy/?mibextid=wwXIfr" className="hover:text-black transition-colors">
              លក្ខខណ្ឌ
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
