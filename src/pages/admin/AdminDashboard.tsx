// src/pages/admin/AdminDashboard.tsx
import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit, where, Timestamp } from 'firebase/firestore';
import { db } from '../../lab/firebase';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AdminNavigateFn } from '../../AdminApp';

interface AdminDashboardProps {
  onNavigate: AdminNavigateFn;
}

interface SaleRecord {
  id: string;
  customerName: string;
  customerPhone: string;
  productName: string;
  quantity: number;
  totalAmount: number;
  status: string;
  createdAt: Timestamp;
}

interface MonthData {
  label: string;
  revenue: number;
  sales: number;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [cancelledOrders, setCancelledOrders] = useState(0);
  const [recentSales, setRecentSales] = useState<SaleRecord[]>([]);
  const [topProducts, setTopProducts] = useState<{ name: string; revenue: number; units: number }[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch sales
      const salesSnap = await getDocs(collection(db, 'sales'));
      const sales: SaleRecord[] = salesSnap.docs.map(d => ({ id: d.id, ...d.data() } as SaleRecord));

      const completed = sales.filter(s => s.status === 'completed' || s.status === 'mukammal');
      const pending = sales.filter(s => s.status === 'pending');
      const cancelled = sales.filter(s => s.status === 'cancelled');

      const revenue = completed.reduce((sum, s) => sum + (s.totalAmount || 0), 0);
      setTotalRevenue(revenue);
      setTotalSales(completed.length);
      setPendingOrders(pending.length);
      setCancelledOrders(cancelled.length);

      // Recent 5 sales
      const sorted = [...sales].sort((a, b) => {
        const aTime = a.createdAt?.toMillis?.() || 0;
        const bTime = b.createdAt?.toMillis?.() || 0;
        return bTime - aTime;
      });
      setRecentSales(sorted.slice(0, 5));

      // Top products by revenue
      const productMap: Record<string, { revenue: number; units: number }> = {};
      completed.forEach(s => {
        const key = s.productName || 'Unknown';
        if (!productMap[key]) productMap[key] = { revenue: 0, units: 0 };
        productMap[key].revenue += s.totalAmount || 0;
        productMap[key].units += s.quantity || 0;
      });
      const top = Object.entries(productMap)
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);
      setTopProducts(top);

