// src/pages/admin/AdminBlogs.tsx
import { useState, useEffect, useRef } from 'react';
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp, orderBy, query
} from 'firebase/firestore';
import { db } from '../../lab/firebase';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AdminNavigateFn } from '../../AdminApp';

interface AdminBlogsProps {
  onNavigate: AdminNavigateFn;
}

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  published: boolean;
  createdAt?: any;
  updatedAt?: any;
}

const BLOG_CATEGORIES = [
  'Electrical', 'Solar Energy', 'DC Breakers', 'AC Breakers',
  'Relay Protection', 'Distribution Box', 'Tips & Guides', 'News',
];

const emptyForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  coverImage: '',
  category: 'Tips & Guides',
  tagsText: '',
  published: false,
};

// ── Toolbar button helper ──────────────────────────────────
interface ToolbarBtnProps {
  label: string;
  title: string;
  onClick: () => void;
  active?: boolean;
}

function ToolbarBtn({ label, title, onClick, active }: ToolbarBtnProps) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`cursor-pointer px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
        active
          ? 'bg-emerald-500 text-white border-emerald-500'
          : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-400 hover:text-emerald-600'
      }`}
    >
      {label}
    </button>
  );
}

export function AdminBlogs({ onNavigate }: AdminBlogsProps) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [view, setView] = useState<'list' | 'form' | 'preview'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [filterPublished, setFilterPublished] = useState('all');
  const [previewBlog, setPreviewBlog] = useState<Blog | null>(null);
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { fetchBlogs(); }, []);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setBlogs(snap.docs.map(d => ({ id: d.id, ...d.data() } as Blog)));
    } catch {
      try {
        const snap = await getDocs(collection(db, 'blogs'));
        setBlogs(snap.docs.map(d => ({ id: d.id, ...d.data() } as Blog)));
      } catch {
        showToast('Blogs load nahi ho sake', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) =>
    title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-');

  const handleTitleChange = (value: string) => {
    setForm(f => ({ ...f, title: value, slug: editingId ? f.slug : generateSlug(value) }));
  };

  // ── Insert text/tag at cursor ──────────────────────────────
  const insertAtCursor = (before: string, after = '') => {
    const textarea = contentRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = form.content.substring(start, end);
    const inserted = before + selected + after;
    const newContent = form.content.substring(0, start) + inserted + form.content.substring(end);
    setForm(f => ({ ...f, content: newContent }));
    setTimeout(() => {
      textarea.focus();
      const newPos = selected ? start + inserted.length : start + before.length;
      textarea.setSelectionRange(newPos, newPos);
    }, 0);
  };

  const handleInsertImage = () => {
    if (!imageUrl.trim()) return;
    insertAtCursor(`\n<img src="${imageUrl.trim()}" alt="image" style="max-width:100%;border-radius:12px;margin:16px auto;display:block;" />\n`);
    setImageUrl('');
    setShowImageInput(false);
    showToast('Image insert ho gayi ✓');
  };

  // ── Submit ─────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!form.title.trim() || !form.slug.trim() || !form.content.trim()) {
      showToast('Title, Slug aur Content zaroori hain', 'error');
      return;
    }
    setSaving(true);
    try {
      const tags = form.tagsText.split(',').map(t => t.trim()).filter(Boolean);
      const payload = {
        title: form.title.trim(), slug: form.slug.trim(), excerpt: form.excerpt.trim(),
        content: form.content.trim(), coverImage: form.coverImage.trim(),
        category: form.category, tags, published: form.published, updatedAt: serverTimestamp(),
      };
      if (editingId) {
        await updateDoc(doc(db, 'blogs', editingId), payload);
        showToast('Blog update ho gaya ✓');
      } else {
        await addDoc(collection(db, 'blogs'), { ...payload, createdAt: serverTimestamp() });
        showToast('Blog publish ho gaya ✓');
      }
      resetForm(); fetchBlogs();
    } catch {
      showToast('Error aa gaya, dobara try karo', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (b: Blog) => {
    setEditingId(b.id);
    setForm({
      title: b.title, slug: b.slug, excerpt: b.excerpt || '', content: b.content || '',
      coverImage: b.coverImage || '', category: b.category || 'Tips & Guides',
      tagsText: (b.tags || []).join(', '), published: b.published || false,
    });
    setView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'blogs', id));
      showToast('Blog delete ho gaya');
      setDeleteConfirm(null); fetchBlogs();
    } catch { showToast('Delete nahi ho saka', 'error'); }
  };

  const handleQuickPublish = async (id: string, published: boolean) => {
    try {
      await updateDoc(doc(db, 'blogs', id), { published });
      setBlogs(prev => prev.map(b => b.id === id ? { ...b, published } : b));
      showToast(published ? 'Published ✓' : 'Draft mein gaya');
    } catch { showToast('Update nahi ho saka', 'error'); }
  };

  const resetForm = () => {
    setForm(emptyForm); setEditingId(null); setView('list');
    setShowImageInput(false); setImageUrl('');
  };

  const filtered = blogs.filter(b => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.slug.toLowerCase().includes(search.toLowerCase()) ||
      (b.excerpt || '').toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'all' || b.category === filterCat;
    const matchPub = filterPublished === 'all' ||
      (filterPublished === 'published' && b.published) ||
      (filterPublished === 'draft' && !b.published);
    return matchSearch && matchCat && matchPub;
  });

  const publishedCount = blogs.filter(b => b.published).length;
  const draftsCount = blogs.filter(b => !b.published).length;

  // ── PREVIEW ────────────────────────────────────────────────
  if (view === 'preview' && previewBlog) {
    return (
      <AdminLayout onNavigate={onNavigate} currentPage="blogs">
        <div className="max-w-3xl mx-auto space-y-5">
          <div className="flex items-center gap-3">
            <button onClick={() => setView('list')} className="cursor-pointer text-sm font-semibold text-gray-600 bg-white border border-gray-200 px-4 py-2 rounded-xl">
              ← Wapis jao
            </button>
            <span className="text-sm text-gray-400">Preview Mode</span>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {previewBlog.coverImage && (
              <div className="aspect-video overflow-hidden">
                <img src={previewBlog.coverImage} alt={previewBlog.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{previewBlog.category}</span>
                {(previewBlog.tags || []).map(t => (
                  <span key={t} className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">#{t}</span>
                ))}
              </div>
              <h1 className="text-2xl font-extrabold text-gray-800 mb-3">{previewBlog.title}</h1>
              <p className="text-gray-500 mb-6 text-sm">{previewBlog.excerpt}</p>
              <div className="prose prose-sm max-w-none text-gray-700 border-t border-gray-100 pt-6"
                dangerouslySetInnerHTML={{ __html: previewBlog.content }} />
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // ── FORM VIEW ──────────────────────────────────────────────
  if (view === 'form') {
    return (
      <AdminLayout onNavigate={onNavigate} currentPage="blogs">
        <div className="space-y-5">
          {toast && (
            <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-lg text-sm font-semibold text-white ${toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
              {toast.msg}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-gray-800">{editingId ? '✏️ Blog Edit' : '✍️ Naya Blog'}</h2>
              <p className="text-sm text-gray-400 mt-0.5">{editingId ? 'Update karo' : 'Naya article likho'}</p>
            </div>
            <button onClick={resetForm} className="cursor-pointer text-sm font-semibold text-gray-600 bg-white border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50">
              ← Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* ── Main ── */}
            <div className="lg:col-span-2 space-y-4">

              {/* Title */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Title *</label>
                <input value={form.title} onChange={e => handleTitleChange(e.target.value)}
                  placeholder="e.g. DC Breaker kya hota hai?"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-base text-gray-800 font-bold focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all" />
              </div>

              {/* Excerpt */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Excerpt</label>
                <textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                  placeholder="Blog ka short summary..." rows={3}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all resize-none" />
                <p className="text-xs text-gray-400">{form.excerpt.length}/160</p>
              </div>

              {/* Content Editor */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Content *</label>
                  <span className="text-xs text-gray-400">{form.content.length} chars</span>
                </div>

                {/* ── Rich Text Toolbar ── */}
                <div className="flex flex-wrap gap-1.5 p-2 bg-gray-50 rounded-xl border border-gray-200">

                  {/* Headings */}
                  <ToolbarBtn label="H1" title="Heading 1" onClick={() => insertAtCursor('<h1>', '</h1>')} />
                  <ToolbarBtn label="H2" title="Heading 2" onClick={() => insertAtCursor('<h2>', '</h2>')} />
                  <ToolbarBtn label="H3" title="Heading 3" onClick={() => insertAtCursor('<h3>', '</h3>')} />

                  <div className="w-px bg-gray-300 mx-1" />

                  {/* Text formatting */}
                  <ToolbarBtn label="B" title="Bold" onClick={() => insertAtCursor('<strong>', '</strong>')} />
                  <ToolbarBtn label="I" title="Italic" onClick={() => insertAtCursor('<em>', '</em>')} />
                  <ToolbarBtn label="U" title="Underline" onClick={() => insertAtCursor('<u>', '</u>')} />
                  <ToolbarBtn label="S" title="Strikethrough" onClick={() => insertAtCursor('<s>', '</s>')} />

                  <div className="w-px bg-gray-300 mx-1" />

                  {/* Font sizes */}
                  <ToolbarBtn label="Small" title="Small text" onClick={() => insertAtCursor('<small>', '</small>')} />
                  <ToolbarBtn label="Large" title="Large text" onClick={() => insertAtCursor('<span style="font-size:1.25rem">', '</span>')} />

                  <div className="w-px bg-gray-300 mx-1" />

                  {/* Lists */}
                  <ToolbarBtn label="• List" title="Unordered List" onClick={() => insertAtCursor('<ul>\n  <li>', '</li>\n</ul>')} />
                  <ToolbarBtn label="1. List" title="Ordered List" onClick={() => insertAtCursor('<ol>\n  <li>', '</li>\n</ol>')} />
                  <ToolbarBtn label="+ Item" title="Add list item" onClick={() => insertAtCursor('<li>', '</li>')} />

                  <div className="w-px bg-gray-300 mx-1" />

                  {/* Block */}
                  <ToolbarBtn label="¶ Para" title="Paragraph" onClick={() => insertAtCursor('<p>', '</p>')} />
                  <ToolbarBtn label="—" title="Horizontal line" onClick={() => insertAtCursor('\n<hr />\n')} />
                  <ToolbarBtn label="❝ Quote" title="Blockquote" onClick={() => insertAtCursor('<blockquote style="border-left:4px solid #10b981;padding-left:16px;color:#6b7280;font-style:italic;margin:16px 0">', '</blockquote>')} />

                  <div className="w-px bg-gray-300 mx-1" />

                  {/* Color */}
                  <ToolbarBtn label="🟢 Green" title="Green text" onClick={() => insertAtCursor('<span style="color:#10b981">', '</span>')} />
                  <ToolbarBtn label="🔴 Red" title="Red text" onClick={() => insertAtCursor('<span style="color:#ef4444">', '</span>')} />
                  <ToolbarBtn label="🔵 Blue" title="Blue text" onClick={() => insertAtCursor('<span style="color:#3b82f6">', '</span>')} />

                  <div className="w-px bg-gray-300 mx-1" />

                  {/* Image */}
                  <button
                    type="button"
                    onClick={() => setShowImageInput(!showImageInput)}
                    className={`cursor-pointer flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      showImageInput ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-400 hover:text-emerald-600'
                    }`}
                    title="Image insert karo"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Image
                  </button>
                </div>

                {/* Image URL input */}
                {showImageInput && (
                  <div className="flex gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="flex-1 space-y-1">
                      <p className="text-xs font-semibold text-emerald-700">Image URL paste karo:</p>
                      <input value={imageUrl} onChange={e => setImageUrl(e.target.value)}
                        placeholder="https://ik.imagekit.io/dawoodtraders/..."
                        className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-emerald-500" />
                    </div>
                    <div className="flex flex-col gap-1 justify-end">
                      <button onClick={handleInsertImage} disabled={!imageUrl.trim()}
                        className="cursor-pointer px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold disabled:opacity-50">
                        Insert
                      </button>
                      <button onClick={() => { setShowImageInput(false); setImageUrl(''); }}
                        className="cursor-pointer px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold">
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Textarea */}
                <textarea
                  ref={contentRef}
                  value={form.content}
                  onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                  placeholder={`Content yahan likho...\n\nUpar wale buttons se HTML tags insert kar sakte ho.\nMisal:\n<h2>Heading</h2>\n<p>Apna text yahan...</p>\n<strong>Bold text</strong>`}
                  rows={22}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all resize-none leading-relaxed font-mono"
                />
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="space-y-4">

              {/* Publish Settings */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
                <h4 className="text-sm font-bold text-gray-800">Publish Settings</h4>

                {/* Toggle — FIXED */}
                <div className="flex items-center justify-between p-3 rounded-xl border-2 border-gray-100">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Status</p>
                    <p className={`text-xs font-medium mt-0.5 ${form.published ? 'text-emerald-600' : 'text-amber-500'}`}>
                      {form.published ? '● Live hai' : '○ Draft mein hai'}
                    </p>
                  </div>
                  {/* Toggle button — clearly visible */}
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, published: !f.published }))}
                    className={`cursor-pointer relative w-14 h-7 rounded-full transition-all duration-300 border-2 ${
                      form.published
                        ? 'bg-emerald-500 border-emerald-500'
                        : 'bg-gray-200 border-gray-300'
                    }`}
                  >
                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                      form.published ? 'translate-x-7' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <button onClick={handleSubmit} disabled={saving}
                  className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl text-sm font-bold shadow-md disabled:opacity-60">
                  {saving
                    ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    : editingId ? '✓ Update Karo' : '🚀 Publish Karo'}
                </button>
              </div>

              {/* Slug */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">URL Slug *</label>
                <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                  placeholder="dc-breaker-kya-hota-hai"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-700 font-mono focus:outline-none focus:border-emerald-500 transition-all" />
                <p className="text-xs text-gray-400">/blog/{form.slug || 'your-slug'}</p>
              </div>

              {/* Category */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="cursor-pointer w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-800 font-medium focus:outline-none focus:border-emerald-500 transition-all appearance-none">
                  {BLOG_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Cover Image */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Cover Image URL</label>
                <input value={form.coverImage} onChange={e => setForm(f => ({ ...f, coverImage: e.target.value }))}
                  placeholder="https://ik.imagekit.io/..."
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-emerald-500 transition-all" />
                {form.coverImage && (
                  <div className="mt-2 aspect-video rounded-xl overflow-hidden border border-gray-200">
                    <img src={form.coverImage} alt="cover" className="w-full h-full object-cover"
                      onError={e => (e.currentTarget.style.display = 'none')} />
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tags (comma se alag)</label>
                <input value={form.tagsText} onChange={e => setForm(f => ({ ...f, tagsText: e.target.value }))}
                  placeholder="solar, dc-breaker, pakistan"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-emerald-500 transition-all" />
                {form.tagsText && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {form.tagsText.split(',').map(t => t.trim()).filter(Boolean).map(tag => (
                      <span key={tag} className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-medium">#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // ── LIST VIEW ──────────────────────────────────────────────
  return (
    <AdminLayout onNavigate={onNavigate} currentPage="blogs">
      <div className="space-y-5">
        {toast && (
          <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-lg text-sm font-semibold text-white ${toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
            {toast.msg}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-gray-800">Blog Posts</h2>
            <p className="text-sm text-gray-400 mt-0.5">{blogs.length} posts total</p>
          </div>
          <button onClick={() => { resetForm(); setView('form'); }}
            className="cursor-pointer flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors">
            + Naya Blog
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 font-medium">Total</p>
            <p className="text-lg font-extrabold text-gray-800 mt-1">{blogs.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 font-medium">Published</p>
            <p className="text-lg font-extrabold text-emerald-600 mt-1">{publishedCount}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 font-medium">Drafts</p>
            <p className="text-lg font-extrabold text-amber-500 mt-1">{draftsCount}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Blog search karo..."
            className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-emerald-400 shadow-sm" />
          <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
            className="cursor-pointer px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none shadow-sm appearance-none">
            <option value="all">Sab Categories</option>
            {BLOG_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <div className="flex gap-2">
            {[{ v: 'all', l: 'Sab' }, { v: 'published', l: 'Published' }, { v: 'draft', l: 'Draft' }].map(o => (
              <button key={o.v} onClick={() => setFilterPublished(o.v)}
                className={`cursor-pointer px-3 py-2 rounded-xl text-xs font-bold transition-all ${filterPublished === o.v ? 'bg-gray-800 text-white' : 'bg-white text-gray-500 border border-gray-200'}`}>
                {o.l}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {loading ? (
            <div className="bg-white rounded-2xl border border-gray-100 flex items-center justify-center py-16">
              <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 flex flex-col items-center justify-center py-16 text-center">
              <p className="text-4xl mb-3">✍️</p>
              <p className="text-sm font-semibold text-gray-500">
                {search || filterCat !== 'all' || filterPublished !== 'all' ? 'Koi blog nahi mila' : 'Abhi koi blog post nahi'}
              </p>
            </div>
          ) : filtered.map(blog => (
            <div key={blog.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="flex gap-4 p-4 sm:p-5">
                {blog.coverImage ? (
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 text-3xl">✍️</div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">{blog.category}</span>
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${blog.published ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {blog.published ? '● Live' : '○ Draft'}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-gray-800 truncate">{blog.title}</h3>
                      <p className="text-xs text-gray-400 font-mono">/blog/{blog.slug}</p>
                      {blog.excerpt && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{blog.excerpt}</p>}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => handleQuickPublish(blog.id, !blog.published)}
                        className={`cursor-pointer relative w-11 h-6 rounded-full border-2 transition-all duration-300 ${blog.published ? 'bg-emerald-500 border-emerald-500' : 'bg-gray-200 border-gray-300'}`}
                        title={blog.published ? 'Unpublish' : 'Publish'}>
                        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${blog.published ? 'translate-x-5' : 'translate-x-0.5'}`} />
                      </button>
                      <button onClick={() => { setPreviewBlog(blog); setView('preview'); }}
                        className="cursor-pointer p-2 text-gray-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </button>
                      <button onClick={() => handleEdit(blog)}
                        className="cursor-pointer p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      {deleteConfirm === blog.id ? (
                        <div className="flex gap-1">
                          <button onClick={() => handleDelete(blog.id)} className="cursor-pointer px-2.5 py-1.5 text-xs font-bold text-white bg-red-500 rounded-lg">Haan</button>
                          <button onClick={() => setDeleteConfirm(null)} className="cursor-pointer px-2.5 py-1.5 text-xs text-gray-600 bg-gray-100 rounded-lg">Nahi</button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(blog.id)}
                          className="cursor-pointer p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
