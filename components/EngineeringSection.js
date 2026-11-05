'use client';

import {
  Crosshair,
  Sparkles,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';

const CRAFT_PILLARS = [
  {
    num: '01',
    code: 'CNC PRECISION',
    title: '5-Axis CNC Precision',
    category: 'AEROSPACE CHASSIS',
    desc: 'Milled from solid Grade 5 Titanium bar stock with sub-micron axial precision and zero structural deflection.',
    icon: Crosshair,
    accentColor: '#38bdf8',
    glowClass: 'bg-sky-500/15',
    badgeClass: 'text-sky-400 border-sky-500/30 bg-sky-950/40',
    specs: [
      { label: 'TOLERANCE', val: '±0.005 mm' },
      { label: 'BILLET', val: 'Grade 5 Ti-6Al-4V' },
    ],
    footerTag: 'CLEANROOM ISO 5',
  },
  {
    num: '02',
    code: 'ATELIER FINISH',
    title: 'Hand-Finished Satin Brush',
    category: 'SURFACE ARTISTRY',
    desc: 'Master hand-lapping pairs 45° directional micro-satin brushing with diamond-buffed mirror chamfers.',
    icon: Sparkles,
    accentColor: '#001d3d',
    glowClass: 'bg-[#001d3d]/20',
    badgeClass: 'text-[#001d3d] border-[#001d3d]/40 bg-[#001d3d]/10',
    specs: [
      { label: 'GRAIN ANGLE', val: '45° Directional' },
      { label: 'CHAMFERS', val: '8 Mirror Facets' },
    ],
    footerTag: 'GENEVA ATELIER',
  },
  {
    num: '03',
    code: 'HERMETIC SEAL',
    title: '10 ATM Hermetic Seal',
    category: 'HYDROSTATIC DIVE',
    desc: 'Self-energizing Viton gaskets and laser-welded crystal seals certified for 100m deep dive immersion.',
    icon: ShieldCheck,
    accentColor: '#34d399',
    glowClass: 'bg-emerald-500/15',
    badgeClass: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40',
    specs: [
      { label: 'RATING', val: '10 ATM (100M)' },
      { label: 'TESTING', val: '100% He Chamber' },
    ],
    footerTag: 'CERTIFIED ISO 22810',
  },
];

const HERO_STATS = [
  { value: '±0.005mm', label: 'AXIAL ACCURACY', sub: 'Sub-micron tolerance' },
  { value: '18,000 RPM', label: 'SPINDLE SPEED', sub: 'Diamond ceramic bearings' },
  { value: '3,200 HV', label: 'SURFACE DLC', sub: 'Mohs-9 hardness layer' },
  { value: '100 METERS', label: 'HERMETIC DEPTH', sub: 'ISO 22810 certified' },
];

export default function EngineeringSection() {
  return (
    <section
      id="engineering"
      className="relative w-full min-h-screen pt-[80px] pb-[80px] px-4 sm:px-6 lg:px-8 bg-black border-t border-[#001d3d]/20 select-none overflow-hidden font-sans flex flex-col justify-center"
    >
      {/* Ambient Radial Spotlights */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[800px] h-[450px] bg-[#3a86ff]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[350px] bg-[#3a86ff]/6 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* SECTION HEADER */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2 sm:mb-2.5">
            Precision Titanium Engineering
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm font-normal leading-relaxed max-w-xl mx-auto">
            Raw aerospace ingots machined down to absolute tolerances in our micro-precision cleanrooms.
            Where microscopic mathematics meets Geneva haute horology.
          </p>
        </div>

        {/* HERO METRICS STRIP */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16">
          {HERO_STATS.map((item, idx) => (
            <div
              key={idx}
              className="group p-4 sm:p-5 rounded-2xl bg-[#000000] border border-white/10 hover:border-[#3a86ff]/50 hover:bg-[#001d3d]/10 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] sm:text-[10px] text-slate-400 tracking-wider uppercase">
                  {item.label}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#3a86ff] group-hover:scale-125 shadow-[0_0_8px_#3a86ff] transition-transform" />
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white mb-1 tracking-tight">
                {item.value}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-400 truncate">
                {item.sub}
              </div>
            </div>
          ))}
        </div>

        {/* 3 CRAFTSMANSHIP PILLARS (COMPACT REDESIGN) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-4">
          {CRAFT_PILLARS.map((pillar) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="group relative flex flex-col justify-between rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-white/[0.05] via-zinc-950/80 to-black border border-white/10 hover:border-[#3a86ff]/60 hover:shadow-[0_20px_45px_rgba(58,134,255,0.14)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8)] overflow-hidden"
              >
                {/* Ambient Top Glow */}
                <div
                  className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] pointer-events-none transition-opacity duration-300 opacity-20 group-hover:opacity-50 ${pillar.glowClass}`}
                />

                {/* Card Top: Header with Icon and Badges */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner group-hover:border-white/20 transition-all">
                      <IconComponent
                        className="w-5 h-5 transition-colors duration-300"
                        style={{ color: pillar.accentColor }}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-slate-300 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
                        {pillar.num}
                      </span>
                      <span className={`font-mono text-[9px] font-semibold px-2 py-0.5 rounded-md border tracking-wider uppercase ${pillar.badgeClass}`}>
                        {pillar.code}
                      </span>
                    </div>
                  </div>

                  {/* Title & Category */}
                  <span className="block font-mono text-[10px] text-[#3a86ff] font-semibold tracking-wider uppercase mb-1">
                    {pillar.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2">
                    {pillar.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed mb-4">
                    {pillar.desc}
                  </p>
                </div>

                {/* Micro Specs Grid & Minimal Footer */}
                <div>
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#001d3d]/20 mb-3.5">
                    {pillar.specs.map((s, sIdx) => (
                      <div key={sIdx} className="bg-white/5 rounded-lg p-2 border border-white/5">
                        <span className="block font-mono text-[8px] sm:text-[9px] text-slate-400 tracking-wider uppercase mb-0.5">
                          {s.label}
                        </span>
                        <span className="block font-mono text-[10px] sm:text-[11px] font-bold text-white truncate">
                          {s.val}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-white/5 font-mono text-[10px] text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3a86ff] shadow-[0_0_6px_#3a86ff]" />
                      {pillar.footerTag}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#3a86ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

