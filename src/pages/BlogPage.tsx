import React, { useState } from 'react';
import { Calendar, User, MessageSquare, ArrowRight, Search } from 'lucide-react';
import { BLOG_POSTS } from '../data/storesAndContent';
import { RouteState } from '../utils/storeLogic';

interface BlogPageProps {
  onNavigate: (route: RouteState) => void;
  lang: 'en' | 'ar';
  darkMode: boolean;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  onNavigate,
  lang,
  darkMode,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['ALL', 'CLEANSERS', 'EYE CARE', 'BODY CARE'];

  const filteredPosts = BLOG_POSTS.filter((p) => {
    if (selectedCategory !== 'ALL' && p.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.titleAr.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-12 pb-20">
      {/* Header Banner */}
      <section
        className={`py-14 border-b ${
          darkMode
            ? 'bg-[#161413] border-[#2C2826]'
            : 'bg-gradient-to-r from-[#FBF3F3] via-[#FAF8F5] to-[#F3ECE4] border-[#E6E1DA]'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="inline-block px-3 py-1 rounded bg-[#9E2432] text-white text-xs font-extrabold uppercase tracking-wider">
            ERA CARE BEAUTY JOURNAL
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold">
            {lang === 'ar' ? 'مدونة إيرا كير للعناية والجمال' : 'The Era Care Blog'}
          </h1>
          <p className="text-sm font-medium text-[#4A4643] dark:text-[#B8B0A8] max-w-xl mx-auto">
            {lang === 'ar'
              ? 'مقالات علمية ونصائح عملية من خبراء إيرا كير للعناية بالبشرة والشعر والجسم باستخدام المكونات الطبيعية النقية.'
              : 'Dermatological insights, botanical ingredient spotlights, and step-by-step skincare routines from Era Care Laboratories.'}
          </p>
        </div>
      </section>

      {/* Main Content + Sidebar */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Blog Cards Grid (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Category Filter Bar */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#9E2432] text-white'
                      : darkMode
                      ? 'bg-[#1E1C1A] text-[#E6E1DA]'
                      : 'bg-white border border-[#D5CEC6] text-[#181615] hover:border-[#9E2432]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Articles List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className={`group rounded-2xl border overflow-hidden flex flex-col transition-all ${
                    darkMode
                      ? 'bg-[#1A1817] border-[#2E2A27] hover:border-[#F4A29D]'
                      : 'bg-white border-[#E6E1DA] hover:border-[#9E2432] hover:shadow-md'
                  }`}
                >
                  <a
                    href={`/blog/${post.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate({ page: 'blog-post', slug: post.slug });
                    }}
                    className="relative aspect-[16/10] w-full overflow-hidden bg-[#F5F3EF]"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-white text-[#181615] rounded-lg px-2.5 py-1.5 text-center shadow-md border border-[#E6E1DA] leading-tight">
                      <span className="block text-sm font-extrabold">
                        {post.dateDay}
                      </span>
                      <span className="block text-[10px] font-bold uppercase text-[#9E2432]">
                        {post.dateMonth}
                      </span>
                    </div>
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-[#9E2432] text-white text-[10px] font-extrabold uppercase tracking-wider">
                      {lang === 'ar' ? post.categoryAr : post.category}
                    </span>
                  </a>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3 text-xs font-bold text-[#4A4643] dark:text-[#B8B0A8]">
                        <span className="inline-flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-[#9E2432]" />
                          <span>Posted by {post.author}</span>
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5 text-[#9E2432]" />
                          <span>{post.commentsCount}</span>
                        </span>
                      </div>

                      <h2 className="font-serif text-2xl font-bold leading-snug">
                        <a
                          href={`/blog/${post.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate({ page: 'blog-post', slug: post.slug });
                          }}
                          className="hover:text-[#9E2432] transition-colors"
                        >
                          {lang === 'ar' ? post.titleAr : post.title}
                        </a>
                      </h2>

                      <p className="text-xs sm:text-sm text-[#4A4643] dark:text-[#B8B0A8] leading-relaxed font-medium">
                        {lang === 'ar' ? post.excerptAr : post.excerpt}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#E6E1DA] dark:border-[#2C2826]">
                      <a
                        href={`/blog/${post.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate({ page: 'blog-post', slug: post.slug });
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#9E2432] hover:underline"
                      >
                        <span>
                          {lang === 'ar' ? 'اقرئي المقال كاملاً' : 'Continue Reading'}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right Sidebar: Search, Categories, Recent Posts (Matches Screenshot) */}
          <aside
            className={`lg:col-span-4 rounded-2xl border p-6 space-y-8 ${
              darkMode
                ? 'bg-[#1A1817] border-[#2E2A27]'
                : 'bg-white border-[#E6E1DA]'
            }`}
          >
            {/* Search Articles */}
            <div className="space-y-2">
              <h3 className="text-sm font-extrabold uppercase tracking-wider">
                {lang === 'ar' ? 'بحث في المدونة' : 'Search Journal'}
              </h3>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9E2432]" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    lang === 'ar' ? 'ابحثي عن مقال...' : 'Search articles...'
                  }
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#D5CEC6] bg-[#FAF8F5] text-xs font-bold text-[#181615]"
                />
              </div>
            </div>

            {/* Categories Widget */}
            <div className="space-y-3 pt-4 border-t border-[#E6E1DA] dark:border-[#2C2826]">
              <h3 className="text-sm font-extrabold uppercase tracking-wider">
                {lang === 'ar' ? 'أقسام المدونة' : 'Categories'}
              </h3>
              <ul className="space-y-2 text-xs font-bold">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-[#9E2432] text-white'
                          : 'hover:bg-[#F3ECE7] dark:hover:bg-[#24201E]'
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Posts Widget */}
            <div className="space-y-4 pt-4 border-t border-[#E6E1DA] dark:border-[#2C2826]">
              <h3 className="text-sm font-extrabold uppercase tracking-wider">
                {lang === 'ar' ? 'أحدث المقالات' : 'Recent Posts'}
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
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold leading-snug group-hover:text-[#9E2432] transition-colors">
                        {lang === 'ar' ? rp.titleAr : rp.title}
                      </h4>
                      <span className="text-[11px] font-medium text-[#4A4643] dark:text-[#B8B0A8] flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#9E2432]" />
                        {rp.fullDate}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
