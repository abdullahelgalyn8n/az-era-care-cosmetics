import React, { useState } from 'react';
import {
  Calendar,
  User,
  ArrowLeft,
  MessageSquare,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { BLOG_POSTS } from '../data/storesAndContent';
import { PRODUCTS, Product } from '../data/catalog';
import { RouteState, validateBlogComment } from '../utils/storeLogic';
import { ProductCard } from '../components/ProductCard';

interface BlogPostPageProps {
  slug: string;
  onNavigate: (route: RouteState) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  lang: 'en' | 'ar';
  darkMode: boolean;
}

interface CommentEntry {
  id: string;
  author: string;
  date: string;
  text: string;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  slug,
  onNavigate,
  onAddToCart,
  onQuickView,
  lang,
  darkMode,
}) => {
  const post =
    BLOG_POSTS.find((p) => p.slug === slug) || BLOG_POSTS[0];

  const [comments, setComments] = useState<CommentEntry[]>([
    {
      id: 'c1',
      author: 'Mariam Hassan',
      date: 'September 4, 2026',
      text: 'The Tersus Salicylic Acid Facial Cleanser completely transformed my skincare routine without drying my cheeks!',
    },
    {
      id: 'c2',
      author: 'نورهان طارق',
      date: 'September 12, 2026',
      text: 'منتجات إيرا كير فعلاً جودتها ممتازة جداً ومناسبة للبشرة الحساسة، شكراً لكم.',
    },
  ]);

  const [commentText, setCommentText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [authorWebsite, setAuthorWebsite] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedMsg, setSubmittedMsg] = useState(false);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateBlogComment({
      author: authorName,
      email: authorEmail,
      comment: commentText,
    });
    if (!validation.valid) {
      setErrorMsg(validation.error || 'Please check your input');
      return;
    }
    setErrorMsg('');
    setComments([
      ...comments,
      {
        id: `c-${Date.now()}`,
        author: authorName.trim(),
        date: 'Just now',
        text: commentText.trim(),
      },
    ]);
    setCommentText('');
    setAuthorName('');
    setAuthorEmail('');
    setAuthorWebsite('');
    setSubmittedMsg(true);
    setTimeout(() => setSubmittedMsg(false), 3000);
  };

  const recommendedProducts = PRODUCTS.filter(
    (p) => p.category === 'Skincare' && p.inStock
  ).slice(0, 3);

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
      {/* Top Breadcrumb & Back Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onNavigate({ page: 'blog' })}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#D5CEC6] bg-white text-[#181615] text-xs font-bold hover:border-[#9E2432] cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'العودة إلى المدونة' : 'Back to All Articles'}</span>
        </button>

        <span className="text-xs font-mono font-bold text-[#9E2432]">
          /blog/{post.slug}
        </span>
      </div>

      {/* Main Article + Sidebar Layout (Matches Single Post Screenshot) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Article Column (8 cols) */}
        <article className="lg:col-span-8 space-y-8">
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 rounded bg-[#9E2432] text-white text-xs font-extrabold uppercase tracking-wider">
              {lang === 'ar' ? post.categoryAr : post.category}
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              {lang === 'ar' ? post.titleAr : post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[#4A4643] dark:text-[#B8B0A8]">
              <span className="inline-flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#9E2432]" />
                <span>Posted by {post.author}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#9E2432]" />
                <span>{post.fullDate}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#9E2432]" />
                <span>{comments.length} Comments</span>
              </span>
            </div>
          </div>

          {/* Hero Cover Image */}
          <div className="rounded-2xl overflow-hidden border border-[#E6E1DA] bg-[#F5F3EF]">
            <img
              src={post.image}
              alt={post.title}
              className="w-full max-h-[520px] object-cover"
            />
          </div>

          {/* Article Paragraphs (Bilingual) */}
          <div
            className={`p-6 sm:p-8 rounded-2xl border space-y-5 text-base leading-relaxed font-medium ${
              darkMode
                ? 'bg-[#1A1817] border-[#2E2A27] text-[#E6E1DA]'
                : 'bg-white border-[#E6E1DA] text-[#181615]'
            }`}
          >
            {(lang === 'ar' ? post.contentAr : post.content).map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}

            <blockquote className="p-5 rounded-xl bg-[#FBF3F3] dark:bg-[#241E1D] border-l-4 border-[#9E2432] text-sm font-bold text-[#181615] dark:text-[#F7F4F0]">
              {lang === 'ar'
                ? '«في مختبرات إيرا كير، نؤمن أن البشرة المشرقة تبدأ من احترام الحاجز الطبيعي للبشرة واستخدام مكونات نقية بتركيزات علمية مدروسة.»'
                : '“At Era Care Laboratories, we believe radiant skin begins by respecting your natural lipid barrier with pure, clinically balanced botanicals.”'}
            </blockquote>
          </div>

          {/* Comments List */}
          <div
            className={`p-6 sm:p-8 rounded-2xl border space-y-6 ${
              darkMode
                ? 'bg-[#1A1817] border-[#2E2A27]'
                : 'bg-white border-[#E6E1DA]'
            }`}
          >
            <h2 className="font-serif text-2xl font-bold">
              {lang === 'ar'
                ? `التعليقات (${comments.length})`
                : `Reader Comments (${comments.length})`}
            </h2>

            <div className="space-y-4">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#141211] border border-[#E6E1DA] dark:border-[#2C2826] space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-[#9E2432]">{c.author}</span>
                    <span className="text-[#4A4643] dark:text-[#A8A09A]">
                      {c.date}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{c.text}</p>
                </div>
              ))}
            </div>

            {/* Leave a Reply Form (Matches Single Blog Post Screenshot) */}
            <form onSubmit={handleCommentSubmit} className="pt-6 border-t border-[#E6E1DA] dark:border-[#2C2826] space-y-4">
              <h3 className="font-serif text-2xl font-bold uppercase tracking-wide">
                {lang === 'ar' ? 'اتركي تعليقاً — Leave a Reply' : 'LEAVE A REPLY'}
              </h3>
              <p className="text-xs font-medium text-[#4A4643] dark:text-[#B8B0A8]">
                Your email address will not be published. Required fields are marked *
              </p>

              {errorMsg && (
                <div className="p-3 rounded-lg bg-[#B91C1C]/10 border border-[#B91C1C] text-[#B91C1C] text-xs font-bold">
                  {errorMsg}
                </div>
              )}

              {submittedMsg && (
                <div className="p-3 rounded-lg bg-[#1D6B43]/15 border border-[#1D6B43] text-[#1D6B43] text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Thank you! Your comment has been posted.</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold mb-1">Comment *</label>
                <textarea
                  rows={4}
                  required
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#D5CEC6] bg-[#FAF8F5] text-sm text-[#181615]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#D5CEC6] bg-[#FAF8F5] text-sm text-[#181615]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={authorEmail}
                    onChange={(e) => setAuthorEmail(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#D5CEC6] bg-[#FAF8F5] text-sm text-[#181615]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Website</label>
                  <input
                    type="url"
                    value={authorWebsite}
                    onChange={(e) => setAuthorWebsite(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#D5CEC6] bg-[#FAF8F5] text-sm text-[#181615]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#9E2432] hover:bg-[#7F1B27] text-white text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
              >
                {lang === 'ar' ? 'نشر التعليق — Post Comment' : 'Post Comment'}
              </button>
            </form>
          </div>
        </article>

        {/* Right Sidebar (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          <div
            className={`rounded-2xl border p-6 space-y-4 ${
              darkMode
                ? 'bg-[#1A1817] border-[#2E2A27]'
                : 'bg-white border-[#E6E1DA]'
            }`}
          >
            <h3 className="text-sm font-extrabold uppercase tracking-wider">
              {lang === 'ar' ? 'مقالات ذات صلة' : 'Recent Posts'}
            </h3>
            <div className="space-y-4">
              {BLOG_POSTS.map((rp) => (
                <a
                  key={rp.id}
                  href={`/blog/${rp.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate({ page: 'blog-post', slug: rp.slug });
                  }}
                  className="flex gap-3 group"
                >
                  <img
                    src={rp.image}
                    alt={rp.title}
                    className="w-16 h-16 rounded-lg object-cover shrink-0 border border-[#E6E1DA]"
                  />
                  <div>
                    <h4 className="text-xs font-bold group-hover:text-[#9E2432] transition-colors">
                      {lang === 'ar' ? rp.titleAr : rp.title}
                    </h4>
                    <span className="text-[11px] text-[#4A4643] dark:text-[#A8A09A]">
                      {rp.fullDate}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Featured Products Mentioned in Article */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider">
              {lang === 'ar'
                ? 'منتجات موصى بها في المقال'
                : 'Shop Featured Formulas'}
            </h3>
            <div className="space-y-4">
              {recommendedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onNavigate={onNavigate}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                  lang={lang}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
