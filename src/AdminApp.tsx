// src/AdminApp.tsx
import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminSales } from './pages/admin/AdminSales';
import { AdminBlogs } from './pages/admin/AdminBlogs';

// Shared prop type — sab admin pages yahi use karein
export type AdminNavigateFn = (page: string) => void;

function AdminRouter() {
  const { isAuthenticated } = useAuth();
  const [adminPage, setAdminPage] = useState<string>('dashboard');

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const handleNavigate: AdminNavigateFn = (page: string) => {
    if (page === 'home') {
      window.location.href = '/';
      return;
    }
    const cleanPage = page.startsWith('admin-') ? page.replace('admin-', '') : page;
    setAdminPage(cleanPage);
  };

  const renderPage = () => {
    switch (adminPage) {
      case 'dashboard':  return <AdminDashboard  onNavigate={handleNavigate} />;
      case 'categories': return <AdminCategories onNavigate={handleNavigate} />;
      case 'products':   return <AdminProducts   onNavigate={handleNavigate} />;
      case 'sales':      return <AdminSales      onNavigate={handleNavigate} />;
      case 'blogs':      return <AdminBlogs      onNavigate={handleNavigate} />;
      default:           return <AdminDashboard  onNavigate={handleNavigate} />;
    }
  };

  return <>{renderPage()}</>;
}

export function AdminApp() {
  return (
    <AuthProvider>
      <AdminRouter />
    </AuthProvider>
  );
}
