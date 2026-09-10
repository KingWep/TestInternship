import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const GlobalNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'អំពីយើង', href: '#about' },
    { name: 'ប្រព័ន្ធការងារ', href: '#ecosystem' },
    { name: 'ដំណោះស្រាយ', href: '#solutions' },
    { name: 'អត្ថប្រយោជន៍', href: '#impact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3 text-gray-800' : 'bg-transparent py-5 text-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 logo-wrapper">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b2f67] to-[#5a1941] shadow-lg flex items-center justify-center transition-transform hover:scale-105">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <div className="flex flex-col line-height-[1.2]">
              <span className={`font-bold text-xl tracking-tight ${isScrolled ? 'text-[#0e088b]' : 'text-white'}`}>
                CHOM<span className="text-transparent bg-clip-text bg-gradient-to-br from-[#b8860b] to-[#d4af37]">NENH</span>
              </span>
              <span className={`text-[10px] font-semibold tracking-[2px] uppercase -mt-1 ${isScrolled ? 'text-[#35547c]' : 'text-blue-200'}`}>
                Digital Menu
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-white hover:text-[#D4AF37] font-medium transition-colors font-kantumruy"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Auth/Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className={`border hover:bg-[#8b2f67] hover:text-white px-5 py-2 rounded-full font-medium transition-all flex items-center gap-2 font-kantumruy ${isScrolled ? 'border-[#ffc107] text-[#212529]' : 'border-white/30 text-white hover:border-[#8b2f67]'}`}>
              ចូលគណនី
            </Link>
            <Link to="/register" className="bg-[#8b2f67] text-white hover:bg-[#5a1941] px-5 py-2 rounded-full font-medium transition-all shadow-md shadow-[#8b2f67]/25 flex items-center gap-2 font-kantumruy">
              បង្កើតគណនី
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`hover:text-[#8b2f67] focus:outline-none ${isScrolled ? 'text-gray-800' : 'text-white'}`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100">
          <div className="px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-800 font-medium text-lg hover:text-[#8b2f67] py-2 border-b border-gray-100 font-kantumruy"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-3 bg-white text-gray-800 font-medium border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-kantumruy">
                ចូលគណនី
              </Link>
              <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-3 bg-[#8b2f67] text-white font-medium rounded-xl hover:bg-[#5a1941] transition-colors shadow-md shadow-[#8b2f67]/25 font-kantumruy">
                បង្កើតគណនី
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default GlobalNavbar;