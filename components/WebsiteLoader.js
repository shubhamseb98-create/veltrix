'use client';

import { useState, useEffect } from 'react';

export default function WebsiteLoader() {
  const [isExiting, setIsExiting] = useState(false);
  const [isDestroyed, setIsDestroyed] = useState(false);

  useEffect(() => {
    // Lock body scroll while loader is active
    document.body.style.overflow = 'hidden';

    // Show crisp, pure brand logo on black, then smoothly slide up from bottom to top
    const timer = setTimeout(() => {
      setIsExiting(true);
      document.body.style.overflow = '';

      const removeTimer = setTimeout(() => {
        setIsDestroyed(true);
      }, 1000);

      return () => clearTimeout(removeTimer);
    }, 1100);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  if (isDestroyed) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center overflow-hidden transition-transform duration-900 ease-[cubic-bezier(0.77,0,0.175,1)] ${
        isExiting ? '-translate-y-full pointer-events-none' : 'translate-y-0'
      }`}
      style={{ willChange: 'transform' }}
    >
      {/* Pure, Clean, Crisp Logo (NO grid lines, NO glow haze blobs) */}
      <div className="relative z-10 flex items-center justify-center px-6">
        <img
          src="/watch-logo.png"
          alt="VELTRIX"
          className="h-12 sm:h-16 w-auto object-contain select-none"
        />
      </div>
    </div>
  );
}
