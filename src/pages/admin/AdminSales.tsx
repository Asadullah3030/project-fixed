// ============================================
// src/pages/admin/AdminSales.tsx
// Firebase async version
// ============================================

import { useState, useEffect, useMemo } from 'react';
import { salesStore, productsStore, categoriesStore } from '../../store/adminStore_firebase';
import { Sale, AdminProduct, AdminCategory } from '../../types/admin';

const STATUS_MAP = {
  pending:   { label: 'Pending',   cls: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  completed: { label: 'Mukammal', cls: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  cancelled: { label: 'Cancel',   cls: 'bg-red-500/20 text-red-400 border-red-500/30' },
};

interface FormData {
  productId: string; quantity: string; salePrice: string;
  customerName: string; customerPhone: string; note: string; status: Sale['status'];
}
const emptyForm: FormData = { productId: '', quantity: '1', salePrice: '', customerName: '', customerPhone: '', note: '', status: 'completed' };

export function AdminSales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | Sale['status']>('all');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [viewSale, setViewSale] = useState<Sale | null>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const [s, p, c] = await Promise.all([salesStore.getAll(), productsStore.getAll(), categoriesStore.getAll()]);
      setSales(s); setProducts(p); setCategories(c);
    } catch { showToast('Data load nahi hua', 'error'); }
    finally { setLoading(false); }
  }

  const selectedProduct = useMemo(() => products.find(p => p.id === form.productId), [products, form.productId]);
  const filtered = useMemo(() => filterStatus === 'all' ? sales : sales.filter(s => s.status === filterStatus), [sales, filterStatus]);

  const totalStats = useMemo(() => {
    const completed = sales.filter(s => s.status === 'completed');
    return { totalRevenue: completed.reduce((sum, s) => sum + s.salePrice * s.quantity, 0), totalSales: sales.length, completedCount: completed.length };
  }, [sales]);

  function showToast(msg: string, type: 'success' | 'error' = 'success') {
    setToast({ msg, type }); setTimeout(() => setToast(null), 3000);
  }

  function openAdd() {
    const firstProduct = products[0];
    setForm({ ...emptyForm, productId: firstProduct?.id || '', salePrice: firstProduct?.discountPrice || '' });
    setEditId(null); setShowForm(true);
  }

  function openEdit(s: Sale) {
    setForm({ productId: s.productId, quantity: String(s.quantity), salePrice: String(s.salePrice), customerName: s.customerName, customerPhone: s.customerPhone, note: s.note, status: s.status });
    setEditId(s.id); setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const p = products.find(pr => pr.id === form.productId);
    const cat = categories.find(c => c.id === p?.categoryId);
    if (!p) return;
    setSaving(true);
    const data = {
      productId: p.id, productTitle: p.shortTitle, categoryId: p.categoryId, categoryName: cat?.name || '',
      quantity: parseInt(form.quantity) || 1, salePrice: parseInt(form.salePrice) || parseInt(p.discountPrice),
      originalPrice: parseInt(p.originalPrice), customerName: form.customerName, customerPhone: form.customerPhone,
      note: form.note, status: form.status,
    };
    try {
      if (editId) { await salesStore.update(editId, data); showToast('Sale update ho gayi!'); }
      else { await salesStore.create(data); showToast('Sale record ho gayi!'); }
      setShowForm(false); await load();
    } catch { showToast('Error aaya', 'error'); }
    finally { setSaving(false); }
  }

  async function handleDelete() {
    if (!deleteId) return;
    setSaving(true);
    try { await salesStore.delete(deleteId); setDeleteId(null); showToast('Sale delete ho gayi!', 'error'); await load(); }
    catch { showToast('Delete nahi hua', 'error'); }
    finally { setSaving(false); }
  }

  async function handleStatusChange(id: string, status: Sale['status']) {
    await salesStore.updateStatus(id, status);
    setSales(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    showToast(`Status "${STATUS_MAP[status].label}" ho gaya!`);
  }

  return (
    <div className="space-y-5">
      {toast && <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-xl font-medium text-white text-sm ${toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'}`}>{toast.type === 'success' ? '✓' : '✗'} {toast.msg}</div>}

      {/* Income Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-emerald-500/20 rounded-2xl p-5">
          <p className="text-emerald-300 text-sm font-medium">Kul Amdani</p>
          <p className="text-white text-3xl font-black mt-1">Rs {loading ? '...' : totalStats.totalRevenue.toLocaleString()}</p>
          <p className="text-emerald-400 text-xs mt-1">Sirf completed sales</p>
        </div>
        <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-5">
          <p className="text-slate-400 text-sm">Total Orders</p>
          <p className="text-white text-3xl font-black mt-1">{loading ? '...' : totalStats.totalSales}</p>
        </div>
        <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-5">
          <p className="text-slate-400 text-sm">Avg Order</p>
          <p className="text-white text-3xl font-black mt-1">
            Rs {loading || !totalStats.completedCount ? '0' : Math.round(totalStats.totalRevenue / totalStats.completedCount).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div><h2 className="text-white text-xl font-black">Sales</h2><p className="text-slate-400 text-sm">{loading ? '...' : `${filtered.length} orders`}</p></div>
        <button onClick={openAdd} className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:from-emerald-700 hover:to-teal-700 transition-all w-fit">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Nai Sale
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {(['all', 'pending', 'completed', 'cancelled'] as const).map(s => (
          <button key={s} onClick={() => setFilterStatus(s)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filterStatus === s ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white border border-white/5'}`}>
            {s === 'all' ? 'Sab' : STATUS_MAP[s].label}
            <span className="ml-1.5 text-xs opacity-70">({s === 'all' ? sales.length : sales.filter(sale => sale.status === s).length})</span>
          </button>
        ))}
      </div>

      <div className="bg-slate-800/50 border border-white/5 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-10 bg-slate-700/50 rounded-xl animate-pulse" />)}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-white/5">
                <th className="text-left px-4 py-3 text-slate-400 font-semibold">Customer</th>
                <th className="text-left px-4 py-3 text-slate-400 font-semibold hidden md:table-cell">Product</th>
                <th className="text-left px-4 py-3 text-slate-400 font-semibold">Amount</th>
                <th className="text-left px-4 py-3 text-slate-400 font-semibold">Status</th>
                <th className="text-left px-4 py-3 text-slate-400 font-semibold hidden lg:table-cell">Date</th>
                <th className="text-right px-4 py-3 text-slate-400 font-semibold">Actions</th>
              </tr></thead>
              <tbody className="divide-y divide-white/5">
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-12 text-slate-500">Koi sale nahi mili</td></tr>
                ) : filtered.map(sale => (
                  <tr key={sale.id} className="hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3"><p className="text-white font-medium">{sale.customerName || 'N/A'}</p><p className="text-slate-500 text-xs">{sale.customerPhone}</p></td>
                    <td className="px-4 py-3 hidden md:table-cell"><p className="text-slate-300 truncate max-w-[180px] text-xs">{sale.productTitle}</p><p className="text-slate-500 text-xs">Qty: {sale.quantity}</p></td>
                    <td className="px-4 py-3"><p className="text-emerald-400 font-bold">Rs {(sale.salePrice * sale.quantity).toLocaleString()}</p></td>
                    <td className="px-4 py-3">
                      <select value={sale.status} onChange={e => handleStatusChange(sale.id, e.target.value as Sale['status'])} className={`text-xs font-semibold border rounded-full px-2.5 py-1 outline-none cursor-pointer bg-transparent ${STATUS_MAP[sale.status].cls}`}>
                        <option value="pending">Pending</option>
                        <option value="completed">Mukammal</option>
                        <option value="cancelled">Cancel</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell"><p className="text-slate-400 text-xs">{new Date(sale.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}</p></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <button onClick={() => setViewSale(sale)} className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-lg transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></button>
                        <button onClick={() => openEdit(sale)} className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-lg transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                        <button onClick={() => setDeleteId(sale.id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Modal */}
      {viewSale && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="p-5 border-b border-white/5 flex items-center justify-between"><h3 className="text-white font-bold">Sale Tafseel</h3><button onClick={() => setViewSale(null)} className="text-slate-400 hover:text-white"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div>
            <div className="p-5 space-y-3 text-sm">
              {[['Customer', viewSale.customerName || 'N/A'], ['Phone', viewSale.customerPhone || 'N/A'], ['Product', viewSale.productTitle], ['Category', viewSale.categoryName], ['Quantity', String(viewSale.quantity)], ['Sale Price', `Rs ${viewSale.salePrice.toLocaleString()}`], ['Total', `Rs ${(viewSale.salePrice * viewSale.quantity).toLocaleString()}`], ['Status', STATUS_MAP[viewSale.status].label], ['Date', new Date(viewSale.createdAt).toLocaleString('en-PK')]].map(([k, v]) => (
                <div key={k} className="flex justify-between"><span className="text-slate-400">{k}</span><span className="text-white font-semibold text-right max-w-[60%]">{v}</span></div>
              ))}
              {viewSale.note && <div className="bg-slate-800 rounded-xl p-3 mt-2"><p className="text-slate-400 text-xs mb-1">Note:</p><p className="text-white text-xs">{viewSale.note}</p></div>}
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl my-4">
            <div className="p-6 border-b border-white/5 flex items-center justify-between"><h3 className="text-white font-bold text-lg">{editId ? 'Sale Edit' : 'Nai Sale Record Karein'}</h3><button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1.5">Product *</label>
                <select value={form.productId} onChange={e => { const p = products.find(pr => pr.id === e.target.value); setForm(f => ({ ...f, productId: e.target.value, salePrice: p?.discountPrice || '' })); }} className="w-full bg-slate-800 border border-white/10 text-white rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 transition-all" required>
                  <option value="">Product chunein...</option>
                  {products.map(p => <option key={p.id} value={p.id}>{p.shortTitle}</option>)}
                </select>
                {selectedProduct && <p className="text-emerald-400 text-xs mt-1">Price: Rs {parseInt(selectedProduct.discountPrice).toLocaleString()}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold text-slate-300 mb-1.5">Quantity *</label><input type="number" min="1" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} className="w-full bg-slate-800 border border-white/10 text-white rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500" required /></div>
                <div><label className="block text-sm font-semibold text-slate-300 mb-1.5">Sale Price (Rs) *</label><input type="number" value={form.salePrice} onChange={e => setForm({ ...form, salePrice: e.target.value })} className="w-full bg-slate-800 border border-white/10 text-white rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500" required /></div>
              </div>
              {form.salePrice && form.quantity && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2.5">
                  <p className="text-emerald-400 font-bold text-sm">Total: Rs {(parseInt(form.salePrice || '0') * parseInt(form.quantity || '1')).toLocaleString()}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold text-slate-300 mb-1.5">Customer Name</label><input type="text" value={form.customerName} onChange={e => setForm({ ...form, customerName: e.target.value })} placeholder="Ali Ahmed" className="w-full bg-slate-800 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500" /></div>
                <div><label className="block text-sm font-semibold text-slate-300 mb-1.5">Phone</label><input type="tel" value={form.customerPhone} onChange={e => setForm({ ...form, customerPhone: e.target.value })} placeholder="0300-1234567" className="w-full bg-slate-800 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500" /></div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1.5">Status</label>
                <div className="flex gap-2">
                  {(['pending', 'completed', 'cancelled'] as const).map(s => (
                    <button type="button" key={s} onClick={() => setForm({ ...form, status: s })} className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${form.status === s ? STATUS_MAP[s].cls : 'bg-slate-800 text-slate-400 border-white/10'}`}>{STATUS_MAP[s].label}</button>
                  ))}
                </div>
              </div>
              <div><label className="block text-sm font-semibold text-slate-300 mb-1.5">Note</label><textarea value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} rows={2} className="w-full bg-slate-800 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 resize-none text-sm" /></div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-slate-700 text-white py-2.5 rounded-xl font-medium">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2.5 rounded-xl font-bold disabled:opacity-60 flex items-center justify-center gap-2">
                  {saving && <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
                  {editId ? 'Update' : 'Record'} Karein
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-sm p-6 text-center">
            <div className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg></div>
            <h3 className="text-white font-bold text-lg mb-2">Sale Delete?</h3>
            <p className="text-slate-400 text-sm mb-6">Yeh wapas nahi ho sakta.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 bg-slate-700 text-white py-2.5 rounded-xl font-medium">Nahi</button>
              <button onClick={handleDelete} disabled={saving} className="flex-1 bg-red-600 text-white py-2.5 rounded-xl font-bold disabled:opacity-60">{saving ? '...' : 'Haan'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
