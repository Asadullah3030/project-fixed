import { Product, ProductCategory } from '../data/products';

interface ProductCardProps {
  product: Product;
  category: ProductCategory;
  onViewProduct: (category: ProductCategory, productId: string) => void;
}

export function ProductCard({ product, category, onViewProduct }: ProductCardProps) {
  const discountPercent = Math.round((1 - parseInt(product.discountPrice) / parseInt(product.originalPrice)) * 100);
  
  return (
    <div className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100/50 hover:border-emerald-200 transform hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={product.images[0]}
          alt={product.shortTitle}
          className="w-full h-full object-contain p-4 md:p-6 group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Discount Badge */}
        <div className="absolute top-2 left-2 md:top-4 md:left-4">
          <span className="bg-gradient-to-r from-rose-500 via-red-500 to-orange-500 text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg shadow-red-200/50">
            {discountPercent}% OFF
          </span>
        </div>
        
        {/* Quick View Overlay - Hidden on mobile */}
        <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-end justify-center pb-6">
          <button
            onClick={() => onViewProduct(category, product.id)}
            className="cursor-pointer bg-white/95 backdrop-blur-sm text-gray-800 px-6 py-2.5 rounded-full text-sm font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-white shadow-xl"
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 md:p-5 space-y-2 md:space-y-4">
        {/* Category Tag */}
        <div className="flex items-center gap-1.5 md:gap-2">
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"></span>
          <p className="text-[10px] md:text-xs text-emerald-600 font-semibold uppercase tracking-wider truncate">{category.name}</p>
        </div>
        
        {/* Title */}
        <h3 className="text-sm md:text-base font-bold text-gray-800 line-clamp-2 leading-snug md:leading-relaxed group-hover:text-emerald-700 transition-colors min-h-[2.5rem] md:min-h-[3rem]">
          {product.shortTitle}
        </h3>

        {/* Price Section */}
        <div className="flex items-end justify-between gap-1">
          <div className="space-y-0">
            <p className="text-[10px] md:text-xs text-gray-400 font-medium hidden md:block">Starting from</p>
            <span className="text-lg md:text-2xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Rs {parseInt(product.discountPrice).toLocaleString()}
            </span>
          </div>
          <span className="text-xs md:text-sm text-gray-400 line-through font-medium">
            Rs {parseInt(product.originalPrice).toLocaleString()}
          </span>
        </div>

        {/* Button */}
        <button
          onClick={() => onViewProduct(category, product.id)}
          className="cursor-pointer w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white py-2.5 md:py-3.5 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold hover:from-emerald-600 hover:via-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-md md:shadow-lg shadow-emerald-300/40 hover:shadow-emerald-400/50 flex items-center justify-center gap-1.5 md:gap-2 group/btn"
        >
          <span>View Details</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 md:h-4 md:w-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
