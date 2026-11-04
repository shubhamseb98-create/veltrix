'use client';

import { ArrowUp, ArrowUpRight, Sparkles, ShieldCheck, Globe, Truck } from 'lucide-react';
import ChronosLogo from './ChronosLogo';

export default function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const leftNav = [
    { href: '#', label: 'HOME // APEX' },
    { href: '#scrolly-section', label: '3D EXPLODED INSPECTION' },
    { href: '#metallurgy', label: 'METALLURGY FINISHES' },
    { href: '#collection', label: 'TITANIUM COLLECTION' },
    { href: '#watch-faces', label: 'DYNAMIC WATCH FACES' },
    { href: '#health', label: '4NM NEURAL CORE' },
    { href: '#specs', label: 'TECHNICAL BLUEPRINTS' },
  ];

  const rightNav = [
    { href: '#collection', label: 'COLLECTOR VAULT & PACKAGING' },
    { href: '#specs', label: '10 ATM WATER CERTIFICATION' },
    { href: '#specs', label: 'NFC SERIAL AUTHENTICITY' },
    { href: '#', label: 'ATELIER RECALIBRATION' },
    { href: 'https://instagram.com', label: 'INSTAGRAM' },
    { href: 'https://twitter.com', label: 'X // TWITTER' },
  ];

  return (
    <footer className="relative w-full bg-black text-white font-sans select-none border-t border-white/10 overflow-hidden pt-16 sm:pt-24 pb-0">
      {/* Subtle Ambient Radial Backlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-[#39FF88]/6 rounded-full blur-[170px] pointer-events-none" />

      {/* Main 3-Column Luxury Architecture */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Navigation Matrix (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-3.5 order-2 lg:order-1 items-start">
          <div className="font-mono text-[10px] text-[#39FF88] tracking-[0.25em] uppercase mb-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#39FF88]" />
            <span>NAVIGATION MATRIX</span>
          </div>
          {leftNav.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-2 font-mono text-xs sm:text-[13px] text-slate-300 hover:text-[#39FF88] transition-all group tracking-wide"
            >
              <span className="text-slate-600 group-hover:text-[#39FF88] transition-colors font-sans text-xs">↗</span>
              <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
            </a>
          ))}
        </div>

        {/* Center Column: Swiss Atelier Concierge (4 cols) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center text-center gap-5 order-1 lg:order-2 px-2">
          {/* Brand Emblem */}
          <div className="mb-1">
            <ChronosLogo size="md" />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[#39FF88] font-mono text-[10px] tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#39FF88] animate-pulse" />
            <span>GENEVA ATELIER // VIP CONCIERGE</span>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-mono text-slate-500 tracking-widest uppercase">
              Bespoke Inquiries &amp; Allocations
            </div>
            <a
              href="mailto:concierge@veltrix.com"
              className="block text-xl sm:text-2xl font-extrabold text-white hover:text-[#39FF88] transition-colors tracking-tight font-heading"
            >
              concierge@veltrix.com
            </a>
            <a
              href="tel:+41228198800"
              className="block font-mono text-sm sm:text-base text-slate-300 hover:text-[#39FF88] transition-colors tracking-wider"
            >
              +41 (0) 22 819 8800
            </a>
          </div>

          {/* Request Atelier Allocation CTA */}
          <a
            href="#collection"
            className="mt-2 inline-flex items-center gap-2.5 px-8 py-3 rounded-full bg-[#39FF88] hover:bg-[#32e57a] text-black font-mono font-bold text-xs tracking-wider transition-all duration-300 hover:shadow-[0_0_30px_rgba(57,255,136,0.45)] hover:scale-105 active:scale-95"
          >
            <span>REQUEST ALLOCATION</span>
            <span className="text-sm font-bold font-sans">↗</span>
          </a>
        </div>

        {/* Right Column: Patrons & Channels (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-3.5 order-3 items-start lg:items-end">
          <div className="font-mono text-[10px] text-[#39FF88] tracking-[0.25em] uppercase mb-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#39FF88]" />
            <span>PATRONS &amp; ECOSYSTEM</span>
          </div>
          {rightNav.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-2 font-mono text-xs sm:text-[13px] text-slate-300 hover:text-[#39FF88] transition-all group tracking-wide"
            >
              <span className="text-slate-600 group-hover:text-[#39FF88] transition-colors font-sans text-xs">↗</span>
              <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
            </a>
          ))}
        </div>

      </div>

      {/* Luxury Trust Pillars Strip */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-14 pt-8 border-t border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <ShieldCheck className="w-4 h-4 text-[#39FF88] flex-shrink-0" />
            <span className="font-mono text-[11px] text-slate-400 tracking-wider">5-YEAR SWISS WARRANTY</span>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <Sparkles className="w-4 h-4 text-[#39FF88] flex-shrink-0" />
            <span className="font-mono text-[11px] text-slate-400 tracking-wider">GRADE 5 TI-6AL-4V</span>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <Globe className="w-4 h-4 text-[#39FF88] flex-shrink-0" />
            <span className="font-mono text-[11px] text-slate-400 tracking-wider">10 ATM / 100M PRESSURE</span>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <Truck className="w-4 h-4 text-[#39FF88] flex-shrink-0" />
            <span className="font-mono text-[11px] text-slate-400 tracking-wider">ARMORED GLOBAL TRANSIT</span>
          </div>
        </div>
      </div>

      {/* Middle Row: Copyright & Compliance */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider">
        <div>
          &copy; {new Date().getFullYear()} VELTRIX HOROLOGY LABS INC. ALL RIGHTS RESERVED.
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-500">
          <span className="hover:text-[#39FF88] cursor-pointer transition-colors">SWISS PRECISION &amp; NEURAL SILICON</span>
          <span>•</span>
          <span className="hover:text-[#39FF88] cursor-pointer transition-colors">GENEVA ATELIER NO. 08</span>
          <span>•</span>
          <span className="hover:text-[#39FF88] cursor-pointer transition-colors">ISO 22810</span>
        </div>
      </div>

      {/* Bottom Giant Brand Wordmark (Monumental Editorial Typography matching reference layout) */}
      <div className="w-full overflow-hidden select-none pointer-events-none pt-4 sm:pt-6 pb-0 text-center">
        <h1 className="text-[13.5vw] sm:text-[15vw] font-black tracking-tighter text-neutral-200/90 leading-[0.80] uppercase text-center mx-auto whitespace-nowrap drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
          VELTRIX
        </h1>
      </div>

      {/* Minimal Luxury Floating Return-to-Apex (Top) Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={scrollToTop}
          aria-label="Return to Apex"
          className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-neutral-950/85 border border-[#6D8F63]/40 text-[#39FF88] backdrop-blur-xl shadow-[0_0_25px_rgba(57,255,136,0.2)] transition-all duration-300 hover:scale-110 hover:border-[#39FF88] hover:shadow-[0_0_35px_rgba(57,255,136,0.4)] active:scale-95"
          title="Return to Apex // Top"
        >
          <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  );
}
