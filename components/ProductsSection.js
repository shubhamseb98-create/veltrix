'use client';

import { useState } from 'react';
import { ArrowUpRight, Check, X, Eye, Sparkles } from 'lucide-react';

const EDITIONS = [
  {
    id: 'chrome-silver',
    name: 'Chrome Silver 2.0',
    category: 'METALLIC // CHROME SILVER',
    price: '$499',
    inr: '₹42,500',
    image: '/products/mood_chrome_silver.webp',
    accentColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.2)',
    badgeColor: 'text-sky-400 border-sky-500/30 bg-sky-950/40',
    desc: 'Precision engineered magnetic stainless steel multi-link architecture with seamless elliptical contouring. Features an ultra-bright AMOLED display and real-time orbital planetary telemetry.',
    quickSpecs: [
      { label: 'BRACELET', val: 'Solid Chrome Link' },
      { label: 'CLASP', val: 'Magnetic Lock' },
      { label: 'CASE', val: '45mm Grade 5 Ti' },
    ],
    fullSpecs: [
      { label: 'METALLURGY', val: 'Grade 5 Ti + 316L Steel', sub: '5-Axis CNC Precision' },
      { label: 'OPTICAL SHIELD', val: 'Dual-Curved Sapphire Lens', sub: 'Mohs-9 Hardness AR' },
      { label: 'BRACELET', val: 'Magnetic Stainless Multi-Link', sub: 'Seamless Elliptical' },
      { label: 'DEPTH RATING', val: '10 ATM (100 Meters)', sub: 'Fluorosilicone Seal' },
      { label: 'POWER CELL', val: '580mAh Solid Polymer', sub: '14-Day Continuous Life' },
      { label: 'TELEMETRY', val: 'Real-Time Earth Rotation', sub: 'Sub-Nanosecond Clock' },
    ],
    features: [
      'Precision magnetic stainless steel link strap with micro-adjustable sizing',
      'Dynamic real-time orbital Earth rotation chronograph dial',
      '8-channel optical sensor array with 1,000Hz cardiac sampling',
      'Matte black collector presentation vault & magnetic charge cable included',
    ],
  },
  {
    id: 'gunmetal-black',
    name: 'Gunmetal Black 2.0',
    category: 'TACTICAL // GUNMETAL DLC',
    price: '$479',
    inr: '₹40,800',
    image: '/products/mood_gunmetal_black.webp',
    accentColor: '#94a3b8',
    glowColor: 'rgba(148, 163, 184, 0.2)',
    badgeColor: 'text-slate-300 border-slate-500/30 bg-slate-900/60',
    desc: 'Vapor-deposited Diamond-Like Carbon (DLC) gunmetal armor paired with magnetic articulated stainless links. Engineered for stealth, extreme scratch resistance, and low light reflectivity.',
    quickSpecs: [
      { label: 'ARMOR', val: 'DLC Gunmetal PVD' },
      { label: 'CLASP', val: 'Magnetic Deployant' },
      { label: 'FINISH', val: 'Velvet Satin Matte' },
    ],
    fullSpecs: [
      { label: 'ARMOR COATING', val: 'DLC Gunmetal PVD Matrix', sub: '3,200 HV Hardness' },
      { label: 'STRAP', val: 'Gunmetal Stainless Link 2.0', sub: 'Magnetic Articulation' },
      { label: 'NAVIGATION', val: 'Dual-Frequency Multi-GNSS', sub: 'Anti-Jamming Filter' },
      { label: 'NIGHT DIAL', val: 'High-Contrast OLED Matrix', sub: 'Red Shift Night Mode' },
      { label: 'WATERPROOF', val: '10 ATM Submersible', sub: '100M Depth Rating' },
      { label: 'SECURITY', val: 'Hardware Keystore AES-256', sub: 'Biometric Lock' },
    ],
    features: [
      'Ultra-dense vapor-deposited gunmetal coating absorbs 99% light reflection',
      'Continuous 1,000Hz cardiovascular and dual-frequency L1/L5 GPS tracking',
      'Reinforced bezel geometry designed for extreme shock absorption',
      'Tactile knurled rotary crown with haptic feedback vibrations',
    ],
  },
  {
    id: 'ice-blue',
    name: 'Ice Blue',
    category: 'EXPLORATION // ALPINE WEAVE',
    price: '$449',
    inr: '₹38,200',
    image: '/products/mood_ice_blue.webp',
    accentColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.2)',
    badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40',
    desc: 'Satin titanium polygonal chassis paired with an ultralight woven Ice Blue Alpine loop. Engineered with a corrosion-resistant Grade 5 titanium G-hook for high-altitude expeditions.',
    quickSpecs: [
      { label: 'LOOP STRAP', val: 'Ice Blue Alpine' },
      { label: 'CLASP', val: 'Titanium G-Hook' },
      { label: 'WEIGHT', val: '56g Featherweight' },
    ],
    fullSpecs: [
      { label: 'CASE ALLOY', val: 'Satin Brushed Titanium', sub: 'Diamond-Cut Facets' },
      { label: 'LOOP STRAP', val: 'Seamless High-Strength Alpine', sub: 'Reinforced Pull Tab' },
      { label: 'HARDWARE', val: 'Titanium Grade 5 G-Hook', sub: 'Slip-Proof Lock' },
      { label: 'ALTIMETER', val: 'Barometric Storm Sensor', sub: '1m Elevation Accuracy' },
      { label: 'TEMP RANGE', val: '-20°C to +60°C Extreme', sub: 'Hermetic Isolation' },
      { label: 'BATTERY', val: '580mAh Endurance Core', sub: 'Up to 16 Days' },
    ],
    features: [
      'Two-layer seamless woven Alpine loop engineered without stitching',
      'High-contrast digital compass and dual-frequency GPS waypoint lock',
      'Tactile micro-knurled digital crown with glove-ready grip',
      'Hypoallergenic direct-contact skin-temperature monitoring',
    ],
  },
  {
    id: 'dark-green',
    name: 'Dark Green',
    category: 'SPORT // DEEP FOREST',
    price: '$429',
    inr: '₹36,500',
    image: '/products/mood_dark_green.webp',
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.2)',
    badgeColor: 'text-[#3a86ff] border-[#001d3d]/50 bg-[#001d3d]/20',
    desc: 'Deep forest matte unibody paired with an ergonomic dark green sports band. Sculpted with sweat-wicking channels and engineered for continuous athletic and cardiac telemetry.',
    quickSpecs: [
      { label: 'BAND', val: 'Forest Silicone' },
      { label: 'SENSORS', val: '1,000Hz Optical' },
      { label: 'WATER', val: '10 ATM (100M)' },
    ],
    fullSpecs: [
      { label: 'CHASSIS', val: 'Lightweight Satin Titanium', sub: 'Beveled Edges' },
      { label: 'SPORT BAND', val: 'Custom Fluoropolymer Green', sub: 'Laser-Perforated' },
      { label: 'BIOMETRICS', val: '8-Channel Cardiac Optical', sub: '1,000Hz Continuous' },
      { label: 'WATER RATING', val: '10 ATM (100M)', sub: 'Open-Water Swimmable' },
      { label: 'DISPLAY', val: '2,000 Nits Outdoor OLED', sub: 'Direct Sun Visible' },
      { label: 'RAPID CHARGE', val: '0-80% in 35 Minutes', sub: 'Magnetic Inductive' },
    ],
    features: [
      'Ergonomically sculpted fluoroelastomer band with sweat-wicking channels',
      'Real-time heart rate zones, VO2 Max, and metabolic expenditure telemetry',
      'Solid Grade 5 titanium enclosure engineered for minimal wrist fatigue',
      'Magnetic fast-charge puck included with braided cable',
    ],
  },
];

