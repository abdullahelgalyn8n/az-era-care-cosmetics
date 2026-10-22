import React, { useState } from 'react';
import {
  Star,
  ShoppingBag,
  Heart,
  Check,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowLeft,
  Share2,
} from 'lucide-react';
import { PRODUCTS, Product } from '../data/catalog';
import { formatPriceEGP, RouteState } from '../utils/storeLogic';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (route: RouteState) => void;
  onAddToCart: (product: Product, qty: number) => void;
  onQuickView: (product: Product) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  lang: 'en' | 'ar';
  darkMode: boolean;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug,
  onNavigate,
  onAddToCart,
  onQuickView,
  wishlist,
  onToggleWishlist,
  lang,
  darkMode,
}) => {
  const product =
    PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAdd = () => {
    if (!product.inStock) return;
    onAddToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleShareLink = () => {
    const url = `${window.location.origin}/product/${product.slug}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Breadcrumb + Back to Shop */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold">
          <button
            type="button"
            onClick={() =>
              onNavigate({
                page: 'shop',
                category: product.category,
                pageNumber: 1,
              })
            }
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D5CEC6] bg-white text-[#181615] hover:border-[#9E2432] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'العودة للمتجر' : 'Back to Shop'}</span>
          </button>
          <span className="text-[#9E2432]">{product.category}</span>
          <span>/</span>
          <span className="truncate max-w-xs">
            {lang === 'ar' ? product.nameAr : product.name}
          </span>
        </div>

        <button
          type="button"
          onClick={handleShareLink}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FBF3F3] border border-[#E8D2D4] text-[#9E2432] text-xs font-bold cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>
            {copiedLink
              ? lang === 'ar'
                ? 'تم نسخ رابط المنتج!'
                : 'Product URL Copied!'
              : `/product/${product.slug}`}
          </span>
        </button>
      </div>

      {/* Main Product Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Product Studio Gallery */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl overflow-hidden border border-[#E6E1DA] bg-[#F5F3EF] aspect-[4/5] relative shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {(!product.inStock || product.badge) && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded bg-[#9E2432] text-white text-xs font-extrabold uppercase tracking-wider">
                {!product.inStock ? 'SOLD OUT' : product.badge}
              </span>
            )}
          </div>
        </div>

        {/* Product Details & Purchase Box */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-[#FBF3F3] border border-[#E8D2D4] text-[#9E2432] text-xs font-extrabold uppercase tracking-wider">
                {lang === 'ar' ? product.categoryAr : product.category}
              </span>
              <span className="text-xs font-bold text-[#4A4643] dark:text-[#B8B0A8]">
                Size: {product.size}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              {lang === 'ar' ? product.nameAr : product.name}
            </h1>
            <p className="text-sm font-semibold text-[#4A4643] dark:text-[#B8B0A8]">
              {lang === 'ar' ? product.name : product.nameAr}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex items-center text-[#C87D12]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(product.rating)
                        ? 'fill-[#C87D12] text-[#C87D12]'
                        : 'text-[#D5CEC6]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold">
                {product.rating.toFixed(1)} ({product.reviewCount} verified reviews)
              </span>
            </div>
          </div>

          {/* Price Block */}
          <div className="p-4 rounded-xl bg-[#FBF3F3] dark:bg-[#1E1A19] border border-[#E8D2D4] dark:border-[#383330] flex items-center justify-between">
            <div>
              {product.compareAtPrice && (
                <span className="text-xs line-through text-[#68625E] block tabular-nums">
                  {formatPriceEGP(product.compareAtPrice)}
                </span>
              )}
              <span className="text-2xl sm:text-3xl font-extrabold text-[#9E2432] tabular-nums">
                {formatPriceEGP(product.price, product.maxPrice)}
              </span>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                product.inStock
                  ? 'bg-[#1D6B43]/15 text-[#1D6B43]'
                  : 'bg-[#3A3634] text-white'
              }`}
            >
              {product.inStock
                ? lang === 'ar'
                  ? 'متوفر في الفروع وأونلاين'
                  : 'In Stock — Ready to Ship'
                : lang === 'ar'
                ? 'نفذت الكمية مؤقتاً'
                : 'Out of Stock'}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base leading-relaxed font-medium text-[#2E2A27] dark:text-[#D6CFC9]">
            {lang === 'ar' ? product.shortDescAr : product.shortDesc}
          </p>

          {/* Key Botanical & Clinical Ingredients */}
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#9E2432] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {lang === 'ar'
                  ? 'المكونات الفعالة الرئيسية'
                  : 'Key Active Ingredients'}
              </span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.keyIngredients.map((ing) => (
                <span
                  key={ing}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#221F1D] border border-[#D5CEC6] dark:border-[#383330] text-xs font-bold"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Quantity + Add to Cart Row */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-xl border border-[#D5CEC6] bg-white text-[#181615] h-12">
              <button
                type="button"
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-4 h-full font-bold text-lg hover:bg-[#F3ECE7] cursor-pointer"
              >
                -
              </button>
              <span className="px-4 font-extrabold text-sm tabular-nums">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty(qty + 1)}
                className="px-4 h-full font-bold text-lg hover:bg-[#F3ECE7] cursor-pointer"
              >
                +
              </button>
            </div>

            <button
              type="button"
              disabled={!product.inStock}
              onClick={handleAdd}
              className={`flex-1 min-w-[200px] h-12 rounded-xl font-bold text-sm inline-flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer ${
                !product.inStock
                  ? 'bg-[#D5CEC6] text-[#5C5652] cursor-not-allowed'
                  : added
                  ? 'bg-[#1D6B43] text-white'
                  : 'bg-[#9E2432] hover:bg-[#7F1B27] text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>
                    {lang === 'ar' ? 'تمت الإضافة للسلة!' : 'Added to Shopping Bag!'}
                  </span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {lang === 'ar'
                      ? 'أضيفي إلى حقيبة التسوق'
                      : 'Add to Shopping Bag'}
                  </span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onToggleWishlist(product.id)}
              aria-label="Add to Wishlist"
              className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors cursor-pointer ${
                wishlist.includes(product.id)
                  ? 'bg-[#9E2432] border-[#9E2432] text-white'
                  : 'bg-white border-[#D5CEC6] text-[#181615] hover:border-[#9E2432]'
              }`}
            >
              <Heart className="w-5 h-5 fill-current" />
            </button>
          </div>

          {/* How to Use Card */}
          <div
            className={`p-5 rounded-xl border space-y-2 ${
              darkMode
                ? 'bg-[#1A1817] border-[#2E2A27]'
                : 'bg-white border-[#E6E1DA]'
            }`}
          >
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#9E2432]">
              {lang === 'ar' ? 'طريقة الاستخدام الصحيحة' : 'How to Use'}
            </h4>
            <p className="text-xs sm:text-sm leading-relaxed font-medium">
              {lang === 'ar' ? product.howToUseAr : product.howToUse}
            </p>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold">
            <div className="flex items-center gap-2 p-3 rounded-lg border border-[#E6E1DA] bg-white text-[#181615]">
              <ShieldCheck className="w-4 h-4 text-[#1D6B43] shrink-0" />
              <span>EDA Licensed • Paraben & Sulfate Free</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg border border-[#E6E1DA] bg-white text-[#181615]">
              <Truck className="w-4 h-4 text-[#9E2432] shrink-0" />
              <span>Available across all 39 Egypt Branches</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="pt-8 border-t border-[#E6E1DA] dark:border-[#2C2826] space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold">
          {lang === 'ar'
            ? 'منتجات مكملة لروتينك'
            : 'Complete Your Routine'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((rel) => (
            <ProductCard
              key={rel.id}
              product={rel}
              onNavigate={onNavigate}
              onAddToCart={(p) => onAddToCart(p, 1)}
              onQuickView={onQuickView}
              isWishlisted={wishlist.includes(rel.id)}
              onToggleWishlist={onToggleWishlist}
              lang={lang}
              darkMode={darkMode}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
