import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Book } from '../../booksData';
import { getAllBooksAdmin, getHomepageSections, updateHomepageSections, HomepageSection } from '../../services/books';
import { Loader, Search, Plus, Trash2, ArrowUp, ArrowDown, Save, CheckCircle, AlertCircle } from 'lucide-react';

export default function AdminHomepageSections() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{type: 'success'|'error', text: string} | null>(null);
  
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  
  const [bestsellingBooks, setBestsellingBooks] = useState<Book[]>([]);
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);

  // Modals / Search state
  const [activeSectionType, setActiveSectionType] = useState<'bestselling' | 'featured' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const books = await getAllBooksAdmin();
      setAllBooks(books);
      
      const bsSections = await getHomepageSections('bestselling');
      const ftSections = await getHomepageSections('featured');
      
      const bsBooks = bsSections
        .map(sec => books.find(b => b.id === sec.book_id))
        .filter(Boolean) as Book[];
        
      const ftBooks = ftSections
        .map(sec => books.find(b => b.id === sec.book_id))
        .filter(Boolean) as Book[];
        
      setBestsellingBooks(bsBooks);
      setFeaturedBooks(ftBooks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveMessage(null);
    try {
      await updateHomepageSections('bestselling', bestsellingBooks.map(b => b.id));
      await updateHomepageSections('featured', featuredBooks.map(b => b.id));
      setSaveMessage({ type: 'success', text: 'Homepage sections saved successfully!' });
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (err: any) {
      setSaveMessage({ type: 'error', text: err.message || 'Failed to save sections.' });
    } finally {
      setSaving(false);
    }
  };

  const moveBook = (section: 'bestselling' | 'featured', index: number, direction: 'up' | 'down') => {
    const list = section === 'bestselling' ? [...bestsellingBooks] : [...featuredBooks];
    if (direction === 'up' && index > 0) {
      [list[index - 1], list[index]] = [list[index], list[index - 1]];
    } else if (direction === 'down' && index < list.length - 1) {
      [list[index], list[index + 1]] = [list[index + 1], list[index]];
    }
    
    if (section === 'bestselling') setBestsellingBooks(list);
    else setFeaturedBooks(list);
  };

  const removeBook = (section: 'bestselling' | 'featured', id: string) => {
    if (section === 'bestselling') {
      setBestsellingBooks(bestsellingBooks.filter(b => b.id !== id));
    } else {
      setFeaturedBooks(featuredBooks.filter(b => b.id !== id));
    }
  };

  const handleSelectBook = (book: Book) => {
    if (activeSectionType === 'bestselling') {
      if (bestsellingBooks.length >= 6) return;
      if (!bestsellingBooks.find(b => b.id === book.id)) {
        setBestsellingBooks([...bestsellingBooks, book]);
      }
    } else if (activeSectionType === 'featured') {
      if (featuredBooks.length >= 6) return;
      if (!featuredBooks.find(b => b.id === book.id)) {
        setFeaturedBooks([...featuredBooks, book]);
      }
    }
    setActiveSectionType(null);
    setSearchQuery('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  const renderSection = (title: string, type: 'bestselling' | 'featured', books: Book[]) => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <div>
          <h3 className="font-bold text-slate-800">{title}</h3>
          <p className="text-sm text-slate-500 mt-1">Select up to 6 books to display on the homepage.</p>
        </div>
        <div className="text-sm font-semibold px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-sm">
          {books.length} / 6 Selected
        </div>
      </div>
      
      <div className="p-6">
        {books.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 border border-dashed border-slate-200 rounded-xl mb-6">
            <p className="text-slate-500 text-sm">No books selected. This section will be hidden on the homepage.</p>
          </div>
        ) : (
          <div className="space-y-3 mb-6">
            {books.map((book, idx) => (
              <div key={book.id} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-14 bg-slate-100 rounded overflow-hidden">
                    {book.cover_url && <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-slate-800">{book.title}</h4>
                    <p className="text-xs text-slate-500">{book.author}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => moveBook(type, idx, 'up')}
                    disabled={idx === 0}
                    className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 disabled:opacity-30 transition-colors"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => moveBook(type, idx, 'down')}
                    disabled={idx === books.length - 1}
                    className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 disabled:opacity-30 transition-colors"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <div className="w-px h-6 bg-slate-200 mx-2" />
                  <button 
                    onClick={() => removeBook(type, book.id)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors flex items-center gap-1 text-xs font-semibold"
                  >
                    <Trash2 className="w-4 h-4" /> <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {books.length < 6 ? (
          <button 
            onClick={() => setActiveSectionType(type)}
            className="w-full py-4 border-2 border-dashed border-blue-200 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-semibold flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" /> SELECT BOOK
          </button>
        ) : (
          <div className="w-full py-3 bg-slate-50 border border-slate-200 text-slate-500 rounded-xl text-center text-sm font-medium">
            Maximum 6 books allowed.
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Homepage Sections</h2>
          <p className="text-slate-500 mt-1">Manually curate the books shown on the storefront.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all flex items-center gap-2 disabled:opacity-70"
        >
          {saving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          SAVE SELECTIONS
        </button>
      </div>

      {saveMessage && (
        <div className={`p-4 rounded-xl flex items-center gap-3 mb-6 ${saveMessage.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {saveMessage.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span className="font-medium text-sm">{saveMessage.text}</span>
        </div>
      )}

      {renderSection('BESTSELLING BOOKS', 'bestselling', bestsellingBooks)}
      {renderSection('FEATURED & TRENDING', 'featured', featuredBooks)}

      {/* Select Book Modal */}
      {activeSectionType && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-xl flex flex-col max-h-[85vh]">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg">Select Book</h3>
              <button onClick={() => { setActiveSectionType(null); setSearchQuery(''); }} className="text-slate-400 hover:text-slate-600 font-bold p-2">✕</button>
            </div>
            
            <div className="p-5 border-b border-slate-100 bg-slate-50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
            </div>

            <div className="overflow-y-auto p-3">
              {allBooks
                .filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase()))
                .filter(b => {
                  const list = activeSectionType === 'bestselling' ? bestsellingBooks : featuredBooks;
                  return !list.find(selected => selected.id === b.id);
                })
                .map(book => (
                  <button
                    key={book.id}
                    onClick={() => handleSelectBook(book)}
                    className="w-full flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors text-left border border-transparent hover:border-slate-100 mb-1"
                  >
                    <div className="w-10 h-14 bg-slate-100 rounded overflow-hidden shrink-0">
                      {book.cover_url && <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-800 line-clamp-1">{book.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{book.author}</p>
                    </div>
                    <div className="ml-auto">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <Plus className="w-3 h-3" />
                      </div>
                    </div>
                  </button>
                ))
              }
              
              {allBooks.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                <div className="py-8 text-center text-slate-500 text-sm">
                  No books found.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
