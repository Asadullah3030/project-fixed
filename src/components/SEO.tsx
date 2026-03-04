/**
 * ============================================
 * SEO COMPONENT - Dynamic Meta Tags Manager
 * ============================================
 * 
 * This component handles all SEO meta tags dynamically
 * for each page using document.head manipulation.
 * 
 * Features:
 * - Dynamic title updates
 * - Meta description
 * - Open Graph tags
 * - Twitter Card tags
 * - Canonical URL
 * - Product Schema (for product pages)
 * - Breadcrumb Schema
 * 
 * Usage:
 * <SEO 
 *   title="Page Title"
 *   description="Page description"
 *   keywords="keyword1, keyword2"
 *   image="https://example.com/image.jpg"
 *   url="/page-url"
 * />
 */

import { useEffect } from 'react';

// ============================================
// SEO PROPS INTERFACE
// ============================================
interface SEOProps {
  /** Page title - will be appended with " | Dawood Trader" */
  title: string;
  
  /** Meta description - 150-160 characters recommended */
  description: string;
  
  /** Meta keywords - comma separated */
  keywords?: string;
  
  /** OG/Twitter image URL */
  image?: string;
  
  /** Canonical URL path (without domain) */
  url?: string;
  
  /** Page type for OG */
  type?: 'website' | 'product' | 'article';
  
  /** Product data for Product Schema */
  product?: {
    name: string;
    description: string;
    image: string;
    price: string;
    currency?: string;
    availability?: 'InStock' | 'OutOfStock';
    brand?: string;
    sku?: string;
  };
  
  /** Breadcrumb items for Breadcrumb Schema */
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
}

// ============================================
// BASE URL CONSTANT
// ============================================
const BASE_URL = 'https://dawoodtrader.shop';
const DEFAULT_IMAGE = 'https://ik.imagekit.io/dawoodtraders/About-us-imag.png?updatedAt=1759056897852';

// ============================================
// SEO COMPONENT
// ============================================
export default function SEO({
  title,
  description,
  keywords = 'Dawood Trader, solar products, electrical equipment, Pakistan',
  image = DEFAULT_IMAGE,
  url = '/',
  type = 'website',
  product,
  breadcrumbs
}: SEOProps) {
  
  useEffect(() => {
    // ============================================
    // UPDATE DOCUMENT TITLE
    // Format: "Page Title | Dawood Trader"
    // ============================================
    const fullTitle = `${title} | Dawood Trader`;
    document.title = fullTitle;
    
    // ============================================
    // HELPER FUNCTION - Update or Create Meta Tag
    // ============================================
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };
    
    // ============================================
    // HELPER FUNCTION - Update or Create Link Tag
    // ============================================
    const updateLink = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      
      if (link) {
        link.setAttribute('href', href);
      } else {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        link.setAttribute('href', href);
        document.head.appendChild(link);
      }
    };
    
    // ============================================
    // HELPER FUNCTION - Add JSON-LD Schema
    // ============================================
    const addSchema = (id: string, schema: object) => {
      // Remove existing schema with same id
      const existing = document.querySelector(`script[data-schema-id="${id}"]`);
      if (existing) {
        existing.remove();
      }
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema-id', id);
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    };
    
    // ============================================
    // UPDATE BASIC META TAGS
    // ============================================
    updateMeta('description', description);
    updateMeta('keywords', keywords);
    
    // ============================================
    // UPDATE CANONICAL URL
    // Prevents duplicate content issues
    // ============================================
    const canonicalUrl = `${BASE_URL}${url}`;
    updateLink('canonical', canonicalUrl);
    
    // ============================================
    // UPDATE OPEN GRAPH META TAGS
    // Used by Facebook, LinkedIn, etc.
    // ============================================
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', description, true);
    updateMeta('og:url', canonicalUrl, true);
    updateMeta('og:image', image, true);
    updateMeta('og:type', type === 'product' ? 'product' : 'website', true);
    
    // ============================================
    // UPDATE TWITTER CARD META TAGS
    // Used by Twitter/X
    // ============================================
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);
    
    // ============================================
    // ADD PRODUCT SCHEMA (if product data provided)
    // Helps Google show rich product snippets
    // ============================================
    if (product) {
      const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": product.image,
        "brand": {
          "@type": "Brand",
          "name": product.brand || "Dawood Trader"
        },
        "sku": product.sku || product.name.replace(/\s+/g, '-').toLowerCase(),
        "offers": {
          "@type": "Offer",
          "url": canonicalUrl,
          "priceCurrency": product.currency || "PKR",
          "price": product.price.replace(/[^0-9]/g, ''),
          "availability": `https://schema.org/${product.availability || 'InStock'}`,
          "seller": {
            "@type": "Organization",
            "name": "Dawood Trader"
          }
        }
      };
      addSchema('product-schema', productSchema);
    }
    
    // ============================================
    // ADD BREADCRUMB SCHEMA (if breadcrumbs provided)
    // Helps Google show breadcrumb navigation
    // ============================================
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": `${BASE_URL}${item.url}`
        }))
      };
      addSchema('breadcrumb-schema', breadcrumbSchema);
    }
    
    // ============================================
    // CLEANUP - Remove schemas when component unmounts
    // ============================================
    return () => {
      // Schemas will be replaced on next page load
    };
    
  }, [title, description, keywords, image, url, type, product, breadcrumbs]);
  
  // ============================================
  // COMPONENT RETURNS NULL - Only updates head
  // ============================================
  return null;
}
