// ============================================
// src/pages/admin/AdminCategories.tsx  
// Firebase async version
// ============================================

import { useState, useEffect } from 'react';
import { categoriesStore } from '../../store/adminStore_firebase';
import { AdminCategory } from '../../types/admin';

interface FormData { name: string; slug: string; image: string; }
const emptyForm: FormData = { name: '', slug: '', image: '' };

export function AdminCategories() {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try { setCategories(await categoriesStore.getAll()); }
    catch (e) { showToast('Data load nahi hua', 'error'); }
    finally { setLoading(false); }
  }

  function showToast(msg: string, type: 'success' | 'error' = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function openAdd() { setForm(emptyForm); setEditId(null); setShowForm(true); }
  function openEdit(cat: AdminCategory) {
    setForm({ name: cat.name, slug: cat.slug, image: cat.image });
    setEditId(cat.id); setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    const slug = form.slug || form.name.toLowerCase().replace(/\s+/g, '-');
    try {
      if (editId) {
        await categoriesStore.update(editId, { ...form, slug });
        showToast('Category update ho gayi!');
      } else {
        await categoriesStore.create({ ...form, slug });
        showToast('Category add ho gayi!');
      }
      setShowForm(false);
      await load();
    } catch {
      showToast('Error aaya, dobara koshish karein', 'error');
    } finally { setSaving(false); }
  }

  async function handleDelete() {
    if (!deleteId) return;
    setSaving(true);
    try {
      await categoriesStore.delete(deleteId);
      setDeleteId(null);
      showToast('Category delete ho gayi!', 'error');
      await load();
    } catch { showToast('Delete nahi hua', 'error'); }
    finally { setSaving(false); }
  }

  return (
    <div className="space-y-5">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-xl font-medium text-white text-sm ${toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'}`}>
          {toast.type === 'success' ? '✓' : '✗'} {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-xl font-black">Categories</h2>
          <p className="text-slate-400 text-sm">{loading ? '...' : `${categories.length} categories`}</p>
        </div>
        <button onClick={openAdd} className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/20">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Nai Category
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-slate-800/50 border border-white/5 rounded-2xl overflow-hidden animate-pulse">
              <div className="h-40 bg-slate-700/50" />
              <div className="p-4 space-y-2"><div className="h-4 bg-slate-700 rounded w-3/4" /><div className="h-3 bg-slate-700 rounded w-1/2" /></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(cat => (
            <div key={cat.id} className="bg-slate-800/50 border border-white/5 rounded-2xl overflow-hidden group hover:border-emerald-500/30 transition-all">
              <div className="h-40 bg-slate-700/50 overflow-hidden">
                {cat.image ? (
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600">
                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold">{cat.name}</h3>
                <p className="text-slate-500 text-xs mt-0.5">{cat.slug}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => openEdit(cat)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    Edit
                  </button>
                  <button onClick={() => setDeleteId(cat.id)} className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="p-6 border-b border-white/5">
              <h3 className="text-white font-bold text-lg">{editId ? 'Category Edit' : 'Nai Category'}</h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1.5">Category Name *</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} placeholder="e.g. DC Breakers" className="w-full bg-slate-800 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1.5">Slug</label>
                <input type="text" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="dc-breakers" className="w-full bg-slate-800 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1.5">Image URL</label>
                <input type="url" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." className="w-full bg-slate-800 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" />
                {form.image && <div className="mt-2 h-20 bg-slate-800 rounded-lg overflow-hidden"><img src={form.image} alt="" className="w-full h-full object-contain p-2" onError={e => (e.currentTarget.style.display = 'none')} /></div>}
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-slate-700 text-white py-2.5 rounded-xl font-medium hover:bg-slate-600 transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2.5 rounded-xl font-bold hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                  {saving && <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
                  {editId ? 'Update' : 'Add'} Karein
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center">
            <div className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Pakka Delete Karein?</h3>
            <p className="text-slate-400 text-sm mb-6">Is category ke saare products bhi delete ho jaenge.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 bg-slate-700 text-white py-2.5 rounded-xl font-medium hover:bg-slate-600 transition-colors">Nahi</button>
              <button onClick={handleDelete} disabled={saving} className="flex-1 bg-red-600 text-white py-2.5 rounded-xl font-bold hover:bg-red-700 transition-colors disabled:opacity-60">
                {saving ? 'Deleting...' : 'Haan, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
