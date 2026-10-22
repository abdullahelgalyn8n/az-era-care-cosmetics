import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Truck,
  CheckCircle2,
  Tag,
  ShieldCheck,
} from 'lucide-react';
import {
  CartItem,
  calculateCartTotals,
  formatPriceEGP,
  RouteState,
} from '../utils/storeLogic';
import { GOVERNORATES_STORES } from '../data/storesAndContent';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onNavigate: (route: RouteState) => void;
  lang: 'en' | 'ar';
  darkMode?: boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onNavigate,
  lang,
  darkMode = false,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerGov, setCustomerGov] = useState('القاهرة / Cairo');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'instapay'>('cod');
  const [orderRef, setOrderRef] = useState('');
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const totals = calculateCartTotals(cart, appliedPromo);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      promoInput.trim().toUpperCase() === 'ERACARE15' ||
      promoInput.trim().toUpperCase() === 'SHARK15'
    ) {
      setAppliedPromo(promoInput.trim().toUpperCase());
    } else {
      setAppliedPromo('ERACARE15');
      setPromoInput('ERACARE15');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (customerName.trim().length < 2) {
      setFormError(
        lang === 'ar'
          ? 'الرجاء إدخال الاسم بالكامل'
          : 'Please enter your full name'
      );
      return;
    }
    if (customerPhone.trim().length < 10) {
      setFormError(
        lang === 'ar'
          ? 'الرجاء إدخال رقم هاتف صحيح'
          : 'Please enter a valid 11-digit Egyptian phone number'
      );
      return;
    }
    if (customerAddress.trim().length < 4) {
      setFormError(
        lang === 'ar'
          ? 'الرجاء كتابة العنوان بالتفصيل'
          : 'Please enter your delivery street address'
      );
      return;
    }
    setFormError('');
    const randomRef = `ERA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(randomRef);
    onClearCart();
    setCheckoutStep('success');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
    >
      <div
        className={`w-full max-w-md h-full flex flex-col shadow-2xl border-l ${
          darkMode
            ? 'bg-[#161413] text-[#F7F4F0] border-[#2C2826]'
            : 'bg-white text-[#181615] border-[#E6E1DA]'
        }`}
      >
        {/* Drawer Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            darkMode ? 'border-[#2C2826]' : 'border-[#E6E1DA]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#9E2432]" />
            <h2 className="font-serif text-xl font-bold">
              {checkoutStep === 'checkout'
                ? lang === 'ar'
                  ? 'إتمام الطلب'
                  : 'Express Checkout'
                : checkoutStep === 'success'
                ? lang === 'ar'
                  ? 'تم تأكيد طلبك'
                  : 'Order Confirmed'
                : lang === 'ar'
                ? `حقيبة التسوق (${totals.itemCount})`
                : `Shopping Bag (${totals.itemCount})`}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setCheckoutStep('cart');
              onClose();
            }}
            aria-label="Close Cart"
            className="p-2 rounded-lg hover:bg-[#F3ECE7] dark:hover:bg-[#24201E] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        {checkoutStep !== 'success' && cart.length > 0 && (
          <div
            className={`px-6 py-3 border-b text-xs ${
              darkMode
                ? 'bg-[#1E1A19] border-[#2C2826]'
                : 'bg-[#FBF3F3] border-[#E8D2D4]'
            }`}
          >
            <div className="flex items-center gap-2 font-semibold">
              <Truck className="w-4 h-4 text-[#9E2432] shrink-0" />
              {totals.freeShippingRemaining === 0 ? (
                <span className="text-[#1D6B43] font-bold">
                  {lang === 'ar'
                    ? 'مبروك! حصلتِ على شحن مجاني لجميع المحافظات'
                    : 'Unlocked Free Nationwide Shipping!'}
                </span>
              ) : (
                <span>
                  {lang === 'ar'
                    ? `أضيفي منتجات بقيمة ${formatPriceEGP(totals.freeShippingRemaining)} للحصول على شحن مجاني`
                    : `Add ${formatPriceEGP(totals.freeShippingRemaining)} more for Free Nationwide Shipping`}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {checkoutStep === 'success' ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#1D6B43]/15 text-[#1D6B43] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="font-serif text-2xl font-bold">
                {lang === 'ar'
                  ? 'شكراً لثقتك في إيرا كير!'
                  : 'Thank You for Choosing Era Care!'}
              </h3>
              <p className="text-sm text-[#4A4643] dark:text-[#C7BFB8] max-w-xs mx-auto">
                {lang === 'ar'
                  ? `تم تسجيل طلبك رقم ${orderRef} بنجاح. سيتواصل معك فريق خدمة العملاء خلال ساعات لتأكيد موعد التوصيل.`
                  : `Your order ${orderRef} has been confirmed. Our logistics team will contact you shortly for delivery to ${customerGov}.`}
              </p>
              <button
                type="button"
                onClick={() => {
                  setCheckoutStep('cart');
                  onClose();
                }}
                className="px-6 py-3 rounded-lg bg-[#9E2432] text-white text-xs font-bold cursor-pointer"
              >
                {lang === 'ar' ? 'العودة للمتجر' : 'Continue Shopping'}
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <ShoppingBag className="w-12 h-12 mx-auto text-[#9E2432] opacity-75" />
              <p className="font-serif text-xl font-bold">
                {lang === 'ar' ? 'حقيبة التسوق فارغة' : 'Your Shopping Bag is Empty'}
              </p>
              <p className="text-xs text-[#4A4643] dark:text-[#B8B0A8] max-w-xs mx-auto">
                {lang === 'ar'
                  ? 'اكتشفي 72 منتجاً طبيعياً من تيرسس وإيرا كير للعناية بالبشرة والشعر والجسم.'
                  : 'Explore 72 authentic Tersus & Era Care formulations for radiant skin and healthy hair.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigate({ page: 'shop' });
                }}
                className="px-5 py-2.5 rounded-lg bg-[#9E2432] hover:bg-[#7F1B27] text-white text-xs font-bold cursor-pointer"
              >
                {lang === 'ar' ? 'تصفحي المنتجات (72)' : 'Browse All 72 Products'}
              </button>
            </div>
          ) : checkoutStep === 'checkout' ? (
            <form id="checkout-form" onSubmit={handleCompleteOrder} className="space-y-4">
              {formError && (
                <div className="p-3 rounded-lg bg-[#B91C1C]/10 border border-[#B91C1C] text-[#B91C1C] text-xs font-bold">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold mb-1">
                  {lang === 'ar' ? 'الاسم بالكامل *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={lang === 'ar' ? 'مثال: سارة أحمد' : 'e.g. Sara Ahmed'}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5CEC6] text-sm text-[#181615] bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">
                  {lang === 'ar' ? 'رقم الموبايل (واتساب) *' : 'Mobile Number (WhatsApp) *'}
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="010xxxxxxxx"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5CEC6] text-sm text-[#181615] bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">
                  {lang === 'ar' ? 'المحافظة *' : 'Governorate *'}
                </label>
                <select
                  value={customerGov}
                  onChange={(e) => setCustomerGov(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5CEC6] text-sm text-[#181615] bg-white"
                >
                  {GOVERNORATES_STORES.map((g) => (
                    <option key={g.id} value={`${g.nameAr} / ${g.nameEn}`}>
                      {g.nameAr} — {g.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">
                  {lang === 'ar' ? 'العنوان بالتفصيل *' : 'Detailed Street Address *'}
                </label>
                <textarea
                  rows={2}
                  required
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder={
                    lang === 'ar'
                      ? 'اسم الشارع، رقم العقار، علامة مميزة...'
                      : 'Street name, building number, landmark...'
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-[#D5CEC6] text-sm text-[#181615] bg-white"
                />
              </div>

              <div className="pt-2 space-y-2">
                <span className="block text-xs font-bold">
                  {lang === 'ar' ? 'طريقة الدفع' : 'Payment Method'}
                </span>
                <label className="flex items-center gap-2.5 p-3 rounded-lg border border-[#9E2432] bg-[#FBF3F3] text-[#181615] text-xs font-bold cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                  />
                  <span>
                    {lang === 'ar'
                      ? 'الدفع عند الاستلام (Cash on Delivery)'
                      : 'Cash on Delivery (Pay at your doorstep)'}
                  </span>
                </label>
                <label className="flex items-center gap-2.5 p-3 rounded-lg border border-[#D5CEC6] bg-white text-[#181615] text-xs font-bold cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'instapay'}
                    onChange={() => setPaymentMethod('instapay')}
                  />
                  <span>
                    {lang === 'ar'
                      ? 'إنستا باي / فودافون كاش (InstaPay / Wallet)'
                      : 'InstaPay / Vodafone Cash'}
                  </span>
                </label>
              </div>
            </form>
          ) : (
            <>
              {/* Cart Items List */}
              <div className="space-y-3">
                {cart.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className={`flex gap-3 p-3 rounded-xl border ${
                      darkMode
                        ? 'bg-[#1E1C1A] border-[#2C2826]'
                        : 'bg-[#FAF8F5] border-[#E6E1DA]'
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-20 rounded-lg object-cover bg-white shrink-0 border border-[#E6E1DA]"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold truncate">
                        {lang === 'ar' ? product.nameAr : product.name}
                      </h4>
                      <p className="text-xs font-extrabold text-[#9E2432] mt-0.5 tabular-nums">
                        {formatPriceEGP(product.price)}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="inline-flex items-center rounded-lg border border-[#D5CEC6] bg-white text-[#181615]">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(product.id, quantity - 1)}
                            className="p-1.5 hover:bg-[#F3ECE7] cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold tabular-nums">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(product.id, quantity + 1)}
                            className="p-1.5 hover:bg-[#F3ECE7] cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(product.id)}
                          aria-label="Remove item"
                          className="p-1.5 text-[#68625E] hover:text-[#B91C1C] cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="pt-2 flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#9E2432]" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder={
                      lang === 'ar'
                        ? 'كود الخصم (جرّبي ERACARE15)'
                        : 'Promo code (Try ERACARE15)'
                    }
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-[#D5CEC6] bg-white text-[#181615] font-semibold"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-lg bg-[#181615] hover:bg-[#9E2432] text-white text-xs font-bold cursor-pointer"
                >
                  {lang === 'ar' ? 'تطبيق' : 'Apply 15%'}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Drawer Footer Totals & CTA */}
        {cart.length > 0 && checkoutStep !== 'success' && (
          <div
            className={`p-6 border-t space-y-3 ${
              darkMode
                ? 'bg-[#181615] border-[#2C2826]'
                : 'bg-[#FAF8F5] border-[#E6E1DA]'
            }`}
          >
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#4A4643] dark:text-[#B8B0A8]">
                  {lang === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}
                </span>
                <span className="font-bold tabular-nums">
                  {formatPriceEGP(totals.subtotal)}
                </span>
              </div>
              {totals.discountAmount > 0 && (
                <div className="flex justify-between text-[#1D6B43] font-bold">
                  <span>Discount ({appliedPromo})</span>
                  <span className="tabular-nums">
                    -{formatPriceEGP(totals.discountAmount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#4A4643] dark:text-[#B8B0A8]">
                  {lang === 'ar' ? 'الشحن والتوصيل' : 'Shipping'}
                </span>
                <span className="font-bold tabular-nums">
                  {totals.shippingFee === 0
                    ? lang === 'ar'
                      ? 'مجاني'
                      : 'FREE'
                    : formatPriceEGP(totals.shippingFee)}
                </span>
              </div>
              <div className="pt-2 border-t border-[#D5CEC6] dark:border-[#2C2826] flex justify-between text-base font-extrabold">
                <span>{lang === 'ar' ? 'الإجمالي النهائي' : 'Total'}</span>
                <span className="text-[#9E2432] tabular-nums">
                  {formatPriceEGP(totals.total)}
                </span>
              </div>
            </div>

            {checkoutStep === 'cart' ? (
              <button
                type="button"
                onClick={() => setCheckoutStep('checkout')}
                className="w-full py-3.5 rounded-xl bg-[#9E2432] hover:bg-[#7F1B27] text-white text-sm font-bold transition-colors shadow-sm cursor-pointer"
              >
                {lang === 'ar'
                  ? 'إتمام الطلب والدفع عند الاستلام'
                  : 'Proceed to Express Checkout'}
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="px-4 py-3 rounded-xl border border-[#D5CEC6] bg-white text-[#181615] text-xs font-bold cursor-pointer"
                >
                  {lang === 'ar' ? 'رجوع' : 'Back'}
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="flex-1 py-3 rounded-xl bg-[#1D6B43] hover:bg-[#155233] text-white text-sm font-bold shadow-sm cursor-pointer"
                >
                  {lang === 'ar' ? 'تأكيد الطلب الآن' : 'Confirm Order Now'}
                </button>
              </div>
            )}

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#4A4643] dark:text-[#B8B0A8]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1D6B43]" />
              <span>
                {lang === 'ar'
                  ? 'منتجات أصلية 100% من مصنع إيرا كير المرخص'
                  : '100% Authentic Factory-Direct Formulations'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
