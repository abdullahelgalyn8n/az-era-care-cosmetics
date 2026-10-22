import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Sparkles,
  Send,
} from 'lucide-react';
import { GOVERNORATES_STORES } from '../data/storesAndContent';
import { RouteState, validateJoinBeautyForm } from '../utils/storeLogic';

interface ContactPageProps {
  onNavigate: (route: RouteState) => void;
  lang: 'en' | 'ar';
  darkMode: boolean;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  lang,
  darkMode,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [governorate, setGovernorate] = useState('');
  const [address, setAddress] = useState('');
  const [favoriteProducts, setFavoriteProducts] = useState('');
  const [socialFollowing, setSocialFollowing] = useState('نعم أتابع كل الصفحات');
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateJoinBeautyForm({
      fullName,
      phone,
      governorate,
      address,
      favoriteProducts,
      socialFollowing,
    });
    if (!res.valid) {
      setFormError(res.error || 'Please complete all required fields');
      return;
    }
    setFormError('');
    setSubmitted(true);
  };

  return (
    <div className="space-y-14 pb-20">
      {/* 1. Interactive Full-Width Egypt Map & Quick Store Bar (Matches Top of Contact Us Screenshot) */}
      <section className="border-b border-[#E6E1DA] dark:border-[#2C2826]">
        <div className="relative h-80 sm:h-96 w-full bg-[#E9E4DC]">
          <iframe
            title="Era Care Egypt Headquarters & Branches Map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=29.8%2C26.5%2C31.9%2C31.3&layer=mapnik&marker=30.0444%2C31.2357"
            className="w-full h-full border-0"
            loading="lazy"
          />
          <div className="absolute bottom-4 left-4 right-4 max-w-xl mx-auto bg-white/95 text-[#181615] p-4 rounded-2xl shadow-lg border border-[#E6E1DA] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#9E2432] text-white flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-extrabold">
                  Era Care Egypt — 39 Branches Nationwide
                </h2>
                <p className="text-xs text-[#4A4643] font-medium">
                  Cairo • Alexandria • Sohag • Giza • Mansoura • Tanta • Assiut
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'stores' })}
              className="px-4 py-2 rounded-lg bg-[#181615] hover:bg-[#9E2432] text-white text-xs font-bold transition-colors cursor-pointer"
            >
              {lang === 'ar' ? 'عرض جميع الفروع' : 'All 39 Branches'}
            </button>
          </div>
        </div>
      </section>

      {/* 2. Main Contact & "Era Care — انضمي إلى عالم الجمال" Form Section */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Customer Care Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#9E2432] text-white text-xs font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CUSTOMER CARE & VIP CLUB</span>
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold">
                {lang === 'ar'
                  ? 'تواصلي مع إيرا كير مصر'
                  : 'Get in Touch with Era Care'}
              </h1>
              <p className="text-sm font-medium text-[#4A4643] dark:text-[#B8B0A8] leading-relaxed">
                {lang === 'ar'
                  ? 'سواء كنتِ تبحثين عن استشارة مجانية لنوع بشرتك وشعرك أو ترغبين في الانضمام إلى نادي عملاء إيرا كير للحصول على الهدايا والخصومات الحصرية، فريقنا في خدمتك دائماً.'
                  : 'Whether you need a personalized skincare consultation, wholesale inquiry, or want to join our Era Care Beauty Club for exclusive rewards, we are here for you.'}
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Phone,
                  titleAr: 'الخط الساخن وخدمة العملاء',
                  titleEn: 'Customer Care Hotlines',
                  value: '01070222665 / 01149558775 / 01066440202',
                },
                {
                  icon: Mail,
                  titleAr: 'البريد الإلكتروني الرسمي',
                  titleEn: 'Official Email',
                  value: 'info@eracare-eg.com',
                },
                {
                  icon: MapPin,
                  titleAr: 'الفروع الرئيسية والمصنع',
                  titleEn: 'Flagship Stores & Factory',
                  value:
                    'Maadi & City Stars (Cairo) • Sporting & Smouha (Alexandria) • Sohag',
                },
                {
                  icon: Clock,
                  titleAr: 'مواعيد العمل في جميع الفروع',
                  titleEn: 'Branch Working Hours',
                  value: 'Daily from 11:00 AM to 11:00 PM',
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                      darkMode
                        ? 'bg-[#1A1817] border-[#2E2A27]'
                        : 'bg-white border-[#E6E1DA]'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#9E2432]/10 text-[#9E2432] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#9E2432]">
                        {lang === 'ar' ? item.titleAr : item.titleEn}
                      </h3>
                      <p className="text-sm font-bold mt-0.5">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Authentic "Era Care — انضمي إلى عالم الجمال" Card (Matches Screenshot with High Contrast) */}
          <div className="lg:col-span-7">
            <div
              dir="rtl"
              className={`rounded-3xl border overflow-hidden shadow-lg ${
                darkMode
                  ? 'bg-[#1A1817] border-[#2E2A27]'
                  : 'bg-white border-[#E0D6CE]'
              }`}
            >
              {/* Deep Rose High-Contrast Form Header */}
              <div className="bg-gradient-to-r from-[#9E2432] to-[#B83242] text-white p-7 text-center space-y-1.5">
                <h2 className="font-serif text-3xl font-bold tracking-wide">
                  Era Care
                </h2>
                <p className="text-base font-bold">
                  انضمي إلى عالم الجمال — Join Our Beauty Community
                </p>
                <p className="text-xs text-[#FBE8EA]">
                  سجّلي بياناتك للحصول على استشارة مجانية وعروض حصرية من إيرا كير
                </p>
              </div>

              {submitted ? (
                <div className="p-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#1D6B43]/15 text-[#1D6B43] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-bold">
                    تم التسجيل بنجاح في عالم الجمال من إيرا كير!
                  </h3>
                  <p className="text-sm text-[#4A4643] dark:text-[#C7BFB8] max-w-md mx-auto">
                    شكراً لكِ يا <strong>{fullName}</strong>! تم حفظ بياناتك بنجاح، وكود الخصم الخاص بكِ هو{' '}
                    <strong className="text-[#9E2432]">ERACARE15</strong> لخصم 15% فوري.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      onNavigate({ page: 'shop' });
                    }}
                    className="px-6 py-3 rounded-xl bg-[#9E2432] text-white text-xs font-bold cursor-pointer"
                  >
                    تسوقي الآن باستخدام الخصم
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 text-right">
                  {formError && (
                    <div className="p-3.5 rounded-xl bg-[#B91C1C]/10 border border-[#B91C1C] text-[#B91C1C] text-xs font-bold">
                      {formError}
                    </div>
                  )}

                  {/* 1. الاسم بالكامل */}
                  <div>
                    <label className="block text-xs font-extrabold mb-1.5 text-[#181615] dark:text-[#F7F4F0]">
                      الاسم بالكامل (Full Name) <span className="text-[#9E2432]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="أدخلي اسمك الكامل"
                      className="w-full px-4 py-3 rounded-xl border border-[#D5CEC6] bg-[#FAF8F5] text-sm font-medium text-[#181615] focus:outline-none focus:border-[#9E2432]"
                    />
                  </div>

                  {/* 2. رقم التليفون */}
                  <div>
                    <label className="block text-xs font-extrabold mb-1.5 text-[#181615] dark:text-[#F7F4F0]">
                      رقم التليفون (Phone Number) <span className="text-[#9E2432]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01xxxxxxxxx"
                      dir="ltr"
                      className="w-full px-4 py-3 rounded-xl border border-[#D5CEC6] bg-[#FAF8F5] text-sm font-medium text-[#181615] text-right focus:outline-none focus:border-[#9E2432]"
                    />
                  </div>

                  {/* 3. المحافظة */}
                  <div>
                    <label className="block text-xs font-extrabold mb-1.5 text-[#181615] dark:text-[#F7F4F0]">
                      المحافظة (Governorate) <span className="text-[#9E2432]">*</span>
                    </label>
                    <select
                      required
                      value={governorate}
                      onChange={(e) => setGovernorate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#D5CEC6] bg-[#FAF8F5] text-sm font-bold text-[#181615] focus:outline-none focus:border-[#9E2432]"
                    >
                      <option value="">اختاري المحافظة...</option>
                      {GOVERNORATES_STORES.map((g) => (
                        <option key={g.id} value={g.nameAr}>
                          {g.nameAr} ({g.nameEn})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 4. العنوان بالتفصيل */}
                  <div>
                    <label className="block text-xs font-extrabold mb-1.5 text-[#181615] dark:text-[#F7F4F0]">
                      العنوان بالتفصيل (Detailed Address) <span className="text-[#9E2432]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="أدخلي عنوانك بالتفصيل (المنطقة، الشارع، رقم العقار)"
                      className="w-full px-4 py-3 rounded-xl border border-[#D5CEC6] bg-[#FAF8F5] text-sm font-medium text-[#181615] focus:outline-none focus:border-[#9E2432]"
                    />
                  </div>

                  {/* 5. المنتجات المفضلة */}
                  <div>
                    <label className="block text-xs font-extrabold mb-1.5 text-[#181615] dark:text-[#F7F4F0]">
                      ما هي منتجاتك المفضلة من إيرا كير؟ (Favorite Products)
                    </label>
                    <textarea
                      rows={3}
                      value={favoriteProducts}
                      onChange={(e) => setFavoriteProducts(e.target.value)}
                      placeholder="شاركينا المنتجات التي جربتيها أو ترغبين في تجربتها (مثل: سيروم الهيالورونيك، بادي ميست، كريم تيرسس...)"
                      className="w-full px-4 py-3 rounded-xl border border-[#D5CEC6] bg-[#FAF8F5] text-sm font-medium text-[#181615] focus:outline-none focus:border-[#9E2432]"
                    />
                  </div>

                  {/* 6. هل تتابعين صفحاتنا على السوشيال ميديا؟ */}
                  <div className="space-y-2">
                    <span className="block text-xs font-extrabold text-[#181615] dark:text-[#F7F4F0]">
                      هل تتابعين صفحاتنا على السوشيال ميديا؟ <span className="text-[#9E2432]">*</span>
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        'نعم أتابع كل الصفحات',
                        'أتابع بعض الصفحات',
                        'سأقوم بالمتابعة الآن',
                      ].map((opt) => (
                        <label
                          key={opt}
                          className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${
                            socialFollowing === opt
                              ? 'border-[#9E2432] bg-[#FBF3F3] text-[#9E2432]'
                              : 'border-[#D5CEC6] bg-[#FAF8F5] text-[#181615]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="socialFollowing"
                            checked={socialFollowing === opt}
                            onChange={() => setSocialFollowing(opt)}
                            className="accent-[#9E2432]"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#9E2432] hover:bg-[#7F1B27] text-white text-sm font-extrabold tracking-wide shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>تسجيل الآن — Submit Registration</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
