'use client';

import { useState } from 'react';
import { ArrowUpRight, Sun, Moon, Star } from 'lucide-react';

export default function HealthFeaturesSection() {
  const [activeTheme, setActiveTheme] = useState('dark'); // 'dark' (Tactical Bio Theme) or 'light'

  const isDark = activeTheme === 'dark';

  return (
    <section
      id="health"
      className={`relative w-full min-h-screen lg:h-screen lg:max-h-screen pt-[80px] pb-[80px] select-none overflow-hidden flex flex-col justify-center transition-colors duration-500 border-t ${
        isDark
          ? 'bg-[#000000] text-white border-[#6D8F63]/20'
          : 'bg-[#fafafa] text-zinc-900 border-zinc-200'
      }`}
    >
      {/* Dynamic Background Ambience with #000000, #6D8F63 & #39FF88 */}
      {isDark ? (
        <>
          <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[750px] h-[450px] bg-[#39FF88]/10 rounded-full blur-[170px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[650px] h-[400px] bg-[#39FF88]/8 rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-slate-200/60 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col justify-center my-auto">

        {/* SECTION HEADER: "Crafted for Style and Performance" */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 sm:mb-5 lg:mb-6 text-center sm:text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6D8F63]/15 border border-[#6D8F63]/35 text-[#39FF88] text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#39FF88] shadow-[0_0_8px_#39FF88] animate-pulse" />
              <span>TACTICAL &amp; BIO-METRIC TELEMETRY</span>
            </div>
            <h2
              className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight ${
                isDark ? 'text-white' : 'text-zinc-900'
              }`}
            >
              Crafted for Style and Performance
            </h2>
          </div>

          {/* Minimal Luxury Theme Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTheme(isDark ? 'light' : 'dark')}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 ${
                isDark
                  ? 'bg-[#6D8F63]/10 text-slate-200 hover:text-white border-[#6D8F63]/30 hover:border-[#39FF88]/40 backdrop-blur-md'
                  : 'bg-black/[0.04] text-zinc-700 hover:text-zinc-900 border-zinc-200 hover:border-zinc-300'
              }`}
              title="Toggle Tactical Bio Dark / Studio Light"
            >
              {isDark ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39FF88] shadow-[0_0_6px_#39FF88]" />
                  <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-[#39FF88]">TACTICAL BIO</span>
                  <Sun className="w-3.5 h-3.5 text-[#39FF88]" />
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_6px_#6366f1]" />
                  <span className="text-[11px] font-medium tracking-wider uppercase text-zinc-700">LIGHT THEME</span>
                  <Moon className="w-3.5 h-3.5 text-indigo-500" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* 6-CARD BENTO GRID (3 COLUMNS × 2 ROWS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 lg:gap-4 w-full">

          {/* ========================================================
              CARD 1 (TOP LEFT): "Crafted for Every Second"
             ======================================================== */}
          <div
            className={`group relative rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 flex flex-col justify-between overflow-hidden border transition-all duration-500 hover:-translate-y-1 min-h-[195px] sm:min-h-[215px] lg:min-h-[205px] xl:min-h-[225px] ${
              isDark
                ? 'bg-gradient-to-b from-[#0c140f]/90 via-[#060a08]/95 to-black border-white/10 hover:border-[#39FF88]/60 hover:shadow-[0_20px_45px_rgba(57,255,136,0.14)]'
                : 'bg-white border-zinc-200/90 hover:border-zinc-300 shadow-sm hover:shadow-md'
            }`}
          >
            {/* Ambient Corner Glow */}
            {isDark && (
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#6D8F63]/15 group-hover:bg-[#39FF88]/20 rounded-full blur-[50px] pointer-events-none transition-colors duration-500" />
            )}

            {/* Left Text Content */}
            <div className="relative z-10 max-w-[180px] sm:max-w-[200px]">
              <span className={`block font-mono text-[9px] sm:text-[10px] font-bold tracking-wider uppercase mb-1 ${
                isDark ? 'text-[#39FF88]' : 'text-slate-500'
              }`}>
                GRADE 5 TITANIUM
              </span>
              <h3
                className={`text-lg sm:text-xl font-bold tracking-tight leading-snug ${
                  isDark ? 'text-white' : 'text-zinc-900'
                }`}
              >
                Crafted for Every Second
              </h3>
              <p
                className={`text-xs sm:text-sm mt-1 font-normal leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-zinc-500'
                }`}
              >
                Precision meets elegance
              </p>

              {/* Capsule Pill Button: "More Details" */}
              <div className="mt-4 sm:mt-5">
                <a
                  href="#collection"
                  className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 shadow-md hover:scale-105 active:scale-95 ${
                    isDark
                      ? 'bg-[#39FF88] hover:bg-[#32e57a] text-black font-extrabold shadow-[0_0_18px_rgba(57,255,136,0.35)]'
                      : 'bg-black hover:bg-zinc-800 text-white'
                  }`}
                >
                  <span>More Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right Watch Product Image */}
            <div className="absolute right-1 sm:right-3 -bottom-2 sm:-bottom-3 w-36 sm:w-42 lg:w-38 xl:w-44 pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105">
              <img
                src="/bento/card1_every_second.webp"
                alt="Crafted for Every Second - Grade 5 Titanium Link"
                className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>

          {/* ========================================================
              CARD 2 (TOP CENTER): "Premium Materials"
             ======================================================== */}
          <div
            className={`group relative rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 flex flex-col justify-between overflow-hidden border transition-all duration-500 hover:-translate-y-1 min-h-[195px] sm:min-h-[215px] lg:min-h-[205px] xl:min-h-[225px] ${
              isDark
                ? 'bg-gradient-to-b from-[#0c140f]/90 via-[#060a08]/95 to-black border-white/10 hover:border-[#39FF88]/60 hover:shadow-[0_20px_45px_rgba(57,255,136,0.14)]'
                : 'bg-white border-zinc-200/90 hover:border-zinc-300 shadow-sm hover:shadow-md'
            }`}
          >
            {/* Ambient Corner Glow */}
            {isDark && (
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#6D8F63]/15 group-hover:bg-[#39FF88]/20 rounded-full blur-[50px] pointer-events-none transition-colors duration-500" />
            )}

            {/* Left Text Content */}
            <div className="relative z-10 max-w-[180px] sm:max-w-[200px]">
              <span className={`block font-mono text-[9px] sm:text-[10px] font-bold tracking-wider uppercase mb-1 ${
                isDark ? 'text-[#6D8F63]' : 'text-slate-500'
              }`}>
                MOHS-9 HARDNESS
              </span>
              <h3
                className={`text-lg sm:text-xl font-bold tracking-tight leading-snug ${
                  isDark ? 'text-white' : 'text-zinc-900'
                }`}
              >
                Premium Materials
              </h3>
              <p
                className={`text-xs sm:text-sm mt-1 font-normal leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-zinc-500'
                }`}
              >
                Scratch &amp; shock resistant
              </p>

              {isDark && (
                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#39FF88] mt-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39FF88]" />
                  <span>3,200 HV DIAMOND DLC</span>
                </div>
              )}
            </div>

            {/* Right Titanium Case & Sapphire Crystal */}
            <div className="absolute right-1 sm:right-3 -bottom-2 sm:-bottom-3 w-36 sm:w-42 lg:w-38 xl:w-44 pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105">
              <img
                src="/bento/card2_premium_materials.webp"
                alt="Premium Materials - Titanium Link Bracelet"
                className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>

          {/* ========================================================
              CARD 3 (TOP RIGHT): "Precision Inside"
             ======================================================== */}
          <div
            className={`group relative rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 flex flex-col justify-between overflow-hidden border transition-all duration-500 hover:-translate-y-1 min-h-[195px] sm:min-h-[215px] lg:min-h-[205px] xl:min-h-[225px] ${
              isDark
                ? 'bg-gradient-to-b from-[#0c140f]/90 via-[#060a08]/95 to-black border-white/10 hover:border-[#39FF88]/60 hover:shadow-[0_20px_45px_rgba(57,255,136,0.14)]'
                : 'bg-white border-zinc-200/90 hover:border-zinc-300 shadow-sm hover:shadow-md'
            }`}
          >
            {/* Ambient Corner Glow */}
            {isDark && (
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#6D8F63]/15 group-hover:bg-[#39FF88]/20 rounded-full blur-[50px] pointer-events-none transition-colors duration-500" />
            )}

            {/* Left Text Content */}
            <div className="relative z-10 max-w-[170px] sm:max-w-[190px]">
              <span className={`block font-mono text-[9px] sm:text-[10px] font-bold tracking-wider uppercase mb-1 ${
                isDark ? 'text-[#39FF88]' : 'text-slate-500'
              }`}>
                HOROLOGY CORE
              </span>
              <h3
                className={`text-lg sm:text-xl font-bold tracking-tight leading-snug ${
                  isDark ? 'text-white' : 'text-zinc-900'
                }`}
              >
                Precision Inside
              </h3>
              <p
                className={`text-xs sm:text-sm mt-1 font-normal leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-zinc-500'
                }`}
              >
                Sub-nanosecond movement
              </p>

              {isDark && (
                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-slate-300 mt-3">
                  <span className="text-[#39FF88] font-bold">±0.001ms</span>
                  <span>Atomic Sync</span>
                </div>
              )}
            </div>

            {/* Right Stealth Architecture Watch */}
            <div className="absolute right-1 sm:right-3 -bottom-1 sm:-bottom-2 w-36 sm:w-42 lg:w-38 xl:w-42 pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105">
              <img
                src="/bento/card3_precision_inside.webp"
                alt="Precision Inside - Stealth Horology Architecture"
                className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>

          {/* ========================================================
              CARD 4 (BOTTOM LEFT): "Built to Last"
             ======================================================== */}
          <div
            className={`group relative rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 flex flex-col justify-between overflow-hidden border transition-all duration-500 hover:-translate-y-1 min-h-[195px] sm:min-h-[215px] lg:min-h-[205px] xl:min-h-[225px] ${
              isDark
                ? 'bg-gradient-to-b from-[#0c140f]/90 via-[#060a08]/95 to-black border-white/10 hover:border-[#39FF88]/60 hover:shadow-[0_20px_45px_rgba(57,255,136,0.14)]'
                : 'bg-white border-zinc-200/90 hover:border-zinc-300 shadow-sm hover:shadow-md'
            }`}
          >
            {/* Ambient Corner Glow */}
            {isDark && (
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#6D8F63]/15 group-hover:bg-[#39FF88]/20 rounded-full blur-[50px] pointer-events-none transition-colors duration-500" />
            )}

            {/* Top Text Content */}
            <div className="relative z-10 max-w-[200px]">
              <span className={`block font-mono text-[9px] sm:text-[10px] font-bold tracking-wider uppercase mb-1 ${
                isDark ? 'text-[#6D8F63]' : 'text-slate-500'
              }`}>
                HYDROSTATIC 10 ATM
              </span>
              <h3
                className={`text-lg sm:text-xl font-bold tracking-tight leading-snug ${
                  isDark ? 'text-white' : 'text-zinc-900'
                }`}
              >
                Built to Last
              </h3>
              <p
                className={`text-xs sm:text-sm mt-1 font-normal leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-zinc-500'
                }`}
              >
                10 ATM water resistance
              </p>

              {isDark && (
                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#39FF88] mt-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39FF88] animate-pulse" />
                  <span>ISO 22810 DIVER CERTIFIED</span>
                </div>
              )}
            </div>

            {/* Bottom Stacked Watches Render */}
            <div className="absolute right-1 sm:right-4 -bottom-1 sm:-bottom-2 w-48 sm:w-56 lg:w-50 xl:w-56 pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105">
              <img
                src="/bento/card4_stacked_watches.webp"
                alt="Built to Last - 10 ATM Water Resistance Stacked Watches"
                className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>

          {/* ========================================================
              CARD 5 (BOTTOM CENTER): "Your Style, Your Watch"
             ======================================================== */}
          <div
            className={`group relative rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 flex flex-col justify-between overflow-hidden border transition-all duration-500 hover:-translate-y-1 min-h-[195px] sm:min-h-[215px] lg:min-h-[205px] xl:min-h-[225px] ${
              isDark
                ? 'bg-[#000000] border-white/10 hover:border-[#39FF88]/60 hover:shadow-[0_20px_45px_rgba(57,255,136,0.14)]'
                : 'bg-white border-zinc-200/90 hover:border-zinc-300 shadow-sm hover:shadow-md'
            }`}
          >
            {/* FULL BLEED Lifestyle Photo Background */}
            <img
              src="/bento/card5_wrist_lifestyle.webp"
              alt="Your Style, Your Watch - Lifestyle Wrist Showcase"
              className="absolute inset-0 w-full h-full object-cover object-[70%_center] group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Gradient Scrim for Flawless Text Readability */}
            <div
              className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${
                isDark
                  ? 'bg-gradient-to-r from-black via-black/80 to-transparent'
                  : 'bg-gradient-to-r from-white via-white/80 to-transparent'
              }`}
            />

            {/* Text Content */}
            <div className="relative z-10 max-w-[210px]">
              <span className={`block font-mono text-[9px] sm:text-[10px] font-bold tracking-wider uppercase mb-1 ${
                isDark ? 'text-[#39FF88]' : 'text-slate-500'
              }`}>
                BESPOKE FINISHES
              </span>
              <h3
                className={`text-lg sm:text-xl font-bold tracking-tight leading-snug ${
                  isDark ? 'text-white' : 'text-zinc-900'
                }`}
              >
                Your Style, Your Watch
              </h3>
              <p
                className={`text-xs sm:text-sm mt-1 font-normal leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-zinc-600'
                }`}
              >
                Multiple dial colors &amp; finishes
              </p>
            </div>
          </div>

          {/* ========================================================
              CARD 6 (BOTTOM RIGHT): "Trusted Worldwide"
             ======================================================== */}
          <div
            className={`group relative rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 flex flex-col justify-between overflow-hidden border transition-all duration-500 hover:-translate-y-1 min-h-[195px] sm:min-h-[215px] lg:min-h-[205px] xl:min-h-[225px] ${
              isDark
                ? 'bg-[#000000] border-white/10 hover:border-[#39FF88]/60 hover:shadow-[0_20px_45px_rgba(57,255,136,0.14)]'
                : 'bg-white border-zinc-200/90 hover:border-zinc-300 shadow-sm hover:shadow-md'
            }`}
          >
            {/* FULL BLEED Collector Community Photo Background */}
            <img
              src="/bento/card6_couple_lifestyle.webp"
              alt="Trusted Worldwide - Global Horology Collectors"
              className="absolute inset-0 w-full h-full object-cover object-[75%_center] group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Gradient Scrim for Flawless Text Readability */}
            <div
              className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${
                isDark
                  ? 'bg-gradient-to-r from-black via-black/80 to-transparent'
                  : 'bg-gradient-to-r from-white via-white/80 to-transparent'
              }`}
            />

            {/* Text Content & 5-Star Social Proof */}
            <div className="relative z-10 max-w-[210px]">
              <span className={`block font-mono text-[9px] sm:text-[10px] font-bold tracking-wider uppercase mb-1 ${
                isDark ? 'text-[#6D8F63]' : 'text-slate-500'
              }`}>
                COLLECTOR GUILD
              </span>
              <h3
                className={`text-lg sm:text-xl font-bold tracking-tight leading-snug ${
                  isDark ? 'text-white' : 'text-zinc-900'
                }`}
              >
                Trusted Worldwide
              </h3>
              <p
                className={`text-xs sm:text-sm mt-1 font-normal leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-zinc-600'
                }`}
              >
                10,000+ customers
              </p>

              {/* 5-Star Rating Badge */}
              <div className="flex items-center gap-1.5 mt-2.5">
                <div className="flex text-[#39FF88]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#39FF88] text-[#39FF88]" />
                  ))}
                </div>
                <span className={`text-[11px] font-mono font-bold ${isDark ? 'text-[#39FF88]' : 'text-zinc-900'}`}>
                  4.98 / 5.0
                </span>
                <span className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-zinc-500'}`}>
                  (18K+ Collectors)
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
