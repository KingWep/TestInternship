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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-blue-950 shadow-md py-4' : 'bg-blue-950/80 backdrop-blur-md py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37] text-[#0B132B] flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">
              CHOMNENH
            </span>
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
            <Link to="/login" className="bg-blue-950 text-white border border-white/20 hover:bg-blue-900 px-5 py-2.5 rounded-full font-medium transition-all shadow-md flex items-center gap-2 font-kantumruy">
              ចូលគណនី
            </Link>
            <Link to="/register" className="bg-amber-400 text-blue-950 hover:bg-amber-500 px-5 py-2.5 rounded-full font-medium transition-all shadow-md shadow-amber-400/25 flex items-center gap-2 font-kantumruy">
              បង្កើតគណនី
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-[#D4AF37] focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-blue-950 shadow-xl border-t border-white/10">
          <div className="px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white font-medium text-lg hover:text-[#D4AF37] py-2 border-b border-white/10 font-kantumruy"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-3 bg-blue-950 text-white font-medium border border-white/10 rounded-xl hover:bg-blue-900 transition-colors font-kantumruy">
                ចូលគណនី
              </Link>
              <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-3 bg-amber-400 text-blue-950 font-medium rounded-xl hover:bg-amber-500 transition-colors shadow-md shadow-amber-400/25 font-kantumruy">
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