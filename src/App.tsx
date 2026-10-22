/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS, Product } from './data/catalog';
import {
  RouteState,
  parseRoute,
  buildRouteUrl,
  CartItem,
  addToCart,
  updateCartQty,
  removeFromCart,
  calculateCartTotals,
  formatPriceEGP,
} from './utils/storeLogic';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { StoresPage } from './pages/StoresPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [route, setRoute] = useState<RouteState>(() =>
    typeof window !== 'undefined'
      ? parseRoute(window.location.pathname, window.location.search)
      : { page: 'home' }
  );

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('eracare_cart_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore storage errors
    }
    return [
      { product: PRODUCTS[1], quantity: 1 }, // Glycolic Acid Serum preloaded for instant demo
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>([
    'p02',
    'p11',
    'p26',
  ]);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [darkMode, setDarkMode] = useState(false);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('eracare_cart_v1', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Listen to browser Back / Forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseRoute(window.location.pathname, window.location.search));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update document title dynamically based on active route
  useEffect(() => {
    const titles: Record<RouteState['page'], string> = {
      home: 'Era Care Egypt — Made By Care | Official Skincare & Cosmetics Store',
      shop: `Shop ${
        route.category && route.category !== 'All' ? route.category : 'All 72 Products'
      } | Era Care Egypt`,
      product: `Product Details | Era Care Egypt`,
      stores: 'فروعنا (39 Branches across 21 Governorates) | Era Care Egypt',
      blog: 'Skincare & Beauty Journal | Era Care Egypt',
      'blog-post': 'Journal Article | Era Care Egypt',
      'about-us': 'رحلتنا (Our Journey 2019–Today) | Era Care Egypt',
      'contact-us': 'Contact Us & Join Our Beauty Club | Era Care Egypt',
    };
    document.title = titles[route.page] || titles.home;
  }, [route]);

  const handleNavigate = (nextRoute: RouteState) => {
    const nextUrl = buildRouteUrl(nextRoute);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', nextUrl);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setRoute(nextRoute);
  };

  const handleAddToCart = (product: Product, qty = 1) => {
    setCart((prev) => addToCart(prev, product, qty));
  };

  const handleUpdateQty = (productId: string, qty: number) => {
    setCart((prev) => updateCartQty(prev, productId, qty));
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => removeFromCart(prev, productId));
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const totals = calculateCartTotals(cart);

  return (
    <div
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        darkMode
          ? 'bg-[#121110] text-[#F7F4F0]'
          : 'bg-[#FAF8F5] text-[#181615]'
      }`}
    >
      {/* Sticky Header + Dedicated Page Link Bar */}
      <Header
        route={route}
        onNavigate={handleNavigate}
        cartCount={totals.itemCount}
        cartSubtotal={totals.subtotal}
        wishlistCount={wishlist.length}
        onOpenCart={() => setCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        lang={lang}
        onToggleLang={() => setLang((prev) => (prev === 'en' ? 'ar' : 'en'))}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((prev) => !prev)}
      />

      {/* Main Route View */}
      <main className="flex-1">
        {route.page === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onQuickView={(p) => setQuickViewProduct(p)}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            lang={lang}
            darkMode={darkMode}
          />
        )}

        {route.page === 'shop' && (
          <ShopPage
            selectedCategory={route.category || 'All'}
            currentPage={route.pageNumber || 1}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onNavigate={handleNavigate}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onQuickView={(p) => setQuickViewProduct(p)}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            lang={lang}
            darkMode={darkMode}
          />
        )}

        {route.page === 'product' && (
          <ProductDetailPage
            slug={route.slug || PRODUCTS[0].slug}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            lang={lang}
            darkMode={darkMode}
          />
        )}

        {route.page === 'stores' && (
          <StoresPage
            initialGovId={route.govId || 'all'}
            onNavigate={handleNavigate}
            lang={lang}
            darkMode={darkMode}
          />
        )}

        {route.page === 'blog' && (
          <BlogPage
            onNavigate={handleNavigate}
            lang={lang}
            darkMode={darkMode}
          />
        )}

        {route.page === 'blog-post' && (
          <BlogPostPage
            slug={
              route.slug ||
              'the-science-behind-radiant-skin-why-quality-ingredients-matter'
            }
            onNavigate={handleNavigate}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onQuickView={(p) => setQuickViewProduct(p)}
            lang={lang}
            darkMode={darkMode}
          />
        )}

        {route.page === 'about-us' && (
          <AboutPage
            onNavigate={handleNavigate}
            lang={lang}
            darkMode={darkMode}
          />
        )}

        {route.page === 'contact-us' && (
          <ContactPage
            onNavigate={handleNavigate}
            lang={lang}
            darkMode={darkMode}
          />
        )}
      </main>

      {/* Luxury Dark Footer */}
      <Footer onNavigate={handleNavigate} lang={lang} />

      {/* Slide-Over Cart & Express Checkout Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCart([])}
        onNavigate={handleNavigate}
        lang={lang}
        darkMode={darkMode}
      />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white text-[#181615] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E6E1DA] grid grid-cols-1 sm:grid-cols-12">
            <div className="sm:col-span-5 bg-[#F5F3EF] aspect-[4/5] sm:aspect-auto">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="sm:col-span-7 p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded bg-[#FBF3F3] border border-[#E8D2D4] text-[#9E2432] text-xs font-extrabold uppercase">
                    {quickViewProduct.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuickViewProduct(null)}
                    className="p-1.5 rounded-lg hover:bg-[#F3ECE7] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="font-serif text-2xl font-bold">
                  {lang === 'ar'
                    ? quickViewProduct.nameAr
                    : quickViewProduct.name}
                </h3>

                <div className="flex items-center gap-1 text-[#C87D12]">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-3.5 h-3.5 fill-[#C87D12] text-[#C87D12]"
                    />
                  ))}
                  <span className="text-xs font-bold text-[#4A4643] ml-1">
                    ({quickViewProduct.reviewCount} reviews)
                  </span>
                </div>

                <p className="text-xl font-extrabold text-[#9E2432] tabular-nums">
                  {formatPriceEGP(
                    quickViewProduct.price,
                    quickViewProduct.maxPrice
                  )}
                </p>

                <p className="text-xs text-[#4A4643] leading-relaxed font-medium">
                  {lang === 'ar'
                    ? quickViewProduct.shortDescAr
                    : quickViewProduct.shortDesc}
                </p>

                <div className="pt-1">
                  <span className="text-[11px] font-extrabold uppercase text-[#9E2432] flex items-center gap-1 mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Key Actives:</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {quickViewProduct.keyIngredients.map((ing) => (
                      <span
                        key={ing}
                        className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#D5CEC6] text-[11px] font-bold"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-3 border-t border-[#E6E1DA]">
                <button
                  type="button"
                  disabled={!quickViewProduct.inStock}
                  onClick={() => {
                    handleAddToCart(quickViewProduct, 1);
                    setQuickViewProduct(null);
                    setCartOpen(true);
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#9E2432] hover:bg-[#7F1B27] disabled:bg-[#D5CEC6] text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {quickViewProduct.inStock ? 'Add to Bag' : 'Sold Out'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const slug = quickViewProduct.slug;
                    setQuickViewProduct(null);
                    handleNavigate({ page: 'product', slug });
                  }}
                  className="py-2.5 px-4 rounded-xl border border-[#181615] text-[#181615] hover:bg-[#181615] hover:text-white text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Full Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
