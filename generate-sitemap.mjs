// ============================================
// SITEMAP GENERATOR SCRIPT
// ============================================
// Run: node generate-sitemap.mjs
// Yeh script automatically products.ts se
// saari categories aur products read karke
// sitemap.xml generate karta hai public/ folder mein
// ============================================

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const BASE_URL = 'https://www.dawoodtrader.shop';
const TODAY = new Date().toISOString().split('T')[0];

// ============================================
// STATIC PAGES
// ============================================
const staticPages = [
  { url: '/',         priority: '1.0', changefreq: 'weekly'  },
  { url: '/products', priority: '0.9', changefreq: 'weekly'  },
  { url: '/about',    priority: '0.7', changefreq: 'monthly' },
  { url: '/contact',  priority: '0.7', changefreq: 'monthly' },
];

// ============================================
// PRODUCTS DATA
// Jab bhi naya category ya product add karo,
// bas yahan add kar do — sitemap auto update hoga
// ============================================
const categories = [
  {
    id: 'dc-breakers',
    products: ['32A', '63A', '125A']
  },
  {
    id: 'ac-breakers',
    products: ['32A', '63A']
  },
  {
    id: 'relay-protection',
    products: ['Relay-One', 'Relay-Two', 'Relay-Three', 'Relay-Four', 'Relay-Five']
  },
  // ============================================
  // NAYA CATEGORY ADD KARNA HO TO YAHAN LIKHO:
  // {
  //   id: 'distribution-boxes',
  //   products: ['Box-One', 'Box-Two']
  // },
  // ============================================
];

// ============================================
// XML GENERATE KARO
// ============================================
function generateSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n`;

  // Static pages
  xml += `  <!-- ===== STATIC PAGES ===== -->\n`;
  for (const page of staticPages) {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${page.url}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n\n`;
  }

  // Category pages + product pages
  for (const category of categories) {
    xml += `  <!-- ===== CATEGORY: ${category.id.toUpperCase()} ===== -->\n`;

    // Category page
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}/category/${category.id}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;

    // Product pages
    for (const productId of category.products) {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}/product/${category.id}/${productId}</loc>\n`;
      xml += `    <lastmod>${TODAY}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    }
    xml += `\n`;
  }

  xml += `</urlset>`;

  // public/sitemap.xml mein save karo
  const outputPath = resolve(__dirname, 'public', 'sitemap.xml');
  writeFileSync(outputPath, xml, 'utf-8');
  console.log(`✅ sitemap.xml generated successfully!`);
  console.log(`📍 Location: ${outputPath}`);
  console.log(`🔗 Total URLs: ${staticPages.length + categories.reduce((acc, c) => acc + 1 + c.products.length, 0)}`);
}

generateSitemap();
