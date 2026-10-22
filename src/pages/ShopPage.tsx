import React, { useState } from 'react';
import {
  SlidersHorizontal,
  Search,
  RotateCcw,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  CATEGORIES,
  PRODUCTS,
  Product,
  ProductCategory,
} from '../data/catalog';
import {
  filterProducts,
  paginateProducts,
  RouteState,
  SortOption,
  formatPriceEGP,
} from '../utils/storeLogic';
import { ProductCard } from '../components/ProductCard';

interface ShopPageProps {
  selectedCategory: ProductCategory | 'All';
  currentPage: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigate: (route: RouteState) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  lang: 'en' | 'ar';
  darkMode: boolean;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  selectedCategory,
  currentPage,
  searchQuery,
  onSearchChange,
  onNavigate,
  onAddToCart,
  onQuickView,
  wishlist,
  onToggleWishlist,
  lang,
  darkMode,
}) => {
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [perPage, setPerPage] = useState<number>(24);
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  const filteredProducts = filterProducts(PRODUCTS, {
    category: selectedCategory,
    searchQuery,
    maxPrice,
    inStockOnly,
    sortBy,
  });

  const pagination = paginateProducts(filteredProducts, currentPage, perPage);

  const handleCategoryChange = (cat: ProductCategory | 'All') => {
    onNavigate({ page: 'shop', category: cat, pageNumber: 1 });
  };

  const handleResetFilters = () => {
    setMaxPrice(1000);
    setInStockOnly(false);
    setSortBy('default');
    onSearchChange('');
    onNavigate({ page: 'shop', category: 'All', pageNumber: 1 });
  };

  const allCategoryTabs: {
    id: ProductCategory | 'All';
    labelEn: string;
    labelAr: string;
    count: number;
  }[] = [
    {
      id: 'All',
      labelEn: 'All Products',
      labelAr: 'كل المنتجات',
      count: PRODUCTS.length,
    },
    ...CATEGORIES.map((c) => ({
      id: c.id,
      labelEn: c.name,
      labelAr: c.nameAr,
      count: PRODUCTS.filter(
        (p) => p.category === c.id || p.secondaryCategory === c.id
      ).length,
    })),
    {
      id: 'Bundles',
      labelEn: 'Value Bundles',
      labelAr: 'مجموعات التوفير',
      count: PRODUCTS.filter(
        (p) => p.category === 'Bundles' || p.secondaryCategory === 'Bundles'
      ).length,
    },
  ];

  return (
    <div className="pb-20">
      {/* Top Category Banner & Breadcrumb Header */}
      <section
        className={`border-b py-10 ${
          darkMode
            ? 'bg-[#161413] border-[#2C2826]'
            : 'bg-gradient-to-r from-[#FBF3F3] via-[#FAF8F5] to-[#F3ECE4] border-[#E6E1DA]'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#9E2432] mb-2">
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate({ page: 'home' });
                  }}
                  className="hover:underline"
                >
                  {lang === 'ar' ? 'الرئيسية' : 'Home'}
                </a>
                <span>/</span>
                <span>{lang === 'ar' ? 'المتجر' : 'Shop'}</span>
                {selectedCategory !== 'All' && (
                  <>
                    <span>/</span>
                    <span>{selectedCategory}</span>
                  </>
                )}
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold">
                {selectedCategory === 'All'
                  ? lang === 'ar'
                    ? 'متجر إيرا كير وتيرسس الكامل (72 منتج)'
                    : 'Era Care & Tersus Complete Catalog'
                  : selectedCategory}
              </h1>
            </div>

            {/* Quick Category Pills Bar */}
            <div className="flex flex-wrap gap-2">
              {allCategoryTabs.map((tab) => {
                const active = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleCategoryChange(tab.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      active
                        ? 'bg-[#9E2432] text-white shadow-xs'
                        : darkMode
                        ? 'bg-[#221F1D] text-[#E6E1DA] hover:bg-[#2E2A27]'
                        : 'bg-white border border-[#D5CEC6] text-[#181615] hover:border-[#9E2432]'
                    }`}
                  >
                    <span>{lang === 'ar' ? tab.labelAr : tab.labelEn}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded text-[10px] tabular-nums ${
                        active
                          ? 'bg-white/20 text-white'
                          : 'bg-[#F3ECE7] text-[#181615]'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Shop Grid + Left Filter Sidebar */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Filter Sidebar (3 cols on desktop) */}
          <aside
            className={`lg:col-span-3 rounded-2xl border p-6 space-y-6 lg:sticky lg:top-32 ${
              darkMode
                ? 'bg-[#1A1817] border-[#2E2A27]'
                : 'bg-white border-[#E6E1DA]'
            }`}
          >
            <div className="flex items-center justify-between border-b border-[#E6E1DA] dark:border-[#2C2826] pb-3">
              <div className="flex items-center gap-2 font-bold text-sm">
                <SlidersHorizontal className="w-4 h-4 text-[#9E2432]" />
                <span>
                  {lang === 'ar' ? 'تصفية المنتجات' : 'Filter Products'}
                </span>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#9E2432] hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{lang === 'ar' ? 'إعادة ضبط' : 'Reset'}</span>
              </button>
            </div>

            {/* Search Within Shop */}
            <div className="space-y-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#4A4643] dark:text-[#B8B0A8]">
                {lang === 'ar' ? 'بحث بالاسم أو المكون' : 'Search by Name or Active'}
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4643]" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={
                    lang === 'ar'
                      ? 'نياسيناميد، روزماري، شيا...'
                      : 'Niacinamide, Rosemary, Shea...'
                  }
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#D5CEC6] bg-[#FAF8F5] text-[#181615] font-medium"
                />
              </div>
            </div>

            {/* Filter by Price Slider */}
            <div className="space-y-2 pt-2 border-t border-[#E6E1DA] dark:border-[#2C2826]">
              <div className="flex items-center justify-between text-xs font-bold">
                <span>{lang === 'ar' ? 'السعر الأقصى' : 'Filter by Price'}</span>
                <span className="text-[#9E2432] tabular-nums">
                  Up to {formatPriceEGP(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={1000}
                step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#9E2432] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#4A4643] dark:text-[#B8B0A8] font-medium tabular-nums">
                <span>50 EGP</span>
                <span>1,000 EGP</span>
              </div>
            </div>

            {/* Stock Status Filter */}
            <div className="space-y-2 pt-2 border-t border-[#E6E1DA] dark:border-[#2C2826]">
              <span className="block text-xs font-extrabold uppercase tracking-wider text-[#4A4643] dark:text-[#B8B0A8]">
                {lang === 'ar' ? 'حالة التوفر' : 'Stock Status'}
              </span>
              <label className="flex items-center gap-2.5 text-xs font-bold cursor-pointer py-1">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 accent-[#9E2432] rounded"
                />
                <span>
                  {lang === 'ar'
                    ? 'المنتجات المتوفرة فقط (In Stock)'
                    : 'In Stock Only (Hide Sold Out)'}
                </span>
              </label>
            </div>

            {/* Department List */}
            <div className="space-y-2 pt-2 border-t border-[#E6E1DA] dark:border-[#2C2826]">
              <span className="block text-xs font-extrabold uppercase tracking-wider text-[#4A4643] dark:text-[#B8B0A8]">
                {lang === 'ar' ? 'الأقسام' : 'Product Categories'}
              </span>
              <ul className="space-y-1">
                {allCategoryTabs.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => handleCategoryChange(c.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        selectedCategory === c.id
                          ? 'bg-[#9E2432] text-white'
                          : darkMode
                          ? 'text-[#E6E1DA] hover:bg-[#24201E]'
                          : 'text-[#181615] hover:bg-[#F3ECE7]'
                      }`}
                    >
                      <span>{lang === 'ar' ? c.labelAr : c.labelEn}</span>
                      <span className="tabular-nums opacity-80">({c.count})</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Right Product Catalog Area (9 cols on desktop) */}
          <div className="lg:col-span-9 space-y-6">
            {/* Toolbar: Showing X–Y of Z results, Per-Page selector, Sort selector */}
            <div
              className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-4 ${
                darkMode
                  ? 'bg-[#1A1817] border-[#2E2A27]'
                  : 'bg-white border-[#E6E1DA]'
              }`}
            >
              <p className="text-xs sm:text-sm font-bold">
                {lang === 'ar' ? (
                  <>
                    عرض {pagination.startIndex}–{pagination.endIndex} من أصل{' '}
                    <span className="text-[#9E2432]">{filteredProducts.length}</span> منتج
                  </>
                ) : (
                  <>
                    Showing{' '}
                    <span className="tabular-nums">
                      {pagination.startIndex}–{pagination.endIndex}
                    </span>{' '}
                    of{' '}
                    <span className="text-[#9E2432] tabular-nums">
                      {filteredProducts.length}
                    </span>{' '}
                    results
                  </>
                )}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                {/* Show 12 / 24 / 36 / 72 selector (matches original screenshot) */}
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <span className="text-[#4A4643] dark:text-[#B8B0A8]">Show:</span>
                  {[12, 24, 36, 72].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => {
                        setPerPage(num);
                        onNavigate({
                          page: 'shop',
                          category: selectedCategory,
                          pageNumber: 1,
                        });
                      }}
                      className={`px-2 py-1 rounded text-xs font-bold tabular-nums cursor-pointer ${
                        perPage === num
                          ? 'bg-[#9E2432] text-white'
                          : darkMode
                          ? 'bg-[#24201E] text-[#E6E1DA]'
                          : 'bg-[#F3ECE7] text-[#181615] hover:bg-[#E5DDD4]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                {/* Grid Density Toggle */}
                <div className="hidden md:flex items-center gap-1 border-x border-[#E6E1DA] dark:border-[#2C2826] px-3">
                  <button
                    type="button"
                    onClick={() => setGridCols(3)}
                    title="3 Columns"
                    className={`p-1.5 rounded cursor-pointer ${
                      gridCols === 3
                        ? 'bg-[#181615] text-white'
                        : 'text-[#4A4643]'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setGridCols(4)}
                    title="4 Columns"
                    className={`px-2 py-1 rounded text-xs font-bold cursor-pointer ${
                      gridCols === 4
                        ? 'bg-[#181615] text-white'
                        : 'text-[#4A4643]'
                    }`}
                  >
                    4×
                  </button>
                </div>

                {/* Sort Dropdown */}
                <select
                  aria-label="Sort products"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-2 rounded-lg border border-[#D5CEC6] bg-[#FAF8F5] text-[#181615] text-xs font-bold"
                >
                  <option value="default">
                    {lang === 'ar' ? 'الترتيب الافتراضي' : 'Default sorting'}
                  </option>
                  <option value="popularity">
                    {lang === 'ar' ? 'الأكثر مبيعاً' : 'Sort by popularity'}
                  </option>
                  <option value="rating">
                    {lang === 'ar' ? 'الأعلى تقييماً' : 'Sort by average rating'}
                  </option>
                  <option value="price-asc">
                    {lang === 'ar'
                      ? 'السعر: من الأقل للأعلى'
                      : 'Sort by price: low to high'}
                  </option>
                  <option value="price-desc">
                    {lang === 'ar'
                      ? 'السعر: من الأعلى للأقل'
                      : 'Sort by price: high to low'}
                  </option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {pagination.items.length === 0 ? (
              <div
                className={`p-12 rounded-2xl border text-center space-y-4 ${
                  darkMode
                    ? 'bg-[#1A1817] border-[#2E2A27]'
                    : 'bg-white border-[#E6E1DA]'
                }`}
              >
                <p className="font-serif text-2xl font-bold">
                  {lang === 'ar'
                    ? 'لا توجد منتجات مطابقة للبحث الحالي'
                    : 'No products match your current filter'}
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-lg bg-[#9E2432] text-white text-xs font-bold cursor-pointer"
                >
                  {lang === 'ar' ? 'عرض جميع المنتجات (72)' : 'Reset All Filters'}
                </button>
              </div>
            ) : (
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 ${
                  gridCols === 3 ? 'xl:grid-cols-3' : 'xl:grid-cols-4'
                } gap-5`}
              >
                {pagination.items.map((product) => (
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
            )}

            {/* Pagination Bar */}
            {pagination.totalPages > 1 && (
              <div className="pt-6 flex items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={pagination.currentPage <= 1}
                  onClick={() =>
                    onNavigate({
                      page: 'shop',
                      category: selectedCategory,
                      pageNumber: pagination.currentPage - 1,
                    })
                  }
                  className="p-2.5 rounded-lg border border-[#D5CEC6] bg-white text-[#181615] disabled:opacity-40 hover:border-[#9E2432] cursor-pointer"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: pagination.totalPages }).map((_, i) => {
                  const pNum = i + 1;
                  const active = pNum === pagination.currentPage;
                  return (
                    <button
                      key={pNum}
                      type="button"
                      onClick={() =>
                        onNavigate({
                          page: 'shop',
                          category: selectedCategory,
                          pageNumber: pNum,
                        })
                      }
                      className={`w-10 h-10 rounded-lg text-xs font-extrabold tabular-nums transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#9E2432] text-white shadow-xs'
                          : 'bg-white border border-[#D5CEC6] text-[#181615] hover:border-[#9E2432]'
                      }`}
                    >
                      {pNum}
                    </button>
                  );
                })}

                <button
                  type="button"
                  disabled={pagination.currentPage >= pagination.totalPages}
                  onClick={() =>
                    onNavigate({
                      page: 'shop',
                      category: selectedCategory,
                      pageNumber: pagination.currentPage + 1,
                    })
                  }
                  className="p-2.5 rounded-lg border border-[#D5CEC6] bg-white text-[#181615] disabled:opacity-40 hover:border-[#9E2432] cursor-pointer"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
