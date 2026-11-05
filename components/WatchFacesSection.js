'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const WATCH_FACES = [
  {
    id: 1,
    type: 'Gyroscopic',
    video: '/watchfaces/face_1.mp4',
    poster: '/watchfaces/poster_1.jpg',
  },
  {
    id: 2,
    type: 'Touch Responsive',
    video: '/watchfaces/face_2.mp4',
    poster: '/watchfaces/poster_2.jpg',
  },
  {
    id: 3,
    type: 'Gyroscopic',
    video: '/watchfaces/face_3.mp4',
    poster: '/watchfaces/poster_3.jpg',
  },
  {
    id: 4,
    type: 'Crown Responsive',
    video: '/watchfaces/face_4.mp4',
    poster: '/watchfaces/poster_4.jpg',
  },
  {
    id: 5,
    type: 'Touch Responsive',
    video: '/watchfaces/face_5.mp4',
    poster: '/watchfaces/poster_5.jpg',
  },
  {
    id: 6,
    type: 'Touch Responsive',
    video: '/watchfaces/face_6.mp4',
    poster: '/watchfaces/poster_6.jpg',
  },
];

export default function WatchFacesSection() {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function checkScrollability() {
    const el = sliderRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }

  function scroll(direction) {
    const el = sliderRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild;
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 220;
    const scrollAmount = direction === 'left' ? -(cardWidth + 14) : (cardWidth + 14);
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setTimeout(checkScrollability, 300);
  }

  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
  }, []);

  return (
    <section
      id="watch-faces"
      className="relative w-full min-h-screen lg:h-screen pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24 bg-[#000814] text-white font-sans select-none overflow-hidden flex flex-col justify-center items-center border-t border-[#001d3d]/25 border-b border-[#001d3d]/25"
      style={{
        background: 'radial-gradient(ellipse 95% 85% at 50% 50%, #001d3d 0%, #000c1a 55%, #00050d 100%)',
      }}
    >
      {/* Subtle Ambient Radial Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-[#001d3d]/15 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10 flex flex-col justify-center my-auto">

        {/* CLEAN MINIMAL HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-3 sm:mb-4 lg:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3a86ff]/10 border border-[#3a86ff]/25 text-[#3a86ff] font-mono text-[10px] sm:text-xs tracking-widest uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3a86ff] animate-pulse" />
            <span>DYNAMIC WATCH FACES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-1.5 sm:mb-2">
            Not Just Regular Watch Faces
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-normal leading-relaxed max-w-xl mx-auto">
            Touch them and they react. Raise your wrist and they wake differently. Scroll the crown and they shift.
          </p>
        </div>

        {/* NAVIGATION CONTROLS (Only visible on tablet/mobile when horizontal scroll is active) */}
        <div className="flex xl:hidden items-center justify-end gap-2 mb-3 pr-1">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous watch face"
            className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
              canScrollLeft
                ? 'bg-white/5 hover:bg-white/15 text-white border-white/15 cursor-pointer shadow-sm'
                : 'bg-white/[0.02] text-slate-600 border-white/5 cursor-not-allowed opacity-30'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Next watch face"
            className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
              canScrollRight
                ? 'bg-white/5 hover:bg-white/15 text-white border-white/15 cursor-pointer shadow-sm'
                : 'bg-white/[0.02] text-slate-600 border-white/5 cursor-not-allowed opacity-30'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* WATCH FACES GALLERY: ALL 6 CARDS DISPLAYED SIDE-BY-SIDE ON DESKTOP, CLEAN SNAPPING CAROUSEL ON SMALLER SCREENS */}
        <div
          ref={sliderRef}
          onScroll={checkScrollability}
          className="flex items-stretch xl:grid xl:grid-cols-6 gap-3 sm:gap-3.5 lg:gap-4 overflow-x-auto xl:overflow-x-visible pb-2 pt-1 scrollbar-none scroll-smooth snap-x snap-mandatory w-full"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {WATCH_FACES.map((face) => (
            <div
              key={face.id}
              className="flex-shrink-0 w-[180px] sm:w-[210px] md:w-[240px] xl:w-auto snap-start"
            >
              <div className="bg-gradient-to-b from-[#001d3d]/90 via-[#001428]/95 to-[#000814] hover:from-[#002855] rounded-[22px] sm:rounded-[24px] p-2.5 sm:p-3 border border-[#001d3d]/25 hover:border-[#3a86ff]/50 hover:shadow-[0_15px_35px_rgba(0,29,61,0.35)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group h-full shadow-[0_12px_30px_rgba(0,0,0,0.7)]">
                
                {/* Clean Left-Aligned Title */}
                <div className="px-1 pt-0.5 pb-2">
                  <span className="text-[11px] sm:text-xs font-semibold text-slate-300 group-hover:text-[#3a86ff] tracking-tight block truncate transition-colors">
                    {face.type}
                  </span>
                </div>

                {/* Seamless Squircle Video Display */}
                <div className="rounded-[16px] sm:rounded-[18px] overflow-hidden bg-black aspect-square w-full relative">
                  <video
                    playsInline
                    autoPlay
                    loop
                    muted
                    preload="metadata"
                    poster={face.poster}
                    className="w-full h-full object-cover block rounded-[16px] sm:rounded-[18px] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  >
                    <source src={face.video} type="video/mp4" />
                  </video>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
