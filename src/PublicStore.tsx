/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';

import Header from './components/Header';
import Hero from './components/Hero';
import BookGrid from './components/BookGrid';
import ProductDetail from './components/ProductDetail';
import PromoBanner from './components/PromoBanner';
import Footer from './components/Footer';
import { Book, BOOKS, CATEGORIES, Category } from './booksData';
import { getPublishedBooks, getCategories, getSiteSettings, SiteSettings, getHomepageSections } from './services/books';

export default function PublicStore() {
  const navigate = useNavigate();
  const { slug } = useParams();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Real database dynamic lists
  const [books, setBooks] = useState<Book[]>([]);
  const [bestsellingBooks, setBestsellingBooks] = useState<Book[]>([]);
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Toast notifications state (success & error)
  const [toast, setToast] = useState<{ visible: boolean; message: string; bookTitle?: string; isError?: boolean } | null>(null);

  // Sync selectedBook with URL slug
  useEffect(() => {
    if (slug && books.length > 0) {
      const book = books.find(b => b.slug === slug || b.id === slug);
      if (book) {
        setSelectedBook(book);
      } else {
        setSelectedBook(null);
      }
    } else if (!slug) {
      setSelectedBook(null);
    }
  }, [slug, books]);

  // Update browser window title dynamically
  useEffect(() => {
    if (siteSettings) {
      document.title = `${siteSettings.site_name} — ${siteSettings.tagline}`;
    }
  }, [siteSettings]);

  // Asynchronous background load from Supabase database
  const loadDatabaseData = async () => {
    try {
      const [fetchedBooks, fetchedCategories, fetchedSettings, bsSections, ftSections] = await Promise.all([
        getPublishedBooks(),
        getCategories(),
        getSiteSettings(),
        getHomepageSections("bestselling"),
        getHomepageSections("featured")
      ]);
      setBooks(fetchedBooks);
      setCategories(fetchedCategories);
      setSiteSettings(fetchedSettings);
      
      const bsBooks = bsSections
        .map(sec => fetchedBooks.find(b => b.id === sec.book_id))
        .filter(Boolean) as Book[];
      const ftBooks = ftSections
        .map(sec => fetchedBooks.find(b => b.id === sec.book_id))
        .filter(Boolean) as Book[];
        
      setBestsellingBooks(bsBooks);
      setFeaturedBooks(ftBooks);
    } catch (err) {
      console.warn("[App] Error refreshing data from services layer:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDatabaseData();
  }, []);

  const showToastNotification = (message: string, isError: boolean = false, bookTitle?: string) => {
    setToast({ visible: true, message, bookTitle, isError });
    const timer = setTimeout(() => {
      setToast(null);
    }, 4000);
    return () => clearTimeout(timer);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // If user search triggers while looking at a detail page, pop back to the search results instantly!
    if (selectedBook && query.trim() !== '') {
      navigate('/');
    }
  };

  const handleHomeClick = () => {
    navigate('/');
    setSelectedCategory('all');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBooksClick = () => {
    navigate('/products');
  };

  const handleCategoriesClick = () => {
    navigate('/products');
  };

  const handleAboutClick = () => {
    navigate('/about');
  };

  const handleContactClick = () => {
    const element = document.getElementById('contact-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookClickFromDetail = (otherBook: Book) => {
    navigate(`/book/${otherBook.slug || otherBook.id}`);
  };

  const handleBookClickFromGrid = (book: Book) => {
    navigate(`/book/${book.slug || book.id}`);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center font-sans text-[#111C18]">
        <div className="w-8 h-8 border-4 border-[#0B1F3A] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Loading Library...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen bg-[#F8FAFC] text-[#111827] font-sans antialiased flex flex-col selection:bg-[#2563EB]/20 selection:text-[#0B1F3A]"
    >
      
      {/* Universal Header */}
      <Header 
        onHomeClick={handleHomeClick}
        onBooksClick={handleBooksClick}
        onCategoriesClick={handleCategoriesClick}
        onAboutClick={handleAboutClick}
        onContactClick={handleContactClick}
      />

      {/* Main Content Area with elegant fade and slide motion entries */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {!selectedBook ? (
            // LANDING PAGE VIEW
            <motion.div
              key="store-front-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-full flex flex-col"
            >
              {/* Sliding Hero Banner */}
              <Hero 
                onShopNowClick={handleBooksClick} 
                onBrowseCategoriesClick={handleCategoriesClick} 
              />
              

              {/* Dynamic book cards grid with search and category filtering */}
              <BookGrid 
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                searchQuery={searchQuery}
                setSearchQuery={handleSearchChange}
                onBookClick={handleBookClickFromGrid}
                onClearFilters={handleClearFilters}
                books={books}
                categories={categories}
                bestsellingBooks={bestsellingBooks}
                featuredBooks={featuredBooks}
              />

              {/* Redesigned MyBooks365 Originals and Chapter Banner above the footer */}
              <PromoBanner onExploreBooksClick={handleBooksClick} />
            </motion.div>
          ) : (
            // PRODUCT DETAIL VIEW (SPA Route Toggling)
            <motion.div
              key={`product-detail-view-${selectedBook.id}`}
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-full"
            >
              <ProductDetail 
                book={selectedBook}
                allBooks={books}
                onBackClick={() => navigate(-1)}
                onBookClick={handleBookClickFromDetail}
                onShowToast={(msg, isErr) => showToastNotification(msg, isErr, selectedBook.title)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Unified footer with news, directories, customer lines & payment support */}
      <Footer 
        onHomeClick={handleHomeClick}
        onBooksClick={handleBooksClick}
        onCategoriesClick={handleCategoriesClick}
        onAboutClick={handleAboutClick}
        onContactClick={handleContactClick}
      />

      {/* Dynamic Toast Alerts */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-white border border-slate-100 rounded-xl shadow-2xl p-4 flex gap-3 text-left items-start overflow-hidden"
          >
            {/* Visual glow indicator */}
            <div className={`absolute top-0 left-0 right-0 h-1 ${toast.isError ? 'bg-amber-500' : 'bg-green-500'}`} />
            
            <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${toast.isError ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}>
              {toast.isError ? (
                <span className="text-sm font-bold">!</span>
              ) : (
                <Check className="w-5 h-5" />
              )}
            </div>
            
            <div className="flex-grow">
              <h4 className="text-sm font-extrabold text-[#0B1F3A]">{toast.message}</h4>
              {toast.bookTitle && (
                <p className="text-slate-500 text-xs mt-1 truncate max-w-[200px]">
                  "{toast.bookTitle}"
                </p>
              )}
            </div>

            <button 
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-[#0B1F3A] p-1 rounded-md hover:bg-slate-50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
