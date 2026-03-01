/**
 * ============================================
 * CATEGORY PAGE COMPONENT
 * ============================================
 * 
 * SEO IMPLEMENTATION:
 * - Category-specific meta tags
 * - Breadcrumb Schema
 * - Collection page optimization
 * - Product listing structured data
 * 
 * TARGET KEYWORDS:
 * - [Category Name] supplier Pakistan
 * - Buy [Category Name] online
 * - Best [Category Name] price
 * - [Category Name] dealer Rahim Yar Khan
 */

import { ProductCard } from '../components/ProductCard';
import { ProductCategory } from '../data/products';
import SEO from '../components/SEO';

interface CategoryPageProps {
  category: ProductCategory;
  onNavigate: (page: string, data?: any) => void;
  onViewProduct: (category: ProductCategory, productId: string) => void;
}

export function CategoryPage({ category, onNavigate, onViewProduct }: CategoryPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* ============================================ */}
      {/* SEO COMPONENT - Category Page Meta Tags */}
      {/* ============================================ */}
      <SEO
        title={`${category.name} - Best Prices in Pakistan`}
        description={`Buy ${category.name} online at Dawood Trader. ${category.products.length} products available with best prices, free delivery & warranty. Trusted supplier in Pakistan.`}
        keywords={`${category.name}, buy ${category.name} online, ${category.name} price Pakistan, ${category.name} supplier, ${category.name} dealer, Dawood Trader ${category.name}`}
        url={`/category/${category.id}`}
        image={category.image}
        type="website"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Products', url: '/products' },
          { name: category.name, url: `/category/${category.id}` }
        ]}
      />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm mb-4">
            <button onClick={() => onNavigate('home')} className="text-emerald-200 hover:text-white">
              Home
            </button>
            <svg className="w-4 h-4 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <button onClick={() => onNavigate('products')} className="text-emerald-200 hover:text-white">
              Products
            </button>
            <svg className="w-4 h-4 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white">{category.name}</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{category.name}</h1>
          <p className="text-emerald-100">{category.products.length} products available</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {category.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              category={category}
              onViewProduct={onViewProduct}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
