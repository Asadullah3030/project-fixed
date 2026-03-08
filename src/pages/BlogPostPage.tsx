// src/pages/BlogPostPage.tsx
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, limit, orderBy } from 'firebase/firestore';
import { db } from '../lab/firebase';
import SEO from '../components/SEO';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string;
  published: boolean;
  createdAt?: any;
}

interface BlogPostPageProps {
  slug: string;
  onNavigate: (page: string, data?: any) => void;
}

export function BlogPostPage({ slug, onNavigate }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        // Fetch by slug
        const snap = await getDocs(
          query(collection(db, 'blogs'), where('slug', '==', slug), where('published', '==', true), limit(1))
        );
        if (!snap.empty) {
          const postData = { id: snap.docs[0].id, ...snap.docs[0].data() } as BlogPost;
          setPost(postData);

          // Related posts — fallback if index missing
          try {
            const relSnap = await getDocs(
              query(collection(db, 'blogs'), where('published', '==', true), where('category', '==', postData.category), orderBy('createdAt', 'desc'), limit(4))
            );
            setRelated(relSnap.docs.map(d => ({ id: d.id, ...d.data() } as BlogPost)).filter(p => p.id !== postData.id).slice(0, 3));
          } catch {
            // Index nahi bana — related posts skip
            setRelated([]);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const formatDate = (ts: any) => {
    if (!ts) return '';
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    return date.toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-500">Loading article...</p>
      </div>
    </div>
  );

  if (!post) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-2xl font-bold text-gray-700 mb-2">Article not found</p>
        <button onClick={() => onNavigate('blog')} className="cursor-pointer text-emerald-600 font-semibold hover:underline">
          ← Back to Blog
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <SEO
        title={post.title}
        description={post.excerpt}
        keywords={post.tags || `${post.category}, Dawood Trader, electrical products Pakistan`}
        url={`/blog/${post.slug}`}
        image={post.coverImage}
        type="article"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` }
        ]}
      />

      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm mb-5 flex-wrap">
            <button onClick={() => onNavigate('home')} className="text-emerald-200 hover:text-white transition-colors">Home</button>
            <svg className="w-4 h-4 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <button onClick={() => onNavigate('blog')} className="text-emerald-200 hover:text-white transition-colors">Blog</button>
            <svg className="w-4 h-4 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="text-white line-clamp-1">{post.title}</span>
          </nav>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">{post.category}</span>
            <span className="text-emerald-200 text-sm">{formatDate(post.createdAt)}</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-emerald-100 text-base md:text-lg leading-relaxed">{post.excerpt}</p>
        </div>
      </div>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <img src={post.coverImage} alt={post.title}
            className="w-[60%] rounded-2xl shadow-xl mt-10" />
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-8">

          {/* Article */}
          <article className="w-full">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div
                className="blog-content"
                style={{
                  color: '#374151', lineHeight: '1.8', fontSize: '15px',
                }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Tags */}
            {post.tags && (
              <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-5">
                <p className="text-sm font-semibold text-gray-700 mb-3">Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(post.tags) ? post.tags : post.tags.split(',')).map(tag => tag.trim()).filter(Boolean).map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-5">
              <p className="text-sm font-semibold text-gray-700 mb-3">Share this article:</p>
              <div className="flex gap-3">
                <a href={`https://wa.me/?text=${encodeURIComponent(post.title + ' - dawoodtrader.shop/blog/' + post.slug)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
                <button onClick={() => navigator.clipboard.writeText(`dawoodtrader.shop/blog/${post.slug}`)}
                  className="cursor-pointer flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Link
                </button>
              </div>
            </div>

            {/* Back Button */}
            <button onClick={() => onNavigate('blog')}
              className="cursor-pointer mt-6 flex items-center gap-2 text-emerald-600 font-semibold hover:gap-3 transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Articles
            </button>
          </article>

          {/* Sidebar */}
          <aside className="grid sm:grid-cols-2 gap-5">
            {/* CTA */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white">
              <h3 className="font-bold text-lg mb-2">Need a Product?</h3>
              <p className="text-emerald-100 text-sm mb-4">Order directly on WhatsApp — fast delivery across Pakistan!</p>
              <a href="https://wa.me/923061339140" target="_blank" rel="noopener noreferrer"
                className="w-full bg-white text-emerald-600 font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors">
                Order on WhatsApp
              </a>
            </div>

            {/* Related Posts */}
            {related.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="font-bold text-gray-800 mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {related.map(r => (
                    <button key={r.id} onClick={() => onNavigate('blog-post', { slug: r.slug })}
                      className="cursor-pointer w-full text-left flex gap-3 group">
                      <div className="w-16 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-emerald-50">
                        {r.coverImage ? (
                          <img src={r.coverImage} alt={r.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-emerald-600 font-medium mb-1">{r.category}</p>
                        <p className="text-sm font-semibold text-gray-700 line-clamp-2 group-hover:text-emerald-600 transition-colors">{r.title}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Browse Products */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-800 mb-3">Browse Products</h3>
              <button onClick={() => onNavigate('products')}
                className="cursor-pointer w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-600 font-semibold py-3 rounded-xl text-sm transition-colors">
                View All Products →
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
