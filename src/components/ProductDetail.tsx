import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, ShieldCheck } from 'lucide-react';
import { Book } from '../booksData';

interface ProductDetailProps {
  book: Book;
  allBooks?: Book[];
  onBackClick: () => void;
  onBookClick: (otherBook: Book) => void;
  onShowToast: (message: string, isError?: boolean) => void;
}

export default function ProductDetail({
  book,
  allBooks = [],
  onBackClick,
  onBookClick,
  onShowToast,
}: ProductDetailProps) {
  const [activeTab, setActiveTab] = useState<'learn' | 'inside' | 'who' | 'features'>('learn');
  const [recommendations, setRecommendations] = useState<Book[]>([]);

  // Generate dynamic recommendations based on current book and available active books
  useEffect(() => {
    // Exclude current book and ensure only published/active books
    const eligibleBooks = allBooks.filter(
      (b) => b.id !== book.id && (b.status === 'published' || (b as any).status === 'active' || (b as any).is_active === true)
    );
    
    // Split into same category vs others
    const sameCategory = eligibleBooks.filter((b) => b.category_id === book.category_id);
    const otherCategory = eligibleBooks.filter((b) => b.category_id !== book.category_id);

    // Shuffle arrays for randomness (Fisher-Yates)
    const shuffle = (array: Book[]) => {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    const shuffledSame = shuffle(sameCategory);
    const shuffledOther = shuffle(otherCategory);

    // Combine preferring same category
    const combined = [...shuffledSame, ...shuffledOther].slice(0, 4);
    
    setRecommendations(combined);
  }, [book.id, allBooks]);

  // Scroll to top when book changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [book.id]);

  // High-reliability direct SuperProfile redirect
  const handleBuyNow = () => {
    if (book.superprofile_url) {
      try {
        window.open(book.superprofile_url, '_blank', 'noopener,noreferrer');
      } catch (e) {
        window.location.href = book.superprofile_url;
      }
    } else {
      onShowToast("Purchase link is currently unavailable.", true);
    }
  };

  const getChapters = (bookId: string) => {
    // Keep custom chapters layout
    if (bookId === 'business-basics') {
      return [
        { chapter: "Chapter 1", title: "Customers and Value", detail: "Understanding customer needs and creating products that solve actual problems." },
        { chapter: "Chapter 2", title: "Revenue and Pricing", detail: "Dhandhe mein cash cash. Pricing models, gross margins, and setting the right price." },
        { chapter: "Chapter 3", title: "Distribution and Growth", detail: "How to place your product in front of the right audience and scale organically." },
        { chapter: "Chapter 4", title: "Scalability and Team", detail: "Designing repeatable workflows, hiring core roles, and sustaining customer loyalty." }
      ];
    }
    
    // Default mapped chapters or fallback standard chapters
    const list = book.chapters || book.insideTheBook || [];
    if (list.length > 0) {
      return list.map((item, idx) => {
        const parts = item.split(':');
        const chapLabel = parts[0]?.includes('Chapter') ? parts[0] : `Section ${idx + 1}`;
        const titleLabel = parts[1] || parts[0] || "Chapter Content";
        return {
          chapter: chapLabel.trim(),
          title: titleLabel.trim(),
          detail: "Core frameworks, action guides, and reference resources inside this section."
        };
      });
    }

    return [
      { chapter: "Chapter 1", title: "Getting Started from Zero", detail: "Core fundamentals and mental models required for this topic." },
      { chapter: "Chapter 2", title: "Core Frameworks & Workflows", detail: "The exact blueprints and step-by-step systems to follow." },
      { chapter: "Chapter 3", title: "Advanced Methods & Mastery", detail: "Tips, tricks, and automated scripts to speed up your outcomes." },
      { chapter: "Chapter 4", title: "Case Studies and Actions", detail: "Interactive checksheets, cheat codes, and reference guides." }
    ];
  };

  const whatYouWillLearnList = book.what_you_learn || book.whatYouWillLearn || [];
  const keyFeaturesList = book.key_features || [];

  return (
    <div className="w-full bg-white py-12 font-sans text-[#111C18]">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Back Button */}
        <button
          onClick={onBackClick}
          className="flex items-center gap-2 text-[#64748B] text-[12px] font-bold mb-8 hover:text-[#0B1F3A] transition-all transform hover:translate-x-[-4px] duration-300 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          BACK TO STORE
        </button>

        {/* Product Split Columns */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start mb-16 text-left">
          
          {/* Left Area: Sleek cover container */}
          <div className="w-full lg:w-[320px] flex flex-col items-center justify-center shrink-0">
            <div className="w-[280px] h-[380px] bg-slate-50 rounded-2xl flex items-center justify-center shadow-xl relative border border-slate-100">
              <img
                src={book.cover_url || book.image}
                alt={book.title}
                referrerPolicy="no-referrer"
                className="w-48 h-72 rounded shadow-2xl border-l-8 border-[#2563EB] object-cover transition-transform duration-500 hover:scale-105"
              />
              {book.tag && (
                <span className="absolute top-4 left-4 bg-[#D4A72C] text-[#0B1F3A] text-[9px] font-black px-2 py-0.5 rounded uppercase select-none">
                  {book.tag}
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mt-4 select-none">
              ⚡ Instant Digital Delivery via SuperProfile
            </p>
          </div>

          {/* Right Area: Typography content */}
          <div className="flex-1">
            <span className="bg-blue-50 text-[#2563EB] text-[10px] font-black px-3 py-1 rounded-full w-fit mb-3 block select-none">
              PRACTICAL EBOOK
            </span>
            
            <h1 className="text-3xl sm:text-4.5xl font-black text-[#0B1F3A] leading-tight mb-2">
              {book.title}
            </h1>
            
            <h2 className="text-sm sm:text-base font-bold text-[#2563EB] mb-4">
              {book.subtitle}
            </h2>

            {/* Format indicator */}
            <div className="flex items-center gap-4 text-xs text-slate-400 font-bold mb-6">
              <span className="text-slate-500 bg-slate-100 px-2.5 py-1 rounded text-[10px] uppercase font-black tracking-wider">{book.format}</span>
              <span>•</span>
              <span>{book.pages} Pages</span>
              <span>•</span>
              <span>{book.language}</span>
            </div>

            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 max-w-xl">
              {book.description}
            </p>

            <div className="text-2xl sm:text-3xl font-black text-[#0B1F3A] mb-8 flex items-baseline gap-2">
              <span>₹{book.price}</span>
              {(book.originalPrice && book.originalPrice > book.price) ? (
                <>
                  <span className="text-sm text-slate-400 line-through font-normal">
                    ₹{book.originalPrice}
                  </span>
                  <span className="text-[10px] font-extrabold text-[#2563EB] tracking-wider uppercase ml-2 bg-blue-50 px-2 py-0.5 rounded">
                    SAVE {Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}%
                  </span>
                </>
              ) : null}
            </div>

            {/* Real Direct CTA */}
            <div className="flex flex-col gap-4 max-w-md mb-8">
              <button
                onClick={handleBuyNow}
                className="bg-[#0B1F3A] text-white hover:bg-[#2563EB] text-center px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-xl transition-all duration-300 cursor-pointer w-full"
              >
                BUY NOW — ₹{book.price}
              </button>
            </div>

            {/* Tabs details section */}
            <div className="border-t border-slate-100 pt-6">
              {/* Tab headers */}
              <div className="flex border-b border-slate-100 overflow-x-auto scrollbar-none gap-6 mb-6">
                <button
                  onClick={() => setActiveTab('learn')}
                  className={`pb-3 text-xs font-black uppercase tracking-wider transition-colors shrink-0 ${
                    activeTab === 'learn'
                      ? 'border-b-2 border-[#2563EB] text-[#2563EB]'
                      : 'text-slate-400 hover:text-[#0B1F3A]'
                  }`}
                >
                  What You'll Learn
                </button>
                <button
                  onClick={() => setActiveTab('inside')}
                  className={`pb-3 text-xs font-black uppercase tracking-wider transition-colors shrink-0 ${
                    activeTab === 'inside'
                      ? 'border-b-2 border-[#2563EB] text-[#2563EB]'
                      : 'text-slate-400 hover:text-[#0B1F3A]'
                  }`}
                >
                  Inside the Book
                </button>
                <button
                  onClick={() => setActiveTab('who')}
                  className={`pb-3 text-xs font-black uppercase tracking-wider transition-colors shrink-0 ${
                    activeTab === 'who'
                      ? 'border-b-2 border-[#2563EB] text-[#2563EB]'
                      : 'text-slate-400 hover:text-[#0B1F3A]'
                  }`}
                >
                  Who is this for?
                </button>
                {keyFeaturesList.length > 0 && (
                  <button
                    onClick={() => setActiveTab('features')}
                    className={`pb-3 text-xs font-black uppercase tracking-wider transition-colors shrink-0 ${
                      activeTab === 'features'
                        ? 'border-b-2 border-[#2563EB] text-[#2563EB]'
                        : 'text-slate-400 hover:text-[#0B1F3A]'
                    }`}
                  >
                    Key Features
                  </button>
                )}
              </div>

              {/* Tab Content Panels */}
              <div className="min-h-[160px]">
                {activeTab === 'learn' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    {whatYouWillLearnList.map((item, index) => (
                      <div key={index} className="flex gap-2 text-left items-start">
                        <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                        <p className="text-slate-600 text-xs font-medium leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'inside' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {getChapters(book.id).map((chap, index) => (
                      <div key={index} className="flex gap-4 items-start text-left">
                        <span className="bg-slate-100 text-[#0B1F3A] text-[9px] font-black px-2.5 py-1 rounded uppercase tracking-wider font-serif shrink-0">
                          {chap.chapter}
                        </span>
                        <div>
                          <h4 className="text-xs font-extrabold text-[#0B1F3A]">{chap.title}</h4>
                          <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5">{chap.detail}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'who' && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-xl"
                  >
                    {book.who_this_is_for || book.whoIsThisBookFor}
                  </motion.p>
                )}

                {activeTab === 'features' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    {keyFeaturesList.map((feat, index) => (
                      <div key={index} className="flex gap-2 text-left items-start">
                        <span className="text-[#2563EB] font-bold shrink-0 mt-0.5">★</span>
                        <p className="text-slate-600 text-xs font-medium leading-relaxed">{feat}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Related Books section */}
        {recommendations.length > 0 && (
          <div className="border-t border-slate-100 pt-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-sm font-black text-[#0B1F3A] tracking-wider uppercase font-serif">
                People Also Recommended
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {recommendations.map((relatedBook) => (
              <motion.div
                key={relatedBook.id}
                onClick={() => onBookClick(relatedBook)}
                whileHover={{ y: -6, scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.06), 0 8px 10px -6px rgba(0,0,0,0.06)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group bg-white p-3 rounded-2xl border border-slate-100 shadow-sm cursor-pointer flex flex-col justify-between text-left"
              >
                <div>
                  <div className="h-40 w-full bg-slate-50 rounded-xl mb-3 flex items-center justify-center overflow-hidden relative border border-slate-100/50">
                    <img
                      src={relatedBook.cover_url || relatedBook.image}
                      alt={relatedBook.title}
                      referrerPolicy="no-referrer"
                      className="w-18 h-26 object-cover shadow-md rounded border-l-[3px] border-[#2563EB] group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <h3 className="text-xs font-black text-[#0B1F3A] truncate leading-tight mb-0.5 group-hover:text-[#2563EB] transition-colors font-serif">
                    {relatedBook.title}
                  </h3>
                  <p className="text-[10px] text-[#2563EB] truncate font-bold mb-2">
                    {relatedBook.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-50 flex items-center justify-between gap-1 mt-1">
                  <span className="text-[#0B1F3A] font-black text-xs">
                    ₹{relatedBook.price}
                  </span>
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">
                    View →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        )}

      </div>
    </div>
  );
}
