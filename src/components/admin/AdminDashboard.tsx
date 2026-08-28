import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { BookOpen, CheckCircle, FileEdit, Archive, Star, FolderTree, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    published: 0,
    drafts: 0,
    archived: 0,
    featured: 0,
    totalCategories: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      if (!supabase) return;
      try {
        const [booksRes, catsRes] = await Promise.all([
          supabase.from('books').select('status, is_featured'),
          supabase.from('categories').select('id', { count: 'exact' })
        ]);
        
        if (booksRes.data) {
          const b = booksRes.data;
          setStats({
            totalBooks: b.length,
            published: b.filter(book => book.status === 'published').length,
            drafts: b.filter(book => book.status === 'draft').length,
            archived: b.filter(book => book.status === 'archived').length,
            featured: b.filter(book => book.is_featured).length,
            totalCategories: catsRes.data?.length || 0
          });
        }
      } catch (err) {
        console.error("Failed to load stats", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return <div className="flex justify-center p-12"><Loader className="w-8 h-8 animate-spin text-[#0B1F3A]" /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#0B1F3A]">Dashboard Overview</h2>
        <div className="flex gap-4">
          <Link to="/admin/books/new" className="bg-[#0B1F3A] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-colors">
            + Add New Book
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-12">
        <StatCard icon={<BookOpen />} title="TOTAL BOOKS" value={stats.totalBooks} color="bg-blue-50 text-blue-600" />
        <StatCard icon={<CheckCircle />} title="PUBLISHED" value={stats.published} color="bg-green-50 text-green-600" />
        <StatCard icon={<FileEdit />} title="DRAFTS" value={stats.drafts} color="bg-amber-50 text-amber-600" />
        <StatCard icon={<Archive />} title="ARCHIVED" value={stats.archived} color="bg-slate-100 text-slate-600" />
        <StatCard icon={<Star />} title="FEATURED" value={stats.featured} color="bg-purple-50 text-purple-600" />
        <StatCard icon={<FolderTree />} title="CATEGORIES" value={stats.totalCategories} color="bg-pink-50 text-pink-600" />
      </div>
      
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-[#0B1F3A] mb-6">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Link to="/admin/books" className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 transition-colors">
            Manage Books
          </Link>
          <Link to="/admin/categories" className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 transition-colors">
            Manage Categories
          </Link>
          <Link to="/admin/settings" className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 transition-colors">
            Site Settings
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color }: { icon: React.ReactNode, title: string, value: number, color: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${color}`}>
        {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
      </div>
      <span className="text-3xl font-black text-[#0B1F3A] mb-1">{value}</span>
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{title}</span>
    </div>
  );
}
