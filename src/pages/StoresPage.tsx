import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Search,
  Building2,
  Navigation,
  Clock,
} from 'lucide-react';
import {
  GOVERNORATES_STORES,
  FLAGSHIP_BRANCH_CARDS,
} from '../data/storesAndContent';
import {
  filterGovernorateStores,
  getTotalBranchesCount,
  RouteState,
} from '../utils/storeLogic';

interface StoresPageProps {
  initialGovId?: string;
  onNavigate: (route: RouteState) => void;
  lang: 'en' | 'ar';
  darkMode: boolean;
}

export const StoresPage: React.FC<StoresPageProps> = ({
  initialGovId = 'all',
  onNavigate,
  lang,
  darkMode,
}) => {
  const [selectedGov, setSelectedGov] = useState<string>(initialGovId);
  const [branchSearch, setBranchSearch] = useState<string>('');

  const totalBranches = getTotalBranchesCount(GOVERNORATES_STORES);
  const filteredGovernorates = filterGovernorateStores(
    GOVERNORATES_STORES,
    selectedGov,
    branchSearch
  );

  const handleSelectGov = (govId: string) => {
    setSelectedGov(govId);
    onNavigate({ page: 'stores', govId });
  };

  return (
    <div className="space-y-14 pb-20">
      {/* 1. High-Contrast Header Banner ("فروعنا - Our Branches / أكثر من 39 فرع في جميع أنحاء مصر") */}
      <section
        className={`py-14 border-b text-center ${
          darkMode
            ? 'bg-[#161413] border-[#2C2826]'
            : 'bg-gradient-to-b from-[#FBF3F3] to-[#FAF8F5] border-[#E6E1DA]'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#9E2432] text-white text-xs font-extrabold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>ERA CARE RETAIL NETWORK</span>
          </div>

          <h1
            className={`font-serif text-4xl sm:text-5xl font-bold ${
              darkMode ? 'text-[#F7F4F0]' : 'text-[#181615]'
            }`}
          >
            فروعنا — Our Branches
          </h1>

          <p className="text-lg sm:text-xl font-bold text-[#9E2432]">
            أكثر من {totalBranches} فرع في جميع أنحاء مصر ({GOVERNORATES_STORES.length} محافظة)
          </p>

          <p
            className={`text-sm max-w-2xl mx-auto font-medium ${
              darkMode ? 'text-[#C7BFB8]' : 'text-[#4A4643]'
            }`}
          >
            {lang === 'ar'
              ? 'تفضلي بزيارة أقرب فرع لإيرا كير لتجربة جميع منتجات تيرسس والزيوت الطبيعية والحصول على استشارة مجانية لنوع بشرتك وشعرك.'
              : 'Visit your nearest Era Care store to test our complete Tersus & botanical skincare range in person with our beauty specialists.'}
          </p>
        </div>
      </section>

      {/* 2. Four Flagship Regional Cards (Sohag, Alexandria, Cairo, Other Branches — Matches Screenshot) */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FLAGSHIP_BRANCH_CARDS.map((card) => {
            const isSelected = selectedGov === card.govId;
            return (
              <div
                key={card.id}
                onClick={() => handleSelectGov(card.govId)}
                className={`group rounded-2xl border overflow-hidden flex flex-col cursor-pointer transition-all ${
                  isSelected
                    ? 'border-2 border-[#9E2432] shadow-lg'
                    : darkMode
                    ? 'bg-[#1A1817] border-[#2E2A27] hover:border-[#F4A29D]'
                    : 'bg-white border-[#E6E1DA] hover:border-[#9E2432] hover:shadow-md'
                }`}
              >
                <div className="aspect-[16/11] w-full overflow-hidden bg-[#F5F3EF] relative">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#181615] dark:text-[#F7F4F0]">
                      {lang === 'ar' ? card.titleAr : card.title}
                    </h2>
                    <p className="text-xs font-bold text-[#9E2432] mt-1">
                      {lang === 'ar' ? card.subtitleAr : card.subtitle}
                    </p>
                    <p className="text-xs text-[#4A4643] dark:text-[#B8B0A8] mt-2">
                      {card.address}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectGov(card.govId);
                    }}
                    className="w-full py-2.5 rounded-lg bg-[#9E2432] hover:bg-[#7F1B27] text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    {lang === 'ar'
                      ? `عرض فروع ${card.titleAr}`
                      : `Explore ${card.title}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Interactive Governorate Filter Bar & Search Input */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div
          className={`p-5 rounded-2xl border space-y-4 ${
            darkMode
              ? 'bg-[#1A1817] border-[#2E2A27]'
              : 'bg-white border-[#E6E1DA] shadow-xs'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold">
                {lang === 'ar'
                  ? 'دليل عناوين وأرقام الفروع بالمحافظات'
                  : 'Complete Governorate Branch Directory'}
              </h2>
              <p className="text-xs font-medium text-[#4A4643] dark:text-[#B8B0A8]">
                {lang === 'ar'
                  ? 'مواعيد العمل يومياً من 11:00 صباحاً حتى 11:00 مساءً'
                  : 'Open daily from 11:00 AM to 11:00 PM across all branches'}
              </p>
            </div>

            {/* Instant Search by Street, Area, or Governorate */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9E2432]" />
              <input
                type="search"
                value={branchSearch}
                onChange={(e) => setBranchSearch(e.target.value)}
                placeholder={
                  lang === 'ar'
                    ? 'ابحثي بالمحافظة أو المنطقة (المعادي، سموحة، أخميم...)'
                    : 'Search city, street, or phone...'
                }
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D5CEC6] bg-[#FAF8F5] text-[#181615] text-xs font-bold focus:outline-none focus:border-[#9E2432]"
              />
            </div>
          </div>

          {/* Governorate Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#E6E1DA] dark:border-[#2C2826]">
            <button
              type="button"
              onClick={() => handleSelectGov('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedGov === 'all'
                  ? 'bg-[#9E2432] text-white'
                  : darkMode
                  ? 'bg-[#24201E] text-[#E6E1DA]'
                  : 'bg-[#F3ECE7] text-[#181615] hover:bg-[#E5DDD4]'
              }`}
            >
              {lang === 'ar'
                ? `كل المحافظات (${totalBranches} فرع)`
                : `All Governorates (${totalBranches})`}
            </button>

            {GOVERNORATES_STORES.map((gov) => (
              <button
                key={gov.id}
                type="button"
                onClick={() => handleSelectGov(gov.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  selectedGov === gov.id
                    ? 'bg-[#9E2432] text-white'
                    : darkMode
                    ? 'bg-[#24201E] text-[#E6E1DA] hover:bg-[#2E2A27]'
                    : 'bg-[#FAF8F5] border border-[#D5CEC6] text-[#181615] hover:border-[#9E2432]'
                }`}
              >
                {gov.nameAr} ({gov.branches.length})
              </button>
            ))}
          </div>
        </div>

        {/* 4. Governorate Cards Grid — High-Contrast Cards Matching Screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGovernorates.map((gov) => (
            <div
              key={gov.id}
              data-testid={`gov-card-${gov.id}`}
              className={`rounded-2xl border overflow-hidden flex flex-col ${
                darkMode
                  ? 'bg-[#1A1817] border-[#2E2A27]'
                  : 'bg-white border-[#E6E1DA] shadow-xs'
              }`}
            >
              {/* Governorate Card Header */}
              <div
                className={`px-5 py-4 border-b flex items-center justify-between ${
                  darkMode
                    ? 'bg-[#221E1D] border-[#2E2A27]'
                    : 'bg-[#FBF3F3] border-[#E8D2D4]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#9E2432] text-white flex items-center justify-center font-bold text-xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div dir="rtl" className="text-right">
                    <h3 className="font-bold text-base text-[#181615] dark:text-[#F7F4F0]">
                      {gov.nameAr} — {gov.nameEn}
                    </h3>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-[#9E2432] text-white text-xs font-extrabold tabular-nums">
                  {gov.branches.length}{' '}
                  {gov.branches.length === 1 ? 'فرع' : 'فروع'}
                </span>
              </div>

              {/* Branches List inside Governorate */}
              <div className="p-5 space-y-3 flex-1" dir="rtl">
                {gov.branches.map((branch, idx) => (
                  <div
                    key={branch.id}
                    className={`p-3.5 rounded-xl border text-right space-y-2 ${
                      darkMode
                        ? 'bg-[#141211] border-[#2C2826]'
                        : 'bg-[#FAF8F5] border-[#E6E1DA]'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#9E2432]/15 text-[#9E2432] text-[11px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="space-y-0.5">
                        <p className="text-xs sm:text-sm font-bold text-[#181615] dark:text-[#F7F4F0] leading-snug">
                          {branch.addressAr}
                        </p>
                        <p
                          dir="ltr"
                          className="text-[11px] font-medium text-[#4A4643] dark:text-[#B8B0A8] text-right"
                        >
                          {branch.addressEn}
                        </p>
                      </div>
                    </div>

                    {/* Phone Numbers & Google Maps Direction Link */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-[#E6E1DA] dark:border-[#2C2826]">
                      <div className="flex flex-wrap gap-1.5" dir="ltr">
                        {branch.phones.map((ph) => (
                          <a
                            key={ph}
                            href={`tel:${ph}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white dark:bg-[#221F1D] border border-[#D5CEC6] dark:border-[#383330] text-[#9E2432] dark:text-[#F4A29D] text-xs font-extrabold tabular-nums hover:bg-[#9E2432] hover:text-white transition-colors"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{ph}</span>
                          </a>
                        ))}
                      </div>

                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `Era Care ${gov.nameAr} ${branch.addressAr}`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#181615] dark:text-[#E6E1DA] hover:text-[#9E2432]"
                      >
                        <Navigation className="w-3 h-3 text-[#9E2432]" />
                        <span>الخريطة</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
