import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, ArrowRight } from 'lucide-react';

interface PromoBannerProps {
  onExploreBooksClick: () => void;
}

export default function PromoBanner({ onExploreBooksClick }: PromoBannerProps) {
  return (
    <div className="w-full bg-white font-sans overflow-hidden">
      
      {/* ================= SECTION 1: MYBOOKS365 ORIGINALS ================= */}
      <section className="w-full py-16 sm:py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="text-left flex flex-col items-start max-w-xl">
            <span className="text-xs font-bold tracking-widest text-[#2563EB] uppercase mb-3 block">
              MYBOOKS365 ORIGINALS
            </span>
            <div className="w-12 h-0.5 bg-[#2563EB] mb-8" />
            
            <h2 className="text-4xl sm:text-5xl font-black font-serif text-[#111827] tracking-tight leading-tight mb-6">
              Knowledge built for action.
            </h2>
            
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-8 font-medium">
              We create practical knowledge that makes a real difference. Every book is written to help readers understand ideas, build skills and take action with confidence.
            </p>
            
            <button
              onClick={onExploreBooksClick}
              className="bg-[#0B1F3A] hover:bg-[#2563EB] text-white text-xs font-bold tracking-wider uppercase px-6 py-4 rounded-lg flex items-center gap-2 transition-all cursor-pointer shadow-md active:translate-y-0.5 select-none"
            >
              <span>Explore Originals</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Visual Spine Representation Column */}
          <div className="relative w-full h-[360px] sm:h-[400px] flex items-end justify-center select-none bg-gradient-to-t from-slate-50/40 to-transparent pt-6 px-4">
            {/* Shelf Line */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-slate-100/80 rounded-full" />

            {/* Custom CSS/SVG Book Spine Group with 3D shadow curves */}
            <div className="flex items-end h-full relative z-10 mr-12 sm:mr-16">
              
              {/* Book 1: Business Principles */}
              <div 
                className="w-[45px] sm:w-[50px] h-[300px] sm:h-[330px] rounded-t-sm shadow-md flex flex-col justify-between items-center py-6 text-white relative overflow-hidden shrink-0 border-r border-black/10"
                style={{ 
                  background: 'linear-gradient(90deg, #1E293B 0%, #334155 15%, #1E293B 85%, #0F172A 100%)',
                }}
              >
                {/* Gold Foil Accent Line */}
                <div className="w-full h-1 bg-[#D97706]/40 absolute top-8" />
                <div className="w-full h-1 bg-[#D97706]/40 absolute bottom-14" />

                {/* Spine Title rotated 90 deg */}
                <div className="flex-1 flex items-center justify-center pt-8">
                  <span 
                    className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#F1F5F9]/90 opacity-90 whitespace-nowrap"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    BUSINES PRINCIPLES
                  </span>
                </div>
                {/* Brand label */}
                <span 
                  className="text-[7px] font-bold tracking-wider opacity-40 uppercase"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  MyBook365
                </span>
              </div>

              {/* Book 2: The Founder's Playbook */}
              <div 
                className="w-[45px] sm:w-[50px] h-[310px] sm:h-[340px] rounded-t-sm shadow-lg flex flex-col justify-between items-center py-6 text-white relative overflow-hidden shrink-0 border-r border-black/10"
                style={{ 
                  background: 'linear-gradient(90deg, #111827 0%, #1F2937 15%, #111827 85%, #030712 100%)',
                }}
              >
                {/* Silver Accent Foil */}
                <div className="w-full h-1 bg-slate-500/30 absolute top-10" />
                <div className="w-full h-1 bg-slate-500/30 absolute bottom-14" />

                {/* Spine Title */}
                <div className="flex-1 flex items-center justify-center pt-8">
                  <span 
                    className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-100 whitespace-nowrap"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    THE FOUNDER'S PLAYBOOK
                  </span>
                </div>
                {/* Brand label */}
                <span 
                  className="text-[7px] font-bold tracking-wider opacity-40 uppercase"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  MyBook365
                </span>
              </div>

              {/* Book 3: Growth Strategies */}
              <div 
                className="w-[45px] sm:w-[50px] h-[305px] sm:h-[335px] rounded-t-sm shadow-md flex flex-col justify-between items-center py-6 text-white relative overflow-hidden shrink-0 border-r border-black/10"
                style={{ 
                  background: 'linear-gradient(90deg, #0B1F3A 0%, #1E3A5F 15%, #0B1F3A 85%, #020617 100%)',
                }}
              >
                {/* Top/Bottom Foils */}
                <div className="w-full h-1 bg-slate-500/20 absolute top-8" />
                <div className="w-full h-1 bg-slate-500/20 absolute bottom-14" />

                {/* Spine Title */}
                <div className="flex-1 flex items-center justify-center pt-8">
                  <span 
                    className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#F1F5F9]/95 whitespace-nowrap"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    GROWTH STRATEGIES
                  </span>
                </div>
                {/* Brand label */}
                <span 
                  className="text-[7px] font-bold tracking-wider opacity-40 uppercase"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  MyBook365
                </span>
              </div>

              {/* Book 4: Marketing Made Simple */}
              <div 
                className="w-[45px] sm:w-[50px] h-[290px] sm:h-[320px] rounded-t-sm shadow-lg flex flex-col justify-between items-center py-6 text-white relative overflow-hidden shrink-0 border-r border-black/10"
                style={{ 
                  background: 'linear-gradient(90deg, #1D4ED8 0%, #3B82F6 15%, #1D4ED8 85%, #1E3A8A 100%)',
                }}
              >
                {/* Spine Title */}
                <div className="flex-1 flex items-center justify-center pt-8">
                  <span 
                    className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white whitespace-nowrap"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    MARKETING MADE SIMPLE
                  </span>
                </div>
                {/* Brand label */}
                <span 
                  className="text-[7px] font-bold tracking-wider opacity-50 uppercase"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  MyBook365
                </span>
              </div>

              {/* Book 5: Finance Fundamentals */}
              <div 
                className="w-[45px] sm:w-[50px] h-[300px] sm:h-[330px] rounded-t-sm shadow-md flex flex-col justify-between items-center py-6 text-white relative overflow-hidden shrink-0 border-r border-black/10"
                style={{ 
                  background: 'linear-gradient(90deg, #1E293B 0%, #475569 15%, #1E293B 85%, #0F172A 100%)',
                }}
              >
                {/* Top Foil */}
                <div className="w-full h-1 bg-[#D97706]/40 absolute top-8" />
                <div className="w-full h-1 bg-[#D97706]/40 absolute bottom-14" />

                {/* Spine Title */}
                <div className="flex-1 flex items-center justify-center pt-8">
                  <span 
                    className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#F8FAFC]/90 whitespace-nowrap"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    FINANCE FUNDAMENTALS
                  </span>
                </div>
                {/* Brand label */}
                <span 
                  className="text-[7px] font-bold tracking-wider opacity-40 uppercase"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  MyBook365
                </span>
              </div>

            </div>

            {/* Potted Succulent Plant on Right */}
            <div className="absolute right-4 sm:right-10 bottom-1 flex flex-col items-center select-none z-20">
              {/* Plant Leaves represented via overlapping premium SVG vectors */}
              <svg className="w-24 h-24 sm:w-28 sm:h-28 -mb-3" viewBox="0 0 120 120" fill="none">
                {/* Outer Back Leaves */}
                <path d="M60 40 C45 20, 30 50, 60 65 C90 50, 75 20, 60 40 Z" fill="url(#leaf-dark)" opacity="0.85" />
                <path d="M40 55 C20 40, 30 75, 60 70 C45 75, 30 70, 40 55 Z" fill="url(#leaf-medium)" />
                <path d="M80 55 C100 40, 90 75, 60 70 C75 75, 90 70, 80 55 Z" fill="url(#leaf-medium)" />
                
                {/* Mid Leaves */}
                <path d="M60 50 C50 35, 45 60, 60 75 C75 60, 70 35, 60 50 Z" fill="url(#leaf-light)" />
                <path d="M45 62 C30 52, 45 78, 60 75 C50 78, 35 75, 45 62 Z" fill="url(#leaf-dark)" />
                <path d="M75 62 C90 52, 75 78, 60 75 C70 78, 85 75, 75 62 Z" fill="url(#leaf-dark)" />
                
                {/* Center Core Buds */}
                <path d="M60 60 C55 48, 52 65, 60 75 C68 65, 65 48, 60 60 Z" fill="url(#leaf-bright)" />
                <path d="M52 67 C44 60, 52 74, 60 75 C55 74, 48 72, 52 67 Z" fill="url(#leaf-bright)" />
                <path d="M68 67 C76 60, 68 74, 60 75 C65 74, 72 72, 68 67 Z" fill="url(#leaf-bright)" />

                {/* Color Gradients */}
                <defs>
                  <linearGradient id="leaf-dark" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1E3A2F" />
                    <stop offset="100%" stopColor="#0F1F17" />
                  </linearGradient>
                  <linearGradient id="leaf-medium" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2E5C46" />
                    <stop offset="100%" stopColor="#152E22" />
                  </linearGradient>
                  <linearGradient id="leaf-light" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3F7E5F" />
                    <stop offset="100%" stopColor="#1E3D2E" />
                  </linearGradient>
                  <linearGradient id="leaf-bright" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#52A17B" />
                    <stop offset="100%" stopColor="#2C5B45" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Concrete Rounded Potted Container with marble/granite grain highlights */}
              <div 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-b-3xl rounded-t-sm shadow-xl flex flex-col items-center justify-center relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #E2E8F0 0%, #CBD5E1 50%, #94A3B8 100%)',
                  boxShadow: 'inset 0 4px 6px rgba(255, 255, 255, 0.4), 0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              >
                {/* Subtle rim highlight */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/70" />
                {/* Shadow overlay */}
                <div className="absolute bottom-0 inset-x-0 h-4 bg-black/10" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= SECTION 2: START YOUR NEXT CHAPTER TODAY ================= */}
      <section className="w-full pb-16 sm:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          
          {/* Card Wrapper with exact rounded, subtle light blue gradient background */}
          <div className="bg-[#F0F5FF] border border-[#DBE9FE]/80 rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
            
            {/* Left circular blue badge + Text */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-5 text-center sm:text-left">
              
              {/* Circular blue badge */}
              <div className="w-16 h-16 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-lg shadow-blue-500/15 shrink-0 select-none">
                <BookOpen className="w-7 h-7" />
              </div>
              
              {/* Heading + description */}
              <div className="flex flex-col">
                <h3 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight mb-2 font-serif">
                  Start your next chapter today.
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed max-w-xl">
                  Explore practical books built for ambitious learners, creators and entrepreneurs.
                </p>
              </div>

            </div>

            {/* Right Button */}
            <button
              onClick={onExploreBooksClick}
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-black uppercase tracking-widest px-6 py-4 rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg hover:shadow-blue-500/10 transition-all cursor-pointer select-none shrink-0 active:translate-y-0.5"
            >
              <span>Browse All Books</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>
      </section>

    </div>
  );
}
