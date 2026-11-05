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

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">

        {/* ========================================================
            2. TOP HEADER NAVIGATION (CONTACT | LINKS | STALK US)
           ======================================================== */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-6 text-center lg:text-left">

          {/* Left Column: CONTACT */}
          <div className="flex flex-col items-center lg:items-start gap-1 w-full lg:w-1/4">
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

          {/* Center Navigation Links (Row 1 + Row 2 with Capsule Badge) */}
          <div className="flex flex-col items-center gap-3.5 sm:gap-4 w-full lg:w-2/4">
            {/* Row 1 */}
            <nav className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 md:gap-10 text-xs sm:text-sm font-bold tracking-widest text-white uppercase font-heading">
              <a href="#" className="hover:text-[#3a86ff] transition-colors">
                HOME
              </a>
              <a href="#scrolly-section" className="hover:text-[#3a86ff] transition-colors">
                3D ATELIER
              </a>
              <a href="#metallurgy" className="hover:text-[#3a86ff] transition-colors">
                FINISHES
              </a>
              <a href="#collection" className="hover:text-[#3a86ff] transition-colors">
                COLLECTION
              </a>
            </nav>

            {/* Row 2: Secondary link + Capsule Pill */}
            <div className="flex items-center justify-center gap-5 sm:gap-6 text-xs sm:text-sm font-bold tracking-widest text-white uppercase font-heading">
              <a href="#watch-faces" className="hover:text-[#3a86ff] transition-colors">
                WATCH FACES
              </a>
              <a
                href="#specs"
                className="px-5 py-1.5 rounded-full bg-[#585e68]/70 hover:bg-[#585e68] text-white transition-all text-xs tracking-wider"
              >
                SPECS
              </a>
            </div>
          </div>

          {/* Right Column: STALK US + 5 Social Circle Icons */}
          <div className="flex flex-col items-center lg:items-end gap-2.5 w-full lg:w-1/4">
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
            3. GIANT MONUMENTAL BRAND NAME "VELTRIX" (Matching KNYX in Image)
           ======================================================== */}
        <div className="py-10 sm:py-14 md:py-16 lg:py-20 text-center select-none overflow-hidden">
          <h1 className="font-heading font-black text-[18vw] sm:text-[19vw] md:text-[20vw] lg:text-[210px] xl:text-[240px] leading-none text-white tracking-tight drop-shadow-[0_12px_40px_rgba(0,0,0,0.9)]">
            VELTRIX
          </h1>
        </div>

      </div>

      {/* ========================================================
          4. BOTTOM BAR: COPYRIGHT & BLUE BACK-TO-TOP BUTTON
         ======================================================== */}
      <div className="relative z-10 w-full border-t border-white/10 py-5 sm:py-6 px-6 sm:px-8 flex items-center justify-center">
        <p className="text-xs sm:text-sm text-slate-400 font-medium text-center">
          &copy; Copyright {new Date().getFullYear()} VELTRIX. All Rights Reserved.
        </p>

        {/* Back to Top Floating Circular Button (Blue #3350FF with upward arrow) */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll to apex"
          className="absolute right-4 sm:right-6 md:right-8 bottom-3.5 sm:bottom-4 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#3350FF] hover:bg-[#2542e6] text-white flex items-center justify-center shadow-[0_0_25px_rgba(51,80,255,0.6)] transition-all hover:scale-110 active:scale-95 group"
        >
          <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>

    </footer>
  );
}