export default function ProductsSection() {
  const [inspectEdition, setInspectEdition] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  function handleOpenOrder(edition) {
    setInspectEdition(edition);
    setIsOrderModalOpen(false);
  }

  function handleOrderSubmit(e) {
    e.preventDefault();
    setOrderComplete(true);
    setTimeout(() => {
      setOrderComplete(false);
      setIsOrderModalOpen(false);
    }, 2500);
  }

  return (
    <section
      id="collection"
      className="relative w-full min-h-screen lg:h-screen pt-[80px] pb-[80px] bg-black border-t border-[#001d3d]/20 select-none overflow-hidden font-sans flex flex-col justify-center"
    >
      {/* Ambient Radial Spotlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#001d3d]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col justify-center my-auto">

        {/* SECTION HEADER: "One Watch. Every Mood." */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">One Watch. Every Mood.</h2>
        </div>

        {/* 4 FULL-BLEED EDITORIAL CARDS (EXACT REFERENCE DESIGN) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {EDITIONS.map((ed) => (
            <div
              key={ed.id}
              onClick={() => handleOpenOrder(ed)}
              className="group relative h-[360px] sm:h-[400px] lg:h-[410px] xl:h-[430px] rounded-[24px] sm:rounded-[28px] overflow-hidden cursor-pointer border border-[#001d3d]/25 hover:border-[#3a86ff]/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-zinc-950"
            >
              {/* Full-Bleed High-Res Lifestyle Render */}
              <img
                src={ed.image}
                alt={ed.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Bottom Vignette Shadow Gradient for Razor-Sharp Text Contrast */}
              <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/95 via-black/45 to-transparent pointer-events-none" />

              {/* Bottom Content Bar: Title + Hover Arrow Pill */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 z-10 flex items-end justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    {ed.name}
                  </h3>
                </div>

                <div className="w-9 h-9 rounded-full bg-[#001d3d] backdrop-blur-md border border-[#3a86ff]/40 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(0,29,61,0.5)] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 shadow-lg">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* DETAILED BLUEPRINT & PRE-ORDER MODAL */}
      {inspectEdition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl animate-[fadeIn_0.2s_ease-out]">
          <div className="relative w-full max-w-4xl bg-zinc-950 border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-y-auto max-h-[92vh]">
            {/* Close Button */}
            <button
              onClick={() => {
                setInspectEdition(null);
                setIsOrderModalOpen(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-[#001d3d]/25"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Watch Display */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[300px] bg-black/60 rounded-2xl p-6 border border-white/5 overflow-hidden">
                <img
                  src={inspectEdition.image}
                  alt={inspectEdition.name}
                  className="max-h-[280px] w-full object-cover rounded-xl shadow-2xl"
                />
                <div className="mt-4 font-mono text-xs text-[#3a86ff] font-bold">
                  {inspectEdition.price} USD <span className="text-slate-400 font-normal">({inspectEdition.inr})</span>
                </div>
              </div>

              {/* Right Column: Specs & Pre-Order */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-md border ${inspectEdition.badgeColor}`}>
                      {inspectEdition.category}
                    </span>
                    <span className="font-mono text-[10px] text-[#3a86ff] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3a86ff] animate-pulse" />
                      BATCH 01 ALLOCATION OPEN
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                    {inspectEdition.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-light">
                    {inspectEdition.desc}
                  </p>

                  {/* 6-Cell Engineering Blueprint Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                    {inspectEdition.fullSpecs.map((s, idx) => (
                      <div key={idx} className="bg-white/5 rounded-xl p-3 border border-white/5">
                        <span className="block font-mono text-[9px] text-slate-400 uppercase tracking-wider mb-1">
                          {s.label}
                        </span>
                        <span className="block font-mono text-xs font-bold text-white truncate">
                          {s.val}
                        </span>
                        <span className="block text-[10px] text-[#3a86ff] font-mono mt-0.5 truncate">
                          {s.sub}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Highlights Checklist */}
                  <div className="space-y-2 mb-6">
                    {inspectEdition.features.slice(0, 3).map((f, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-[#3a86ff] flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pre-Order Action or Form */}
                {isOrderModalOpen ? (
                  <form onSubmit={handleOrderSubmit} className="space-y-3 pt-4 border-t border-[#001d3d]/20">
                    {orderComplete ? (
                      <div className="p-4 bg-[#001d3d]/20 border border-[#3a86ff]/50 rounded-xl text-center">
                        <span className="font-mono text-sm font-bold text-[#3a86ff] block mb-1">
                          ✓ ALLOCATION RESERVED SUCCESSFULLY
                        </span>
                        <span className="font-mono text-xs text-slate-400">
                          Serial #CH-2026-084 assigned. Check your email for authentication key.
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            required
                            placeholder="Full Name"
                            className="bg-black/60 border border-[#001d3d]/25 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#3a86ff] font-mono"
                          />
                          <input
                            type="email"
                            required
                            placeholder="Collector Email"
                            className="bg-black/60 border border-[#001d3d]/25 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#3a86ff] font-mono"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-[#001d3d] hover:bg-[#003566] text-white border border-[#003566] font-mono font-bold text-xs tracking-wider py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(0,29,61,0.5)]"
                        >
                          CONFIRM PRE-ORDER RESERVATION ({inspectEdition.price} USD)
                        </button>
                      </>
                    )}
                  </form>
                ) : (
                  <button
                    onClick={() => setIsOrderModalOpen(true)}
                    className="w-full bg-[#001d3d] hover:bg-[#003566] text-white border border-[#003566] font-mono font-bold text-xs tracking-wider py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(0,29,61,0.5)] flex items-center justify-center gap-2"
                  >
                    <span>PRE-ORDER THIS TIMEPIECE</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}