// src/data/products.ts
// ============================================
// SIRF TypeScript Types hain yahan
// Hardcoded data Firebase Firestore mein hai
// Admin Panel se manage hota hai
// ============================================

export interface Product {
  id: string;
  title: string;
  shortTitle: string;
  discountPrice: string;
  originalPrice: string;
  detail: string;
  features: string[];
  images: string[];
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  image: string;
  products: Product[];
}