import React, { useState } from 'react';
import {
  Sprout,
  Users,
  TrendingUp,
  Factory,
  Trophy,
  Rocket,
  Play,
  Award,
  Sparkles,
  ArrowRight,
  X,
} from 'lucide-react';
import {
  JOURNEY_TIMELINE,
  ABOUT_VIDEOS,
} from '../data/storesAndContent';
import { RouteState } from '../utils/storeLogic';

interface AboutPageProps {
  onNavigate: (route: RouteState) => void;
  lang: 'en' | 'ar';
  darkMode: boolean;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  lang,
  darkMode,
}) => {
  const [activeVideo, setActiveVideo] = useState<(typeof ABOUT_VIDEOS)[0] | null>(
    null
  );

  const getStepIcon = (
    type: 'sprout' | 'users' | 'trending' | 'factory' | 'trophy' | 'rocket'
  ) => {
    switch (type) {
      case 'sprout':
        return Sprout;
      case 'users':
        return Users;
      case 'trending':
        return TrendingUp;
      case 'factory':
        return Factory;
      case 'trophy':
        return Trophy;
      case 'rocket':
        return Rocket;
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Hero Header — High-Contrast Fix for "رحلتنا" */}
      <section
        className={`py-16 border-b text-center ${
          darkMode
            ? 'bg-[#161413] border-[#2C2826]'
            : 'bg-gradient-to-b from-[#FBF3F3] via-[#FAF8F5] to-[#F3ECE4] border-[#E6E1DA]'
        }`}
      >
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-[#9E2432] text-white text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ERA CARE STORY • SINCE 2019</span>
          </div>

          <h1
            className={`font-serif text-4xl sm:text-6xl font-bold ${
              darkMode ? 'text-[#F7F4F0]' : 'text-[#181615]'
            }`}
          >
            رحلتنا — Our Journey
          </h1>

          <p className="text-lg sm:text-2xl font-bold text-[#9E2432]">
            من حلم بسيط في المطبخ إلى علامة تجارية رائدة في مصر
          </p>

          <p
            className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium ${
              darkMode ? 'text-[#D0C9C2]' : 'text-[#3A3532]'
            }`}
          >
            {lang === 'ar'
              ? 'بدأت قصة إيرا كير في عام 2019 بـ 250 جرام زبدة شيا و186 جنيه فقط، واليوم نفخر بمصنعنا المرخص وأكثر من 39 فرعاً في 21 محافظة مصرية وعرض استثماري بقيمة 10 مليون جنيه في Shark Tank.'
              : 'From 250g of raw Shea Butter and 186 EGP in a home kitchen in 2019 to a licensed cosmetics factory, 39 retail branches across Egypt, and a 10M EGP Shark Tank Egypt investment offer.'}
          </p>
        </div>
      </section>

      {/* 2. Vertical Alternating Milestone Timeline (2019 – Today) with High-Contrast Cards */}
      <section className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative space-y-8">
          {/* Center Vertical Line on Desktop */}
          <div
            className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-[#9E2432]/30"
            aria-hidden="true"
          />

          {JOURNEY_TIMELINE.map((step, index) => {
            const Icon = getStepIcon(step.iconType);
            const isEven = index % 2 === 0;

            return (
              <div
                key={step.year}
                className={`relative grid grid-cols-1 md:grid-cols-12 gap-6 items-center`}
              >
                {/* Left Side (Even index on desktop) */}
                <div
                  className={`md:col-span-5 ${
                    isEven ? 'md:order-1' : 'md:order-3'
                  }`}
                >
                  <div
                    dir="rtl"
                    className={`p-6 sm:p-7 rounded-2xl border transition-all shadow-sm ${
                      darkMode
                        ? 'bg-[#1A1817] border-[#2E2A27] hover:border-[#F4A29D]'
                        : 'bg-white border-[#E0D8CE] hover:border-[#9E2432] hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="px-3.5 py-1 rounded-lg bg-[#9E2432] text-white text-sm font-extrabold tabular-nums">
                        {step.year}
                      </span>
                      <span className="text-xs font-bold text-[#4A4643] dark:text-[#B8B0A8]">
                        {step.titleEn}
                      </span>
                    </div>

                    <h2
                      className={`text-xl sm:text-2xl font-bold mb-2 ${
                        darkMode ? 'text-[#F7F4F0]' : 'text-[#181615]'
                      }`}
                    >
                      {step.titleAr}
                    </h2>

                    <p
                      className={`text-sm leading-relaxed font-medium ${
                        darkMode ? 'text-[#D0C9C2]' : 'text-[#2E2A27]'
                      }`}
                    >
                      {step.descAr}
                    </p>

                    <p
                      dir="ltr"
                      className={`mt-3 pt-3 border-t text-xs leading-relaxed font-medium text-left ${
                        darkMode
                          ? 'border-[#2C2826] text-[#B8B0A8]'
                          : 'border-[#ECE7E1] text-[#4A4643]'
                      }`}
                    >
                      {step.descEn}
                    </p>
                  </div>
                </div>

                {/* Center Node Icon */}
                <div className="md:col-span-2 md:order-2 flex justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#9E2432] text-white border-4 border-white dark:border-[#121110] shadow-md flex items-center justify-center z-10">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Empty Balance Column */}
                <div
                  className={`hidden md:block md:col-span-5 ${
                    isEven ? 'md:order-3' : 'md:order-1'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Media & Shark Tank Egypt Video Highlights (3 Authentic Video Thumbnails) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#9E2432]">
            MEDIA & TELEVISION FEATURES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            {lang === 'ar'
              ? 'إيرا كير في برنامج Shark Tank واللقاءات الإعلامية'
              : 'Era Care on Shark Tank Egypt & Media'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ABOUT_VIDEOS.map((vid) => (
            <div
              key={vid.id}
              onClick={() => setActiveVideo(vid)}
              className={`group rounded-2xl border overflow-hidden cursor-pointer transition-all flex flex-col ${
                darkMode
                  ? 'bg-[#1A1817] border-[#2E2A27] hover:border-[#F4A29D]'
                  : 'bg-white border-[#E6E1DA] hover:border-[#9E2432] hover:shadow-lg'
              }`}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#181615]">
                <img
                  src={vid.image}
                  alt={vid.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#9E2432] text-white flex items-center justify-center shadow-xl transition-transform group-hover:scale-110">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/80 text-white text-xs font-bold tabular-nums">
                  {vid.duration}
                </span>
              </div>

              <div className="p-5 space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-[#181615] dark:text-[#F7F4F0] group-hover:text-[#9E2432] transition-colors">
                    {lang === 'ar' ? vid.titleAr : vid.title}
                  </h3>
                  <p className="text-xs font-medium text-[#4A4643] dark:text-[#B8B0A8] mt-1">
                    {vid.subtitle}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[#9E2432] pt-2">
                  <span>{lang === 'ar' ? 'مشاهدة اللقاء' : 'Watch Feature'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Full-Width Amber Botanical Oils Stats Strip (Matches Bottom of About Us Screenshot) */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-[#2C2826] shadow-xl">
          <img
            src="/assets/extracted/brand/stats-oils-bg.jpg"
            alt="Era Care Cold-Pressed Botanical Oils"
            className="w-full h-72 sm:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-[#181615]/75 backdrop-blur-[2px] flex items-center">
            <div className="w-full max-w-5xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
              <div className="space-y-1">
                <p className="font-serif text-4xl sm:text-5xl font-bold text-[#F4A29D] tabular-nums">
                  10M
                </p>
                <p className="text-sm sm:text-base font-bold">جنيه استثمار</p>
                <p className="text-xs text-[#D6CFC9]">Shark Tank Egypt Offer</p>
              </div>
              <div className="space-y-1">
                <p className="font-serif text-4xl sm:text-5xl font-bold text-[#F4A29D] tabular-nums">
                  +120K
                </p>
                <p className="text-sm sm:text-base font-bold">منتج مباع</p>
                <p className="text-xs text-[#D6CFC9]">Units Delivered Nationwide</p>
              </div>
              <div className="space-y-1">
                <p className="font-serif text-4xl sm:text-5xl font-bold text-[#F4A29D] tabular-nums">
                  +39
                </p>
                <p className="text-sm sm:text-base font-bold">فرع في مصر</p>
                <p className="text-xs text-[#D6CFC9]">Across 21 Governorates</p>
              </div>
              <div className="space-y-1">
                <p className="font-serif text-4xl sm:text-5xl font-bold text-[#F4A29D] tabular-nums">
                  2019
                </p>
                <p className="text-sm sm:text-base font-bold">سنة التأسيس</p>
                <p className="text-xs text-[#D6CFC9]">Founded with Care</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Feature Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-[#181615] rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#E6E1DA]">
            <div className="relative aspect-video bg-black">
              <img
                src={activeVideo.image}
                alt={activeVideo.title}
                className="w-full h-full object-cover opacity-90"
              />
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white hover:bg-[#9E2432] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-[#9E2432]">
                <Award className="w-4 h-4" />
                <span>Era Care Egypt Media Archive</span>
              </div>
              <h3 className="font-serif text-2xl font-bold">
                {lang === 'ar' ? activeVideo.titleAr : activeVideo.title}
              </h3>
              <p className="text-sm text-[#4A4643] leading-relaxed">
                {activeVideo.subtitle}
              </p>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="px-4 py-2 rounded-lg border border-[#D5CEC6] text-xs font-bold cursor-pointer"
                >
                  {lang === 'ar' ? 'إغلاق' : 'Close'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveVideo(null);
                    onNavigate({ page: 'shop' });
                  }}
                  className="px-5 py-2 rounded-lg bg-[#9E2432] text-white text-xs font-bold cursor-pointer"
                >
                  {lang === 'ar' ? 'تسوقي المنتجات' : 'Shop Featured Products'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
