'use client';

import { useState } from 'react';
import { ShieldCheck, Plane, RotateCcw, Check, Sparkles, Box, ArrowRight, Zap, Lock } from 'lucide-react';

const THUMBNAILS = [
  { frame: 1, label: '01 Assembled', sub: '3/4 Perspective' },
  { frame: 60, label: '02 Deconstruction', sub: 'Layer Separation' },
  { frame: 120, label: '03 Neural Core', sub: 'Motherboard View' },
  { frame: 238, label: '04 Crown & Clasp', sub: 'Macro Detailing' },
];

const FINISHES = [
  {
    id: 'silver',
    name: 'Raw Titanium Satin',
    desc: 'Natural aerospace Ti-6Al-4V alloy with directional hand-brushed satin facets.',
    swatch: 'from-slate-200 via-slate-400 to-slate-300',
    border: 'border-slate-300',
  },
  {
    id: 'stealth',
    name: 'Stealth DLC Obsidian',
    desc: 'Diamond-Like Carbon molecular vacuum vapor deposition for scratch resistance.',
    swatch: 'from-zinc-900 via-zinc-800 to-black',
    border: 'border-[#6D8F63]/80',
  },
];

export default function PurchaseSection() {
  const [selectedFrame, setSelectedFrame] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFinish, setSelectedFinish] = useState(FINISHES[0]);
  const [orderComplete, setOrderComplete] = useState(false);

  const previewPath = `/frames/frame_${String(selectedFrame).padStart(4, '0')}.webp`;
  const currentThumbnail = THUMBNAILS.find((t) => t.frame === selectedFrame) || THUMBNAILS[0];

  function handleOrder(e) {
    e.preventDefault();
    setOrderComplete(true);
    setTimeout(() => {
      setOrderComplete(false);
      setIsModalOpen(false);
    }, 2800);
  }

  return (
    <section id="purchase" className="relative py-28 px-6 bg-black border-t border-white/10 overflow-hidden select-none">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#6D8F63]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6D8F63]/10 border border-[#39FF88]/30 text-[#39FF88] font-mono text-[11px] font-semibold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(57,255,136,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-[#39FF88]" />
            <span>THE HOROLOGY ALLOCATION STUDIO</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase leading-tight mb-4">
            ACQUIRE <span className="bg-gradient-to-r from-white via-slate-200 to-[#39FF88] bg-clip-text text-transparent">CHRONOS T-01</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Strictly limited to 500 individually serialized timepieces for the inaugural Batch 01 worldwide release.
          </p>
        </div>

        {/* Main 2-Column Luxury Configurator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* LEFT COLUMN: Luxury Watch Stage (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Spotlight Showcase Frame */}
            <div className="relative w-full aspect-[4/5] min-h-[460px] bg-gradient-to-b from-neutral-950 via-neutral-900 to-black rounded-3xl border border-white/10 p-6 flex flex-col justify-between overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] group">
              {/* Radial Center Spotlight */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(57,255,136,0.18)_0%,rgba(0,0,0,0)_68%)] pointer-events-none" />

              {/* Technical Precision Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

              {/* Top Badges */}
              <div className="relative z-10 flex items-center justify-between w-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-emerald-500/40 text-emerald-400 font-mono text-[10px] font-semibold tracking-wider backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>IN-STOCK // BATCH 01</span>
                </div>
                <div className="font-mono text-[10px] text-slate-400 tracking-widest px-2.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                  45MM • TI-6AL-4V
                </div>
              </div>

              {/* Center Watch Image (Big, crisp & dramatic) */}
              <div className="relative z-10 flex-1 flex items-center justify-center p-4">
                <img
                  src={previewPath}
                  alt="CHRONOS T-01 Angle Preview"
                  className="w-full h-full object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] transition-all duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Bottom Angle Indicator */}
              <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10 font-mono text-[11px]">
                <span className="text-[#39FF88] font-medium tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39FF88]" />
                  {currentThumbnail.label}
                </span>
                <span className="text-slate-500 tracking-wider">
                  {currentThumbnail.sub}
                </span>
              </div>
            </div>

            {/* Interactive 4-Angle Switcher Tiles */}
            <div className="grid grid-cols-4 gap-3">
              {THUMBNAILS.map((thumb) => {
                const path = `/frames/frame_${String(thumb.frame).padStart(4, '0')}.webp`;
                const isActive = selectedFrame === thumb.frame;
                return (
                  <button
                    key={thumb.frame}
                    type="button"
                    onClick={() => setSelectedFrame(thumb.frame)}
                    className={`relative flex flex-col items-center p-2 rounded-xl border bg-neutral-950/80 backdrop-blur-md transition-all duration-300 text-left ${
                      isActive
                        ? 'border-[#39FF88] shadow-[0_0_15px_rgba(57,255,136,0.35)] ring-1 ring-[#39FF88]/80 -translate-y-0.5'
                        : 'border-white/10 hover:border-white/30 hover:bg-neutral-900'
                    }`}
                  >
                    <div className="w-full aspect-square flex items-center justify-center overflow-hidden mb-1.5">
                      <img src={path} alt={thumb.label} className="w-full h-full object-contain" />
                    </div>
                    <span className={`font-mono text-[10px] font-semibold truncate w-full text-center ${
                      isActive ? 'text-[#39FF88]' : 'text-slate-400'
                    }`}>
                      {thumb.label.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Luxury Configurator & Spec Summary (7 Cols) */}
          <div className="lg:col-span-7 bg-neutral-950/70 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl flex flex-col justify-between shadow-2xl">
            <div>
              {/* Product Title & Serial Numbering */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-[#39FF88] font-semibold tracking-widest uppercase">
                  DIRECT ATELIER ALLOCATION // EDITION 01
                </span>
                <span className="font-mono text-[11px] text-slate-500 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded">
                  SERIAL #0147 / 0500
                </span>
              </div>

              <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight uppercase mb-2">
                CHRONOS T-01
              </h3>
              <p className="text-[#39FF88] font-mono text-xs sm:text-sm tracking-wide font-medium mb-4">
                5-Axis CNC Solid Titanium • Neural Biometric Array • 100M Water Resist
              </p>

              <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
                Sculpted from a single solid aerospace ingot of Grade 5 Titanium (Ti-6Al-4V). Fitted with dual-curved Mohs-9 sapphire crystal, solid titanium link bracelet, and rapid magnetic inductive charging vault.
              </p>

              {/* Price Tag with EMI Notice */}
              <div className="flex flex-wrap items-baseline gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="font-heading font-extrabold text-4xl sm:text-5xl text-white">
                    $499
                  </span>
                  <span className="font-mono text-sm text-[#39FF88] font-semibold tracking-wider">
                    USD
                  </span>
                </div>
                <div className="flex flex-col text-xs font-mono text-slate-400 border-l border-white/10 pl-4">
                  <span className="text-slate-200">≈ ₹42,500 INR (All Duties & Taxes Included)</span>
                  <span className="text-emerald-400 text-[11px]">Or $41.58/mo for 12 mos with 0% APR</span>
                </div>
              </div>

              {/* Finish Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="font-mono text-xs text-slate-300 font-semibold tracking-wider uppercase">
                    SELECT FINISH: <span className="text-[#39FF88]">{selectedFinish.name}</span>
                  </label>
                  <span className="font-mono text-[11px] text-slate-500">NO PRICE DIFFERENCE</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {FINISHES.map((f) => {
                    const isSelected = selectedFinish.id === f.id;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setSelectedFinish(f)}
                        className={`flex items-start gap-3.5 p-3.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-[#6D8F63]/15 border-[#39FF88] text-white shadow-[0_0_20px_rgba(57,255,136,0.2)]'
                            : 'bg-black/40 border-white/10 text-slate-400 hover:border-white/30 hover:bg-white/[0.02]'
                        }`}
                      >
                        {/* Metallic Circle Swatch */}
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-tr ${f.swatch} border-2 ${isSelected ? 'border-[#39FF88] ring-2 ring-[#39FF88]/40' : 'border-white/20'} flex-shrink-0 mt-0.5 shadow-md`} />
                        <div className="flex flex-col">
                          <span className="font-mono text-xs font-bold text-white tracking-wide">{f.name}</span>
                          <span className="text-[11px] text-slate-400 leading-snug line-clamp-1 mt-0.5">{f.desc}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Vault Inclusions (What's in the box) */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 mb-6">
                <span className="font-mono text-[11px] text-slate-400 font-semibold tracking-widest uppercase block mb-2.5">
                  BESPOKE ATELIER VAULT CONTAINS:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-[11px] text-slate-300">
                  <div className="flex items-center gap-2">
                    <Box className="w-3.5 h-3.5 text-[#39FF88] flex-shrink-0" />
                    <span>Matte Vault Box</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-[#39FF88] flex-shrink-0" />
                    <span>Magnetic Fast Dock</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#39FF88] flex-shrink-0" />
                    <span>Titanium Link Tool</span>
                  </div>
                </div>
              </div>

              {/* Trust & Guarantee Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#39FF88] flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-mono text-[11px] text-white font-semibold">3-Year Warranty</span>
                    <span className="text-[10px] text-slate-400">In-House Atelier</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2.5">
                  <Plane className="w-5 h-5 text-[#39FF88] flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-mono text-[11px] text-white font-semibold">Express Air Dispatch</span>
                    <span className="text-[10px] text-slate-400">Insured Worldwide</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2.5">
                  <RotateCcw className="w-5 h-5 text-[#39FF88] flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-mono text-[11px] text-white font-semibold">30-Day Evaluation</span>
                    <span className="text-[10px] text-slate-400">100% Risk Free</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA & Allocation Urgency */}
            <div>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full group py-4 px-8 rounded-2xl bg-[#39FF88] hover:bg-[#39FF88] text-slate-950 font-heading font-extrabold text-base tracking-wider transition-all duration-300 shadow-[0_0_35px_rgba(57,255,136,0.4)] hover:shadow-[0_0_55px_rgba(57,255,136,0.65)] hover:-translate-y-1 flex items-center justify-center gap-3 active:translate-y-0"
              >
                <span>ACQUIRE CHRONOS T-01 &bull; $499 USD</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex items-center justify-between mt-3 font-mono text-[11px] text-slate-400 px-2">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Only 14 units left in Batch 01 allocation
                </span>
                <span className="flex items-center gap-1 text-slate-500">
                  <Lock className="w-3 h-3" />
                  256-Bit SSL Encrypted
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Luxury Apple-Style Order Allocation Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-[fadeIn_0.25s_ease-out]"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-neutral-950 border border-white/15 rounded-3xl p-6 sm:p-8 max-w-xl w-full relative shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_50px_rgba(57,255,136,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close dialog"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white text-2xl font-light w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              &times;
            </button>

            {orderComplete ? (
              <div className="py-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(52,211,153,0.5)] animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-extrabold text-2xl text-white mb-2">
                  ALLOCATION CONFIRMED
                </h3>
                <p className="text-slate-300 text-sm max-w-sm mb-4">
                  Serial number <strong>#0147 / 0500</strong> has been assigned to your profile. Dispatch preparation initiated.
                </p>
                <span className="font-mono text-xs text-[#39FF88]">
                  Direct tracking receipt sent to your email.
                </span>
              </div>
            ) : (
              <form onSubmit={handleOrder} className="flex flex-col">
                <div className="flex items-center gap-2 font-mono text-xs text-[#39FF88] font-semibold mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#39FF88] animate-pulse" />
                  <span>BATCH 01 // DIRECT FACTORY RESERVATION</span>
                </div>

                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-4">
                  RESERVE YOUR TIMEPIECE
                </h3>

                {/* Summary Mini-Card */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-black border border-white/10 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-neutral-900 border border-white/10 p-1 flex-shrink-0 flex items-center justify-center">
                    <img src={previewPath} alt="Watch" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="font-heading font-bold text-white text-base">CHRONOS T-01</span>
                    <span className="font-mono text-xs text-[#39FF88]">{selectedFinish.name} • 45mm Titanium</span>
                    <span className="font-mono text-[11px] text-slate-400 mt-0.5">Complimentary Global Air Courier</span>
                  </div>
                  <div className="font-heading font-bold text-xl text-white">
                    $499
                  </div>
                </div>

                {/* Reservation Input Fields */}
                <div className="space-y-3 mb-6">
                  <div>
                    <label className="block font-mono text-[11px] text-slate-300 mb-1 tracking-wider uppercase">
                      Client Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#39FF88] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] text-slate-300 mb-1 tracking-wider uppercase">
                      Delivery Address & City
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Street, City, Postal Code, Country"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#39FF88] transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#39FF88] hover:bg-[#39FF88] text-slate-950 font-mono font-bold text-xs tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(57,255,136,0.4)] hover:shadow-[0_0_35px_rgba(57,255,136,0.6)]"
                >
                  CONFIRM ALLOCATION &bull; $499 USD
                </button>

                <div className="flex items-center justify-center gap-2 mt-3 font-mono text-[10px] text-slate-500">
                  <Lock className="w-3 h-3 text-[#39FF88]" />
                  <span>No upfront card charge required for Batch 01 reservation.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
