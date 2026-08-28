import React from 'react';
import { motion } from 'motion/react';
import { Truck, ShieldCheck, BookOpen, RotateCcw, Headphones } from 'lucide-react';

export default function FeatureBar() {
  const items = [
    {
      icon: <Truck className="w-5 h-5 text-brand-pine shrink-0" />,
      title: "FREE SHIPPING",
      subtitle: "On Orders Over ₹499"
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-brand-pine shrink-0" />,
      title: "SECURE PAYMENT",
      subtitle: "100% Safe & Secure"
    },
    {
      icon: <BookOpen className="w-5 h-5 text-brand-pine shrink-0" />,
      title: "GENUINE BOOKS",
      subtitle: "100% Original eBooks"
    },
    {
      icon: <RotateCcw className="w-5 h-5 text-brand-pine shrink-0" />,
      title: "EASY RETURNS",
      subtitle: "30-Day Hassle Free Returns"
    },
    {
      icon: <Headphones className="w-5 h-5 text-brand-pine shrink-0" />,
      title: "24/7 SUPPORT",
      subtitle: "We're Here to Help"
    }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full bg-white border-b border-slate-100 py-6 px-8 flex-shrink-0 font-sans"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-left">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3 p-1">
            <div className="p-2 bg-slate-50 rounded-lg shrink-0">
              {item.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-brand-pine tracking-wider uppercase">
                {item.title}
              </span>
              <span className="text-slate-400 text-[9px] font-semibold mt-0.5">
                {item.subtitle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
