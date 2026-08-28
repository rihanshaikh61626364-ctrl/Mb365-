import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Tag, Zap, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onHomeClick: () => void;
  onBooksClick: () => void;
  onCategoriesClick: () => void;
  onAboutClick: () => void;
  onContactClick: () => void;
}

export default function Header({
  onHomeClick,
  onBooksClick,
  onCategoriesClick,
  onAboutClick,
  onContactClick,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-full flex flex-col sticky top-0 z-50 transition-all duration-300 bg-white ${
      isScrolled ? 'shadow-md border-b border-slate-200/80' : 'border-b border-slate-100'
    }`}>
      {/* Main Elegant Navbar */}
      <div id="main-nav" className="w-full max-w-7xl mx-auto px-8 py-4 sm:py-5 flex items-center justify-between gap-4">
        {/* Logo left in Serif Font matching the Bookora look */}
        <div 
          onClick={onHomeClick}
          className="flex flex-col items-start cursor-pointer group select-none text-left"
        >
          <span className="text-2xl sm:text-3xl font-black font-serif text-brand-pine tracking-tight">
            MyBooks<span className="text-brand-gold font-normal italic font-serif">365</span>
          </span>
          <span className="text-[8px] font-bold text-slate-400 tracking-widest uppercase -mt-1">
            Read. Learn. Grow.
          </span>
        </div>

        {/* Navigation Links - Centered, tracked-out, medium-weighted uppercase */}
        <nav className="hidden lg:flex items-center gap-7">
          <button 
            onClick={onHomeClick}
            className="text-[11px] font-extrabold text-[#111C18] hover:text-brand-gold transition-colors cursor-pointer tracking-widest uppercase"
          >
            Home
          </button>
          <button 
            onClick={onCategoriesClick}
            className="text-[11px] font-extrabold text-slate-500 hover:text-brand-gold transition-colors cursor-pointer tracking-widest uppercase"
          >
            Categories
          </button>
          <button 
            onClick={onBooksClick}
            className="text-[11px] font-extrabold text-slate-500 hover:text-brand-gold transition-colors cursor-pointer tracking-widest uppercase"
          >
            Best Sellers
          </button>
          <button 
            onClick={onBooksClick}
            className="text-[11px] font-extrabold text-slate-500 hover:text-brand-gold transition-colors cursor-pointer tracking-widest uppercase"
          >
            New Arrivals
          </button>
          <button 
            onClick={onAboutClick}
            className="text-[11px] font-extrabold text-slate-500 hover:text-brand-gold transition-colors cursor-pointer tracking-widest uppercase"
          >
            About Us
          </button>
          <button 
            onClick={onContactClick}
            className="text-[11px] font-extrabold text-slate-500 hover:text-brand-gold transition-colors cursor-pointer tracking-widest uppercase"
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
}


