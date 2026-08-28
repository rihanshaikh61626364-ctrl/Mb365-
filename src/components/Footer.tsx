import React, { useState, useEffect } from 'react';
import { BookOpen, Github, Twitter, Linkedin, Mail, Instagram, Youtube } from 'lucide-react';
import { SiteSettings, getSiteSettings } from '../services/books';

interface FooterProps {
  onHomeClick: () => void;
  onBooksClick: () => void;
  onCategoriesClick: () => void;
  onAboutClick: () => void;
  onContactClick: () => void;
}

export default function Footer({
  onHomeClick,
  onBooksClick,
  onCategoriesClick,
  onAboutClick,
  onContactClick
}: FooterProps) {
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    getSiteSettings().then(setSiteSettings);
  }, []);

  return (
    <footer id="contact-section" className="w-full bg-[#FAFAF9] border-t border-slate-200/50 pt-16 pb-8 font-sans text-slate-500">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
        
        {/* Brand & Mission */}
        <div className="md:col-span-2 space-y-6">
          <button 
            onClick={onHomeClick}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 bg-[#0B1F3A] rounded-xl flex items-center justify-center transform group-hover:-rotate-6 transition-transform duration-300 shadow-md">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif font-black text-2xl tracking-tight text-[#0B1F3A]">{siteSettings?.site_name || 'MyBooks365'}</span>
          </button>
          <p className="text-sm font-medium leading-relaxed max-w-sm">
            {siteSettings?.description || "Curating the world's most transformative digital literature. We believe the right book at the exact right moment can change the trajectory of a life forever."}
          </p>

          <div className="flex items-center gap-4 pt-2">
            {siteSettings?.social_instagram && (
              <a href={siteSettings.social_instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#0B1F3A] hover:border-[#0B1F3A] transition-all shadow-sm">
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {siteSettings?.social_linkedin && (
              <a href={siteSettings.social_linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#0B1F3A] hover:border-[#0B1F3A] transition-all shadow-sm">
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {siteSettings?.social_x && (
              <a href={siteSettings.social_x} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#0B1F3A] hover:border-[#0B1F3A] transition-all shadow-sm">
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {siteSettings?.social_youtube && (
              <a href={siteSettings.social_youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#0B1F3A] hover:border-[#0B1F3A] transition-all shadow-sm">
                <Youtube className="w-4 h-4" />
              </a>
            )}
            {siteSettings?.social_github && (
              <a href={siteSettings.social_github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#0B1F3A] hover:border-[#0B1F3A] transition-all shadow-sm">
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Explore Links */}
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-wider text-[#0B1F3A] mb-6">Explore</h4>
          <ul className="space-y-4 text-sm font-semibold">
            <li><button onClick={onHomeClick} className="hover:text-[#0B1F3A] transition-colors cursor-pointer">Storefront</button></li>
            <li><button onClick={onCategoriesClick} className="hover:text-[#0B1F3A] transition-colors cursor-pointer">Collections</button></li>
            <li><button onClick={onBooksClick} className="hover:text-[#0B1F3A] transition-colors cursor-pointer">New Arrivals</button></li>
            <li><button onClick={onAboutClick} className="hover:text-[#0B1F3A] transition-colors cursor-pointer">Our Story</button></li>
          </ul>
        </div>

        {/* Support & Contact */}
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-wider text-[#0B1F3A] mb-6">Support</h4>
          <ul className="space-y-4 text-sm font-semibold">
            <li>
              <a href={`mailto:${siteSettings?.contact_email || 'supportmybooks365@gmail.com'}`} className="flex items-center gap-2 hover:text-[#0B1F3A] transition-colors group">
                <Mail className="w-4 h-4 text-slate-300 group-hover:text-[#0B1F3A] transition-colors" />
                {siteSettings?.contact_email || 'supportmybooks365@gmail.com'}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-8 pt-8 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-6 select-none font-sans font-semibold">
        <div className="flex items-center gap-3 text-[10px] text-slate-400">
          <span>© {new Date().getFullYear()} {siteSettings?.site_name || 'MyBooks365'}. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}
