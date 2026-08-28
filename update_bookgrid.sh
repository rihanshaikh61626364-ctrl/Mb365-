cat << 'INNER_EOF' > src/components/BookGrid.tsx
import React, { useRef, useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Book, Category } from '../booksData';
import { Heart, ChevronRight, ChevronLeft } from 'lucide-react';

interface BookGridProps {
  isSearchActive?: boolean;
  filteredBooks?: Book[];
  selectedCategory: string;
  setSelectedCategory: (catId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onBookClick: (book: Book) => void;
  onClearFilters: () => void;
  books: Book[];
  categories: Category[];
  onExploreBooksClick?: () => void;
}

export default function BookGrid({
  isSearchActive: propIsSearchActive,
  filteredBooks: propFilteredBooks,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onBookClick,
  onClearFilters,
  books,
  categories,
  onExploreBooksClick
}: BookGridProps) {
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  
  // Refs for horizontal scrolling
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const handleScroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const toggleWishlist = (e: React.MouseEvent, bookId: string) => {
    e.stopPropagation();
    setWishlist(prev => ({
      ...prev,
      [bookId]: !prev[bookId]
    }));
  };

  // Safe subset for trending/bestselling row
  const trendingLimit = books.slice(0, 10);
  const featuredLimit = books.filter(b => b.is_featured).slice(0, 10);

  const isSearchActive = propIsSearchActive !== undefined ? propIsSearchActive : (searchQuery.trim() !== '' || selectedCategory !== 'all');

  const filteredBooks = propFilteredBooks !== undefined ? propFilteredBooks : useMemo(() => {
    let result = [...books];

    if (selectedCategory !== 'all') {
      const cat = categories.find(c => c.slug === selectedCategory || c.id === selectedCategory);
      if (cat) {
        result = result.filter(book => book.category_id === cat.id);
      } else {
        result = result.filter(book => book.category_id === selectedCategory);
      }
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        book =>
          book.title.toLowerCase().includes(q) ||
          book.description?.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q)
      );
    }

    return result;
  }, [books, categories, selectedCategory, searchQuery]);

  return (
    <div className="w-full bg-[#FAFAF9] pb-20 font-sans" id="books-store-section">
      {!isSearchActive && selectedCategory === 'all' ? (
        /* ================= CONDITION 1: DEFAULT LANDING LAYOUT ================= */
        <div className="w-full">
          
          {/* BESTSELLING BOOKS ROW */}
          <section className="w-full bg-white border-b border-slate-100 py-10 px-8">
            <div className="max-w-7xl mx-auto relative group">
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                  <h3 className="text-xs sm:text-sm font-black text-brand-pine tracking-wider uppercase font-serif">
                    Bestselling Books
                  </h3>
                  <div className="w-8 h-0.5 bg-brand-gold mt-1 rounded-full" />
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleScroll(row1Ref, 'left')}
                    className="p-1.5 rounded-full border border-slate-100 bg-white hover:border-slate-300 text-slate-500 hover:text-brand-pine transition-all cursor-pointer active:scale-90"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => handleScroll(row1Ref, 'right')}
                    className="p-1.5 rounded-full border border-slate-100 bg-white hover:border-slate-300 text-slate-500 hover:text-brand-pine transition-all cursor-pointer active:scale-90"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Slider Strip */}
              <div 
                ref={row1Ref}
                className="w-full flex gap-4 overflow-x-auto scroll-smooth scrollbar-none snap-x snap-mandatory py-2 px-0.5"
              >
                {trendingLimit.map((book) => {
                  const isWishlisted = wishlist[book.id] || false;
                  
                  return (
                    <motion.div
                      key={`r1-${book.id}`}
                      whileHover={{ y: -4, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      onClick={() => onBookClick(book)}
                      className="min-w-[150px] sm:min-w-[170px] max-w-[175px] bg-white p-3 rounded-lg border border-slate-100/80 shadow-sm cursor-pointer flex flex-col justify-between snap-start shrink-0 relative hover:shadow-md transition-shadow"
                    >
                      <div>
                        {/* Compact Book Cover */}
                        <div className="h-40 w-full bg-brand-cream rounded-md mb-2 flex items-center justify-center overflow-hidden relative border border-slate-100/50">
                          <img
                            src={book.image}
                            alt={book.title}
                            referrerPolicy="no-referrer"
                            className="w-18 h-26 object-cover shadow rounded border-l-3 border-brand-pine"
                          />
                          
                          {/* Heart Icon Badge */}
                          <button
                            onClick={(e) => toggleWishlist(e, book.id)}
                            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow text-slate-400 hover:text-red-500 transition-colors z-20"
                          >
                            <Heart className={`w-3 h-3 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                          </button>
                          {book.tag && (
                            <span className="absolute top-2 left-2 bg-red-500 text-white text-[6px] font-black px-1.5 py-0.5 rounded shadow-sm uppercase tracking-wider">
                              {book.tag}
                            </span>
                          )}
                        </div>

                        {/* Title & Author */}
                        <h4 className="text-[11px] font-black font-serif text-[#111C18] leading-tight mb-0.5 text-left truncate">
                          {book.title}
                        </h4>
                        <p className="text-[9px] font-medium text-slate-400 mb-2 text-left truncate">
                          {book.author}
                        </p>
                      </div>

                      {/* Pricing Row */}
                      <div className="pt-2 mt-auto border-t border-slate-50 flex items-center justify-between gap-1">
                        <div className="flex items-baseline gap-1">
                          <span className="text-brand-pine font-black text-[11px]">
                            ₹{book.price}
                          </span>
                          {(book.originalPrice && book.originalPrice > book.price) && (
                            <span className="text-[9px] text-slate-400 line-through">
                              ₹{book.originalPrice}
                            </span>
                          )}
                        </div>
                        <span className="text-[8px] font-black text-brand-pine uppercase tracking-widest bg-brand-pine/5 px-2 py-1 rounded">
                          Get →
                        </span>
                      </div>
                    </motion.div>
                  );
                })}

                {onExploreBooksClick && (
                  <div 
                    onClick={onExploreBooksClick}
                    className="min-w-[150px] sm:min-w-[170px] bg-brand-cream/30 p-3 rounded-lg border border-brand-pine/10 cursor-pointer flex flex-col items-center justify-center snap-start shrink-0 hover:bg-brand-cream transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-brand-pine shadow-sm mb-3 group-hover:scale-110 transition-transform">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black text-brand-pine uppercase tracking-widest text-center">
                      Explore<br/>All Books
                    </span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* FEATURED / TRENDING ROW */}
          <section className="w-full bg-white border-b border-slate-100 py-10 px-8">
            <div className="max-w-7xl mx-auto relative group">
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                  <h3 className="text-xs sm:text-sm font-black text-brand-pine tracking-wider uppercase font-serif">
                    Featured & Trending
                  </h3>
                  <div className="w-8 h-0.5 bg-brand-gold mt-1 rounded-full" />
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleScroll(row2Ref, 'left')}
                    className="p-1.5 rounded-full border border-slate-100 bg-white hover:border-slate-300 text-slate-500 hover:text-brand-pine transition-all cursor-pointer active:scale-90"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => handleScroll(row2Ref, 'right')}
                    className="p-1.5 rounded-full border border-slate-100 bg-white hover:border-slate-300 text-slate-500 hover:text-brand-pine transition-all cursor-pointer active:scale-90"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Slider Strip */}
              <div 
                ref={row2Ref}
                className="w-full flex gap-4 overflow-x-auto scroll-smooth scrollbar-none snap-x snap-mandatory py-2 px-0.5"
              >
                {featuredLimit.map((book) => {
                  const isWishlisted = wishlist[book.id] || false;
                  
                  return (
                    <motion.div
                      key={`r2-${book.id}`}
                      whileHover={{ y: -4, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      onClick={() => onBookClick(book)}
                      className="min-w-[150px] sm:min-w-[170px] max-w-[175px] bg-white p-3 rounded-lg border border-slate-100/80 shadow-sm cursor-pointer flex flex-col justify-between snap-start shrink-0 relative hover:shadow-md transition-shadow"
                    >
                      <div>
                        {/* Compact Book Cover */}
                        <div className="h-40 w-full bg-brand-cream rounded-md mb-2 flex items-center justify-center overflow-hidden relative border border-slate-100/50">
                          <img
                            src={book.image}
                            alt={book.title}
                            referrerPolicy="no-referrer"
                            className="w-18 h-26 object-cover shadow rounded border-l-3 border-brand-pine"
                          />
                          
                          {/* Heart Icon Badge */}
                          <button
                            onClick={(e) => toggleWishlist(e, book.id)}
                            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow text-slate-400 hover:text-red-500 transition-colors z-20"
                          >
                            <Heart className={`w-3 h-3 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                          </button>
                          {book.tag && (
                            <span className="absolute top-2 left-2 bg-[#EADCC9]/50 text-brand-pine text-[6px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
                              {book.tag}
                            </span>
                          )}
                        </div>

                        {/* Title & Author */}
                        <h4 className="text-[11px] font-black font-serif text-[#111C18] leading-tight mb-0.5 text-left truncate">
                          {book.title}
                        </h4>
                        <p className="text-[9px] font-medium text-slate-400 mb-2 text-left truncate">
                          {book.author}
                        </p>
                      </div>

                      {/* Pricing Row */}
                      <div className="pt-2 mt-auto border-t border-slate-50 flex items-center justify-between gap-1">
                        <div className="flex items-baseline gap-1">
                          <span className="text-brand-pine font-black text-[11px]">
                            ₹{book.price}
                          </span>
                          {(book.originalPrice && book.originalPrice > book.price) && (
                            <span className="text-[9px] text-slate-400 line-through">
                              ₹{book.originalPrice}
                            </span>
                          )}
                        </div>
                        <span className="text-[8px] font-black text-brand-pine uppercase tracking-widest bg-brand-pine/5 px-2 py-1 rounded">
                          Get →
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

        </div>
      ) : (
        /* ================= CONDITION 2: FILTERED / SEARCH RESULT LAYOUT ================= */
        <section className="w-full px-8 py-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-start border-b border-slate-100 pb-2 mb-6">
              <h3 className="text-xs sm:text-sm font-black text-brand-pine tracking-wider uppercase font-serif">
                Filtered Books ({filteredBooks.length})
              </h3>
            </div>

            {filteredBooks.length === 0 ? (
              <div className="w-full py-12 px-4 text-center bg-white rounded-xl border border-slate-100 shadow-sm">
                <h4 className="text-xs font-black text-brand-pine mb-1">No matches found</h4>
                <p className="text-slate-400 text-[10px] max-w-sm mx-auto mb-4">
                  Try revising the search term or resetting the categories.
                </p>
                <button
                  onClick={onClearFilters}
                  className="px-5 py-2 bg-brand-pine text-white text-[10px] font-black uppercase tracking-wider rounded-md"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {filteredBooks.map((book) => {
                  const isWishlisted = wishlist[book.id] || false;
                  
                  return (
                    <motion.div
                      key={`filtered-${book.id}`}
                      whileHover={{ y: -4, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      onClick={() => onBookClick(book)}
                      className="bg-white p-3 rounded-lg border border-slate-100/80 shadow-sm cursor-pointer flex flex-col justify-between hover:shadow-md transition-shadow"
                    >
                      <div>
                        <div className="h-40 w-full bg-brand-cream rounded-md mb-2 flex items-center justify-center overflow-hidden relative border border-slate-100/50">
                          <img
                            src={book.image}
                            alt={book.title}
                            referrerPolicy="no-referrer"
                            className="w-18 h-26 object-cover shadow rounded border-l-3 border-brand-pine"
                          />
                          <button
                            onClick={(e) => toggleWishlist(e, book.id)}
                            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow text-slate-400 hover:text-red-500 transition-colors z-20"
                          >
                            <Heart className={`w-3 h-3 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                          </button>
                        </div>

                        <h4 className="text-[11px] font-black font-serif text-[#111C18] leading-tight mb-0.5 text-left truncate">
                          {book.title}
                        </h4>
                        <p className="text-[9px] font-medium text-slate-400 mb-2 text-left truncate font-serif">
                          {book.author}
                        </p>
                      </div>

                      <div className="pt-2 mt-auto border-t border-slate-50 flex items-center justify-between gap-1">
                        <span className="text-brand-pine font-black text-[11px]">
                          ₹{book.price}
                        </span>
                        <span className="text-[8px] font-black text-brand-pine uppercase tracking-widest bg-brand-pine/5 px-2 py-1 rounded">
                          Get →
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
INNER_EOF
bash update_bookgrid.sh