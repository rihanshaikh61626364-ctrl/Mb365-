import React from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  Lightbulb, 
  TrendingUp, 
  DollarSign, 
  Cpu, 
  Award,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { Category } from '../booksData';

interface ProductsCategoryGridProps {
  selectedCategory: string;
  setSelectedCategory: (catId: string) => void;
  categories: Category[];
}

const categoryStyling: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  business: {
    bg: 'bg-[#FDF2F2]',
    text: 'text-[#9B1C1C]',
    icon: <Briefcase className="w-8 h-8 mb-4 stroke-[1.5]" />
  },
  entrepreneurship: {
    bg: 'bg-[#FEF3C7]',
    text: 'text-[#92400E]',
    icon: <Lightbulb className="w-8 h-8 mb-4 stroke-[1.5]" />
  },
  marketing: {
    bg: 'bg-[#FCE7F3]',
    text: 'text-[#9D174D]',
    icon: <TrendingUp className="w-8 h-8 mb-4 stroke-[1.5]" />
  },
  finance: {
    bg: 'bg-[#EFF6FF]',
    text: 'text-[#1E40AF]',
    icon: <DollarSign className="w-8 h-8 mb-4 stroke-[1.5]" />
  },
  productivity: {
    bg: 'bg-[#F5F3FF]',
    text: 'text-[#6D28D9]',
    icon: <Cpu className="w-8 h-8 mb-4 stroke-[1.5]" />
  },
  growth: {
    bg: 'bg-[#ECFDF5]',
    text: 'text-[#047857]',
    icon: <Award className="w-8 h-8 mb-4 stroke-[1.5]" />
  }
};

export default function ProductsCategoryGrid({
  selectedCategory,
  setSelectedCategory,
  categories = [],
}: ProductsCategoryGridProps) {
  const coreCategories = categories.filter(cat => cat.id !== 'all' && cat.slug !== 'all');

  return (
    <div className="w-full mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight font-sans">
          Featured Categories
        </h2>
        <button 
          onClick={() => setSelectedCategory('all')}
          className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-brand-pine transition-colors"
        >
          All Categories <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="w-full overflow-x-auto scrollbar-none pb-4">
        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-4 min-w-max sm:min-w-0">
          {coreCategories.slice(0, 6).map((cat) => {
            const styling = categoryStyling[cat.slug] || { bg: 'bg-slate-100', text: 'text-slate-600', icon: <BookOpen className="w-8 h-8 mb-4 stroke-[1.5]" /> };
            const isSelected = selectedCategory === (cat.slug || cat.id);

            return (
              <div 
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug || cat.id)}
                className={`w-40 sm:w-auto h-40 sm:h-48 p-4 sm:p-6 flex flex-col justify-center items-start cursor-pointer transition-all duration-300 ${isSelected ? 'ring-2 ring-brand-pine shadow-md' : 'hover:opacity-90'} ${styling.bg} rounded-sm`}
              >
                <div className={styling.text}>
                  {styling.icon}
                </div>
                <span className="text-sm sm:text-base font-bold text-[#111827] mb-1">
                  {cat.name}
                </span>
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                  Shop Now
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
