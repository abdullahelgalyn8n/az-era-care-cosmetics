import React, { useState } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  Globe,
  Link2,
  Check,
  Sun,
  Moon,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import {
  PageId,
  RouteState,
  buildRouteUrl,
  formatPageCanonicalUrl,
  formatPriceEGP,
} from '../utils/storeLogic';

interface HeaderProps {
  route: RouteState;
  onNavigate: (nextRoute: RouteState) => void;
  cartCount: number;
  cartSubtotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  lang: 'en' | 'ar';
  onToggleLang: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  route,
  onNavigate,
  cartCount,
  cartSubtotal,
  wishlistCount,
  onOpenCart,
  searchQuery,
  onSearchChange,
  lang,
  onToggleLang,
  darkMode,
  onToggleDarkMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const navItems: { id: PageId; labelEn: string; labelAr: string; path: string }[] = [
    { id: 'home', labelEn: 'Home', labelAr: 'الرئيسية', path: '/' },
    { id: 'shop', labelEn: 'Shop', labelAr: 'المتجر (72)', path: '/shop' },
    { id: 'stores', labelEn: 'Stores', labelAr: 'فروعنا (39)', path: '/stores' },
    { id: 'blog', labelEn: 'Blog', labelAr: 'المدونة', path: '/blog' },
    { id: 'about-us', labelEn: 'About Us', labelAr: 'من نحن', path: '/about-us' },
    { id: 'contact-us', labelEn: 'Contact Us', labelAr: 'تواصل معنا', path: '/contact-us' },
  ];

  const canonicalUrl = formatPageCanonicalUrl(route);
  const currentPath = buildRouteUrl(route);

