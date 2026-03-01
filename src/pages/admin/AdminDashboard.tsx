// ============================================
// src/pages/admin/AdminDashboard.tsx
// Firebase ke saath async data loading
// ============================================

import { useState, useEffect, useMemo } from 'react';
import { salesStore, productsStore, categoriesStore, seedFirestoreFromProducts } from '../../store/adminStore_firebase';
import { Sale, AdminProduct, AdminCategory } from '../../types/admin';

function StatCard({ label, value, sub, color, icon }: {
  label: string; value: string | number; sub?: string; color: string; icon: React.ReactNode;
}) {
  return (
    <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-5 flex items-start gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>{icon}</div>
      <div>
        <p className="text-slate-400 text-sm font-medium">{label}</p>
        <p className="text-white text-2xl font-black mt-0.5">{value}</p>
        {sub && <p className="text-slate-500 text-xs mt-1">{sub}</p>}
      </div>
    </div>
  );
}

function MiniBarChart({ data }: { data: { month: string; revenue: number }[] }) {
  const max = Math.max(...data.map(d => d.revenue), 1);
  return (
    <div className="flex items-end gap-1.5 h-24">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full bg-gradient-to-t from-emerald-600 to-teal-500 rounded-t-md transition-all duration-500"
            style={{ height: `${Math.max((d.revenue / max) * 100, 4)}%` }} />
          <span className="text-slate-500 text-[9px] font-medium">{d.month}</span>
        </div>
      ))}
    </div>
  );
}

function Skeleton() {
  return <div className="animate-pulse bg-slate-700/50 rounded-xl h-10 w-full" />;
}

