// ============================================
// ADMIN TYPES
// ============================================

export interface AdminProduct {
  id: string;
  title: string;
  shortTitle: string;
  discountPrice: string;
  originalPrice: string;
  detail: string;
  features: string[];
  images: string[];
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sale {
  id: string;
  productId: string;
  productTitle: string;
  categoryId: string;
  categoryName: string;
  quantity: number;
  salePrice: number;
  originalPrice: number;
  customerName: string;
  customerPhone: string;
  note: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalSales: number;
  totalProducts: number;
  totalCategories: number;
  pendingSales: number;
  completedSales: number;
  cancelledSales: number;
  monthlyRevenue: { month: string; revenue: number; sales: number }[];
  topProducts: { title: string; sales: number; revenue: number }[];
}