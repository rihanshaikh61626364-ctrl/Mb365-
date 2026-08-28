import React from 'react';
import { motion } from 'motion/react';

interface HeroProps {
  onShopNowClick: () => void;
  onBrowseCategoriesClick: () => void;
}

export default function Hero({ onShopNowClick, onBrowseCategoriesClick }: HeroProps) {
  return (
    <section 
      id="hero-section" 
      className="w-full bg-[#F8FAFC] border-b border-slate-100 relative overflow-hidden flex items-center min-h-[440px] sm:min-h-[480px] md:min-h-[520px] py-12"
    >
      {/* Visual background atmospheric lights */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-brand-pine/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-10 items-center relative z-10">
        
        {/* Left Side: Premium Copy Layout */}
        <div className="md:col-span-7 flex flex-col items-start text-left">
          <span className="text-[10px] font-black tracking-[0.2em] text-[#0B1F3A] uppercase block mb-3 select-none font-sans">
            PRACTICAL KNOWLEDGE. BUILT FOR ACTION.
          </span>
          
          <div className="flex flex-col">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif text-[#111827] leading-[1.1] tracking-tight mb-4 whitespace-pre-line">
              Learn Something. Build Something.
            </h1>
            
            <p className="text-[#64748B] text-sm sm:text-base mb-8 max-w-md sm:max-w-xl leading-relaxed font-sans">
              Discover practical eBooks designed to make complex ideas simple, useful and actionable.
            </p>
          </div>

          {/* Action buttons side-by-side */}
          <div className="flex flex-wrap gap-4 w-full sm:w-auto font-sans">
            <button
              onClick={onShopNowClick}
              className="bg-brand-pine hover:bg-brand-pine-hover text-white px-8 py-3.5 rounded-lg font-black text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer w-full sm:w-auto text-center"
            >
              Explore Books
            </button>
            <button
              onClick={onBrowseCategoriesClick}
              className="bg-transparent border border-brand-pine/20 hover:border-brand-pine/60 text-[#111827] px-8 py-3.5 rounded-lg font-extrabold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer w-full sm:w-auto text-center"
            >
              Explore Categories
            </button>
          </div>
        </div>

        {/* Right Side: Elegant 3D styled MyBooks365 stacking & mug */}
        <div className="md:col-span-5 hidden md:flex items-center justify-center relative min-h-[340px] select-none">
          
          {/* Subtle wooden surface shadow */}
          <div className="absolute bottom-2 w-4/5 h-6 bg-brand-pine/5 rounded-full blur-xl transform rotate-1" />

          {/* Book Stack representing authentic digital catalogs */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col items-center"
          >
            {/* Open book on top */}
            <div className="relative mb-2 w-64 h-20 flex items-end justify-center perspective-[800px]">
              <div className="w-[180px] h-[75px] bg-white border border-slate-200/80 rounded-t-xl shadow-lg relative transform rotateX-[20deg] origin-bottom overflow-hidden flex justify-between px-1.5 pt-1.5">
                {/* Left pages */}
                <div className="w-[49%] h-full bg-gradient-to-r from-slate-50 to-white rounded-tl-lg border-r border-slate-200/50 flex flex-col gap-1 p-2">
                  <div className="h-1 bg-slate-200 rounded w-4/5" />
                  <div className="h-1 bg-slate-200 rounded w-full" />
                  <div className="h-1 bg-slate-200 rounded w-2/3" />
                </div>
                {/* Right pages */}
                <div className="w-[49%] h-full bg-gradient-to-l from-slate-50 to-white rounded-tr-lg flex flex-col gap-1 p-2">
                  <div className="h-1 bg-slate-200 rounded w-full" />
                  <div className="h-1 bg-slate-200 rounded w-4/5" />
                  <div className="h-1 bg-slate-200 rounded w-1/2" />
                </div>
              </div>
            </div>

            {/* Stack container with actual digital products */}
            <div className="flex flex-col -space-y-0.5 items-center w-72">
              <div className="w-[220px] h-9 bg-white rounded-md border border-slate-200/80 shadow-sm flex items-center justify-between px-4 text-[10px] font-black text-[#111827] font-sans relative">
                <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-[#E11D48] rounded-l-md" />
                <span className="pl-1 text-[9px] truncate">BUSINESS BASICS</span>
                <span className="text-[#64748B] font-normal text-[8px]">MyBooks365</span>
              </div>

              <div className="w-[224px] h-9 bg-[#0B1F3A] rounded-md border border-slate-800 shadow-sm flex items-center justify-between px-4 text-[10px] font-black text-white font-sans relative">
                <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-[#D4A72C] rounded-l-md" />
                <span className="pl-1 text-[9px] truncate">MARKETING BLUEPRINT</span>
                <span className="text-slate-300 font-normal text-[8px]">MyBooks365</span>
              </div>

              <div className="w-[218px] h-9 bg-[#F1F5F9] rounded-md border border-slate-200 shadow-sm flex items-center justify-between px-4 text-[10px] font-black text-slate-800 font-sans relative">
                <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-[#2563EB] rounded-l-md" />
                <span className="pl-1 text-[9px] truncate">FINANCE & MONEY</span>
                <span className="text-[#64748B] font-normal text-[8px]">MyBooks365</span>
              </div>

              <div className="w-[222px] h-9 bg-[#0F172A] rounded-md border border-black shadow-sm flex items-center justify-between px-4 text-[10px] font-black text-white font-sans relative">
                <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-[#D4A72C] rounded-l-md" />
                <span className="pl-1 text-[9px] truncate">PRODUCTIVITY & AI</span>
                <span className="text-[#64748B] font-normal text-[8px]">MyBooks365</span>
              </div>
            </div>
          </motion.div>

          {/* Aesthetic Mug of Coffee to the right of the stack */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute right-0 bottom-10 flex flex-col items-center"
          >
            <div className="w-16 h-20 bg-[#FAF7F2] rounded-b-2xl rounded-t-sm border border-slate-200 relative shadow-lg flex items-center justify-center">
              <div className="absolute -right-3.5 top-5 w-5 h-10 border-[5px] border-[#FAF7F2] rounded-r-xl border-l-0" />
              <div className="absolute top-0.5 left-0.5 right-0.5 h-1.5 bg-[#4A3728] rounded-full opacity-90 border border-[#FAF7F2]" />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
