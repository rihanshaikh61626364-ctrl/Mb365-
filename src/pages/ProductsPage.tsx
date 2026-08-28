import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronDown, ChevronUp, X, Check, Filter } from 'lucide-react';
import BookCard from '../components/BookCard';
import ProductsCategoryGrid from '../components/ProductsCategoryGrid';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Book, Category } from '../booksData';
import { getPublishedBooks, getCategories, getSiteSettings, SiteSettings } from '../services/books';

export default function ProductsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // State
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Filters from URL
  const searchQuery = searchParams.get('q') || '';
  const selectedCategorySlug = searchParams.get('category') || 'all';

  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const toggleWishlist = (e: React.MouseEvent, bookId: string) => {
    e.stopPropagation();
    setWishlist(prev => ({
      ...prev,
      [bookId]: !prev[bookId]
    }));
  };

  const loadData = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const [fetchedBooks, fetchedCategories, fetchedSettings] = await Promise.all([
        getPublishedBooks(),
        getCategories(),
        getSiteSettings()
      ]);
      setBooks(fetchedBooks);
      setCategories(fetchedCategories);
      setSiteSettings(fetchedSettings);
    } catch (err) {
      console.warn('[ProductsPage] Error loading data:', err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = "MyBooks365 eBooks | Business, Marketing, Finance, AI & More";
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val) {
      searchParams.set('q', val);
    } else {
      searchParams.delete('q');
    }
    setSearchParams(searchParams);
  };

  const handleCategorySelect = (slug: string) => {
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
  };


  const handleClearFilters = () => {
    searchParams.delete('q');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  const handleBookClick = (book: Book) => {
    navigate(`/book/${book.slug || book.id}`);
  };

  const handleHomeClick = () => navigate('/');
  const handleBooksClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const handleCategoriesClick = () => {
    const el = document.getElementById('products-categories-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  const handleAboutClick = () => navigate('/about');
  const handleContactClick = () => {
    const el = document.getElementById('contact-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredBooks = useMemo(() => {
    let result = [...books];

    if (selectedCategorySlug !== 'all') {
      const cat = categories.find(c => c.slug === selectedCategorySlug || c.id === selectedCategorySlug);
      if (cat) {
        result = result.filter(book => book.category_id === cat.id);
      } else {
        result = result.filter(book => book.category_id === selectedCategorySlug);
      }
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        book =>
          book.title.toLowerCase().includes(q) ||
          book.description?.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q) ||
          categories.find(c => c.id === book.category_id)?.name.toLowerCase().includes(q)
      );
    }


    return result;
  }, [books, categories, selectedCategorySlug, searchQuery]);

  return (
    <div className="min-h-screen bg-white text-[#111827] font-sans antialiased flex flex-col selection:bg-[#2563EB]/20 selection:text-[#0B1F3A]">
      <Header 
        onHomeClick={handleHomeClick}
        onBooksClick={handleBooksClick}
        onCategoriesClick={handleCategoriesClick}
        onAboutClick={handleAboutClick}
        onContactClick={handleContactClick}
      />
      
      <main className="flex-grow flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        
        {/* HERO SECTION */}
        <div className="w-full text-center mb-12">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-pine font-black uppercase tracking-widest text-[10px] mb-4 bg-brand-cream px-3 py-1 rounded"
          >
            MYBOOKS365 LIBRARY
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] tracking-tight leading-tight mt-6 mb-4 font-sans"
          >
            Explore Our eBooks
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto font-medium"
          >
            Explore practical digital books covering business, entrepreneurship, marketing, finance, productivity, AI and growth.
          </motion.p>
        </div>

        <ProductsCategoryGrid 
          selectedCategory={selectedCategorySlug}
          setSelectedCategory={handleCategorySelect}
          categories={categories}
        />

        {/* CONTROLS AREA */}
        <div className="w-full bg-[#F9FAFB] rounded-sm p-4 sm:p-6 mb-10 sticky top-20 z-40 border border-slate-100" id="products-categories-section">
          <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
            
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search books by title, topic or author..."
                className="w-full bg-white border border-slate-200 rounded-sm pl-11 pr-4 py-3 text-sm text-[#111827] focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-slate-300 transition-all placeholder:text-slate-400 font-medium shadow-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => { searchParams.delete('q'); setSearchParams(searchParams); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
              <div className="relative shrink-0 w-full sm:w-auto">
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS SUMMARY */}
        {!isLoading && !error && (
          <div className="mb-6 flex items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <span>{selectedCategorySlug === 'all' ? 'ALL BOOKS' : categories.find(c => c.slug === selectedCategorySlug || c.id === selectedCategorySlug)?.name?.toUpperCase() || 'CATEGORY'}</span>
            <span className="mx-2">·</span>
            <span className="text-[#111827]">{filteredBooks.length} {filteredBooks.length === 1 ? 'BOOK' : 'BOOKS'}</span>
          </div>
        )}

        {/* LOADING STATE */}
        {isLoading && (
          <div className="w-full py-20 flex flex-col items-center justify-center">
             <div className="w-8 h-8 border-4 border-slate-200 border-t-brand-pine rounded-full animate-spin mb-4"></div>
             <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Loading Library...</p>
          </div>
        )}

        {/* EMPTY STATE */}
        {!isLoading && !error && filteredBooks.length === 0 && (
          <div className="w-full py-20 text-center bg-[#F9FAFB] rounded-sm border border-slate-100 flex flex-col items-center justify-center">
            <h4 className="text-sm font-bold text-[#111827] mb-2">No books found</h4>
            <p className="text-slate-500 text-xs max-w-sm mx-auto mb-6">Try changing your search or category filter.</p>
            <button
              onClick={handleClearFilters}
              className="px-6 py-3 bg-[#111827] hover:opacity-90 text-white text-[10px] font-bold uppercase tracking-wider rounded-sm transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* PRODUCT GRID */}
        {!isLoading && !error && filteredBooks.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 sm:gap-x-6 gap-y-10">
            {filteredBooks.map((book) => (
              <BookCard 
                key={book.id} 
                book={book} 
                isWishlisted={wishlist[book.id]}
                onToggleWishlist={toggleWishlist}
                onClick={handleBookClick}
              />
            ))}
          </div>
        )}

      </main>
      
      <Footer 
        onHomeClick={handleHomeClick}
        onBooksClick={handleBooksClick}
        onCategoriesClick={handleCategoriesClick}
        onAboutClick={handleAboutClick}
        onContactClick={handleContactClick}
      />
    </div>
  );
}