export function AdminDashboard() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [s, p, c] = await Promise.all([
        salesStore.getAll(),
        productsStore.getAll(),
        categoriesStore.getAll(),
      ]);
      setSales(s);
      setProducts(p);
      setCategories(c);
    } catch (err) {
      console.error('Data load error:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSeed() {
    setSeeding(true);
    setSeedMsg('');
    try {
      const result = await seedFirestoreFromProducts();
      setSeedMsg(`✓ ${result.categories} categories aur ${result.products} products Firestore mein add ho gaye!`);
      await loadData();
    } catch (err) {
      setSeedMsg('❌ Error: ' + String(err));
    } finally {
      setSeeding(false);
    }
  }

  const stats = useMemo(() => {
    const completed = sales.filter(s => s.status === 'completed');
    const totalRevenue = completed.reduce((sum, s) => sum + s.salePrice * s.quantity, 0);
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const now = new Date();
    const monthlyData = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      const monthSales = completed.filter(s => {
        const sd = new Date(s.createdAt);
        return sd.getFullYear() === d.getFullYear() && sd.getMonth() === d.getMonth();
      });
      return {
        month: monthNames[d.getMonth()],
        revenue: monthSales.reduce((sum, s) => sum + s.salePrice * s.quantity, 0),
        sales: monthSales.length,
      };
    });
    const productRevMap: Record<string, { title: string; revenue: number; sales: number }> = {};
    completed.forEach(s => {
      if (!productRevMap[s.productId]) productRevMap[s.productId] = { title: s.productTitle, revenue: 0, sales: 0 };
      productRevMap[s.productId].revenue += s.salePrice * s.quantity;
      productRevMap[s.productId].sales += s.quantity;
    });
    const topProducts = Object.values(productRevMap).sort((a, b) => b.revenue - a.revenue).slice(0, 5);
    return { totalRevenue, completedSales: completed.length, pendingSales: sales.filter(s => s.status === 'pending').length, monthlyData, topProducts };
  }, [sales, products, categories]);

  const statusBadge = (status: Sale['status']) => {
    const map = { completed: 'bg-emerald-500/20 text-emerald-400', pending: 'bg-yellow-500/20 text-yellow-400', cancelled: 'bg-red-500/20 text-red-400' };
    const labels = { completed: 'Mukammal', pending: 'Pending', cancelled: 'Cancel' };
    return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${map[status]}`}>{labels[status]}</span>;
  };

  return (
    <div className="space-y-6">

      {/* Seed Banner - show only if no products in Firestore */}
      {!loading && products.length === 0 && (
        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-2xl p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-amber-300 font-bold">🚀 Firestore Khali Hai!</h3>
              <p className="text-amber-200/70 text-sm mt-1">
                Apna existing products.ts ka data Firestore mein import karo. Yeh sirf ek baar karna hai.
              </p>
              {seedMsg && <p className="text-sm mt-2 text-white">{seedMsg}</p>}
            </div>
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2 flex-shrink-0 disabled:opacity-60"
            >
              {seeding ? (
                <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Importing...</>
              ) : '⬆️ Data Import Karo'}
            </button>
          </div>
        </div>
      )}
      {seedMsg && products.length > 0 && (
        <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-xl px-4 py-3 text-emerald-300 text-sm">{seedMsg}</div>
      )}

      {/* Stats */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="bg-slate-800/50 border border-white/5 rounded-2xl p-5"><Skeleton /></div>)}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Kul Amdani" value={`Rs ${stats.totalRevenue.toLocaleString()}`} sub="Completed sales se" color="bg-emerald-500/20"
            icon={<svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
          <StatCard label="Total Sales" value={sales.length} sub={`${stats.completedSales} mukammal`} color="bg-teal-500/20"
            icon={<svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
          />
          <StatCard label="Products" value={products.length} sub={`${categories.length} categories`} color="bg-blue-500/20"
            icon={<svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
          />
          <StatCard label="Pending Orders" value={stats.pendingSales} sub={`${sales.filter(s => s.status === 'cancelled').length} cancelled`} color="bg-yellow-500/20"
            icon={<svg className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
        </div>
      )}

      {/* Charts */}
      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-5">
            <h3 className="text-white font-bold mb-1">Monthly Revenue</h3>
            <p className="text-slate-400 text-xs mb-4">Pichhle 6 mahine</p>
            <MiniBarChart data={stats.monthlyData} />
            <div className="mt-4 grid grid-cols-3 gap-2">
              {stats.monthlyData.slice(-3).map((d, i) => (
                <div key={i} className="bg-slate-700/50 rounded-xl p-3">
                  <p className="text-slate-400 text-xs">{d.month}</p>
                  <p className="text-white font-bold text-sm">Rs {d.revenue.toLocaleString()}</p>
                  <p className="text-emerald-400 text-xs">{d.sales} sales</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-5">
            <h3 className="text-white font-bold mb-1">Top Products</h3>
            <p className="text-slate-400 text-xs mb-4">Revenue ke hisaab se</p>
            {stats.topProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-slate-500 text-sm">Abhi koi completed sale nahi</div>
            ) : (
              <div className="space-y-3">
                {stats.topProducts.map((p, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{p.title}</p>
                      <p className="text-slate-400 text-xs">{p.sales} units</p>
                    </div>
                    <p className="text-emerald-400 font-bold text-sm flex-shrink-0">Rs {p.revenue.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recent Sales */}
      {!loading && (
        <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-5">
          <h3 className="text-white font-bold mb-4">Recent Sales</h3>
          {sales.length === 0 ? (
            <div className="text-center py-10 text-slate-500">
              <svg className="w-12 h-12 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              <p>Sales section mein jaa kar sale record karein!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-400 border-b border-white/5">
                    <th className="text-left pb-3 font-semibold">Customer</th>
                    <th className="text-left pb-3 font-semibold hidden md:table-cell">Product</th>
                    <th className="text-left pb-3 font-semibold">Amount</th>
                    <th className="text-left pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {sales.slice(0, 5).map(sale => (
                    <tr key={sale.id} className="hover:bg-white/2 transition-colors">
                      <td className="py-3"><p className="text-white font-medium">{sale.customerName || 'Unknown'}</p><p className="text-slate-500 text-xs">{sale.customerPhone}</p></td>
                      <td className="py-3 hidden md:table-cell"><p className="text-slate-300 truncate max-w-[200px]">{sale.productTitle}</p><p className="text-slate-500 text-xs">Qty: {sale.quantity}</p></td>
                      <td className="py-3"><p className="text-emerald-400 font-bold">Rs {(sale.salePrice * sale.quantity).toLocaleString()}</p></td>
                      <td className="py-3">{statusBadge(sale.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
