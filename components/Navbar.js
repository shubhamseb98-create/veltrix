'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import ChronosLogo from './ChronosLogo';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  const navLinks = [
    { href: '#scrolly-section', label: '3D ANIMATION' },
    { href: '#metallurgy', label: 'FINISHES' },
    { href: '#collection', label: 'COLLECTION' },
    { href: '#watch-faces', label: 'WATCH FACES' },
    { href: '#specs', label: 'SPECS' },
    { href: '#client-videos', label: 'CLIENT VIDEOS' },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-[#1F3491]/30 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between">
        <a href="#" className="flex items-center group" aria-label="Chronos Horology Lab Home">
          <ChronosLogo size="md" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-8 font-mono text-xs tracking-wider text-slate-300 font-medium">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              whileHover={{ y: -1, color: '#3a86ff' }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="hover:text-[#3a86ff] transition-colors"
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {/* Desktop CTA & Mobile Hamburger Button */}
        <div className="flex items-center gap-3">
          <motion.a
            href="#collection"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 450, damping: 28 }}
            className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-[#173296] to-[#2563EB] hover:from-[#1e3eb8] hover:to-[#3b82f6] text-white font-mono font-bold text-xs tracking-wider px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg transition-shadow shadow-[0_0_22px_rgba(37,99,235,0.6)] hover:shadow-[0_0_28px_rgba(51,80,255,0.85)] border border-[#3b82f6]/40"
          >
            <span>EXPLORE LINEUP</span>
            <span className="text-sm font-sans font-bold leading-none">↗</span>
          </motion.a>

          {/* Mobile Menu Hamburger Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.92 }}
            className="md:hidden p-2 rounded-lg bg-neutral-900 border border-[#1F3491]/40 text-slate-200 hover:text-[#3a86ff] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#3a86ff]" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Scroll Progress Hairline */}
      <motion.div
        style={{ scaleX: smoothProgress, transformOrigin: '0% 50%' }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#173296] via-[#3a86ff] to-[#38bdf8] pointer-events-none"
      />

      {/* Mobile Drawer Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-black/95 border-b border-[#1F3491]/40 backdrop-blur-2xl"
          >
            <nav className="flex flex-col gap-4 px-6 py-5 font-mono text-xs tracking-wider text-slate-300">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.22 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 hover:text-[#3a86ff] transition-colors flex items-center justify-between border-b border-white/5"
                >
                  <span>{link.label}</span>
                  <span className="text-[10px] text-[#3a86ff]">→</span>
                </motion.a>
              ))}
              <motion.a
                href="#collection"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.25 }}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#173296] to-[#2563EB] text-white font-mono font-bold text-xs tracking-wider px-4 py-2.5 rounded-lg transition-all shadow-[0_0_18px_rgba(37,99,235,0.55)] border border-[#3b82f6]/40"
              >
                <span>EXPLORE LINEUP</span>
                <span className="text-sm font-sans font-bold leading-none">↗</span>
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
