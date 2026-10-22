import React from 'react';
import { Star, ShoppingBag, Eye, Heart, Check } from 'lucide-react';
import { Product } from '../data/catalog';
import { formatPriceEGP, RouteState } from '../utils/storeLogic';

interface ProductCardProps {
  product: Product;
  onNavigate: (route: RouteState) => void;
  onAddToCart: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
  lang: 'en' | 'ar';
  darkMode?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onNavigate,
  onAddToCart,
  onQuickView,
  isWishlisted = false,
  onToggleWishlist,
  lang,
  darkMode = false,
}) => {
  const [justAdded, setJustAdded] = React.useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) return;
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const productUrl = `/product/${product.slug}`;

  return (
    <article
      data-testid={`product-card-${product.id}`}
      className={`group flex flex-col rounded-xl border overflow-hidden transition-all duration-200 ${
        darkMode
          ? 'bg-[#1A1817] border-[#2E2A27] hover:border-[#F4A29D]/50'
          : 'bg-white border-[#E6E1DA] hover:border-[#9E2432]/50 hover:shadow-md'
      }`}
    >
      {/* Uniform 4:5 Aspect Ratio Studio Image Container */}
      <div className="relative aspect-[4/5] w-full bg-[#F5F3EF] overflow-hidden">
        <a
          href={productUrl}
          onClick={(e) => {
            e.preventDefault();
            onNavigate({ page: 'product', slug: product.slug });
          }}
          className="block w-full h-full"
        >
          <img
            src={product.image}
            alt={lang === 'ar' ? product.nameAr : product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </a>

        {/* Single Clean Status Badge (Top Left) */}
        {(!product.inStock || product.badge) && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 rounded text-[10px] font-extrabold uppercase tracking-wider shadow-xs ${
              !product.inStock || product.badge === 'SOLD OUT'
                ? 'bg-[#3A3634] text-white'
                : product.badge === 'HOT'
                ? 'bg-[#9E2432] text-white'
                : product.badge === 'BUNDLE'
                ? 'bg-[#1D6B43] text-white'
                : 'bg-[#181615] text-white'
            }`}
          >
            {!product.inStock
              ? lang === 'ar'
                ? 'نفذت الكمية'
                : 'SOLD OUT'
              : product.badge}
          </span>
        )}

        {/* Top-Right Hover Action Buttons (Wishlist & Quick View) */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-95 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
          {onToggleWishlist && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product.id);
              }}
              aria-label="Toggle Wishlist"
              className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm border transition-colors cursor-pointer ${
                isWishlisted
                  ? 'bg-[#9E2432] border-[#9E2432] text-white'
                  : 'bg-white/95 border-[#E6E1DA] text-[#181615] hover:bg-[#9E2432] hover:text-white'
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
            </button>
          )}
          {onQuickView && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              aria-label="Quick View Product"
              className="w-8 h-8 rounded-full bg-white/95 border border-[#E6E1DA] text-[#181615] hover:bg-[#181615] hover:text-white flex items-center justify-center shadow-sm transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Card Body — Strictly 4 Data Points & Aligned Footer */}
      <div className="flex flex-col flex-1 p-4 justify-between gap-3">
        <div className="space-y-1.5">
          {/* 1. Category Eyebrow + Size */}
          <div className="flex items-center justify-between gap-2 text-[11px] font-semibold">
            <span
              className={
                darkMode ? 'text-[#F4A29D]' : 'text-[#9E2432]'
              }
            >
              {lang === 'ar' ? product.categoryAr : product.category}
            </span>
            <span
              className={
                darkMode ? 'text-[#A8A09A]' : 'text-[#4A4643]'
              }
            >
              {product.size}
            </span>
          </div>

          {/* 2. Product Title (2-line clamp for uniform card height) */}
          <h3 className="font-sans font-bold text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
            <a
              href={productUrl}
              onClick={(e) => {
                e.preventDefault();
                onNavigate({ page: 'product', slug: product.slug });
              }}
              className={`transition-colors ${
                darkMode
                  ? 'text-[#F7F4F0] hover:text-[#F4A29D]'
                  : 'text-[#181615] hover:text-[#9E2432]'
              }`}
            >
              {lang === 'ar' ? product.nameAr : product.name}
            </a>
          </h3>

          {/* 3. Rating Row */}
          <div className="flex items-center gap-1 pt-0.5">
            <div className="flex items-center text-[#C87D12]">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  className={`w-3.5 h-3.5 ${
                    idx < Math.round(product.rating)
                      ? 'fill-[#C87D12] text-[#C87D12]'
                      : 'text-[#D5CEC6]'
                  }`}
                />
              ))}
            </div>
            <span
              className={`text-[11px] font-medium tabular-nums ${
                darkMode ? 'text-[#B8B0A8]' : 'text-[#4A4643]'
              }`}
            >
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* 4. Price + Action Button */}
        <div className="pt-2 border-t border-[#ECE7E1] dark:border-[#2C2826] flex items-center justify-between gap-2">
          <div className="flex flex-col">
            {product.compareAtPrice && (
              <span
                className={`text-[11px] line-through tabular-nums ${
                  darkMode ? 'text-[#8C847E]' : 'text-[#6E6762]'
                }`}
              >
                {formatPriceEGP(product.compareAtPrice)}
              </span>
            )}
            <span
              className={`text-sm font-extrabold tabular-nums ${
                darkMode ? 'text-[#F4A29D]' : 'text-[#9E2432]'
              }`}
            >
              {formatPriceEGP(product.price, product.maxPrice)}
            </span>
          </div>

          <button
            type="button"
            disabled={!product.inStock}
            onClick={handleAdd}
            data-testid={`add-to-cart-${product.id}`}
            className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
              !product.inStock
                ? 'bg-[#E6E1DA] text-[#5C5652] cursor-not-allowed'
                : justAdded
                ? 'bg-[#1D6B43] text-white'
                : 'bg-[#181615] hover:bg-[#9E2432] text-white'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'تمت الإضافة' : 'Added'}</span>
              </>
            ) : !product.inStock ? (
              <span>{lang === 'ar' ? 'غير متاح' : 'Sold Out'}</span>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'أضف للسلة' : 'Add'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
