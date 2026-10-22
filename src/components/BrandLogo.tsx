import React from 'react';

interface BrandLogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  size = 'md',
  onClick,
}) => {
  const isLightText = variant === 'light';
  const iconColor = isLightText ? '#F4A29D' : '#9E2432';
  const titleColor = isLightText ? '#FFFFFF' : '#181615';
  const subColor = isLightText ? '#D6CFC9' : '#635B57';

  const dimensions =
    size === 'sm'
      ? { svg: 32, title: 'text-base', sub: 'text-[8px]' }
      : size === 'lg'
      ? { svg: 52, title: 'text-2xl', sub: 'text-[10px]' }
      : { svg: 40, title: 'text-lg', sub: 'text-[9px]' };

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2.5 text-left group focus:outline-none"
      aria-label="Era Care Egypt — Made By Care"
    >
      {/* Authentic Era Care Botanical Lotus Emblem */}
      <svg
        width={dimensions.svg}
        height={dimensions.svg}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      >
        {/* Center petal */}
        <path
          d="M32 8C26.5 18 25 29 32 42C39 29 37.5 18 32 8Z"
          stroke={iconColor}
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Left inner petal */}
        <path
          d="M30 41C21 35 16 25 18 15C24 20 28 28 30 41Z"
          stroke={iconColor}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right inner petal */}
        <path
          d="M34 41C43 35 48 25 46 15C40 20 36 28 34 41Z"
          stroke={iconColor}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Left outer leaf */}
        <path
          d="M28 44C17 43 9 36 7 26C16 28 23 34 28 44Z"
          stroke={iconColor}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right outer leaf */}
        <path
          d="M36 44C47 43 55 36 57 26C48 28 41 34 36 44Z"
          stroke={iconColor}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Stem flourish */}
        <path
          d="M22 49C28 46 36 46 42 49"
          stroke={iconColor}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>

      <div className="flex flex-col leading-none whitespace-nowrap">
        <span
          style={{ color: titleColor }}
          className={`font-serif font-bold tracking-[0.14em] uppercase whitespace-nowrap ${dimensions.title}`}
        >
          ERA CARE
        </span>
        <span
          style={{ color: subColor }}
          className={`font-sans font-semibold tracking-[0.22em] uppercase mt-1 whitespace-nowrap ${dimensions.sub}`}
        >
          MADE BY CARE
        </span>
      </div>
    </button>
  );
};
