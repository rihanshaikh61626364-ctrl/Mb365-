import React, { useState, useEffect } from 'react';
import { supabase, supabaseConnectionError } from '../../lib/supabase';
import { Loader, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!supabase) {
      setErrorMsg(`Supabase Error: ${supabaseConnectionError}`);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!supabase) {
      setErrorMsg(`Supabase Error: ${supabaseConnectionError}`);
      return;
    }

    if (!email.trim() || !password.trim()) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      if (data.user) {
        onLoginSuccess();
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      setErrorMsg(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center font-sans p-6 text-[#111C18]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <button 
          onClick={() => window.location.href = '/'}
          className="mb-8 text-xs font-black uppercase tracking-wider text-slate-400 hover:text-[#0B1F3A] flex items-center gap-2 transition-colors cursor-pointer"
        >
          ← Back to Store
        </button>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-10 border border-slate-100">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-[#0B1F3A] rounded-2xl flex items-center justify-center shadow-lg shadow-[#0B1F3A]/20">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-2xl font-serif font-black text-[#0B1F3A] tracking-tight mb-2">
              Admin Login
            </h1>
            <p className="text-sm font-semibold text-slate-400">
              Sign in to manage your bookstore.
            </p>
          </div>
          
          {errorMsg && (
            <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl text-sm font-semibold text-center border border-red-100 break-words">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mybooks365.com"
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#0B1F3A] focus:bg-white rounded-xl py-3 px-4 text-sm focus:outline-none text-[#111C18] font-medium"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#0B1F3A] focus:bg-white rounded-xl py-3 px-4 text-sm focus:outline-none text-[#111C18] font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !supabase}
              className="w-full bg-[#0B1F3A] hover:bg-[#2563EB] text-white py-3.5 px-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-md active:translate-y-0.5 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  SECURE LOGIN
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
