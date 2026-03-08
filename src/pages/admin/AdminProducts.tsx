// src/pages/admin/AdminProducts.tsx
import { useState, useEffect } from 'react';
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp
} from 'firebase/firestore';
import { db } from '../../lab/firebase';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AdminNavigateFn } from '../../AdminApp';

interface AdminProductsProps {
  onNavigate: AdminNavigateFn;
}

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  title: string;
  shortTitle: string;
  categoryId: string;
  categoryName?: string;
  discountPrice: string;
  originalPrice: string;
  detail: string;
  features: string[];
  images: string[];
  inStock: boolean;
  createdAt?: any;
}

const emptyForm = {
  title: '',
  shortTitle: '',
  categoryId: '',
  discountPrice: '',
  originalPrice: '',
  detail: '',
  featuresText: '',
  imagesText: '',
  inStock: true,
};

// ── InputField MODULE LEVEL pe hai — andar nahi ──────────────
// Yahi fix hai: agar andar hota toh har keystroke pe remount
// hota aur focus chali jaati thi
interface InputFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}

function InputField({ label, value, onChange, placeholder, required = false }: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-800 font-medium focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all"
      />
    </div>
  );
}

export function AdminProducts({ onNavigate }: AdminProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');

  useEffect(() => { fetchData(); }, []);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodSnap, catSnap] = await Promise.all([
        getDocs(collection(db, 'products')),
        getDocs(collection(db, 'categories')),
      ]);
      const cats: Category[] = catSnap.docs.map(d => ({ id: d.id, name: d.data().name }));
      setCategories(cats);

      const catMap: Record<string, string> = {};
      cats.forEach(c => (catMap[c.id] = c.name));

      const prods: Product[] = prodSnap.docs.map(d => ({
        id: d.id,
        ...d.data(),
        categoryName: catMap[d.data().categoryId] || 'Unknown',
      } as Product));
      setProducts(prods);
    } catch {
      showToast('Data load nahi ho saka', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.categoryId || !form.discountPrice || !form.originalPrice) {
      showToast('Title, Category, aur Prices zaroori hain', 'error');
      return;
    }
    setSaving(true);
    try {
      const features = form.featuresText.split('\n').map(f => f.trim()).filter(Boolean);
      const images = form.imagesText.split('\n').map(i => i.trim()).filter(Boolean);

      const payload = {
        title: form.title.trim(),
        shortTitle: form.shortTitle.trim() || form.title.trim(),
        categoryId: form.categoryId,
        discountPrice: form.discountPrice.trim(),
        originalPrice: form.originalPrice.trim(),
        detail: form.detail.trim(),
        features,
        images,
        inStock: form.inStock,
      };

      if (editingId) {
        await updateDoc(doc(db, 'products', editingId), payload);
        showToast('Product update ho gaya ✓');
      } else {
        await addDoc(collection(db, 'products'), { ...payload, createdAt: serverTimestamp() });
        showToast('Product add ho gaya ✓');
      }
      resetForm();
      fetchData();
    } catch {
      showToast('Error aa gaya, dobara try karo', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      shortTitle: p.shortTitle,
      categoryId: p.categoryId,
      discountPrice: p.discountPrice,
      originalPrice: p.originalPrice,
      detail: p.detail || '',
      featuresText: (p.features || []).join('\n'),
      imagesText: (p.images || []).join('\n'),
      inStock: p.inStock !== false,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      showToast('Product delete ho gaya');
      setDeleteConfirm(null);
      fetchData();
    } catch {
      showToast('Delete nahi ho saka', 'error');
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const filtered = products.filter(p => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.shortTitle || '').toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'all' || p.categoryId === filterCat;
    return matchSearch && matchCat;
  });

  const discountPercent = form.discountPrice && form.originalPrice
    ? Math.round((1 - parseFloat(form.discountPrice) / parseFloat(form.originalPrice)) * 100)
    : 0;

  return (
    <AdminLayout onNavigate={onNavigate} currentPage="products">
      <div className="space-y-5">

        {/* Toast */}
        {toast && (
          <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-lg text-sm font-semibold ${
            toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {toast.type === 'success' ? '✓' : '✕'} {toast.msg}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-gray-800">Products</h2>
            <p className="text-sm text-gray-400 mt-0.5">{products.length} products total</p>
          </div>
          {!showForm && (
            <button
              onClick={() => { resetForm(); setShowForm(true); }}
              className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-emerald-200 hover:shadow-emerald-300 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Product Add
            </button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-800">
                {editingId ? '✏️ Product Edit Karo' : '➕ Naya Product Add Karo'}
              </h3>
              <button onClick={resetForm} className="cursor-pointer text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Row 1 — Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Product Title"
                  value={form.title}
                  onChange={(v) => setForm(f => ({ ...f, title: v }))}
                  placeholder="Full product title"
                  required
                />
                <InputField
                  label="Short Title"
                  value={form.shortTitle}
                  onChange={(v) => setForm(f => ({ ...f, shortTitle: v }))}
                  placeholder="Card pe dikhne wala naam"
                />
              </div>

              {/* Row 2 — Category + Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.categoryId}
                    onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))}
                    className="cursor-pointer w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-800 font-medium focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all appearance-none"
                  >
                    <option value="">-- Category choose karo --</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock Status</label>
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => setForm(f => ({ ...f, inStock: true }))}
                      className={`cursor-pointer flex-1 py-3 rounded-xl text-sm font-bold transition-all border-2 ${
                        form.inStock
                          ? 'bg-emerald-500 text-white border-emerald-500'
                          : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-emerald-300'
                      }`}
                    >
                      ✓ In Stock
                    </button>
                    <button
                      onClick={() => setForm(f => ({ ...f, inStock: false }))}
                      className={`cursor-pointer flex-1 py-3 rounded-xl text-sm font-bold transition-all border-2 ${
                        !form.inStock
                          ? 'bg-red-500 text-white border-red-500'
                          : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-red-300'
                      }`}
                    >
                      ✕ Out of Stock
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 3 — Prices */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputField
                  label="Sale Price (Rs)"
                  value={form.discountPrice}
                  onChange={(v) => setForm(f => ({ ...f, discountPrice: v }))}
                  placeholder="e.g. 1200"
                  required
                />
                <InputField
                  label="Original Price (Rs)"
                  value={form.originalPrice}
                  onChange={(v) => setForm(f => ({ ...f, originalPrice: v }))}
                  placeholder="e.g. 1500"
                  required
                />
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Discount</label>
                  <div className={`px-4 py-3 rounded-xl text-sm font-bold text-center border-2 ${
                    discountPercent > 0
                      ? 'bg-red-50 text-red-600 border-red-200'
                      : 'bg-gray-50 text-gray-400 border-gray-200'
                  }`}>
                    {discountPercent > 0 ? `${discountPercent}% OFF 🔥` : 'Auto calculate'}
                  </div>
                </div>
              </div>

              {/* Detail */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Product Detail</label>
                <textarea
                  value={form.detail}
                  onChange={e => setForm(f => ({ ...f, detail: e.target.value }))}
                  placeholder="Product ki mukhtasar description..."
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-700 font-medium focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all resize-none"
                />
              </div>

              {/* Features */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Features <span className="text-gray-400 font-normal normal-case">(har feature alag line mein)</span>
                </label>
                <textarea
                  value={form.featuresText}
                  onChange={e => setForm(f => ({ ...f, featuresText: e.target.value }))}
                  placeholder={"Brand: XYZ\nVoltage: 220V\nWarranty: 1 year"}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-700 font-medium focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all resize-none font-mono"
                />
                <p className="text-xs text-gray-400">{form.featuresText.split('\n').filter(Boolean).length} features</p>
              </div>

              {/* Images */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Image URLs <span className="text-gray-400 font-normal normal-case">(har URL alag line mein)</span>
                </label>
                <textarea
                  value={form.imagesText}
                  onChange={e => setForm(f => ({ ...f, imagesText: e.target.value }))}
                  placeholder={"https://ik.imagekit.io/dawoodtraders/.../1.jpg\nhttps://ik.imagekit.io/dawoodtraders/.../2.jpg"}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-600 font-medium focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all resize-none font-mono text-xs"
                />
                {form.imagesText && (
                  <div className="flex gap-2 flex-wrap mt-2">
                    {form.imagesText.split('\n').filter(Boolean).slice(0, 5).map((url, i) => (
                      <div key={i} className="w-14 h-14 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                        <img src={url} alt={`img-${i}`} className="w-full h-full object-cover"
                          onError={e => (e.currentTarget.style.display = 'none')} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
              <button onClick={resetForm}
                className="cursor-pointer px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
                Cancel
              </button>
              <button onClick={handleSubmit} disabled={saving}
                className="cursor-pointer flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-200 transition-all disabled:opacity-60">
                {saving ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving...</>
                ) : (
                  <>{editingId ? '✓ Update Karo' : '+ Add Karo'}</>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Product search karo..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 font-medium focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all shadow-sm" />
          </div>
          <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
            className="cursor-pointer px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 font-medium focus:outline-none focus:border-emerald-400 shadow-sm appearance-none min-w-[160px]">
            <option value="all">Sab Categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        {/* Products List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-4xl mb-3">📦</p>
              <p className="text-sm font-semibold text-gray-500">
                {search || filterCat !== 'all' ? 'Koi product nahi mila' : 'Abhi koi product nahi'}
              </p>
              {!search && filterCat === 'all' && (
                <button onClick={() => { resetForm(); setShowForm(true); }}
                  className="cursor-pointer mt-3 text-sm text-emerald-600 font-semibold hover:underline">
                  Pehla product add karo
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="hidden sm:grid grid-cols-12 px-5 py-3 bg-gray-50 border-b border-gray-100">
                <div className="col-span-1" />
                <div className="col-span-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Product</div>
                <div className="col-span-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Category</div>
                <div className="col-span-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Price</div>
                <div className="col-span-2 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</div>
              </div>

              <div className="divide-y divide-gray-50">
                {filtered.map((p) => {
                  const disc = p.originalPrice && p.discountPrice
                    ? Math.round((1 - parseInt(p.discountPrice) / parseInt(p.originalPrice)) * 100) : 0;
                  return (
                    <div key={p.id} className="flex sm:grid sm:grid-cols-12 items-center gap-3 sm:gap-0 px-5 py-4 hover:bg-gray-50 transition-colors">
                      <div className="sm:col-span-1">
                        <div className="w-11 h-11 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                          {p.images?.[0] ? (
                            <img src={p.images[0]} alt={p.shortTitle} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-base">📦</div>
                          )}
                        </div>
                      </div>
                      <div className="sm:col-span-4 flex-1 min-w-0 sm:px-3">
                        <p className="text-sm font-bold text-gray-800 truncate">{p.shortTitle || p.title}</p>
                        <p className="text-xs text-gray-400 truncate hidden sm:block">{p.title}</p>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block ${
                          p.inStock !== false ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'
                        }`}>
                          {p.inStock !== false ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                      <div className="sm:col-span-3 hidden sm:block sm:px-3">
                        <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-2.5 py-1 rounded-full">{p.categoryName}</span>
                      </div>
                      <div className="sm:col-span-2 hidden sm:block">
                        <p className="text-sm font-bold text-emerald-600">Rs {parseInt(p.discountPrice || '0').toLocaleString()}</p>
                        {disc > 0 && (
                          <p className="text-xs text-gray-400">
                            <span className="line-through">Rs {parseInt(p.originalPrice || '0').toLocaleString()}</span>
                            {' '}<span className="text-red-500 font-semibold">{disc}% off</span>
                          </p>
                        )}
                      </div>
                      <div className="sm:col-span-2 flex items-center gap-2 justify-end flex-shrink-0">
                        <button onClick={() => handleEdit(p)}
                          className="cursor-pointer flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        {deleteConfirm === p.id ? (
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleDelete(p.id)} className="cursor-pointer px-2.5 py-1.5 text-xs font-bold text-white bg-red-500 hover:bg-red-600 rounded-lg">Haan</button>
                            <button onClick={() => setDeleteConfirm(null)} className="cursor-pointer px-2.5 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 rounded-lg">Nahi</button>
                          </div>
                        ) : (
                          <button onClick={() => setDeleteConfirm(p.id)}
                            className="cursor-pointer px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {!loading && filtered.length > 0 && (
          <p className="text-xs text-gray-400 text-center">
            {filtered.length} of {products.length} products show ho rahe hain
          </p>
        )}
      </div>
    </AdminLayout>
  );
}
