import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS } from '../data/catalog';
import { GOVERNORATES_STORES } from '../data/storesAndContent';
import {
  parseRoute,
  buildRouteUrl,
  formatPageCanonicalUrl,
  formatPriceEGP,
  filterProducts,
  paginateProducts,
  addToCart,
  updateCartQty,
  calculateCartTotals,
  filterGovernorateStores,
  getTotalBranchesCount,
  validateJoinBeautyForm,
  validateBlogComment,
} from './storeLogic';

describe('URL Routing & Dedicated Page Links', () => {
  it('parses dedicated routes and query parameters accurately', () => {
    assert.deepEqual(parseRoute('/'), { page: 'home' });
    assert.deepEqual(parseRoute('/shop', '?category=Skincare&page=2'), {
      page: 'shop',
      category: 'Skincare',
      pageNumber: 2,
    });
    assert.deepEqual(parseRoute('/product/glycolic-acid-serum'), {
      page: 'product',
      slug: 'glycolic-acid-serum',
    });
    assert.deepEqual(parseRoute('/stores', '?gov=sohag'), {
      page: 'stores',
      govId: 'sohag',
    });
    assert.deepEqual(parseRoute('/blog'), { page: 'blog' });
    assert.deepEqual(
      parseRoute('/minimalist-japanese-inspired-furniture/'),
      {
        page: 'blog-post',
        slug: 'the-science-behind-radiant-skin-why-quality-ingredients-matter',
      }
    );
    assert.deepEqual(parseRoute('/about-us'), { page: 'about-us' });
    assert.deepEqual(parseRoute('/contact-us'), { page: 'contact-us' });
  });

  it('builds canonical URLs for every page and product', () => {
    assert.equal(buildRouteUrl({ page: 'home' }), '/');
    assert.equal(
      buildRouteUrl({ page: 'shop', category: 'Haircare', pageNumber: 2 }),
      '/shop?category=Haircare&page=2'
    );
    assert.equal(
      buildRouteUrl({ page: 'product', slug: 'body-lotion' }),
      '/product/body-lotion'
    );
    assert.equal(
      formatPageCanonicalUrl({ page: 'about-us' }),
      'https://eracare-eg.com/about-us'
    );
  });
});

describe('Product Catalog Filtering & Pagination', () => {
  it('contains 72 products and filters by category and stock status', () => {
    assert.equal(PRODUCTS.length, 72);
    const skincare = filterProducts(PRODUCTS, { category: 'Skincare' });
    assert.ok(skincare.length >= 15);

    const inStockOnly = filterProducts(PRODUCTS, { inStockOnly: true });
    assert.ok(inStockOnly.every((p) => p.inStock));

    const searchRes = filterProducts(PRODUCTS, { searchQuery: 'Glycolic' });
    assert.ok(searchRes.some((p) => p.slug === 'glycolic-acid-serum'));
  });

  it('paginates products accurately with safe bounds', () => {
    const page1 = paginateProducts(PRODUCTS, 1, 24);
    assert.equal(page1.items.length, 24);
    assert.equal(page1.totalPages, 3);
    assert.equal(page1.startIndex, 1);
    assert.equal(page1.endIndex, 24);
  });

  it('formats single and ranged EGP prices properly', () => {
    assert.equal(formatPriceEGP(185), '185.00 EGP');
    assert.equal(formatPriceEGP(215, 225), '215.00 EGP – 225.00 EGP');
  });
});

describe('Cart Operations & Promo Math', () => {
  it('adds in-stock items, blocks out-of-stock items, and computes totals & promo discounts', () => {
    const inStockProduct = PRODUCTS.find((p) => p.inStock)!;
    const soldOutProduct = PRODUCTS.find((p) => !p.inStock)!;
    const unitPrice = inStockProduct.price;

    let cart = addToCart([], soldOutProduct, 1);
    assert.equal(cart.length, 0);

    cart = addToCart(cart, inStockProduct, 2);
    assert.equal(cart.length, 1);
    assert.equal(cart[0].quantity, 2);

    const totalsNoPromo = calculateCartTotals(cart);
    assert.equal(totalsNoPromo.subtotal, unitPrice * 2);
    assert.equal(totalsNoPromo.shippingFee, 65);
    assert.equal(totalsNoPromo.total, unitPrice * 2 + 65);

    // Increase quantity to exceed 750 EGP free shipping threshold
    cart = updateCartQty(cart, inStockProduct.id, 12);
    const expectedSub = unitPrice * 12;
    const expectedDisc = Math.round(expectedSub * 0.15 * 100) / 100;
    const totalsWithPromo = calculateCartTotals(cart, 'ERACARE15');
    assert.equal(totalsWithPromo.subtotal, expectedSub);
    assert.equal(totalsWithPromo.discountAmount, expectedDisc);
    assert.equal(totalsWithPromo.shippingFee, 0);
    assert.equal(totalsWithPromo.total, expectedSub - expectedDisc);
  });
});

describe('Stores Governorate Search & Forms', () => {
  it('filters Egyptian governorates and branches by Arabic or English query', () => {
    const totalBranches = getTotalBranchesCount(GOVERNORATES_STORES);
    assert.ok(totalBranches >= 39);

    const sohagOnly = filterGovernorateStores(GOVERNORATES_STORES, 'sohag');
    assert.equal(sohagOnly.length, 1);
    assert.equal(sohagOnly[0].branches.length, 7);

    const maadiSearch = filterGovernorateStores(
      GOVERNORATES_STORES,
      'all',
      'المعادي'
    );
    assert.equal(maadiSearch.length, 1);
    assert.equal(maadiSearch[0].id, 'cairo');
  });

  it('validates Contact Us Join Beauty form and Blog comments', () => {
    const invalidPhone = validateJoinBeautyForm({
      fullName: 'سارة أحمد',
      phone: '123',
      governorate: 'القاهرة',
      address: 'المعادي شارع 9',
      favoriteProducts: 'Body Mist',
      socialFollowing: 'Yes',
    });
    assert.equal(invalidPhone.valid, false);

    const validForm = validateJoinBeautyForm({
      fullName: 'سارة أحمد',
      phone: '01070222665',
      governorate: 'القاهرة',
      address: 'المعادي شارع 9',
      favoriteProducts: 'Body Mist',
      socialFollowing: 'Yes',
    });
    assert.equal(validForm.valid, true);

    const validComment = validateBlogComment({
      author: 'Nourhan',
      email: 'nourhan@example.com',
      comment: 'Amazing cleanser for sensitive skin!',
    });
    assert.equal(validComment.valid, true);
  });
});
