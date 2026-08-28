import React from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  Lightbulb, 
  TrendingUp, 
  DollarSign, 
  Cpu, 
  Award,
  BookOpen
} from 'lucide-react';
import { CATEGORIES, Category } from '../booksData';

interface CategoryListProps {
  selectedCategory: string;
  setSelectedCategory: (catId: string) => void;
  categories?: Category[];
}

// Map categories to modern aesthetic pastel colours and icons
const categoryStyling: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  business: {
    bg: 'bg-[#FDF2F2]', // Soft Rose/Red
    text: 'text-[#9B1C1C]',
    icon: <Briefcase className="w-6 h-6" />
  },
  entrepreneurship: {
    bg: 'bg-[#F0FDF4]', // Soft Emerald
    text: 'text-[#166534]',
    icon: <Lightbulb className="w-6 h-6" />
  },
  marketing: {
    bg: 'bg-[#EFF6FF]', // Soft Sky Blue
    text: 'text-[#1E40AF]',
    icon: <TrendingUp className="w-6 h-6" />
  },
  finance: {
    bg: 'bg-[#FEF3C7]', // Soft Amber
    text: 'text-[#92400E]',
    icon: <DollarSign className="w-6 h-6" />
  },
  productivity: {
    bg: 'bg-[#FAF5FF]', // Soft Purple
    text: 'text-[#6B21A8]',
    icon: <Cpu className="w-6 h-6" />
  },
  growth: {
    bg: 'bg-[#F5F5F4]', // Soft Warm Stone
    text: 'text-[#44403C]',
    icon: <Award className="w-6 h-6" />
  }
};

export default function CategoryList({
  selectedCategory,
  setSelectedCategory,
  categories = CATEGORIES,
}: CategoryListProps) {
  // Exclude 'all' for the curated circular display
  const coreCategories = categories.filter(cat => cat.id !== 'all' && cat.slug !== 'all');

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    const element = document.getElementById('books-store-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.section 
      id="categories-section" 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full bg-white py-14 sm:py-16 border-b border-slate-100 font-sans"
    >
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-10 select-none">
          <h2 className="text-lg sm:text-xl font-black text-brand-pine tracking-widest uppercase mb-1">
            SHOP BY CATEGORY
          </h2>
          <div className="w-12 h-1 bg-brand-gold mx-auto rounded-full mt-2" />
        </div>

        {/* Circular Categories Row - Horizontally scrollable on mobile */}
        <div className="w-full overflow-x-auto scrollbar-none py-2">
          <div className="flex flex-row md:justify-center items-center gap-6 sm:gap-10 min-w-max px-4">
            
            {/* "All" Category Badge Circle */}
            <div 
              onClick={() => handleCategorySelect('all')}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                selectedCategory === 'all' 
                  ? 'bg-brand-pine text-white ring-4 ring-brand-pine/10 scale-105' 
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100 group-hover:scale-102'
              }`}>
                <BookOpen className="w-6 h-6" />
              </div>
              <span className={`text-[11px] sm:text-xs font-bold mt-3 transition-colors ${
                selectedCategory === 'all' ? 'text-brand-pine' : 'text-[#111C18]'
              }`}>
                All Books
              </span>
              <span className="text-[9px] text-slate-400 font-bold tracking-wider uppercase mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                Shop Now
              </span>
            </div>

            {/* Loop categories */}
            {coreCategories.map((cat) => {
              const styling = categoryStyling[cat.slug] || { bg: 'bg-slate-50', text: 'text-slate-500', icon: <BookOpen className="w-6 h-6" /> };
              const isSelected = selectedCategory === cat.slug;

              return (
                <div 
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.slug)}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <div className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSelected 
                      ? 'bg-brand-pine text-white ring-4 ring-brand-pine/10 scale-105' 
                      : `${styling.bg} ${styling.text} hover:scale-105`
                  }`}>
                    {styling.icon}
                  </div>
                  <span className={`text-[11px] sm:text-xs font-black mt-3 transition-colors ${
                    isSelected ? 'text-brand-pine' : 'text-[#111C18]'
                  }`}>
                    {cat.name}
                  </span>
                  <span className="text-[9px] text-slate-400 font-bold tracking-wider uppercase mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    Shop Now
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
