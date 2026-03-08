// src/pages/BlogPage.tsx
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '../lab/firebase';
import SEO from '../components/SEO';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string;
  published: boolean;
  createdAt?: any;
}

interface BlogPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function BlogPage({ onNavigate }: BlogPageProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Try with index first (where + orderBy)
        const snap = await getDocs(
          query(collection(db, 'blogs'), where('published', '==', true), orderBy('createdAt', 'desc'))
        );
        setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() } as BlogPost)));
      } catch (e: any) {
        // Index nahi bana — fallback: sab blogs lao, client side filter karo
        try {
          const snap = await getDocs(collection(db, 'blogs'));
          const all = snap.docs.map(d => ({ id: d.id, ...d.data() } as BlogPost));
          const published = all
            .filter(p => p.published === true)
            .sort((a, b) => {
              const aTime = a.createdAt?.toDate?.() ?? new Date(0);
              const bTime = b.createdAt?.toDate?.() ?? new Date(0);
              return bTime.getTime() - aTime.getTime();
            });
          setPosts(published);
        } catch {
          console.error('Blogs load nahi ho sake');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category).filter(Boolean)))];
  const filtered = selectedCategory === 'All' ? posts : posts.filter(p => p.category === selectedCategory);

  const formatDate = (ts: any) => {
    if (!ts) return '';
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    return date.toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <SEO
        title="Blog - Electrical & Solar Tips, Guides & News"
        description="Read expert articles about DC breakers, AC breakers, solar energy, relay protection and electrical products. Latest guides and tips by Dawood Trader."
        keywords="electrical blog, solar energy Pakistan, DC breaker guide, AC breaker tips, relay protection, Dawood Trader blog"
        url="/blog"
        type="website"
      />

      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            📝 Our Blog
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-3">
            Electrical & Solar Guides
          </h1>
          <p className="text-emerald-100 text-base md:text-lg max-w-2xl mx-auto">
            Expert tips, buying guides, and latest news about electrical products and solar energy in Pakistan
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Category Filter */}
        {!loading && categories.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200'
                    : 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 border border-gray-200'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-bold text-gray-600 mb-2">Abhi koi article nahi</h3>
            <p className="text-gray-400">Jald hi naye articles aayenge!</p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {selectedCategory === 'All' && filtered.length > 0 && (
              <div className="mb-8">
                <button onClick={() => onNavigate('blog-post', { slug: filtered[0].slug })}
                  className="cursor-pointer w-full group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all text-left">
                  <div className="grid md:grid-cols-2">
                    <div className="h-56 md:h-full bg-gradient-to-br from-emerald-400 to-teal-500 overflow-hidden">
                      {filtered[0].coverImage ? (
                        <img src={filtered[0].coverImage} alt={filtered[0].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-20 h-20 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                          {filtered[0].category}
                        </span>
                        <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
                          ⭐ Featured
                        </span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-extrabold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors">
                        {filtered[0].title}
                      </h2>
                      <p className="text-gray-500 leading-relaxed mb-4">{filtered[0].excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">{formatDate(filtered[0].createdAt)}</span>
                        <span className="text-emerald-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read More
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            )}

            {/* Blog Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(selectedCategory === 'All' ? filtered.slice(1) : filtered).map(post => (
                <button key={post.id} onClick={() => onNavigate('blog-post', { slug: post.slug })}
                  className="cursor-pointer group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all text-left">
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {post.coverImage ? (
                      <img src={post.coverImage} alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
                        <svg className="w-12 h-12 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                    <h3 className="font-bold text-gray-800 mt-2 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-xs">{formatDate(post.createdAt)}</span>
                      <span className="text-emerald-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
