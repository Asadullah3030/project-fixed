import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminSales } from './pages/admin/AdminSales';

type AdminPage = 'dashboard' | 'products' | 'categories' | 'sales';

function AdminRouter() {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState<AdminPage>('dashboard');

  if (!isAuthenticated) return <AdminLogin />;

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':   return <AdminDashboard />;
      case 'categories':  return <AdminCategories />;
      case 'products':    return <AdminProducts />;
      case 'sales':       return <AdminSales />;
      default:            return <AdminDashboard />;
    }
  };

  return (
    <AdminLayout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </AdminLayout>
  );
}

export function AdminApp() {
  return (
    <AuthProvider>
      <AdminRouter />
    </AuthProvider>
  );
}