  const handleCopyUrl = () => {
    const fullUrl =
      typeof window !== 'undefined'
        ? `${window.location.origin}${currentPath}`
        : canonicalUrl;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullUrl).catch(() => {});
    }
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2200);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate({ page: 'shop', category: 'All', pageNumber: 1 });
    setSearchOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        darkMode
          ? 'bg-[#121110]/95 text-[#F7F4F0] border-b border-[#2C2826]'
          : 'bg-[#FAF8F5]/95 text-[#181615] border-b border-[#E6E1DA]'
      } backdrop-blur-md`}
    >
      {/* Top High-Contrast Announcement Strip */}
      <div className="bg-[#181615] text-[#FAF8F5] text-xs py-2 px-4 border-b border-[#2D2926]">
        <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#F4A29D] shrink-0" />
            <span>
              {lang === 'ar'
                ? 'شحن مجاني للطلبات فوق 750 ج.م — استخدمي كود ERACARE15 لخصم 15% فوري'
                : 'Free Shipping on orders over 750 EGP — Use code ERACARE15 for 15% OFF'}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-5 text-[11px] text-[#E6E1DA]">
            <button
              type="button"
              onClick={() => onNavigate({ page: 'stores' })}
              className="inline-flex items-center gap-1 hover:text-[#F4A29D] transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#F4A29D]" />
              <span>
                {lang === 'ar'
                  ? '39 فرعاً في 21 محافظة مصرية'
                  : '39 Branches across 21 Egyptian Governorates'}
              </span>
            </button>
            <span className="opacity-30">|</span>
            <span>Hotline: 01070222665</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <BrandLogo
          variant={darkMode ? 'light' : 'dark'}
          size="md"
          onClick={() => onNavigate({ page: 'home' })}
        />

        {/* Desktop Nav Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-1 xl:gap-2"
        >
          {navItems.map((item) => {
            const isActive =
              route.page === item.id ||
              (item.id === 'shop' && route.page === 'product') ||
              (item.id === 'blog' && route.page === 'blog-post');

            return (
              <a
                key={item.id}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate({ page: item.id });
                }}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? darkMode
                      ? 'bg-[#9E2432] text-white shadow-xs'
                      : 'bg-[#9E2432] text-white shadow-xs'
                    : darkMode
                    ? 'text-[#E6E1DA] hover:text-white hover:bg-[#24201E]'
                    : 'text-[#181615] hover:text-[#9E2432] hover:bg-[#F3ECE7]'
                }`}
              >
                {lang === 'ar' ? item.labelAr : item.labelEn}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Search, Language, Theme Contrast, Wishlist, Cart */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Desktop inline search input */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden xl:flex items-center relative"
          >
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (route.page !== 'shop') {
                  onNavigate({ page: 'shop', category: 'All', pageNumber: 1 });
                }
              }}
              placeholder={
                lang === 'ar'
                  ? 'ابحثي عن سيروم، شامبو، بادي ميست...'
                  : 'Search serums, cleansers, mists...'
              }
              aria-label="Search catalog"
              className={`w-56 focus:w-64 transition-all duration-200 pl-9 pr-3 py-2 text-xs rounded-lg border font-medium focus:outline-none ${
                darkMode
                  ? 'bg-[#1D1A19] border-[#383330] text-[#F7F4F0] placeholder-[#9E9690] focus:border-[#F4A29D]'
                  : 'bg-white border-[#D5CEC6] text-[#181615] placeholder-[#68625E] focus:border-[#9E2432]'
              }`}
            />
            <Search
              className={`w-4 h-4 absolute left-3 pointer-events-none ${
                darkMode ? 'text-[#9E9690]' : 'text-[#4A4643]'
              }`}
            />
          </form>

          {/* Mobile/Tablet Search toggle */}
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Toggle product search"
            className={`xl:hidden p-2 rounded-lg border transition-colors cursor-pointer ${
              darkMode
                ? 'border-[#383330] text-[#F7F4F0] hover:bg-[#24201E]'
                : 'border-[#D5CEC6] text-[#181615] hover:bg-[#F2ECE7]'
            }`}
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Language Switcher */}
          <button
            type="button"
            onClick={onToggleLang}
            className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-2 rounded-lg border text-xs font-bold transition-colors cursor-pointer ${
              darkMode
                ? 'border-[#383330] text-[#F7F4F0] hover:bg-[#24201E]'
                : 'border-[#D5CEC6] bg-white text-[#181615] hover:border-[#9E2432] hover:text-[#9E2432]'
            }`}
            title="Switch Language (English / العربية)"
          >
            <Globe className="w-3.5 h-3.5 text-[#9E2432] hidden sm:inline" />
            <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
          </button>

          {/* Light / Dark Mode Contrast Toggle */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            aria-label={darkMode ? 'Switch to High-Contrast Light Mode' : 'Switch to Dark Mode'}
            title={
              darkMode
                ? 'الوضع الفاتح عالي التباين / High-Contrast White Mode'
                : 'الوضع الداكن / Dark Mode'
            }
            className={`hidden sm:inline-flex p-2 rounded-lg border transition-colors cursor-pointer ${
              darkMode
                ? 'border-[#383330] bg-[#1D1A19] text-[#F4A29D] hover:bg-[#282422]'
                : 'border-[#D5CEC6] bg-white text-[#181615] hover:border-[#9E2432] hover:text-[#9E2432]'
            }`}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Wishlist Count Indicator */}
          <button
            type="button"
            onClick={() => onNavigate({ page: 'shop' })}
            aria-label="Wishlist items"
            className={`hidden sm:inline-flex relative p-2 rounded-lg border transition-colors cursor-pointer ${
              darkMode
                ? 'border-[#383330] bg-[#1D1A19] text-[#F7F4F0] hover:bg-[#282422]'
                : 'border-[#D5CEC6] bg-white text-[#181615] hover:border-[#9E2432]'
            }`}
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#9E2432] text-white text-[10px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button with Tabular EGP Subtotal */}
          <button
            type="button"
            onClick={onOpenCart}
            data-testid="open-cart-button"
            className="inline-flex items-center gap-2 px-2.5 sm:px-3.5 py-2 rounded-lg bg-[#9E2432] hover:bg-[#7F1B27] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              <span
                data-testid="cart-badge-count"
                className="absolute -top-2 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-[#181615] text-white text-[10px] font-bold flex items-center justify-center"
              >
                {cartCount}
              </span>
            </div>
            <span className="hidden sm:inline tabular-nums ml-1">
              {formatPriceEGP(cartSubtotal)}
            </span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className={`lg:hidden p-2 rounded-lg border ${
              darkMode
                ? 'border-[#383330] text-[#F7F4F0]'
                : 'border-[#D5CEC6] text-[#181615]'
            }`}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Dedicated Page URL / Permalink Bar — fulfills user's request for a clear dedicated link for each page */}
      <div
        className={`border-t text-xs py-1.5 px-4 sm:px-6 lg:px-8 ${
          darkMode
            ? 'bg-[#181615] border-[#2C2826] text-[#D6CFC9]'
            : 'bg-[#F3EFEA] border-[#E2DBD2] text-[#2B2725]'
        }`}
      >
        <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-x-auto max-w-full py-0.5">
            <span className="inline-flex items-center gap-1 font-bold text-[#9E2432] shrink-0">
              <Link2 className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'رابط الصفحة:' : 'Page Link:'}</span>
            </span>
            <code
              data-testid="active-page-url"
              dir="ltr"
              className={`px-2 py-0.5 rounded font-mono text-[11px] font-semibold border ${
                darkMode
                  ? 'bg-[#121110] border-[#383330] text-[#F4A29D]'
                  : 'bg-white border-[#D5CEC6] text-[#181615]'
              }`}
            >
              {canonicalUrl}
            </code>
            <button
              type="button"
              onClick={handleCopyUrl}
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer shrink-0 ${
                copiedUrl
                  ? 'bg-[#1D6B43] text-white'
                  : darkMode
                  ? 'bg-[#2C2826] text-white hover:bg-[#9E2432]'
                  : 'bg-[#181615] text-white hover:bg-[#9E2432]'
              }`}
            >
              {copiedUrl ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>{lang === 'ar' ? 'تم نسخ الرابط' : 'Link Copied'}</span>
                </>
              ) : (
                <span>{lang === 'ar' ? 'نسخ الرابط' : 'Copy Link'}</span>
              )}
            </button>
          </div>

          {/* Quick Direct Route Links */}
          <div className="hidden md:flex items-center gap-1.5 text-[11px] font-medium">
            <span className={darkMode ? 'text-[#9E9690]' : 'text-[#4A4643]'}>
              {lang === 'ar' ? 'روابط سريعة:' : 'Direct Routes:'}
            </span>
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                dir="ltr"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate({ page: item.id });
                }}
                className={`px-1.5 py-0.5 rounded font-mono transition-colors ${
                  route.page === item.id
                    ? 'bg-[#9E2432] text-white font-bold'
                    : darkMode
                    ? 'text-[#D6CFC9] hover:text-white hover:bg-[#2C2826]'
                    : 'text-[#3A3532] hover:text-[#9E2432] hover:bg-[#E6DFD5]'
                }`}
              >
                {item.path}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Expandable Search Drawer for Tablet/Mobile */}
      {searchOpen && (
        <div
          className={`xl:hidden px-4 py-3 border-t ${
            darkMode ? 'bg-[#181615] border-[#2C2826]' : 'bg-white border-[#E6E1DA]'
          }`}
        >
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (route.page !== 'shop') {
                  onNavigate({ page: 'shop', category: 'All', pageNumber: 1 });
                }
              }}
              placeholder={
                lang === 'ar'
                  ? 'ابحثي في 72 منتج من إيرا كير وتيرسس...'
                  : 'Search all 72 Era Care & Tersus products...'
              }
              className={`flex-1 px-3.5 py-2 text-sm rounded-lg border ${
                darkMode
                  ? 'bg-[#121110] border-[#383330] text-white'
                  : 'bg-[#FAF8F5] border-[#D5CEC6] text-[#181615]'
              }`}
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#9E2432] text-white text-xs font-bold"
            >
              {lang === 'ar' ? 'بحث' : 'Search'}
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-t px-4 py-4 space-y-2 ${
            darkMode ? 'bg-[#181615] border-[#2C2826]' : 'bg-white border-[#E6E1DA]'
          }`}
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.path}
              onClick={(e) => {
                e.preventDefault();
                onNavigate({ page: item.id });
                setMobileMenuOpen(false);
              }}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-bold ${
                route.page === item.id
                  ? 'bg-[#9E2432] text-white'
                  : darkMode
                  ? 'text-[#F7F4F0] hover:bg-[#24201E]'
                  : 'text-[#181615] hover:bg-[#F3ECE7]'
              }`}
            >
              <span>{lang === 'ar' ? item.labelAr : item.labelEn}</span>
              <span className="font-mono text-xs opacity-75">{item.path}</span>
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
