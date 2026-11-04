'use client';

import { useState } from 'react';
import ChronosLogo from './ChronosLogo';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#scrolly-section', label: '3D ANIMATION' },
    { href: '#metallurgy', label: 'FINISHES' },
    { href: '#collection', label: 'COLLECTION' },
    { href: '#watch-faces', label: 'WATCH FACES' },
    { href: '#specs', label: 'SPECS' },
  ];

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-[#6D8F63]/25 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between">
        <a href="#" className="flex items-center group" aria-label="Chronos Horology Lab Home">
          <ChronosLogo size="md" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-wider text-slate-300 font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#39FF88] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA & Mobile Hamburger Button */}
        <div className="flex items-center gap-3">
          <a
            href="#collection"
            className="hidden sm:inline-flex items-center gap-2 bg-[#39FF88] hover:bg-[#32e57a] text-black font-mono font-bold text-xs tracking-wider px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg transition-all hover:shadow-[0_0_20px_rgba(57,255,136,0.35)] hover:-translate-y-0.5"
          >
            <span>EXPLORE LINEUP</span>
            <span className="text-sm font-sans font-bold leading-none">↗</span>
          </a>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-neutral-900 border border-[#6D8F63]/30 text-slate-200 hover:text-[#39FF88] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#39FF88]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-[#6D8F63]/30 px-6 py-5 backdrop-blur-2xl animate-[fadeIn_0.2s_ease-out]">
          <nav className="flex flex-col gap-4 font-mono text-xs tracking-wider text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#39FF88] transition-colors flex items-center justify-between border-b border-white/5"
              >
                <span>{link.label}</span>
                <span className="text-[10px] text-[#6D8F63]">→</span>
              </a>
            ))}
            <a
              href="#collection"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 bg-[#39FF88] text-black font-mono font-bold text-xs tracking-wider px-4 py-2.5 rounded-lg transition-all"
            >
              <span>EXPLORE LINEUP</span>
              <span className="text-sm font-sans font-bold leading-none">↗</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
