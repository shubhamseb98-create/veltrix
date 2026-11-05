'use client';

import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  ArrowUp,
} from 'lucide-react';

export default function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="relative w-full bg-black text-white font-sans select-none overflow-hidden pt-12 sm:pt-16 md:pt-20">

      {/* ========================================================
          1. EXACT ATMOSPHERIC ROYAL BLUE GLOWS (Matching Reference Image)
         ======================================================== */}
      {/* Left Intense Royal Blue Bloom (#1F3491 / rgb(31, 52, 145)) */}
      <div
        className="absolute -left-28 sm:-left-36 top-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[520px] sm:h-[680px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 35% 50%, rgba(31, 52, 145, 0.90) 0%, rgba(15, 23, 85, 0.55) 45%, transparent 72%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Right Top Soft Royal Blue Bloom (#232F9F / rgb(35, 47, 159)) */}
      <div
        className="absolute -right-20 sm:-right-28 top-0 w-[450px] sm:w-[600px] h-[400px] sm:h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 70% 30%, rgba(35, 47, 159, 0.70) 0%, rgba(18, 25, 95, 0.35) 45%, transparent 72%)',
          filter: 'blur(75px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

        {/* ========================================================
            2. TOP HEADER NAVIGATION (CONTACT | LINKS | STALK US)
           ======================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">

          {/* Left Column: CONTACT */}
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-white uppercase font-heading">
              CONTACT
            </span>
            <a
              href="mailto:contact@veltrix.com"
              className="text-xs sm:text-sm text-slate-300 hover:text-white transition-colors"
            >
              contact@veltrix.com
            </a>
          </div>

          {/* Right Column: STALK US + 5 Social Circle Icons */}
          <div className="flex flex-col items-center sm:items-end gap-2.5">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-white uppercase font-heading">
              STALK US
            </span>
            <div className="flex items-center gap-2 sm:gap-2.5">
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-slate-300 hover:text-white hover:border-white/50 hover:bg-white/15 transition-all"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-slate-300 hover:text-white hover:border-white/50 hover:bg-white/15 transition-all"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-slate-300 hover:text-white hover:border-white/50 hover:bg-white/15 transition-all"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-slate-300 hover:text-white hover:border-white/50 hover:bg-white/15 transition-all"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-slate-300 hover:text-white hover:border-white/50 hover:bg-white/15 transition-all"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* ========================================================
            3. BRAND NAME "VELTRIX" (Refined Luxury Proportion)
           ======================================================== */}
        <div className="py-6 sm:py-8 md:py-10 lg:py-12 text-center select-none overflow-hidden">
          <h1 className="font-heading font-black text-[11vw] sm:text-[10vw] md:text-[9vw] lg:text-[105px] xl:text-[120px] leading-none text-white tracking-tight drop-shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
            VELTRIX
          </h1>
        </div>

      </div>

      {/* ========================================================
          4. BOTTOM BAR: COPYRIGHT & BLUE BACK-TO-TOP BUTTON
         ======================================================== */}
      <div className="relative z-10 w-full border-t border-white/10 py-5 sm:py-6 px-4 sm:px-6 md:px-8 flex items-center justify-center">
        <p className="text-xs sm:text-sm text-slate-400 font-medium text-center pr-12 sm:pr-0">
          &copy; Copyright {new Date().getFullYear()} VELTRIX. All Rights Reserved.
        </p>

        {/* Back to Top Floating Circular Button (Blue #3350FF with upward arrow) */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll to apex"
          className="absolute right-4 sm:right-6 md:right-8 bottom-3 sm:bottom-4 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#3350FF] hover:bg-[#2542e6] text-white flex items-center justify-center shadow-[0_0_25px_rgba(51,80,255,0.6)] transition-all hover:scale-110 active:scale-95 group"
        >
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>

    </footer>
  );
}
