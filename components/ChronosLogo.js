'use client';

export default function ChronosLogo({ size = 'md', className = '', withText = true, textClassName = '' }) {
  const sizeMap = {
    sm: 'h-6 sm:h-7',
    md: 'h-8 sm:h-9',
    lg: 'h-10 sm:h-12',
  };

  const heightClass = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center select-none group ${className}`}>
      <img
        src="/watch-logo.png"
        alt="Chronos Horology Lab"
        className={`${heightClass} w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_16px_rgba(0,29,61,0.45)]`}
      />
    </div>
  );
}
