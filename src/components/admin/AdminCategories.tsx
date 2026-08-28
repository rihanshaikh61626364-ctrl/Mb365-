import React, { useState, useEffect } from 'react';
import { Category } from '../../booksData';
import { getAllCategoriesAdmin, createCategory, updateCategory, deleteCategory } from '../../services/books';
import { Loader, Plus, Edit, Trash2, X, Check } from 'lucide-react';

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Category>>({});
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await getAllCategoriesAdmin();
      setCategories(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      if (!formData.name || !formData.slug) {
        throw new Error("Name and Slug are required.");
      }
      setLoading(true);
      await createCategory({
        name: formData.name,
        slug: formData.slug,
        description: formData.description || '',
        status: formData.status || 'active'
      } as any);
      setIsCreating(false);
      setFormData({});
      await loadCategories();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cat: Category) => {
    setEditingId(cat.id);
    setFormData(cat);
  };

  const handleSave = async (id: string) => {
    try {
      setLoading(true);
      await updateCategory(id, formData);
      setEditingId(null);
      await loadCategories();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category? Ensure no books are currently using it.")) return;
    try {
      setLoading(true);
      await deleteCategory(id);
      await loadCategories();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading && categories.length === 0) return <div className="p-8 text-center"><Loader className="w-6 h-6 animate-spin mx-auto text-[#0B1F3A]" /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#0B1F3A]">Categories</h2>
        <button 
          onClick={() => { setIsCreating(true); setFormData({ status: 'active' }); }} 
          disabled={isCreating}
          className="bg-[#0B1F3A] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-blue-600 disabled:opacity-50 transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-semibold">{error}</div>}

      <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-black text-slate-400">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isCreating && (
              <tr className="bg-blue-50/50">
                <td className="px-6 py-4">
                  <input type="text" placeholder="Category Name" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} className="border border-slate-300 p-2 rounded-lg w-full text-sm" />
                </td>
                <td className="px-6 py-4">
                  <input type="text" placeholder="slug-name" value={formData.slug || ''} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="border border-slate-300 p-2 rounded-lg w-full text-sm" />
                </td>
                <td className="px-6 py-4">
                  <input type="text" placeholder="Description" value={formData.description || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} className="border border-slate-300 p-2 rounded-lg w-full text-sm" />
                </td>
                <td className="px-6 py-4">
                  <select value={formData.status || 'active'} onChange={(e) => setFormData({...formData, status: e.target.value as any})} className="border border-slate-300 p-2 rounded-lg text-sm bg-white">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={handleCreate} className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"><Check className="w-4 h-4" /></button>
                    <button onClick={() => { setIsCreating(false); setFormData({}); }} className="p-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"><X className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            )}
            
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-[#0B1F3A]">
                  {editingId === cat.id ? (
                    <input type="text" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} className="border border-slate-300 p-2 rounded-lg w-full text-sm" />
                  ) : cat.name}
                </td>
                <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                  {editingId === cat.id ? (
                    <input type="text" value={formData.slug || ''} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="border border-slate-300 p-2 rounded-lg w-full text-sm" />
                  ) : cat.slug}
                </td>
                <td className="px-6 py-4 text-slate-500 max-w-xs truncate">
                  {editingId === cat.id ? (
                    <input type="text" value={formData.description || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} className="border border-slate-300 p-2 rounded-lg w-full text-sm" />
                  ) : cat.description}
                </td>
                <td className="px-6 py-4">
                  {editingId === cat.id ? (
                    <select value={formData.status || 'active'} onChange={(e) => setFormData({...formData, status: e.target.value as any})} className="border border-slate-300 p-2 rounded-lg text-sm bg-white">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  ) : (
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${cat.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                      {cat.status}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  {editingId === cat.id ? (
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleSave(cat.id)} className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"><Check className="w-4 h-4" /></button>
                      <button onClick={() => setEditingId(null)} className="p-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"><X className="w-4 h-4" /></button>
                    </div>
                  ) : (
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleEdit(cat)} className="p-2 text-slate-400 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(cat.id)} className="p-2 text-slate-400 hover:text-red-600 bg-slate-50 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {categories.length === 0 && !isCreating && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-medium">No categories found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
