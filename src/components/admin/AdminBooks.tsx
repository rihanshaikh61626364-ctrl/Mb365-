import React, { useState, useEffect } from 'react';
import { Book, Category } from '../../booksData';
import { getAllBooksAdmin, deleteBook, getAllCategoriesAdmin, updateBook } from '../../services/books';
import { Loader, Plus, Edit, Trash2, Search, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [booksData, catsData] = await Promise.all([
        getAllBooksAdmin(),
        getAllCategoriesAdmin()
      ]);
      setBooks(booksData);
      setCategories(catsData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this book? This action cannot be undone.")) return;
    try {
      setLoading(true);
      await deleteBook(id);
      await loadData();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleTogglePublish = async (book: Book) => {
    try {
      setLoading(true);
      const newStatus = book.status === 'published' ? 'draft' : 'published';
      await updateBook(book.id, { status: newStatus });
      await loadData();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const filteredBooks = books.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' || b.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading && books.length === 0) return <div className="p-8 text-center"><Loader className="w-6 h-6 animate-spin mx-auto text-[#0B1F3A]" /></div>;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-[#0B1F3A]">Books Management</h2>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search books..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl w-full text-sm focus:outline-none focus:border-[#0B1F3A]"
            />
          </div>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="py-2 px-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0B1F3A]"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          <Link to="/admin/books/new" className="bg-[#0B1F3A] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-blue-600 whitespace-nowrap shadow-md transition-colors">
            <Plus className="w-4 h-4" /> Add Book
          </Link>
        </div>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-semibold">{error}</div>}

      <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
        <table className="w-full text-left text-sm text-slate-600 min-w-[800px]">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-black text-slate-400">
            <tr>
              <th className="px-6 py-4">Title / Author</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredBooks.map((book) => (
              <tr key={book.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 flex items-center gap-4">
                  <div className="w-12 h-16 bg-slate-100 rounded-md overflow-hidden shrink-0">
                    {book.cover_url ? <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" /> : null}
                  </div>
                  <div>
                    <div className="font-bold text-[#0B1F3A] mb-1">{book.title}</div>
                    <div className="text-xs text-slate-400">{book.author}</div>
                    {book.is_featured && <span className="inline-block mt-1 bg-purple-100 text-purple-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">Featured</span>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-slate-700">{book.currency} {book.price}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-slate-500">{categories.find(c => c.id === book.category_id)?.name || 'Unknown'}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    book.status === 'published' ? 'bg-green-100 text-green-700' : 
                    book.status === 'draft' ? 'bg-amber-100 text-amber-700' : 
                    'bg-slate-100 text-slate-500'
                  }`}>
                    {book.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end items-center gap-2">
                    <button 
                      onClick={() => handleTogglePublish(book)}
                      className="p-2 text-slate-400 hover:text-[#0B1F3A] bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-xs font-semibold"
                      title={book.status === 'published' ? "Unpublish" : "Publish"}
                    >
                      {book.status === 'published' ? 'Unpublish' : 'Publish'}
                    </button>
                    <Link to={`/admin/books/${book.id}/edit`} className="p-2 text-slate-400 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button onClick={() => handleDelete(book.id)} className="p-2 text-slate-400 hover:text-red-600 bg-slate-50 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredBooks.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-medium">No books found matching your criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
