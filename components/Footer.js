'use client';

import { Phone, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const navLinks = [
    { href: '#', label: 'HOME' },
    { href: '#scrolly-section', label: '3D ANIMATION' },
    { href: '#metallurgy', label: 'FINISHES' },
    { href: '#collection', label: 'COLLECTION' },
    { href: '#watch-faces', label: 'WATCH FACES' },
    { href: '#health', label: 'PERFORMANCE' },
    { href: '#specs', label: 'SPECS' },
  ];

  const socialLinks = [
    { href: 'https://linkedin.com', label: 'LINKEDIN' },
    { href: 'https://facebook.com', label: 'FACEBOOK' },
    { href: 'https://twitter.com', label: 'TWITTER' },
    { href: 'https://instagram.com', label: 'INSTAGRAM' },
  ];

  return (
    <footer className="relative w-full bg-black text-white font-sans select-none border-t border-white/10 overflow-hidden pt-16 sm:pt-20">
      {/* Subtle Ambient Radial Backlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#39FF88]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Main 3-Column Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Navigation with ↗ Prefix */}
        <div className="flex flex-col gap-3.5 order-2 lg:order-1 items-center lg:items-start">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold tracking-wider text-slate-300 hover:text-[#39FF88] transition-colors group"
            >
              <span className="text-slate-500 group-hover:text-[#39FF88] transition-colors font-sans text-sm">↗</span>
              <span>{link.label}</span>
            </a>
          ))}
        </div>

        {/* Center Column: Phone, Email & Let's Connect CTA */}
        <div className="flex flex-col items-center justify-center text-center gap-5 order-1 lg:order-2">
          {/* Phone Contact */}
          <a
            href="tel:+918527458950"
            className="inline-flex items-center gap-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white hover:text-[#39FF88] transition-colors tracking-tight font-heading group"
          >
            <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-[#39FF88] group-hover:scale-110 transition-transform flex-shrink-0" />
            <span>+91 8527458950</span>
          </a>

          {/* Email Contact */}
          <a
            href="mailto:info@webtycoonss.com"
            className="inline-flex items-center gap-3 text-xl sm:text-2xl lg:text-3xl font-extrabold text-white hover:text-[#39FF88] transition-colors tracking-tight font-heading group"
          >
            <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-[#39FF88] group-hover:scale-110 transition-transform flex-shrink-0" />
            <span>info@webtycoonss.com</span>
          </a>

          {/* Let's Connect Button */}
          <a
            href="#collection"
            className="mt-3 inline-flex items-center gap-2 px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-[#39FF88] hover:bg-[#32e57a] text-black font-sans font-bold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(57,255,136,0.5)] hover:scale-105 active:scale-95"
          >
            <span>Let's Connect</span>
            <span className="text-base font-bold">↗</span>
          </a>
        </div>

        {/* Right Column: Social Links with ↗ Prefix */}
        <div className="flex flex-col gap-3.5 order-3 items-center lg:items-end">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold tracking-wider text-slate-300 hover:text-[#39FF88] transition-colors group"
            >
              <span className="text-slate-500 group-hover:text-[#39FF88] transition-colors font-sans text-sm">↗</span>
              <span>{social.label}</span>
            </a>
          ))}
        </div>

      </div>

      {/* Middle Row: Copyright line */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-16 sm:mt-20 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 font-mono text-[11px] uppercase tracking-wider">
        <div>
          &copy; {new Date().getFullYear()} ALL RIGHTS RESERVED
        </div>
        <div className="flex items-center gap-4 text-[10px] text-slate-600">
          <span>VELTRIX HOROLOGY LABS</span>
          <span>•</span>
          <span>SWISS PRECISION</span>
        </div>
      </div>

      {/* Bottom Giant Brand Wordmark (Edge-to-Edge Typography matching reference) */}
      <div className="w-full overflow-hidden select-none pointer-events-none pt-2 sm:pt-4 pb-0 text-center">
        <h1 className="text-[13.5vw] sm:text-[15vw] font-black tracking-tighter text-neutral-200/95 leading-[0.82] uppercase text-center mx-auto whitespace-nowrap drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          VELTRIX
        </h1>
      </div>

      {/* Floating Action Buttons (Bottom Right Contact Pills matching reference) */}
      <aside aria-label="Quick contact actions" className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Blue Call Button */}
        <a
          href="tel:+918527458950"
          aria-label="Call +91 8527458950"
          className="w-12 h-12 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
          title="Call Now"
        >
          <Phone className="w-5 h-5 fill-white" />
        </a>

        {/* Green WhatsApp Button */}
        <a
          href="https://wa.me/918527458950"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="w-12 h-12 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
          title="WhatsApp"
        >
          <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.78 14.12c-.24.68-1.2 1.26-1.68 1.32-.46.06-1.04.09-3.23-.82-2.31-.96-3.8-3.3-3.92-3.46-.12-.16-.94-1.25-.94-2.39 0-1.13.59-1.69.8-1.92.21-.24.46-.3.61-.3.15 0 .31 0 .44.01.14.01.33-.05.51.39.19.45.64 1.57.7 1.69.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.25.25-.11.49.14.24.63 1.04 1.35 1.68.93.83 1.71 1.09 1.95 1.21.24.12.38.1.52-.06.14-.16.61-.71.77-.95.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.18 1.26z" />
          </svg>
        </a>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="w-12 h-12 rounded-full bg-[#39FF88] hover:bg-[#32e57a] text-black flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
          title="Back to Top"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      </aside>
    </footer>
  );
}