      // Monthly data (last 6 months)
      const now = new Date();
      const months: MonthData[] = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const label = d.toLocaleString('default', { month: 'short' });
        const monthSales = completed.filter(s => {
          if (!s.createdAt?.toDate) return false;
          const sd = s.createdAt.toDate();
          return sd.getMonth() === d.getMonth() && sd.getFullYear() === d.getFullYear();
        });
        months.push({
          label,
          revenue: monthSales.reduce((sum, s) => sum + (s.totalAmount || 0), 0),
          sales: monthSales.length,
        });
      }
      setMonthlyData(months);

      // Products & Categories count
      const prodSnap = await getDocs(collection(db, 'products'));
      setTotalProducts(prodSnap.size);
      const catSnap = await getDocs(collection(db, 'categories'));
      setTotalCategories(catSnap.size);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const maxRevenue = Math.max(...monthlyData.map(m => m.revenue), 1);

  const statCards = [
    {
      label: 'Kul Amdani',
      value: `Rs ${totalRevenue.toLocaleString()}`,
      sub: 'Completed sales se',
      icon: '💰',
      color: 'from-emerald-500 to-teal-600',
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
    },
    {
      label: 'Total Sales',
      value: totalSales.toString(),
      sub: `${totalSales} mukammal`,
      icon: '📈',
      color: 'from-blue-500 to-indigo-600',
      bg: 'bg-blue-50',
      text: 'text-blue-700',
    },
    {
      label: 'Products',
      value: totalProducts.toString(),
      sub: `${totalCategories} categories`,
      icon: '📦',
      color: 'from-violet-500 to-purple-600',
      bg: 'bg-violet-50',
      text: 'text-violet-700',
    },
    {
      label: 'Pending Orders',
      value: pendingOrders.toString(),
      sub: `${cancelledOrders} cancelled`,
      icon: '⏳',
      color: 'from-orange-500 to-amber-600',
      bg: 'bg-orange-50',
      text: 'text-orange-700',
    },
  ];

  if (loading) {
    return (
      <AdminLayout onNavigate={onNavigate} currentPage="dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium">Loading dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout onNavigate={onNavigate} currentPage="dashboard">
      <div className="space-y-6">

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {statCards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 ${card.bg} rounded-xl flex items-center justify-center text-xl`}>
                  {card.icon}
                </div>
                <span className={`text-xs font-semibold ${card.text} ${card.bg} px-2.5 py-1 rounded-full`}>
                  Live
                </span>
              </div>
              <p className="text-xs text-gray-400 font-medium mb-1">{card.label}</p>
              <p className="text-2xl font-extrabold text-gray-800 mb-1">{card.value}</p>
              <p className="text-xs text-gray-400">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Monthly Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-bold text-gray-800">Monthly Revenue</h2>
                <p className="text-xs text-gray-400 mt-0.5">Pichle 6 mahine</p>
              </div>
              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-semibold">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                Revenue
              </div>
            </div>

            {/* Bar Chart */}
            <div className="flex items-end gap-3 h-40 mb-3">
              {monthlyData.map((m, i) => {
                const height = maxRevenue > 0 ? (m.revenue / maxRevenue) * 100 : 0;
                const isLast = i === monthlyData.length - 1;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      Rs {m.revenue.toLocaleString()}
                    </div>
                    <div
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        isLast
                          ? 'bg-gradient-to-t from-emerald-600 to-emerald-400'
                          : 'bg-gradient-to-t from-emerald-200 to-emerald-100 group-hover:from-emerald-400 group-hover:to-emerald-300'
                      }`}
                      style={{ height: `${Math.max(height, 4)}%` }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex gap-3">
              {monthlyData.map((m, i) => (
                <div key={i} className="flex-1 text-center">
                  <p className="text-xs font-semibold text-gray-500">{m.label}</p>
                </div>
              ))}
            </div>

            {/* Monthly Summary Boxes */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {monthlyData.slice(-3).map((m, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <p className="text-xs text-gray-400 font-medium">{m.label}</p>
                  <p className="text-sm font-bold text-gray-800 mt-1">Rs {m.revenue.toLocaleString()}</p>
                  <p className="text-xs text-emerald-600 font-medium">{m.sales} sales</p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="mb-5">
              <h2 className="text-base font-bold text-gray-800">Top Products</h2>
              <p className="text-xs text-gray-400 mt-0.5">Revenue ke hisab se</p>
            </div>
            {topProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-center">
                <p className="text-3xl mb-2">📊</p>
                <p className="text-sm text-gray-400">Koi sale nahi abi tak</p>
              </div>
            ) : (
              <div className="space-y-3">
                {topProducts.map((p, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${
                      i === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                      i === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-500' :
                      'bg-gradient-to-br from-amber-600 to-amber-700'
                    }`}>
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 truncate">{p.name}</p>
                      <p className="text-xs text-gray-400">{p.units} units</p>
                    </div>
                    <p className="text-xs font-bold text-emerald-600 whitespace-nowrap">
                      Rs {p.revenue.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Sales Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div>
              <h2 className="text-base font-bold text-gray-800">Recent Sales</h2>
              <p className="text-xs text-gray-400 mt-0.5">Akhri 5 transactions</p>
            </div>
            <button
              onClick={() => onNavigate('sales')}
              className="cursor-pointer text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              Sab dekho →
            </button>
          </div>

          {recentSales.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-4xl mb-3">🛒</p>
              <p className="text-sm font-medium text-gray-500">Abhi koi sale nahi</p>
              <button
                onClick={() => onNavigate('sales')}
                className="cursor-pointer mt-3 text-xs text-emerald-600 font-semibold hover:underline"
              >
                Sale add karo
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Customer</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Product</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentSales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <p className="text-sm font-semibold text-gray-800">{sale.customerName}</p>
                        <p className="text-xs text-gray-400">{sale.customerPhone}</p>
                      </td>
                      <td className="px-5 py-3.5 hidden sm:table-cell">
                        <p className="text-sm text-gray-700 font-medium truncate max-w-[200px]">{sale.productName}</p>
                        <p className="text-xs text-gray-400">Qty: {sale.quantity}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="text-sm font-bold text-emerald-600">Rs {(sale.totalAmount || 0).toLocaleString()}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          sale.status === 'completed' || sale.status === 'mukammal'
                            ? 'bg-emerald-100 text-emerald-700'
                            : sale.status === 'pending'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            sale.status === 'completed' || sale.status === 'mukammal'
                              ? 'bg-emerald-500'
                              : sale.status === 'pending'
                              ? 'bg-amber-500'
                              : 'bg-red-500'
                          }`}></span>
                          {sale.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Sale Add', icon: '➕', page: 'sales', color: 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100' },
            { label: 'Product Add', icon: '📦', page: 'products', color: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100' },
            { label: 'Category Add', icon: '🏷️', page: 'categories', color: 'bg-violet-50 border-violet-200 text-violet-700 hover:bg-violet-100' },
            { label: 'Blog Likho', icon: '✍️', page: 'blogs', color: 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100' },
          ].map((action, i) => (
            <button
              key={i}
              onClick={() => onNavigate(action.page)}
              className={`cursor-pointer flex flex-col items-center gap-2 p-4 rounded-xl border font-semibold text-sm transition-all duration-200 ${action.color}`}
            >
              <span className="text-2xl">{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>

      </div>
    </AdminLayout>
  );
}
