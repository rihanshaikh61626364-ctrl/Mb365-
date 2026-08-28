import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Book, Category } from '../../booksData';
import { getAllCategoriesAdmin, createBook, updateBook, uploadBookCover, getAllBooksAdmin } from '../../services/books';
import { Loader, Check, ArrowLeft, Upload, X } from 'lucide-react';

export default function AdminBookForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Book>>({
    title: '',
    slug: '',
    subtitle: '',
    author: '',
    description: '',
    category_id: '',
    price: 0,
    originalPrice: 0,
    currency: 'USD',
    cover_url: '',
    pages: 100,
    language: 'English',
    format: 'PDF',
    what_you_learn: [],
    chapters: [],
    who_this_is_for: '',
    key_features: [],
    superprofile_url: '',
    is_featured: false,
    status: 'draft'
  });

  useEffect(() => {
    loadInitialData();
  }, [id]);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const cats = await getAllCategoriesAdmin();
      setCategories(cats);
      
      if (isEditing) {
        const books = await getAllBooksAdmin();
        const book = books.find(b => b.id === id);
        if (book) {
          setFormData(book);
          setCoverPreview(book.cover_url);
        } else {
          setError("Book not found.");
        }
      } else if (cats.length > 0) {
        setFormData(prev => ({ ...prev, category_id: cats[0].id }));
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleArrayChange = (field: keyof Book, index: number, value: string) => {
    const arr = [...(formData[field] as string[])];
    arr[index] = value;
    setFormData({ ...formData, [field]: arr });
  };

  const handleAddArrayItem = (field: keyof Book) => {
    const arr = [...((formData[field] as string[]) || [])];
    arr.push('');
    setFormData({ ...formData, [field]: arr });
  };

  const handleRemoveArrayItem = (field: keyof Book, index: number) => {
    const arr = [...(formData[field] as string[])];
    arr.splice(index, 1);
    setFormData({ ...formData, [field]: arr });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (formData.price < 0) {
        throw new Error("Selling price cannot be negative.");
      }
      if (formData.originalPrice !== undefined && formData.originalPrice > 0 && formData.originalPrice < formData.price) {
        throw new Error("Original Price (MRP) cannot be less than the Selling Price.");
      }

      if (formData.status === 'published') {
        if (!formData.cover_url && !coverFile) throw new Error("A cover image is required to publish a book.");
        if (!formData.superprofile_url) throw new Error("A SuperProfile purchase URL is required to publish a book.");
      }

      let finalCoverUrl = formData.cover_url;

      if (coverFile) {
        finalCoverUrl = await uploadBookCover(coverFile);
      }

      const payload = {
        ...formData,
        cover_url: finalCoverUrl
      };

      if (isEditing && id) {
        await updateBook(id, payload);
      } else {
        await createBook(payload as Omit<Book, 'id' | 'created_at' | 'updated_at'>);
      }

      navigate('/admin/books');
    } catch (err: any) {
      setError(err.message);
      window.scrollTo(0, 0);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-12 flex justify-center"><Loader className="w-8 h-8 animate-spin text-[#0B1F3A]" /></div>;

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/admin/books')} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-900">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-[#0B1F3A]">{isEditing ? 'Edit Book' : 'Add New Book'}</h2>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-semibold">{error}</div>}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* BASIC INFORMATION */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
          <h3 className="text-sm font-black uppercase tracking-wider text-[#0B1F3A] border-b border-slate-100 pb-2">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Title *</label>
              <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value, slug: !isEditing ? e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') : formData.slug})} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#0B1F3A] bg-slate-50 focus:bg-white" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Slug *</label>
              <input type="text" required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 text-sm font-mono focus:outline-none focus:border-[#0B1F3A] bg-slate-50 focus:bg-white" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Subtitle</label>
              <input type="text" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#0B1F3A] bg-slate-50 focus:bg-white" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Author</label>
              <input type="text" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#0B1F3A] bg-slate-50 focus:bg-white" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Description *</label>
            <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#0B1F3A] bg-slate-50 focus:bg-white" />
          </div>
        </div>

        {/* CATEGORY & PRICING */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-[#0B1F3A] border-b border-slate-100 pb-2 mb-4">Category</h3>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Select Category *</label>
              <select required value={formData.category_id} onChange={e => setFormData({...formData, category_id: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#0B1F3A] bg-slate-50">
                <option value="">Select Category...</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-[#0B1F3A] border-b border-slate-100 pb-2 mb-4">Pricing</h3>
              <div className="flex gap-4">
                <div className="w-1/4">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Currency</label>
                  <input type="text" value={formData.currency} onChange={e => setFormData({...formData, currency: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#0B1F3A] bg-slate-50" />
                </div>
                <div className="w-2/4">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Selling Price *</label>
                  <input type="number" required step="0.01" min="0" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#0B1F3A] bg-slate-50" />
                </div>
                <div className="w-2/4">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Original Price / MRP</label>
                  <input type="number" step="0.01" min="0" value={formData.originalPrice || ''} onChange={e => setFormData({...formData, originalPrice: parseFloat(e.target.value) || 0})} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#0B1F3A] bg-slate-50" placeholder="Optional" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COVER UPLOAD */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
          <h3 className="text-sm font-black uppercase tracking-wider text-[#0B1F3A] border-b border-slate-100 pb-2">Cover Image</h3>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-48 shrink-0">
              {coverPreview ? (
                <div className="relative rounded-lg overflow-hidden border border-slate-200 shadow-sm aspect-[2/3]">
                  <img src={coverPreview} alt="Cover Preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-full aspect-[2/3] bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 text-sm">
                  No Cover
                </div>
              )}
            </div>
            <div className="flex-1 w-full">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Upload New Cover</label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors relative">
                <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-[#0B1F3A]">Click or drag image to upload</p>
                <p className="text-xs text-slate-400 mt-1">Recommended size: 800x1200px (JPG/PNG)</p>
              </div>
              {coverFile && <p className="text-sm text-green-600 font-semibold mt-3">Selected file: {coverFile.name}</p>}
            </div>
          </div>
        </div>

        {/* DYNAMIC CONTENT */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-8">
          <h3 className="text-sm font-black uppercase tracking-wider text-[#0B1F3A] border-b border-slate-100 pb-2">Book Details & Content</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Pages</label>
              <input type="number" value={formData.pages} onChange={e => setFormData({...formData, pages: parseInt(e.target.value)})} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#0B1F3A] bg-slate-50" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Language</label>
              <input type="text" value={formData.language} onChange={e => setFormData({...formData, language: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#0B1F3A] bg-slate-50" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Format</label>
              <input type="text" value={formData.format} onChange={e => setFormData({...formData, format: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#0B1F3A] bg-slate-50" />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Who This Is For (Target Audience)</label>
            <input type="text" value={formData.who_this_is_for} onChange={e => setFormData({...formData, who_this_is_for: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#0B1F3A] bg-slate-50 focus:bg-white" />
          </div>

          <ArrayInput label="What You'll Learn" field="what_you_learn" formData={formData} handleArrayChange={handleArrayChange} handleAddArrayItem={handleAddArrayItem} handleRemoveArrayItem={handleRemoveArrayItem} />
          <ArrayInput label="Chapters / What's Inside" field="chapters" formData={formData} handleArrayChange={handleArrayChange} handleAddArrayItem={handleAddArrayItem} handleRemoveArrayItem={handleRemoveArrayItem} />
          <ArrayInput label="Key Features" field="key_features" formData={formData} handleArrayChange={handleArrayChange} handleAddArrayItem={handleAddArrayItem} handleRemoveArrayItem={handleRemoveArrayItem} />
        </div>

        {/* PURCHASE & PUBLISHING */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
          <h3 className="text-sm font-black uppercase tracking-wider text-[#0B1F3A] border-b border-slate-100 pb-2">Purchase & Publishing</h3>
          
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">SuperProfile Purchase URL *</label>
            <input type="url" value={formData.superprofile_url} onChange={e => setFormData({...formData, superprofile_url: e.target.value})} placeholder="https://superprofile.bio/..." className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#0B1F3A] bg-slate-50 focus:bg-white" />
            <p className="text-xs text-slate-400 mt-1">Customers will be redirected here when they click "Buy Now".</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Status</label>
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})} className="w-full border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-[#0B1F3A] bg-white">
                <option value="draft">Draft (Hidden)</option>
                <option value="published">Published (Live)</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <label className="flex items-center gap-3 cursor-pointer mt-6">
                <input type="checkbox" checked={formData.is_featured} onChange={e => setFormData({...formData, is_featured: e.target.checked})} className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                <span className="text-sm font-bold text-[#0B1F3A]">Feature this book</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 sticky bottom-6 bg-white p-4 border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 z-10">
          <button type="button" onClick={() => navigate('/admin/books')} className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="px-8 py-3 bg-[#0B1F3A] hover:bg-blue-600 text-white font-black uppercase tracking-widest text-xs rounded-xl transition-colors shadow-md disabled:opacity-50 flex items-center gap-2">
            {saving ? <Loader className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Book'}
          </button>
        </div>
      </form>
    </div>
  );
}

function ArrayInput({ label, field, formData, handleArrayChange, handleAddArrayItem, handleRemoveArrayItem }: any) {
  const items = formData[field] || [];
  return (
    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
      <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-4">{label}</label>
      <div className="space-y-3">
        {items.map((item: string, index: number) => (
          <div key={index} className="flex gap-2">
            <input 
              type="text" 
              value={item} 
              onChange={e => handleArrayChange(field, index, e.target.value)} 
              className="flex-1 border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:border-[#0B1F3A] bg-white" 
            />
            <button type="button" onClick={() => handleRemoveArrayItem(field, index)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => handleAddArrayItem(field)} className="mt-4 text-xs font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wider flex items-center gap-1">
        + Add Item
      </button>
    </div>
  );
}
