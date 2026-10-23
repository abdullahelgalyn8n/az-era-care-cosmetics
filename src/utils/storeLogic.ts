import { Product, ProductCategory } from '../data/catalog';
import { GovernorateStores } from '../data/storesAndContent';

export type PageId =
  | 'home'
  | 'shop'
  | 'product'
  | 'stores'
  | 'blog'
  | 'blog-post'
  | 'about-us'
  | 'contact-us';

export interface RouteState {
  page: PageId;
  slug?: string;
  category?: ProductCategory | 'All';
  govId?: string;
  pageNumber?: number;
}

export type SortOption =
  | 'default'
  | 'popularity'
  | 'rating'
  | 'price-asc'
  | 'price-desc';

export interface ShopFilterOptions {
  category?: ProductCategory | 'All';
  searchQuery?: string;
  maxPrice?: number;
  inStockOnly?: boolean;
  sortBy?: SortOption;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartTotals {
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  total: number;
  itemCount: number;
  freeShippingRemaining: number;
}

export const FREE_SHIPPING_THRESHOLD_EGP = 750;
export const STANDARD_SHIPPING_EGP = 65;

/**
 * Parses a browser pathname + search string into a structured RouteState.
 * Also supports legacy URLs from the original site such as `/shop-2/` or `/minimalist-japanese-inspired-furniture/`.
 */
export function parseRoute(pathname: string, search = ''): RouteState {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  const params = new URLSearchParams(search);
  const categoryParam = params.get('category') as ProductCategory | 'All' | null;
  const govParam = params.get('gov') || undefined;
  const pageParam = Number(params.get('page') || '1');
  const pageNumber = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  if (cleanPath === '/' || cleanPath === '/home') {
    return { page: 'home' };
  }

  if (cleanPath === '/shop' || cleanPath === '/shop-2') {
    return {
      page: 'shop',
      category: categoryParam || 'All',
      pageNumber,
    };
  }

  if (cleanPath.startsWith('/product/')) {
    const slug = decodeURIComponent(cleanPath.slice('/product/'.length));
    return { page: 'product', slug };
  }

  if (cleanPath === '/stores') {
    return { page: 'stores', govId: govParam };
  }

  if (cleanPath === '/blog') {
    return { page: 'blog' };
  }

  if (cleanPath.startsWith('/blog/')) {
    const slug = decodeURIComponent(cleanPath.slice('/blog/'.length));
    return { page: 'blog-post', slug };
  }

  if (cleanPath === '/minimalist-japanese-inspired-furniture') {
    return {
      page: 'blog-post',
      slug: 'the-science-behind-radiant-skin-why-quality-ingredients-matter',
    };
  }

  if (cleanPath === '/about-us' || cleanPath === '/about') {
    return { page: 'about-us' };
  }

  if (cleanPath === '/contact-us' || cleanPath === '/contact') {
    return { page: 'contact-us' };
  }

  return { page: 'home' };
}

/**
 * Builds a clean, dedicated URL path for any RouteState.
 */
export function buildRouteUrl(route: RouteState): string {
  const params = new URLSearchParams();

  switch (route.page) {
    case 'home':
      return '/';
    case 'shop': {
      if (route.category && route.category !== 'All') {
        params.set('category', route.category);
      }
      if (route.pageNumber && route.pageNumber > 1) {
        params.set('page', String(route.pageNumber));
      }
      const qs = params.toString();
      return qs ? `/shop?${qs}` : '/shop';
    }
    case 'product':
      return `/product/${encodeURIComponent(route.slug || '')}`;
    case 'stores': {
      if (route.govId && route.govId !== 'all') {
        params.set('gov', route.govId);
      }
      const qs = params.toString();
      return qs ? `/stores?${qs}` : '/stores';
    }
    case 'blog':
      return '/blog';
    case 'blog-post':
      return `/blog/${encodeURIComponent(route.slug || '')}`;
    case 'about-us':
      return '/about-us';
    case 'contact-us':
      return '/contact-us';
    default:
      return '/';
  }
}

/**
 * Formats a display canonical link for the dedicated Page URL bar.
 */
export function formatPageCanonicalUrl(route: RouteState): string {
  const path = buildRouteUrl(route);
  return `https://az-era-care-cosmetics.pages.dev${path === '/' ? '/' : path}`;
}

/**
 * Formats an EGP price (with optional range) in clean tabular format.
 */
export function formatPriceEGP(price: number, maxPrice?: number): string {
  const fmt = (n: number) =>
    n.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  if (maxPrice && maxPrice > price) {
    return `${fmt(price)} EGP – ${fmt(maxPrice)} EGP`;
  }
  return `${fmt(price)} EGP`;
}

/**
 * Filters and sorts products based on category, search query, price ceiling, stock status, and sort option.
 */
export function filterProducts(
  products: Product[],
  options: ShopFilterOptions
): Product[] {
  const {
    category = 'All',
    searchQuery = '',
    maxPrice,
    inStockOnly = false,
    sortBy = 'default',
  } = options;

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filtered = products.filter((p) => {
    if (category && category !== 'All') {
      const matchesCat =
        p.category === category || p.secondaryCategory === category;
      if (!matchesCat) return false;
    }

    if (inStockOnly && !p.inStock) {
      return false;
    }

    if (typeof maxPrice === 'number' && p.price > maxPrice) {
      return false;
    }

    if (normalizedQuery) {
      const searchable = [
        p.name,
        p.nameAr,
        p.category,
        p.categoryAr,
        p.shortDesc,
        p.shortDescAr,
        ...p.keyIngredients,
      ]
        .join(' ')
        .toLowerCase();
      if (!searchable.includes(normalizedQuery)) {
        return false;
      }
    }

    return true;
  });

  const sorted = [...filtered];
  if (sortBy === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    sorted.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
  } else if (sortBy === 'popularity') {
    sorted.sort((a, b) => b.reviewCount - a.reviewCount);
  }

  return sorted;
}

/**
 * Paginates a filtered product list.
 */
export function paginateProducts(
  products: Product[],
  pageNumber: number,
  perPage: number
): {
  items: Product[];
  totalPages: number;
  currentPage: number;
  startIndex: number;
  endIndex: number;
} {
  const safePerPage = Math.max(1, perPage);
  const totalPages = Math.max(1, Math.ceil(products.length / safePerPage));
  const currentPage = Math.min(Math.max(1, pageNumber), totalPages);
  const startIndex = (currentPage - 1) * safePerPage;
  const endIndex = Math.min(startIndex + safePerPage, products.length);
  return {
    items: products.slice(startIndex, endIndex),
    totalPages,
    currentPage,
    startIndex: products.length === 0 ? 0 : startIndex + 1,
    endIndex,
  };
}

/**
 * Cart mutations
 */
export function addToCart(
  cart: CartItem[],
  product: Product,
  qty = 1
): CartItem[] {
  if (!product || !product.inStock || qty <= 0) return cart;
  const existingIndex = cart.findIndex((i) => i.product.id === product.id);
  if (existingIndex > -1) {
    return cart.map((item, idx) =>
      idx === existingIndex
        ? { ...item, quantity: item.quantity + qty }
        : item
    );
  }
  return [...cart, { product, quantity: qty }];
}

export function updateCartQty(
  cart: CartItem[],
  productId: string,
  quantity: number
): CartItem[] {
  if (quantity <= 0) {
    return cart.filter((item) => item.product.id !== productId);
  }
  return cart.map((item) =>
    item.product.id === productId ? { ...item, quantity } : item
  );
}

export function removeFromCart(
  cart: CartItem[],
  productId: string
): CartItem[] {
  return cart.filter((item) => item.product.id !== productId);
}

export function calculateCartTotals(
  cart: CartItem[],
  promoCode = ''
): CartTotals {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const normalizedPromo = promoCode.trim().toUpperCase();
  const discountRate =
    normalizedPromo === 'ERACARE15' || normalizedPromo === 'SHARK15' ? 0.15 : 0;
  const discountAmount = Math.round(subtotal * discountRate * 100) / 100;
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);

