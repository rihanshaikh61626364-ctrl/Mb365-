import React, { useState, useEffect } from 'react';
import { SiteSettings, getSiteSettings, updateSiteSettings } from '../../services/books';
import { Loader, Check, AlertCircle, Instagram, Linkedin, Twitter, Youtube, Github } from 'lucide-react';

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingSocial, setSavingSocial] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [socialSuccess, setSocialSuccess] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await getSiteSettings();
      setSettings(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    
    setSaving(true);
    setSuccess(false);
    setError(null);
    try {
      await updateSiteSettings(settings);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSocial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    
    setSavingSocial(true);
    setSocialSuccess(false);
    setError(null);
    try {
      await updateSiteSettings(settings);
      setSocialSuccess(true);
      setTimeout(() => setSocialSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSavingSocial(false);
    }
  };

  if (loading) return <div className="p-8 text-center"><Loader className="w-6 h-6 animate-spin mx-auto text-[#0B1F3A]" /></div>;
  if (!settings) return <div className="p-8 text-center text-slate-500">Could not load settings.</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-12 pb-12">
      {/* Site Settings Section */}
      <div>
        <h2 className="text-xl font-bold text-[#0B1F3A] mb-6">Site Settings</h2>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-600 p-4 rounded-xl mb-6 text-sm font-semibold flex items-center gap-2">
            <Check className="w-4 h-4"/> Settings saved successfully!
          </div>
        )}

        <form onSubmit={handleSaveSettings} className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-sm">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Site Name</label>
            <input 
              type="text" 
              value={settings.site_name || ''} 
              onChange={e => setSettings({...settings, site_name: e.target.value})}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#0B1F3A] bg-slate-50 focus:bg-white" 
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Tagline</label>
            <input 
              type="text" 
              value={settings.tagline || ''} 
              onChange={e => setSettings({...settings, tagline: e.target.value})}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#0B1F3A] bg-slate-50 focus:bg-white" 
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Description</label>
            <textarea 
              value={settings.description || ''} 
              onChange={e => setSettings({...settings, description: e.target.value})}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#0B1F3A] bg-slate-50 focus:bg-white h-24" 
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Support Email</label>
            <input 
              type="email" 
              value={settings.contact_email || ''} 
              onChange={e => setSettings({...settings, contact_email: e.target.value})}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#0B1F3A] bg-slate-50 focus:bg-white" 
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={saving}
            className="w-full bg-[#0B1F3A] hover:bg-blue-600 text-white font-black uppercase tracking-widest text-xs py-4 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
          >
            {saving ? <Loader className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </form>
      </div>

      {/* Social Media Links Section */}
      <div>
        <h2 className="text-xl font-bold text-[#0B1F3A] mb-2">Social Media Links</h2>
        <p className="text-slate-500 text-sm mb-6">Manage the links shown in your storefront footer. Leave a field completely empty to hide its icon.</p>
        
        {socialSuccess && (
          <div className="bg-green-50 text-green-600 p-4 rounded-xl mb-6 text-sm font-semibold flex items-center gap-2">
            <Check className="w-4 h-4"/> Social links saved successfully!
          </div>
        )}

        <form onSubmit={handleSaveSocial} className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-sm">
          <div>
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
              <Instagram className="w-4 h-4" /> Instagram URL
            </label>
            <input 
              type="url" 
              value={settings.social_instagram || ''} 
              onChange={e => setSettings({...settings, social_instagram: e.target.value})}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#0B1F3A] bg-slate-50 focus:bg-white" 
              placeholder="https://instagram.com/mybooks365.in"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
              <Linkedin className="w-4 h-4" /> LinkedIn URL
            </label>
            <input 
              type="url" 
              value={settings.social_linkedin || ''} 
              onChange={e => setSettings({...settings, social_linkedin: e.target.value})}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#0B1F3A] bg-slate-50 focus:bg-white" 
              placeholder="https://linkedin.com/company/mybooks365"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
              <Twitter className="w-4 h-4" /> X / Twitter URL
            </label>
            <input 
              type="url" 
              value={settings.social_x || ''} 
              onChange={e => setSettings({...settings, social_x: e.target.value})}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#0B1F3A] bg-slate-50 focus:bg-white" 
              placeholder="https://x.com/mybooks365"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
              <Youtube className="w-4 h-4" /> YouTube URL
            </label>
            <input 
              type="url" 
              value={settings.social_youtube || ''} 
              onChange={e => setSettings({...settings, social_youtube: e.target.value})}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#0B1F3A] bg-slate-50 focus:bg-white" 
              placeholder="https://youtube.com/@mybooks365"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
              <Github className="w-4 h-4" /> GitHub URL
            </label>
            <input 
              type="url" 
              value={settings.social_github || ''} 
              onChange={e => setSettings({...settings, social_github: e.target.value})}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#0B1F3A] bg-slate-50 focus:bg-white" 
              placeholder="https://github.com/mybooks365"
            />
          </div>

          <button 
            type="submit" 
            disabled={savingSocial}
            className="w-full bg-[#0B1F3A] hover:bg-blue-600 text-white font-black uppercase tracking-widest text-xs py-4 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
          >
            {savingSocial ? <Loader className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            {savingSocial ? 'Saving...' : 'Save Social Links'}
          </button>
        </form>
      </div>
    </div>
  );
}
