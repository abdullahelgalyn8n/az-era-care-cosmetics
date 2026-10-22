import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  Award,
  Store,
  Calendar,
} from 'lucide-react';
import {
  CATEGORIES,
  PRODUCTS,
  Product,
  ProductCategory,
} from '../data/catalog';
import { BLOG_POSTS } from '../data/storesAndContent';
import { ProductCard } from '../components/ProductCard';
import { RouteState } from '../utils/storeLogic';

interface HomePageProps {
  onNavigate: (route: RouteState) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  lang: 'en' | 'ar';
  darkMode: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onAddToCart,
  onQuickView,
  wishlist,
  onToggleWishlist,
  lang,
  darkMode,
}) => {
  const [activeCollectionTab, setActiveCollectionTab] = useState<
    ProductCategory | 'All'
  >('All');

  const newArrivals = PRODUCTS.filter((p) => p.featuredOnHome).slice(0, 8);

  const collectionProducts = PRODUCTS.filter((p) => {
    if (activeCollectionTab === 'All') {
      return p.collectionHighlight || p.inStock;
    }
    return (
      p.category === activeCollectionTab ||
      p.secondaryCategory === activeCollectionTab
    );
  }).slice(0, 12);

  const collectionTabs: { id: ProductCategory | 'All'; en: string; ar: string }[] = [
    { id: 'All', en: 'All Bestsellers', ar: 'الأكثر مبيعاً' },
    { id: 'Skincare', en: 'Skincare', ar: 'العناية بالبشرة' },
    { id: 'Haircare', en: 'Haircare', ar: 'العناية بالشعر' },
    { id: 'Body Care', en: 'Body Care', ar: 'العناية بالجسم' },
    { id: 'Natural Oils', en: 'Natural Oils', ar: 'الزيوت الطبيعية' },
    { id: 'Bundles', en: 'Value Bundles', ar: 'مجموعات التوفير' },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Split Banner — High-Contrast Editorial Layout */}
      <section
        className={`relative overflow-hidden border-b ${
          darkMode
            ? 'bg-[#161413] border-[#2C2826]'
            : 'bg-gradient-to-br from-[#FBF3F3] via-[#FAF8F5] to-[#F2ECE4] border-[#E6E1DA]'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Copy Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#9E2432] text-white text-xs font-bold tracking-wider uppercase shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {lang === 'ar'
                    ? 'إيرا كير مصر • صُنع بعناية فائقة'
                    : 'ERA CARE EGYPT • MADE BY CARE'}
                </span>
              </div>

              <h1
                className={`font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight ${
                  darkMode ? 'text-[#F7F4F0]' : 'text-[#181615]'
                }`}
              >
                {lang === 'ar' ? (
                  <>
                    اكتشفي مجموعتنا الجديدة{' '}
                    <span className="text-[#9E2432]">للعناية الفائقة بالبشرة</span>
                  </>
                ) : (
                  <>
                    Discover our new{' '}
                    <span className="text-[#9E2432] italic">skincare line</span>
                  </>
                )}
              </h1>

              <p
                className={`text-base sm:text-lg leading-relaxed max-w-xl font-medium ${
                  darkMode ? 'text-[#D0C9C2]' : 'text-[#3A3532]'
                }`}
              >
                {lang === 'ar'
                  ? 'تركيبات طبيعية وعلمية متطورة من تيرسس وإيرا كير بخلاصة زبدة الشيا النقية، النياسيناميد، حمض الهيالورونيك، والزيوت المعصورة على البارد — متوفرة الآن في 39 فرعاً بجميع محافظات مصر.'
                  : 'Dermatologist-formulated Tersus creams, targeted facial serums, sulfate-free hair therapies, and cold-pressed botanical oils. Crafted in our licensed Egyptian factory and trusted across 39 retail branches.'}
              </p>

              {/* High-Contrast Dual CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href="/shop"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate({ page: 'shop', category: 'All', pageNumber: 1 });
                  }}
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-[#9E2432] hover:bg-[#7F1B27] text-white text-sm font-bold tracking-wide transition-all shadow-md cursor-pointer"
                >
                  <span>
                    {lang === 'ar'
                      ? 'تسوقي كل المنتجات (72)'
                      : 'Shop All 72 Products'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="/stores"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate({ page: 'stores' });
                  }}
                  className={`inline-flex items-center gap-2 px-6 py-4 rounded-xl border-2 text-sm font-bold transition-colors cursor-pointer ${
                    darkMode
                      ? 'border-[#F4A29D] text-[#F7F4F0] hover:bg-[#24201E]'
                      : 'border-[#181615] bg-white text-[#181615] hover:bg-[#181615] hover:text-white'
                  }`}
                >
                  <Store className="w-4 h-4" />
                  <span>
                    {lang === 'ar' ? 'فروعنا الـ 39' : 'Find Nearest Branch (39)'}
                  </span>
                </a>
              </div>

              {/* High-Contrast Key Metrics Strip */}
              <div
                className={`grid grid-cols-3 gap-4 pt-6 border-t ${
                  darkMode ? 'border-[#2C2826]' : 'border-[#DFD8CE]'
                }`}
              >
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#9E2432] tabular-nums">
                    72+
                  </p>
                  <p
                    className={`text-xs font-bold ${
                      darkMode ? 'text-[#C7BFB8]' : 'text-[#3A3532]'
                    }`}
                  >
                    {lang === 'ar' ? 'منتج طبيعي' : 'Botanical Formulas'}
                  </p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#9E2432] tabular-nums">
                    39
                  </p>
                  <p
                    className={`text-xs font-bold ${
                      darkMode ? 'text-[#C7BFB8]' : 'text-[#3A3532]'
                    }`}
                  >
                    {lang === 'ar' ? 'فرع في مصر' : 'Branches in Egypt'}
                  </p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#9E2432] tabular-nums">
                    21
                  </p>
                  <p
                    className={`text-xs font-bold ${
                      darkMode ? 'text-[#C7BFB8]' : 'text-[#3A3532]'
                    }`}
                  >
                    {lang === 'ar' ? 'محافظة مغطاة' : 'Governorates Served'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Hero Studio Image (Tersus 3 Tubes) */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E6E1DA] bg-[#F5F1EC]">
                <img
                  src="/assets/extracted/brand/hero-tubes.jpg"
                  alt="Tersus Day Cream, Night Cream, and Foot Repairing Cream Trio"
                  className="w-full h-auto object-cover"
                />
                <div className="p-4 bg-white/95 backdrop-blur-xs border-t border-[#E6E1DA] flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-wider text-[#9E2432]">
                      {lang === 'ar'
                        ? 'ثلاثي تيرسس الأكثر مبيعاً'
                        : 'Featured Tersus Cream Trio'}
                    </p>
                    <p className="text-sm font-bold text-[#181615]">
                      {lang === 'ar'
                        ? 'كريم النهار + كريم الليل بالكولاجين + كريم اليوريا للقدمين'
                        : 'Daily Moisturizing + Night Collagen + 7-Day Urea Repair'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate({
                        page: 'product',
                        slug: 'tersus-intensive-repair-trio',
                      })
                    }
                    className="px-4 py-2 rounded-lg bg-[#181615] hover:bg-[#9E2432] text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    {lang === 'ar' ? 'احصلي على المجموعة' : 'View Trio Bundle'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Shop by Category — 6 Circular Portraits (Matches Home Screenshot) */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#9E2432]">
              {lang === 'ar' ? 'تسوقي حسب القسم' : 'CURATED DEPARTMENTS'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-1">
              {lang === 'ar' ? 'أقسام منتجات إيرا كير' : 'Shop by Category'}
            </h2>
          </div>
          <a
            href="/shop"
            onClick={(e) => {
              e.preventDefault();
              onNavigate({ page: 'shop', category: 'All', pageNumber: 1 });
            }}
            className="text-sm font-bold text-[#9E2432] hover:underline inline-flex items-center gap-1.5"
          >
            <span>{lang === 'ar' ? 'عرض جميع الأقسام' : 'Explore Full Catalog'}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`/shop?category=${encodeURIComponent(cat.id)}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate({
                  page: 'shop',
                  category: cat.id,
                  pageNumber: 1,
                });
              }}
              className={`group flex flex-col items-center text-center p-4 rounded-2xl border transition-all ${
                darkMode
                  ? 'bg-[#1A1817] border-[#2E2A27] hover:border-[#F4A29D]'
                  : 'bg-white border-[#E6E1DA] hover:border-[#9E2432] hover:shadow-md'
              }`}
            >
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-[#E8D2D4] group-hover:border-[#9E2432] transition-colors mb-3.5 bg-[#F5F3EF]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3
                className={`font-serif text-lg font-bold transition-colors ${
                  darkMode
                    ? 'text-[#F7F4F0] group-hover:text-[#F4A29D]'
                    : 'text-[#181615] group-hover:text-[#9E2432]'
                }`}
              >
                {lang === 'ar' ? cat.nameAr : cat.name}
              </h3>
              <p
                className={`text-xs font-bold mt-0.5 ${
                  darkMode ? 'text-[#B8B0A8]' : 'text-[#4A4643]'
                }`}
              >
                {cat.count} {lang === 'ar' ? 'منتج' : 'Products'}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* 3. Authentic Promotional Banners (The Care You Need + TikTok Banner) */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div
            onClick={() =>
              onNavigate({ page: 'shop', category: 'Body Care', pageNumber: 1 })
            }
            className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#E6E1DA] shadow-sm cursor-pointer group relative bg-[#FAF4F2]"
          >
            <img
              src="/assets/extracted/brand/promo-1.jpg"
              alt="The Care You Need, The Love You Feel — Era Care Collection"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div
              onClick={() =>
                onNavigate({ page: 'shop', category: 'Skincare', pageNumber: 1 })
              }
              className="rounded-2xl overflow-hidden border border-[#E6E1DA] shadow-sm cursor-pointer group bg-[#FAF4F2]"
            >
              <img
                src="/assets/extracted/brand/promo-2.jpg"
                alt="Follow Era Care on TikTok @eracarecosmetics"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>

            {/* High-Contrast Routine Bundle Callout Card */}
            <div
              className={`flex-1 rounded-2xl p-6 border flex flex-col justify-between ${
                darkMode
                  ? 'bg-[#1E1A19] border-[#383330]'
                  : 'bg-[#FBF3F3] border-[#E8D2D4]'
              }`}
            >
              <div className="space-y-2">
                <span className="inline-block px-2.5 py-1 rounded bg-[#9E2432] text-white text-[11px] font-bold uppercase tracking-wider">
                  {lang === 'ar' ? 'باقات التوفير الحصرية' : 'EXCLUSIVE VALUE SETS'}
                </span>
                <h3
                  className={`font-serif text-2xl font-bold ${
                    darkMode ? 'text-[#F7F4F0]' : 'text-[#181615]'
                  }`}
                >
                  {lang === 'ar'
                    ? 'وفّري حتى 20% مع مجموعات الروتين الكامل'
                    : 'Save up to 20% with Complete Routine Bundles'}
                </h3>
                <p
                  className={`text-xs leading-relaxed font-medium ${
                    darkMode ? 'text-[#C7BFB8]' : 'text-[#3A3532]'
                  }`}
                >
                  {lang === 'ar'
                    ? 'مجموعات متكاملة لتفتيح البشرة، علاج تساقط الشعر بالروزماري، وترطيب الجسم بالكامل.'
                    : 'Curated dermatologist-paired sets for glass-skin brightening, rosemary hair growth, and 24-hour body care.'}
                </p>
              </div>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() =>
                    onNavigate({ page: 'shop', category: 'Bundles', pageNumber: 1 })
                  }
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#181615] hover:bg-[#9E2432] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <span>
                    {lang === 'ar' ? 'تصفحي مجموعات التوفير' : 'Shop Value Bundles'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. New Arrivals Section — 8 Products in Uniform 4-Column Grid */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#9E2432]">
              {lang === 'ar' ? 'أحدث الإصدارات' : 'FRESH FROM OUR LABS'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-1">
              {lang === 'ar' ? 'وصل حديثاً — New Arrivals' : 'New Arrivals'}
            </h2>
          </div>
          <a
            href="/shop"
            onClick={(e) => {
              e.preventDefault();
              onNavigate({ page: 'shop', category: 'All', pageNumber: 1 });
            }}
            className="text-sm font-bold text-[#9E2432] hover:underline inline-flex items-center gap-1.5"
          >
            <span>{lang === 'ar' ? 'عرض الكل (72 منتج)' : 'View All 72 Products'}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onNavigate}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              lang={lang}
              darkMode={darkMode}
            />
          ))}
        </div>
      </section>

      {/* 5. Explore Our Collections — Interactive Filterable Grid (12 Products) */}
      <section
        className={`py-16 border-y ${
          darkMode
            ? 'bg-[#151312] border-[#2C2826]'
            : 'bg-[#F4EFEA] border-[#E2DBD2]'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#9E2432]">
                {lang === 'ar' ? 'تركيبات تيرسس وإيرا كير' : 'SIGNATURE FORMULATIONS'}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-1">
                {lang === 'ar'
                  ? 'اكتشفي مجموعاتنا الكاملة'
                  : 'Explore Our Collections'}
              </h2>
            </div>

            {/* High-Contrast Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {collectionTabs.map((tab) => {
                const active = activeCollectionTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCollectionTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      active
                        ? 'bg-[#9E2432] text-white shadow-xs'
                        : darkMode
                        ? 'bg-[#221F1D] text-[#E6E1DA] hover:bg-[#2E2A27]'
                        : 'bg-white text-[#181615] border border-[#D5CEC6] hover:border-[#9E2432] hover:text-[#9E2432]'
                    }`}
                  >
                    {lang === 'ar' ? tab.ar : tab.en}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {collectionProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={onNavigate}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                lang={lang}
                darkMode={darkMode}
              />
            ))}
          </div>

          <div className="text-center pt-4">
            <a
              href="/shop"
              onClick={(e) => {
                e.preventDefault();
                onNavigate({
                  page: 'shop',
                  category: activeCollectionTab,
                  pageNumber: 1,
                });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#181615] hover:bg-[#9E2432] text-white text-sm font-bold transition-colors shadow-sm"
            >
              <span>
                {lang === 'ar'
                  ? 'تصفحي المتجر بالكامل (72 منتج)'
                  : 'Browse All 72 Products in Shop'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 6. Why Era Care — Trust & Quality Pillars (High Contrast) */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: ShieldCheck,
              titleEn: 'Licensed Egyptian Factory',
              titleAr: 'مصنع مصري مرخص ومعتمد',
              descEn:
                'Every Tersus & Era Care product is manufactured under strict quality control using pharmaceutical-grade actives.',
              descAr:
                'جميع منتجاتنا تصنع في مصنعنا المرخص بأعلى معايير الجودة والرقابة الدوائية.',
            },
            {
              icon: Sparkles,
              titleEn: '100% Pure Cold-Pressed Oils',
              titleAr: 'زيوت طبيعية معصورة على البارد',
              descEn:
                'Unrefined Shea Butter, Rosemary, Argan, Jojoba, and Tea Tree oils free from mineral oil or parabens.',
              descAr:
                'زبدة شيا خام وزيوت طبيعية نقية 100% خالية من البارابين والزيوت المعدنية.',
            },
            {
              icon: Store,
              titleEn: '39 Retail Branches in Egypt',
              titleAr: '39 فرعاً في 21 محافظة',
              descEn:
                'Visit us in Cairo, Alexandria, Sohag, Giza, Mansoura, Tanta, Assiut, Hurghada, and across Egypt.',
              descAr:
                'تواجد قوي في القاهرة، الإسكندرية، سوهاج، الجيزة، المنصورة، طنطا وجميع المحافظات.',
            },
            {
              icon: Truck,
              titleEn: 'Fast Doorstep Delivery',
              titleAr: 'شحن سريع ودفع عند الاستلام',
              descEn:
                'Free shipping on orders above 750 EGP with Cash on Delivery available across all governorates.',
              descAr:
                'توصيل سريع لباب المنزل مع إمكانية الدفع عند الاستلام وشحن مجاني فوق 750 ج.م.',
            },
          ].map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className={`p-6 rounded-2xl border ${
                  darkMode
                    ? 'bg-[#1A1817] border-[#2E2A27]'
                    : 'bg-white border-[#E6E1DA]'
                }`}
              >
                <div className="w-11 h-11 rounded-xl bg-[#9E2432]/10 text-[#9E2432] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold mb-1.5">
                  {lang === 'ar' ? pillar.titleAr : pillar.titleEn}
                </h3>
                <p
                  className={`text-xs leading-relaxed font-medium ${
                    darkMode ? 'text-[#B8B0A8]' : 'text-[#4A4643]'
                  }`}
                >
                  {lang === 'ar' ? pillar.descAr : pillar.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. From Our Blog — Editorial Section (Matches Home & Blog Screenshots) */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#9E2432]">
              {lang === 'ar' ? 'مدونة الجمال والعناية' : 'SKINCARE JOURNAL'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-1">
              {lang === 'ar' ? 'أحدث مقالات المدونة' : 'From Our Blog'}
            </h2>
          </div>
          <a
            href="/blog"
            onClick={(e) => {
              e.preventDefault();
              onNavigate({ page: 'blog' });
            }}
            className="text-sm font-bold text-[#9E2432] hover:underline inline-flex items-center gap-1.5"
          >
            <span>{lang === 'ar' ? 'عرض جميع المقالات' : 'Read All Articles'}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
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
                {/* Date Badge */}
                <div className="absolute top-3 left-3 bg-white text-[#181615] rounded-lg px-2.5 py-1.5 text-center shadow-md border border-[#E6E1DA] leading-tight">
                  <span className="block text-sm font-extrabold">{post.dateDay}</span>
                  <span className="block text-[10px] font-bold uppercase text-[#9E2432]">
                    {post.dateMonth}
                  </span>
                </div>
                {/* Category Tag */}
                <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-[#9E2432] text-white text-[10px] font-extrabold uppercase tracking-wider">
                  {lang === 'ar' ? post.categoryAr : post.category}
                </span>
              </a>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#4A4643] dark:text-[#B8B0A8] font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#9E2432]" />
                    <span>{post.fullDate}</span>
                    <span>•</span>
                    <span>By {post.author}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold leading-snug">
                    <a
                      href={`/blog/${post.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate({ page: 'blog-post', slug: post.slug });
                      }}
                      className={
                        darkMode
                          ? 'text-[#F7F4F0] hover:text-[#F4A29D]'
                          : 'text-[#181615] hover:text-[#9E2432]'
                      }
                    >
                      {lang === 'ar' ? post.titleAr : post.title}
                    </a>
                  </h3>
                  <p
                    className={`text-xs leading-relaxed line-clamp-3 font-medium ${
                      darkMode ? 'text-[#B8B0A8]' : 'text-[#4A4643]'
                    }`}
                  >
                    {lang === 'ar' ? post.excerptAr : post.excerpt}
                  </p>
                </div>

                <a
                  href={`/blog/${post.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate({ page: 'blog-post', slug: post.slug });
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#9E2432] hover:underline"
                >
                  <span>{lang === 'ar' ? 'اقرئي المقال كاملاً' : 'Continue Reading'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
