import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Loader, ShieldCheck, Database, BookOpen, FolderTree, Settings, Share2, LogOut, ArrowLeft } from 'lucide-react';

import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminBooks from './AdminBooks';
import AdminCategories from './AdminCategories';
import AdminSettings from './AdminSettings';
import AdminHomepageSections from './AdminHomepageSections';
import AdminBookForm from './AdminBookForm';

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!supabase) {
      setIsCheckingAuth(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session?.user);
      setIsCheckingAuth(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session?.user);
      if (!session?.user && location.pathname !== '/admin/login') {
        navigate('/admin/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location]);

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setIsAuthenticated(false);
    navigate('/admin/login');
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center font-sans text-[#111C18]">
        <Loader className="w-8 h-8 animate-spin text-[#0B1F3A] mb-4" />
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Verifying Session...</p>
      </div>
    );
  }

  // If not authenticated and not on login page, redirect to login
  if (!isAuthenticated && location.pathname !== '/admin/login') {
    return <AdminLogin onLoginSuccess={() => navigate('/admin')} />;
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => navigate('/admin')} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 md:min-h-screen flex flex-col shrink-0">
        <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-200 bg-[#0B1F3A] text-white">
          <ShieldCheck className="w-5 h-5 text-blue-400" />
          <h1 className="font-serif font-black tracking-wide">MyBooks365 Admin</h1>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          <button 
            onClick={() => navigate('/admin')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${location.pathname === '/admin' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <Database className="w-4 h-4" /> Dashboard
          </button>
          <button 
            onClick={() => navigate('/admin/books')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${location.pathname.startsWith('/admin/books') ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <BookOpen className="w-4 h-4" /> Books
          </button>
          <button 
            onClick={() => navigate('/admin/categories')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${location.pathname.startsWith('/admin/categories') ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <FolderTree className="w-4 h-4" /> Categories
          </button>
          <button 
            onClick={() => navigate('/admin/homepage-sections')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${location.pathname.startsWith('/admin/homepage-sections') ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <Share2 className="w-4 h-4" /> Homepage Sections
          </button>
          <button 
            onClick={() => navigate('/admin/settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${location.pathname.startsWith('/admin/settings') ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <Settings className="w-4 h-4" /> Settings
          </button>
        </nav>

        <div className="p-4 border-t border-slate-200 space-y-2">
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Storefront
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-6 md:px-10 h-16 flex items-center justify-between sticky top-0 z-40 shadow-sm">
          <h2 className="font-bold text-slate-800 capitalize">
             {location.pathname === '/admin' ? 'Dashboard' : location.pathname.split('/')[2]} Workspace
          </h2>
        </header>
        
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/books" element={<AdminBooks />} />
            <Route path="/books/new" element={<AdminBookForm />} />
            <Route path="/books/:id/edit" element={<AdminBookForm />} />
            <Route path="/categories" element={<AdminCategories />} />
            <Route path="/homepage-sections" element={<AdminHomepageSections />} />
            
            <Route path="/settings" element={<AdminSettings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