  const shippingFee =
    subtotal === 0 || discountedSubtotal >= FREE_SHIPPING_THRESHOLD_EGP
      ? 0
      : STANDARD_SHIPPING_EGP;

  const freeShippingRemaining = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD_EGP - discountedSubtotal
  );

  return {
    subtotal,
    discountAmount,
    shippingFee,
    total: discountedSubtotal + shippingFee,
    itemCount,
    freeShippingRemaining,
  };
}

/**
 * Filters governorates and their branches by governorate ID or search query.
 */
export function filterGovernorateStores(
  stores: GovernorateStores[],
  selectedGovId = 'all',
  searchQuery = ''
): GovernorateStores[] {
  const q = searchQuery.trim().toLowerCase();

  return stores
    .filter((gov) => selectedGovId === 'all' || gov.id === selectedGovId)
    .map((gov) => {
      if (!q) return gov;
      const govMatches =
        gov.nameAr.toLowerCase().includes(q) ||
        gov.nameEn.toLowerCase().includes(q);
      if (govMatches) return gov;

      const matchingBranches = gov.branches.filter(
        (b) =>
          b.addressAr.toLowerCase().includes(q) ||
          b.addressEn.toLowerCase().includes(q) ||
          b.phones.some((p) => p.includes(q))
      );
      return {
        ...gov,
        branches: matchingBranches,
      };
    })
    .filter((gov) => gov.branches.length > 0);
}

export function getTotalBranchesCount(stores: GovernorateStores[]): number {
  return stores.reduce((acc, g) => acc + g.branches.length, 0);
}

/**
 * Form validations
 */
export interface JoinBeautyFormInput {
  fullName: string;
  phone: string;
  governorate: string;
  address: string;
  favoriteProducts: string;
  socialFollowing: string;
}

export function validateJoinBeautyForm(input: JoinBeautyFormInput): {
  valid: boolean;
  error?: string;
} {
  if (!input.fullName || input.fullName.trim().length < 2) {
    return { valid: false, error: 'الرجاء إدخال الاسم بالكامل / Please enter your full name' };
  }
  const cleanPhone = input.phone.replace(/\s+/g, '');
  if (!/^01[0125]\d{8}$/.test(cleanPhone) && cleanPhone.length < 10) {
    return {
      valid: false,
      error: 'الرجاء إدخال رقم هاتف مصري صحيح (11 رقم) / Please enter a valid Egyptian phone number',
    };
  }
  if (!input.governorate || input.governorate.trim().length === 0) {
    return { valid: false, error: 'الرجاء اختيار المحافظة / Please select your governorate' };
  }
  if (!input.address || input.address.trim().length < 3) {
    return { valid: false, error: 'الرجاء إدخال العنوان بالتفصيل / Please enter your detailed address' };
  }
  return { valid: true };
}

export interface BlogCommentInput {
  author: string;
  email: string;
  comment: string;
}

export function validateBlogComment(input: BlogCommentInput): {
  valid: boolean;
  error?: string;
} {
  if (!input.comment || input.comment.trim().length < 3) {
    return { valid: false, error: 'Please write a comment before posting.' };
  }
  if (!input.author || input.author.trim().length < 2) {
    return { valid: false, error: 'Please enter your name.' };
  }
  if (!input.email || !input.email.includes('@')) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }
  return { valid: true };
}
