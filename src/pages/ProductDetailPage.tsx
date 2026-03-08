/**
 * ============================================
 * PRODUCT DETAIL PAGE COMPONENT
 * ============================================
 * 
 * SEO IMPLEMENTATION:
 * - Dynamic Product Schema for Google Rich Snippets
 * - Product-specific meta tags
 * - Breadcrumb Schema for navigation
 * - Optimized image alt tags
 * - Price and availability markup
 * 
 * TARGET KEYWORDS:
 * - [Product Name] price Pakistan
 * - Buy [Product Name] online
 * - [Product Name] specifications
 * - [Brand] [Product Type] dealer
 */

import { useState } from 'react';
import { ProductCategory } from '../data/products';
import SEO from '../components/SEO';

interface ProductDetailPageProps {
  category: ProductCategory;
  selectedProductId: string;
  onNavigate: (page: string, data?: any) => void;
}

export function ProductDetailPage({ category, selectedProductId, onNavigate }: ProductDetailPageProps) {
  const [currentProductId, setCurrentProductId] = useState(selectedProductId);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const currentProduct = category.products.find(p => p.id === currentProductId) || category.products[0];

  const handleProductChange = (productId: string) => {
    setCurrentProductId(productId);
    setSelectedImageIndex(0);
  };

  const handleBuyNow = () => {
    const message = `Hi, I want to order:\n\nProduct: ${currentProduct.title}\nPrice: Rs ${currentProduct.discountPrice}`;
    const whatsappUrl = `https://wa.me/923083611140?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onNavigate('thankyou');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-x-hidden">
      {/* ============================================ */}
      {/* SEO COMPONENT - Product Page Meta Tags */}
      {/* Includes Product Schema for Rich Snippets */}
      {/* ============================================ */}
      <SEO
        title={`${currentProduct.shortTitle} - ${category.name}`}
        description={`Buy ${currentProduct.title} at best price in Pakistan. Rs ${currentProduct.discountPrice} only! Original product with warranty. Free home delivery by Dawood Trader.`}
        keywords={`${currentProduct.shortTitle}, ${category.name}, buy ${category.name} online, ${currentProduct.title}, Dawood Trader, best price Pakistan`}
        url={`/product/${category.id}/${currentProduct.id}`}
        image={currentProduct.images[0]}
        type="product"
        product={{
          name: currentProduct.title,
          description: currentProduct.detail,
          image: currentProduct.images[0],
          price: currentProduct.discountPrice,
          currency: 'PKR',
          availability: 'InStock',
          brand: 'Dawood Trader',
          sku: `DT-${category.id.toUpperCase()}-${currentProduct.id.toUpperCase()}`
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Products', url: '/products' },
          { name: category.name, url: `/category/${category.id}` },
          { name: currentProduct.shortTitle, url: `/product/${category.id}/${currentProduct.id}` }
        ]}
      />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <button onClick={() => onNavigate('home')} className="cursor-pointer text-gray-500 hover:text-emerald-600 font-medium transition-colors">
              Home
            </button>
            <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <button onClick={() => onNavigate('products')} className="cursor-pointer text-gray-500 hover:text-emerald-600 font-medium transition-colors">
              Products
            </button>
            <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-emerald-600 font-semibold">{category.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Image Gallery */}
          <div className="space-y-5">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 relative group">
              <img
                src={currentProduct.images[selectedImageIndex]}
                alt={currentProduct.title}
                className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
              />
              {/* Discount Badge */}
              <div className="absolute top-5 left-5">
                <span className="bg-gradient-to-r from-rose-500 via-red-500 to-orange-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                  {Math.round((1 - parseInt(currentProduct.discountPrice) / parseInt(currentProduct.originalPrice)) * 100)}% OFF
                </span>
              </div>
            </div>

            {/* Thumbnails - Horizontal Scroll */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {currentProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`cursor-pointer flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                    selectedImageIndex === index
                      ? 'border-emerald-500 shadow-lg shadow-emerald-200/50 scale-105'
                      : 'border-gray-200 hover:border-emerald-300 hover:shadow-md'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${currentProduct.title} - ${index + 1}`}
                    className="w-full h-full object-contain bg-white p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-7">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold border border-emerald-200">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              {category.name}
            </div>

            {/* Title */}
            <div>
              <p className="text-sm text-gray-500 mb-2 font-medium">{currentProduct.shortTitle}</p>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 leading-tight">
                {currentProduct.title}
              </h1>
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-baseline gap-4 bg-gradient-to-r from-emerald-50 to-teal-50 p-5 rounded-2xl border border-emerald-100">
              <span className="text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Rs {parseInt(currentProduct.discountPrice).toLocaleString()}
              </span>
              <span className="text-xl text-gray-400 line-through font-medium">
                Rs {parseInt(currentProduct.originalPrice).toLocaleString()}
              </span>
              <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow">
                Save Rs {(parseInt(currentProduct.originalPrice) - parseInt(currentProduct.discountPrice)).toLocaleString()}
              </span>
            </div>

            {/* Product Selector */}
            {category.products.length > 1 && (
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <span className="text-red-500">*</span> Select Product Model
                </label>
                <select
                  value={currentProductId}
                  onChange={(e) => handleProductChange(e.target.value)}
                  className="cursor-pointer w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-800 font-medium focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all"
                >
                  {category.products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.shortTitle}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Buy Button */}
            <button
              onClick={handleBuyNow}
              className="cursor-pointer w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white py-5 rounded-2xl font-bold text-lg hover:from-emerald-600 hover:via-emerald-700 hover:to-teal-700 transition-all shadow-xl shadow-emerald-300/40 hover:shadow-emerald-400/50 flex items-center justify-center gap-3 hover:scale-[1.02]"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Buy Now – Free Delivery
            </button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
              <div className="text-center p-4 bg-gray-50 rounded-2xl hover:bg-emerald-50 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-200/50">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-gray-700">100% Original</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-2xl hover:bg-emerald-50 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-200/50">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-gray-700">Fast Delivery</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-2xl hover:bg-emerald-50 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-200/50">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-gray-700">Warranty</p>
              </div>
            </div>

            {/* Product Details */}
            <div className="pt-6 border-t border-gray-100 space-y-5">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                📋 Product Details
              </h2>
              <p className="text-gray-600 leading-relaxed">{currentProduct.detail}</p>
              
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                ✨ Key Features
              </h3>
              <ul className="space-y-3">
                {currentProduct.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-600 bg-gray-50 p-3 rounded-xl hover:bg-emerald-50 transition-colors">
                    <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
