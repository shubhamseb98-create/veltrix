'use client';

import { useState, useEffect } from 'react';

export default function WebsiteLoader() {
  const [isExiting, setIsExiting] = useState(false);
  const [isDestroyed, setIsDestroyed] = useState(false);

  useEffect(() => {
    // Lock body scroll while loader is active
    document.body.style.overflow = 'hidden';

    // Show logo with elegant ambient glow, then smoothly slide up from bottom to top
    const timer = setTimeout(() => {
      setIsExiting(true);
      document.body.style.overflow = '';

      // Completely remove from DOM once the slide-up transition finishes
      const removeTimer = setTimeout(() => {
        setIsDestroyed(true);
      }, 1100);

      return () => clearTimeout(removeTimer);
    }, 1300);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  if (isDestroyed) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center overflow-hidden transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] ${
        isExiting ? '-translate-y-full pointer-events-none' : 'translate-y-0'
      }`}
      style={{ willChange: 'transform' }}
    >
      {/* Ambient Radial Spotlight Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#39FF88]/15 blur-[130px] pointer-events-none animate-pulse" />

      {/* Fine Technical Blueprint Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(57, 255, 136, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(57, 255, 136, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, #000 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(circle at center, #000 40%, transparent 85%)',
        }}
      />

      {/* Main Center Stage: Pure Brand Logo with Luxury Aura */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <div className="relative flex items-center justify-center">
          {/* Pulsing Emerald Spotlight Halo */}
          <div className="absolute inset-0 bg-[#39FF88]/25 rounded-full blur-2xl scale-150 animate-pulse pointer-events-none" />
          
          {/* Official Veltrix Brand Logo */}
          <img
            src="/watch-logo.png"
            alt="VELTRIX Logo"
            className="h-14 sm:h-20 w-auto object-contain relative z-10 drop-shadow-[0_0_30px_rgba(57,255,136,0.6)] animate-[pulse_2.2s_ease-in-out_infinite]"
          />
        </div>
      </div>

      {/* Futuristic Bottom Laser Hairline (Sweeps upwards as curtain lifts from bottom to top!) */}
      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#39FF88] to-transparent shadow-[0_0_25px_#39FF88]" />
    </div>
  );
}
