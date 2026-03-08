// src/pages/admin/AdminSales.tsx
import { useState, useEffect } from 'react';
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp, orderBy, query
} from 'firebase/firestore';
import { db } from '../../lab/firebase';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AdminNavigateFn } from '../../AdminApp';

interface AdminSalesProps {
  onNavigate: AdminNavigateFn;
}

interface Sale {
  id: string;
  customerName: string;
  customerPhone: string;
  productName: string;
  quantity: number;
  totalAmount: number;
  status: string;
  notes?: string;
  createdAt?: any;
}

const emptyForm = {
  customerName: '',
  customerPhone: '',
  productName: '',
  quantity: '1',
  totalAmount: '',
  status: 'completed',
  notes: '',
};

const STATUS_OPTIONS = [
  { value: 'completed', label: 'Mukammal', color: 'emerald' },
  { value: 'pending', label: 'Pending', color: 'amber' },
  { value: 'cancelled', label: 'Cancel', color: 'red' },
];

const statusStyle = (status: string) => {
  if (status === 'completed' || status === 'mukammal') return 'bg-emerald-100 text-emerald-700';
  if (status === 'pending') return 'bg-amber-100 text-amber-700';
  return 'bg-red-100 text-red-600';
};

const statusDot = (status: string) => {
  if (status === 'completed' || status === 'mukammal') return 'bg-emerald-500';
  if (status === 'pending') return 'bg-amber-500';
  return 'bg-red-500';
};

// ✅ InputField OUTSIDE AdminSales — fixes focus loss bug
interface InputFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}

function InputField({ label, value, onChange, placeholder, type = 'text', required = false }: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-800 font-medium focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all"
      />
    </div>
  );
}

