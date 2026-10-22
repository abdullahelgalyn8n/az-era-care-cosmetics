import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  ArrowUp,
  MessageCircle,
  Download,
  CheckCircle2,
  ExternalLink,
  X,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { RouteState } from '../utils/storeLogic';
import { ProductCategory } from '../data/catalog';

interface FooterProps {
  onNavigate: (route: RouteState) => void;
  lang: 'en' | 'ar';
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, lang }) => {
  const [installModalOpen, setInstallModalOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories: { labelEn: string; labelAr: string; cat: ProductCategory }[] = [
    { labelEn: 'Baby', labelAr: 'العناية بالطفل', cat: 'Baby' },
    { labelEn: 'Body Care', labelAr: 'العناية بالجسم', cat: 'Body Care' },
    { labelEn: 'Essentials', labelAr: 'الأساسيات', cat: 'Essentials' },
    { labelEn: 'Haircare', labelAr: 'العناية بالشعر', cat: 'Haircare' },
    { labelEn: 'Natural Oils', labelAr: 'الزيوت الطبيعية', cat: 'Natural Oils' },
    { labelEn: 'Skincare', labelAr: 'العناية بالبشرة', cat: 'Skincare' },
  ];

  return (
    <>
      <footer className="bg-[#0F0E0E] text-[#F5F2EE] pt-16 pb-10 border-t border-[#262321] relative">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#262321]">
            {/* Column 1: Brand Identity + Install App Button */}
            <div className="lg:col-span-4 space-y-5">
              <BrandLogo
                variant="light"
                size="lg"
                onClick={() => onNavigate({ page: 'home' })}
              />
              <p className="text-sm text-[#D0C9C2] leading-relaxed max-w-sm">
                {lang === 'ar'
                  ? 'إيرا كير مصر (Era Care) — علامة مصرية رائدة في تصنيع منتجات العناية الطبيعية بالبشرة والشعر والجسم بتركيبات علمية آمنة وأكثر من 39 فرعاً في جميع محافظات مصر.'
                  : 'Era Care Egypt — Authentic botanical skincare, haircare, and body care crafted in our licensed Egyptian factory. Over 39 branches across 21 governorates.'}
              </p>

              {/* Install Your Store Now Button (matching original footer) */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setInstallModalOpen(true)}
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-[#9E2432] hover:bg-[#B82D3D] text-white text-xs font-bold tracking-wide transition-colors shadow-sm cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {lang === 'ar'
                      ? 'ثبّتي متجر إيرا كير الآن'
                      : 'Install your store now'}
                  </span>
                </button>
              </div>

              <div className="space-y-1.5 text-xs text-[#C7BFB8] pt-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#F4A29D]" />
                  <span>01070222665 / 01149558775</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#F4A29D]" />
                  <span>info@eracare-eg.com</span>
                </div>
              </div>
            </div>

            {/* Column 2: Useful Links */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                {lang === 'ar' ? 'روابط هامة' : 'Useful Links'}
              </h3>
              <ul className="space-y-2.5 text-sm text-[#D0C9C2]">
                <li>
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate({ page: 'home' });
                    }}
                    className="hover:text-[#F4A29D] transition-colors"
                  >
                    {lang === 'ar' ? 'الرئيسية (/)' : 'Home'}
                  </a>
                </li>
                <li>
                  <a
                    href="/shop"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate({ page: 'shop' });
                    }}
                    className="hover:text-[#F4A29D] transition-colors"
                  >
                    {lang === 'ar' ? 'المتجر (/shop)' : 'Shop'}
                  </a>
                </li>
                <li>
                  <a
                    href="/stores"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate({ page: 'stores' });
                    }}
                    className="hover:text-[#F4A29D] transition-colors"
                  >
                    {lang === 'ar' ? 'الفروع (/stores)' : 'Stores'}
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate({ page: 'blog' });
                    }}
                    className="hover:text-[#F4A29D] transition-colors"
                  >
                    {lang === 'ar' ? 'المدونة (/blog)' : 'Blog'}
                  </a>
                </li>
                <li>
                  <a
                    href="/about-us"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate({ page: 'about-us' });
                    }}
                    className="hover:text-[#F4A29D] transition-colors"
                  >
                    {lang === 'ar' ? 'من نحن (/about-us)' : 'About Us'}
                  </a>
                </li>
                <li>
                  <a
                    href="/contact-us"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate({ page: 'contact-us' });
                    }}
                    className="hover:text-[#F4A29D] transition-colors"
                  >
                    {lang === 'ar' ? 'تواصل معنا (/contact-us)' : 'Contact Us'}
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Categories */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                {lang === 'ar' ? 'الأقسام' : 'Categories'}
              </h3>
              <ul className="space-y-2.5 text-sm text-[#D0C9C2]">
                {categories.map((c) => (
                  <li key={c.cat}>
                    <a
                      href={`/shop?category=${encodeURIComponent(c.cat)}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate({
                          page: 'shop',
                          category: c.cat,
                          pageNumber: 1,
                        });
                      }}
                      className="hover:text-[#F4A29D] transition-colors"
                    >
                      {lang === 'ar' ? c.labelAr : c.labelEn}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Store Locator Map Card & Social Channels */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  {lang === 'ar' ? 'خريطة فروع إيرا كير' : 'Era Care Branches Map'}
                </h3>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'stores' })}
                  className="text-xs font-semibold text-[#F4A29D] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>{lang === 'ar' ? 'كل الفروع (39)' : 'View All 39 Stores'}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Interactive Store Map Preview Card */}
              <div className="rounded-xl overflow-hidden border border-[#2F2B28] bg-[#181615]">
                <div className="relative h-36 w-full bg-[#1E242B]">
                  <iframe
                    title="Era Care Egypt Branches Map"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=29.5%2C26.2%2C32.2%2C31.4&layer=mapnik&marker=30.0444%2C31.2357"
                    className="w-full h-full border-0 opacity-90"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 flex items-center justify-between text-xs bg-[#161413]">
                  <div className="flex items-center gap-1.5 text-[#E6E1DA]">
                    <MapPin className="w-3.5 h-3.5 text-[#F4A29D] shrink-0" />
                    <span>Cairo, Alexandria, Sohag, Giza & 17+ Govs</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'stores' })}
                    className="px-2.5 py-1 rounded bg-[#9E2432] text-white font-bold text-[11px] cursor-pointer"
                  >
                    {lang === 'ar' ? 'اقرب فرع' : 'Find Branch'}
                  </button>
                </div>
              </div>

              {/* Social Media Channels */}
              <div className="flex items-center gap-2.5 pt-1">
                {[
                  { name: 'Facebook', href: 'https://facebook.com', label: 'FB' },
                  { name: 'Instagram', href: 'https://instagram.com', label: 'IG' },
                  { name: 'TikTok', href: 'https://tiktok.com', label: 'TT' },
                  { name: 'YouTube', href: 'https://youtube.com', label: 'YT' },
                  { name: 'WhatsApp', href: 'https://wa.me/201070222665', label: 'WA' },
                ].map((soc) => (
                  <a
                    key={soc.name}
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={soc.name}
                    className="w-9 h-9 rounded-full bg-[#1E1C1A] border border-[#332E2B] hover:border-[#F4A29D] hover:bg-[#9E2432] text-white text-xs font-bold flex items-center justify-center transition-colors"
                  >
                    {soc.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A8A09A]">
            <p>
              جميع الحقوق محفوظة. <a href="https://azagency.online/" target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold text-white">A.Z Agency</a> 2026 ©
            </p>
            <div className="flex items-center gap-4">
              <span>Cash on Delivery Nationwide</span>
              <span>•</span>
              <span>ISO & EDA Licensed Manufacturing</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Quick Action Buttons (WhatsApp Support & Scroll To Top) */}
      <div className="fixed bottom-5 right-5 z-30 flex flex-col gap-2.5">
        <a
          href="https://wa.me/201070222665"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with Era Care on WhatsApp"
          className="w-11 h-11 rounded-full bg-[#1E7E48] hover:bg-[#166337] text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105"
          title="WhatsApp Customer Care: 01070222665"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="w-11 h-11 rounded-full bg-[#181615] hover:bg-[#9E2432] text-white border border-[#383330] shadow-lg flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>

      {/* Install Store App Modal */}
      {installModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-[#181615] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E6E1DA] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#9E2432] font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Era Care Egypt Web App</span>
              </div>
              <button
                type="button"
                onClick={() => setInstallModalOpen(false)}
                className="p-1 rounded-lg text-[#4A4643] hover:bg-[#F3ECE7]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <h4 className="font-serif text-2xl font-bold text-[#181615]">
              {lang === 'ar'
                ? 'ثبّتي متجر إيرا كير على هاتفك'
                : 'Install Era Care Egypt on Your Device'}
            </h4>
            <p className="text-sm text-[#4A4643] leading-relaxed">
              {lang === 'ar'
                ? 'احصلي على وصول سريع لجميع منتجات تيرسس وإيرا كير (72 منتج)، وعناوين الفروع الـ 39، مع تنبيهات العروض الحصرية.'
                : 'Enjoy instant 1-tap access to all 72 Tersus & Era Care products, our 39 branch addresses, and exclusive seasonal bundles.'}
            </p>
            <div className="bg-[#FBF3F3] border border-[#E8D2D4] rounded-xl p-3.5 text-xs text-[#181615] space-y-1.5">
              <p className="font-bold text-[#9E2432]">
                {lang === 'ar' ? 'خطوات التثبيت السريع:' : 'Quick Install Steps:'}
              </p>
              <p>1. Tap your browser’s Share / Menu icon.</p>
              <p>2. Select “Add to Home Screen” (إضافة إلى الشاشة الرئيسية).</p>
              <p>3. Use code <strong>ERACARE15</strong> for 15% off your first order.</p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setInstallModalOpen(false);
                  onNavigate({ page: 'shop' });
                }}
                className="px-5 py-2.5 rounded-lg bg-[#9E2432] hover:bg-[#7F1B27] text-white text-xs font-bold cursor-pointer"
              >
                {lang === 'ar' ? 'تسوقي الآن' : 'Explore Catalog'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
