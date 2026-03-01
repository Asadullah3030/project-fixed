import { useState, useEffect, useMemo } from 'react';
import { productsStore, categoriesStore } from '../../store/adminStore_firebase';
import { AdminProduct, AdminCategory } from '../../types/admin';

interface FormData {
  title: string;
  shortTitle: string;
  discountPrice: string;
  originalPrice: string;
  detail: string;
  features: string;
  images: string;
  categoryId: string;
}

const emptyForm: FormData = {
  title: '', shortTitle: '', discountPrice: '', originalPrice: '',
  detail: '', features: '', images: '', categoryId: '',
};

export function AdminProducts() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const load = () => {
    setProducts(productsStore.getAll());
    setCategories(categoriesStore.getAll());
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => products.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.shortTitle.toLowerCase().includes(q);
    const matchCat = filterCat === 'all' || p.categoryId === filterCat;
    return matchSearch && matchCat;
  }), [products, search, filterCat]);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const openAdd = () => {
    setForm({ ...emptyForm, categoryId: categories[0]?.id || '' });
    setEditId(null);
    setShowForm(true);
  };

  const openEdit = (p: AdminProduct) => {
    setForm({
      title: p.title,
      shortTitle: p.shortTitle,
      discountPrice: p.discountPrice,
      originalPrice: p.originalPrice,
      detail: p.detail,
      features: p.features.join('\n'),
      images: p.images.join('\n'),
      categoryId: p.categoryId,
    });
    setEditId(p.id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.categoryId) return;

    const productData = {
      title: form.title.trim(),
      shortTitle: form.shortTitle.trim() || form.title.trim().slice(0, 50),
      discountPrice: form.discountPrice,
      originalPrice: form.originalPrice,
      detail: form.detail.trim(),
      features: form.features.split('\n').map(f => f.trim()).filter(Boolean),
      images: form.images.split('\n').map(u => u.trim()).filter(Boolean),
      categoryId: form.categoryId,
    };

    if (editId) {
      productsStore.update(editId, productData);
      showToast('Product update ho gaya!');
    } else {
      productsStore.create(productData);
      showToast('Product add ho gaya!');
    }
    setShowForm(false);
    load();
  };

  const handleDelete = () => {
    if (!deleteId) return;
    productsStore.delete(deleteId);
    setDeleteId(null);
    showToast('Product delete ho gaya!', 'error');
    load();
  };

  const getCategoryName = (id: string) => categories.find(c => c.id === id)?.name || id;

  const discountPercent = (orig: string, disc: string) => {
    const o = parseInt(orig), d = parseInt(disc);
    if (!o || !d) return 0;
    return Math.round((1 - d / o) * 100);
  };

  return (
    <div className="space-y-5">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-xl font-medium text-white text-sm flex items-center gap-2 ${toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'}`}>
          {toast.type === 'success' ? '✓' : '✗'} {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-white text-xl font-black">Products</h2>
          <p className="text-slate-400 text-sm">{filtered.length} / {products.length} products</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/20 w-fit"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Naya Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-col sm:flex-row">
        <div className="relative flex-1">
          <svg className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Product search karein..."
            className="w-full bg-slate-800 border border-white/10 text-white placeholder-slate-500 rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm"
          />
        </div>
        <select
          value={filterCat}
          onChange={e => setFilterCat(e.target.value)}
          className="bg-slate-800 border border-white/10 text-white rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 text-sm min-w-[160px]"
        >
          <option value="all">Sab Categories</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-slate-800/50 border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-4 py-3 text-slate-400 font-semibold">Product</th>
                <th className="text-left px-4 py-3 text-slate-400 font-semibold hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-slate-400 font-semibold">Price</th>
                <th className="text-left px-4 py-3 text-slate-400 font-semibold hidden lg:table-cell">Discount</th>
                <th className="text-right px-4 py-3 text-slate-400 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-slate-500">
                    <svg className="w-12 h-12 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    Koi product nahi mila
                  </td>
                </tr>
              ) : (
                filtered.map(p => (
                  <tr key={p.id} className="hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.images[0] && (
                          <div className="w-10 h-10 rounded-lg bg-slate-700 overflow-hidden flex-shrink-0">
                            <img src={p.images[0]} alt={p.shortTitle} className="w-full h-full object-contain p-1" />
                          </div>
                        )}
                        <div>
                          <p className="text-white font-medium line-clamp-1">{p.shortTitle}</p>
                          <p className="text-slate-500 text-xs line-clamp-1 hidden sm:block">{p.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="bg-emerald-500/20 text-emerald-400 text-xs font-medium px-2.5 py-1 rounded-full">
                        {getCategoryName(p.categoryId)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-emerald-400 font-bold">Rs {parseInt(p.discountPrice).toLocaleString()}</p>
                      <p className="text-slate-500 text-xs line-through">Rs {parseInt(p.originalPrice).toLocaleString()}</p>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded-full">
                        {discountPercent(p.originalPrice, p.discountPrice)}% OFF
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(p)} className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-lg transition-colors">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button onClick={() => setDeleteId(p.id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl my-4">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-white font-bold text-lg">{editId ? 'Product Edit Karein' : 'Naya Product Add Karein'}</h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-1.5">Category *</label>
                  <select
                    value={form.categoryId}
                    onChange={e => setForm({ ...form, categoryId: e.target.value })}
                    className="w-full bg-slate-800 border border-white/10 text-white rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    required
                  >
                    <option value="">Category chunein...</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-1.5">Full Title *</label>
                  <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Product ka poora naam..." className="w-full bg-slate-800 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" required />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-1.5">Short Title</label>
                  <input type="text" value={form.shortTitle} onChange={e => setForm({ ...form, shortTitle: e.target.value })} placeholder="Mukhtasar naam..." className="w-full bg-slate-800 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1.5">Sale Price (Rs) *</label>
                  <input type="number" value={form.discountPrice} onChange={e => setForm({ ...form, discountPrice: e.target.value })} placeholder="1199" className="w-full bg-slate-800 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1.5">Original Price (Rs) *</label>
                  <input type="number" value={form.originalPrice} onChange={e => setForm({ ...form, originalPrice: e.target.value })} placeholder="1600" className="w-full bg-slate-800 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" required />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-1.5">Detail</label>
                  <textarea value={form.detail} onChange={e => setForm({ ...form, detail: e.target.value })} rows={3} placeholder="Product ki tafseel..." className="w-full bg-slate-800 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-1.5">Features (ek ek line mein)</label>
                  <textarea value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} rows={4} placeholder={"Brand: Tomzn\nRated Current: 32A\nVoltage: DC 500V"} className="w-full bg-slate-800 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none font-mono text-xs" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-1.5">Image URLs (ek ek line mein)</label>
                  <textarea value={form.images} onChange={e => setForm({ ...form, images: e.target.value })} rows={4} placeholder={"https://example.com/img1.jpg\nhttps://example.com/img2.jpg"} className="w-full bg-slate-800 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none font-mono text-xs" />
                  {/* Image preview */}
                  {form.images && (
                    <div className="flex gap-2 mt-2 overflow-x-auto">
                      {form.images.split('\n').filter(u => u.trim()).slice(0, 4).map((url, i) => (
                        <div key={i} className="w-16 h-16 bg-slate-700 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={url.trim()} alt="" className="w-full h-full object-contain p-1" onError={e => (e.currentTarget.style.display = 'none')} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-slate-700 text-white py-2.5 rounded-xl font-medium hover:bg-slate-600 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2.5 rounded-xl font-bold hover:from-emerald-700 hover:to-teal-700 transition-all">
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
              <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Product Delete Karein?</h3>
            <p className="text-slate-400 text-sm mb-6">Yeh action wapas nahi ho sakta.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 bg-slate-700 text-white py-2.5 rounded-xl font-medium hover:bg-slate-600 transition-colors">Nahi</button>
              <button onClick={handleDelete} className="flex-1 bg-red-600 text-white py-2.5 rounded-xl font-bold hover:bg-red-700 transition-colors">Haan, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}