export function AdminSales({ onNavigate }: AdminSalesProps) {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => { fetchSales(); }, []);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchSales = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'sales'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setSales(snap.docs.map(d => ({ id: d.id, ...d.data() } as Sale)));
    } catch {
      try {
        const snap = await getDocs(collection(db, 'sales'));
        setSales(snap.docs.map(d => ({ id: d.id, ...d.data() } as Sale)));
      } catch {
        showToast('Sales load nahi ho sakin', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.customerName.trim() || !form.productName.trim() || !form.totalAmount) {
      showToast('Customer, Product aur Amount zaroori hain', 'error');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        customerName: form.customerName.trim(),
        customerPhone: form.customerPhone.trim(),
        productName: form.productName.trim(),
        quantity: parseInt(form.quantity) || 1,
        totalAmount: parseFloat(form.totalAmount) || 0,
        status: form.status,
        notes: form.notes.trim(),
      };
      if (editingId) {
        await updateDoc(doc(db, 'sales', editingId), payload);
        showToast('Sale update ho gayi');
      } else {
        await addDoc(collection(db, 'sales'), { ...payload, createdAt: serverTimestamp() });
        showToast('Sale add ho gayi');
      }
      resetForm();
      fetchSales();
    } catch {
      showToast('Error aa gaya, dobara try karo', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (s: Sale) => {
    setEditingId(s.id);
    setForm({
      customerName: s.customerName,
      customerPhone: s.customerPhone || '',
      productName: s.productName,
      quantity: String(s.quantity || 1),
      totalAmount: String(s.totalAmount || ''),
      status: s.status,
      notes: s.notes || '',
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'sales', id), { status: newStatus });
      setSales(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
      showToast('Status update ho gaya');
    } catch {
      showToast('Update nahi ho saka', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'sales', id));
      showToast('Sale delete ho gayi');
      setDeleteConfirm(null);
      fetchSales();
    } catch {
      showToast('Delete nahi ho saka', 'error');
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const filtered = sales.filter(s => {
    const matchSearch =
      s.customerName.toLowerCase().includes(search.toLowerCase()) ||
      s.productName.toLowerCase().includes(search.toLowerCase()) ||
      (s.customerPhone || '').includes(search);
    const matchStatus = filterStatus === 'all' || s.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const completed = sales.filter(s => s.status === 'completed' || s.status === 'mukammal');
  const totalRevenue = completed.reduce((sum, s) => sum + (s.totalAmount || 0), 0);
  const pending = sales.filter(s => s.status === 'pending').length;

  return (
    <AdminLayout onNavigate={onNavigate} currentPage="sales">
      <div className="space-y-5">

        {toast && (
          <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-lg text-sm font-semibold text-white ${
            toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
          }`}>
            {toast.msg}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-gray-800">Sales</h2>
            <p className="text-sm text-gray-400 mt-0.5">{sales.length} total sales</p>
          </div>
          {!showForm && (
            <button
              onClick={() => { resetForm(); setShowForm(true); }}
              className="cursor-pointer flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors"
            >
              + Sale Add
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 font-medium">Kul Amdani</p>
            <p className="text-lg font-extrabold text-emerald-600 mt-1">Rs {totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-gray-400">{completed.length} completed</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 font-medium">Pending</p>
            <p className="text-lg font-extrabold text-amber-500 mt-1">{pending}</p>
            <p className="text-xs text-gray-400">orders</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 font-medium">Total</p>
            <p className="text-lg font-extrabold text-gray-800 mt-1">{sales.length}</p>
            <p className="text-xs text-gray-400">sab sales</p>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-800">
                {editingId ? 'Sale Edit Karo' : 'Nai Sale Add Karo'}
              </h3>
              <button onClick={resetForm} className="cursor-pointer text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100">
                X
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Customer Name"
                value={form.customerName}
                onChange={v => setForm(f => ({ ...f, customerName: v }))}
                placeholder="e.g. Ali Ahmed"
                required
              />
              <InputField
                label="Phone Number"
                value={form.customerPhone}
                onChange={v => setForm(f => ({ ...f, customerPhone: v }))}
                placeholder="e.g. 03001234567"
              />
              <InputField
                label="Product Name"
                value={form.productName}
                onChange={v => setForm(f => ({ ...f, productName: v }))}
                placeholder="e.g. DC Breaker 63A"
                required
              />
              <InputField
                label="Quantity"
                value={form.quantity}
                onChange={v => setForm(f => ({ ...f, quantity: v }))}
                placeholder="e.g. 2"
                type="number"
              />
              <InputField
                label="Total Amount (Rs)"
                value={form.totalAmount}
                onChange={v => setForm(f => ({ ...f, totalAmount: v }))}
                placeholder="e.g. 2400"
                type="number"
                required
              />

              {/* Status */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</label>
                <div className="flex gap-2">
                  {STATUS_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setForm(f => ({ ...f, status: opt.value }))}
                      className={`cursor-pointer flex-1 py-3 rounded-xl text-xs font-bold border-2 transition-all ${
                        form.status === opt.value
                          ? opt.color === 'emerald' ? 'bg-emerald-500 text-white border-emerald-500'
                          : opt.color === 'amber' ? 'bg-amber-500 text-white border-amber-500'
                          : 'bg-red-500 text-white border-red-500'
                          : 'bg-gray-50 text-gray-500 border-gray-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Notes (Optional)</label>
                <textarea
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  placeholder="Koi khaas baat..."
                  rows={2}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-700 font-medium focus:outline-none focus:border-emerald-500 transition-all resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
              <button onClick={resetForm} className="cursor-pointer px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="cursor-pointer px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold disabled:opacity-60 transition-colors"
              >
                {saving ? 'Saving...' : editingId ? 'Update Karo' : 'Add Karo'}
              </button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Customer ya product search karo..."
            className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 font-medium focus:outline-none focus:border-emerald-400 shadow-sm"
          />
          <div className="flex gap-2">
            {['all', 'completed', 'pending', 'cancelled'].map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`cursor-pointer px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  filterStatus === s ? 'bg-gray-800 text-white' : 'bg-white text-gray-500 border border-gray-200'
                }`}
              >
                {s === 'all' ? 'Sab' : s === 'completed' ? 'Mukammal' : s === 'pending' ? 'Pending' : 'Cancel'}
              </button>
            ))}
          </div>
        </div>

        {/* Sales List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-4xl mb-3">🛒</p>
              <p className="text-sm font-semibold text-gray-500">
                {search || filterStatus !== 'all' ? 'Koi sale nahi mili' : 'Abhi koi sale nahi'}
              </p>
            </div>
          ) : (
            <>
              <div className="hidden sm:grid grid-cols-12 px-5 py-3 bg-gray-50 border-b border-gray-100">
                <div className="col-span-3 text-xs font-semibold text-gray-400 uppercase">Customer</div>
                <div className="col-span-3 text-xs font-semibold text-gray-400 uppercase">Product</div>
                <div className="col-span-2 text-xs font-semibold text-gray-400 uppercase">Amount</div>
                <div className="col-span-2 text-xs font-semibold text-gray-400 uppercase">Status</div>
                <div className="col-span-2 text-xs font-semibold text-gray-400 uppercase text-right">Actions</div>
              </div>
              <div className="divide-y divide-gray-50">
                {filtered.map(sale => (
                  <div key={sale.id} className="px-5 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex sm:grid sm:grid-cols-12 items-center gap-3 sm:gap-0">
                      <div className="sm:col-span-3 flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-800">{sale.customerName}</p>
                        <p className="text-xs text-gray-400">{sale.customerPhone || '—'}</p>
                      </div>
                      <div className="sm:col-span-3 hidden sm:block">
                        <p className="text-sm text-gray-700 font-medium truncate">{sale.productName}</p>
                        <p className="text-xs text-gray-400">Qty: {sale.quantity}</p>
                      </div>
                      <div className="sm:col-span-2 hidden sm:block">
                        <p className="text-sm font-bold text-emerald-600">Rs {(sale.totalAmount || 0).toLocaleString()}</p>
                      </div>
                      <div className="sm:col-span-2 hidden sm:block">
                        <select
                          value={sale.status}
                          onChange={e => handleQuickStatus(sale.id, e.target.value)}
                          className={`cursor-pointer text-xs font-semibold px-3 py-1.5 rounded-full border-0 outline-none appearance-none ${statusStyle(sale.status)}`}
                        >
                          {STATUS_OPTIONS.map(o => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                          ))}
                        </select>
                      </div>
                      <div className="sm:hidden flex-shrink-0 text-right">
                        <p className="text-sm font-bold text-emerald-600">Rs {(sale.totalAmount || 0).toLocaleString()}</p>
                        <span className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${statusStyle(sale.status)}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusDot(sale.status)}`} />
                          {sale.status}
                        </span>
                      </div>
                      <div className="sm:col-span-2 flex items-center gap-2 justify-end ml-auto sm:ml-0">
                        <button
                          onClick={() => handleEdit(sale)}
                          className="cursor-pointer px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg"
                        >
                          Edit
                        </button>
                        {deleteConfirm === sale.id ? (
                          <div className="flex gap-1">
                            <button onClick={() => handleDelete(sale.id)} className="cursor-pointer px-2.5 py-1.5 text-xs font-bold text-white bg-red-500 rounded-lg">Haan</button>
                            <button onClick={() => setDeleteConfirm(null)} className="cursor-pointer px-2.5 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 rounded-lg">Nahi</button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(sale.id)}
                            className="cursor-pointer px-2.5 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg"
                          >
                            Del
                          </button>
                        )}
                      </div>
                    </div>
                    {sale.notes && (
                      <p className="mt-2 text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded-lg italic">
                        {sale.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {!loading && filtered.length > 0 && (
          <p className="text-xs text-gray-400 text-center">
            {filtered.length} of {sales.length} sales
          </p>
        )}
      </div>
    </AdminLayout>
  );
}
