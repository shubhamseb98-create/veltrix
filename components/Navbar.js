'use client';

import ChronosLogo from './ChronosLogo';

export default function Navbar() {
  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-[#6D8F63]/25 transition-all">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center group" aria-label="Chronos Horology Lab Home">
          <ChronosLogo size="md" />
        </a>

        <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-wider text-slate-300 font-medium">
          <a href="#scrolly-section" className="hover:text-[#39FF88] transition-colors">3D ANIMATION</a>
          <a href="#metallurgy" className="hover:text-[#39FF88] transition-colors">FINISHES</a>
          <a href="#collection" className="hover:text-[#39FF88] transition-colors">COLLECTION</a>
          <a href="#watch-faces" className="hover:text-[#39FF88] transition-colors">WATCH FACES</a>
          <a href="#health" className="hover:text-[#39FF88] transition-colors">PERFORMANCE</a>
          <a href="#specs" className="hover:text-[#39FF88] transition-colors">SPECS</a>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#collection"
            className="inline-flex items-center gap-2 bg-[#39FF88] hover:bg-[#32e57a] text-black font-mono font-bold text-xs tracking-wider px-5 py-2.5 rounded-lg transition-all hover:shadow-[0_0_20px_rgba(57,255,136,0.35)] hover:-translate-y-0.5"
          >
            <span>EXPLORE LINEUP</span>
            <span className="text-sm font-sans font-bold leading-none">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}
