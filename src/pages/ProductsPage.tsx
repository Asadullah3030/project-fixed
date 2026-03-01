/**
 * ============================================
 * PRODUCTS PAGE COMPONENT
 * ============================================
 * 
 * SEO IMPLEMENTATION:
 * - Optimized for "all products" searches
 * - Category-based filtering for better UX
 * - Search functionality for product discovery
 * 
 * TARGET KEYWORDS:
 * - Buy electrical products online
 * - Solar equipment Pakistan
 * - DC breaker price
 * - AC breaker buy online
 * - Distribution box supplier
 */

import { useState, useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { allCategories, ProductCategory } from '../data/products';
import SEO from '../components/SEO';

interface ProductsPageProps {
  onNavigate: (page: string, data?: any) => void;
  onViewProduct: (category: ProductCategory, productId: string) => void;
}

export function ProductsPage({ onNavigate, onViewProduct }: ProductsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get all products with their categories
  const allProducts = useMemo(() => {
    const products: { product: any; category: ProductCategory }[] = [];
    allCategories.forEach((category) => {
      category.products.forEach((product) => {
        products.push({ product, category });
      });
    });
    return products;
  }, []);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return allProducts.filter(({ product, category }) => {
      const matchesSearch =
        searchQuery === '' ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || category.id === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [allProducts, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* ============================================ */}
      {/* SEO COMPONENT - Products Page Meta Tags */}
      {/* ============================================ */}
      <SEO
        title="All Products - DC Breakers, AC Breakers, Relay Protection, Distribution Boxes"
        description="Browse all electrical products at Dawood Trader. DC breakers, AC breakers, relay protection devices, distribution boxes & more. Best prices in Pakistan with free delivery!"
        keywords="buy DC breaker online, AC breaker price Pakistan, relay protection device, distribution box, electrical products, solar equipment, Dawood Trader products"
        url="/products"
        type="website"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'All Products', url: '/products' }
        ]}
      />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">All Products</h1>
          <p className="text-emerald-100 text-sm md:text-base">Browse our complete range of electrical products</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Search & Filter Section */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg p-4 md:p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search products... (e.g., DC Breaker, Relay, Distribution Box)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 md:py-4 border-2 border-gray-200 rounded-xl md:rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-sm md:text-base placeholder:text-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
                >
                  <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="relative min-w-[180px]">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 md:py-4 border-2 border-gray-200 rounded-xl md:rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all appearance-none bg-white cursor-pointer text-sm md:text-base font-medium text-gray-700"
              >
                <option value="all">All Categories</option>
                {allCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-gray-500">
              Showing <span className="font-bold text-emerald-600">{filteredProducts.length}</span> products
              {searchQuery && (
                <span> for "<span className="font-semibold text-gray-700">{searchQuery}</span>"</span>
              )}
            </p>
            {(searchQuery || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {filteredProducts.map(({ product, category }, index) => (
              <ProductCard
                key={`${category.id}-${product.id}-${index}`}
                product={product}
                category={category}
                onViewProduct={onViewProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 md:py-20">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 md:w-12 md:h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-700 mb-2">No Products Found</h3>
            <p className="text-gray-500 mb-6 text-sm md:text-base">
              We couldn't find any products matching your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="cursor-pointer inline-flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-600 transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Show All Products
            </button>
          </div>
        )}

        {/* Category Quick Links */}
        <div className="mt-12 md:mt-16">
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-6 text-center">Browse by Category</h3>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {allCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => onNavigate('category', category)}
                className={`cursor-pointer px-4 md:px-5 py-2 md:py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200'
                    : 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 border border-gray-200 hover:border-emerald-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
