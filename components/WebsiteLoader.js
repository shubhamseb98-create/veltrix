'use client';

import { useState, useEffect } from 'react';

export default function WebsiteLoader() {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING HOROLOGY CORE');
  const [isExiting, setIsExiting] = useState(false);
  const [isDestroyed, setIsDestroyed] = useState(false);

  useEffect(() => {
    // Lock body scroll while loader is active
    document.body.style.overflow = 'hidden';

    const statusMilestones = [
      { at: 15, text: 'SYNCHRONIZING SWISS TELEMETRY' },
      { at: 40, text: 'CALIBRATING 4NM NEURAL CORE' },
      { at: 70, text: 'PRELOADING GRADE 5 TITANIUM CHASSIS' },
      { at: 92, text: 'ACTIVATING 3D HOROLOGY ENGINE' },
      { at: 100, text: 'VELTRIX EXPERIENCE READY' },
    ];

    let currentVal = 0;
    const interval = setInterval(() => {
      // Natural non-linear easing for realistic luxury boot feel
      const increment = currentVal < 60 ? Math.floor(Math.random() * 8) + 4 : Math.floor(Math.random() * 5) + 3;
      currentVal = Math.min(100, currentVal + increment);
      setProgress(currentVal);

      const matchingStatus = statusMilestones.filter((m) => currentVal >= m.at).pop();
      if (matchingStatus) {
        setStatusText(matchingStatus.text);
      }

      if (currentVal >= 100) {
        clearInterval(interval);
        // Brief pause at 100% to let patron read status
        setTimeout(() => {
          setIsExiting(true);
          // Restore body scrolling
          document.body.style.overflow = '';
          // Remove from DOM after smooth bottom-to-top slide completes
          setTimeout(() => {
            setIsDestroyed(true);
          }, 1100);
        }, 350);
      }
    }, 45);

    return () => {
      clearInterval(interval);
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-[#39FF88]/15 blur-[120px] pointer-events-none animate-pulse" />

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

      {/* Main Center Stage */}
      <div className="relative z-10 flex flex-col items-center px-6 max-w-md w-full text-center">
        {/* Logo Container with Shimmer & Glow */}
        <div className="relative mb-8 flex items-center justify-center group">
          <div className="absolute inset-0 bg-[#39FF88]/25 rounded-full blur-xl scale-125 animate-pulse" />
          <img
            src="/watch-logo.png"
            alt="VELTRIX Logo"
            className="h-12 sm:h-16 w-auto object-contain relative z-10 drop-shadow-[0_0_25px_rgba(57,255,136,0.5)] transition-transform duration-500 scale-100"
          />
        </div>

        {/* Progress Percentage Display */}
        <div className="flex items-baseline justify-center gap-1 font-mono text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tighter">
          <span className="text-[#39FF88] drop-shadow-[0_0_15px_rgba(57,255,136,0.6)]">
            {progress.toString().padStart(2, '0')}
          </span>
          <span className="text-xs text-slate-500 font-mono tracking-widest">%</span>
        </div>

        {/* Precision Progress Bar */}
        <div className="w-64 sm:w-80 h-[3px] bg-neutral-900 border border-white/10 rounded-full overflow-hidden relative mb-4 p-[1px]">
          <div
            className="h-full bg-gradient-to-r from-[#6D8F63] via-[#39FF88] to-[#39FF88] rounded-full transition-all duration-150 ease-out shadow-[0_0_15px_#39FF88]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Telemetry Status HUD Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-950/80 border border-[#6D8F63]/30 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#39FF88] animate-ping" />
          <span className="font-mono text-[10px] sm:text-[11px] text-slate-300 tracking-[0.2em] uppercase">
            {statusText}
          </span>
        </div>
      </div>

      {/* Futuristic Bottom Laser Hairline (Sweeps upwards as curtain lifts!) */}
      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#39FF88] to-transparent shadow-[0_0_20px_#39FF88]" />
    </div>
  );
}
