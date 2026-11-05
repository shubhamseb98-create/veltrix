'use client';

import { useState } from 'react';
import ChronosLogo from './ChronosLogo';
import {
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowUpRight,
  Globe,
  ArrowUp,
  CheckCircle2,
  Mail,
  Send,
  Lock,
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e) {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 3000);
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer
      className="relative w-full bg-[#000814] text-white font-sans select-none border-t border-[#001d3d]/25 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 95% 75% at 50% 30%, #001d3d 0%, #000c1a 55%, #00050d 100%)',
      }}
    >
      {/* Subtle Ambient Radial Backlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[950px] h-[400px] bg-[#3a86ff]/12 rounded-full blur-[190px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#3a86ff]/6 rounded-full blur-[160px] pointer-events-none" />

      {/* ========================================================
          1. PRE-FOOTER: COLLECTORS CIRCLE & PRIVATE ALLOCATIONS
         ======================================================== */}
      <div className="relative border-b border-[#001d3d]/20 bg-gradient-to-b from-[#001d3d]/70 to-[#000814] py-14 sm:py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* Left Callout */}
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[#3a86ff] font-mono text-[10px] tracking-widest uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3a86ff] animate-pulse" />
              <span>COLLECTORS CIRCLE // BATCH 04 ALLOCATIONS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
              Request Private Atelier Access
            </h3>
            <p className="text-slate-400 text-sm mt-2 font-normal leading-relaxed">
              Receive private serial allocations, bespoke strap releases, and firmware telemetries crafted exclusively for Veltrix patrons.
            </p>
          </div>

          {/* Right Newsletter Input Form */}
          <div className="w-full max-w-md">
            {subscribed ? (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-[#001d3d]/15 border border-[#3a86ff]/40 text-[#3a86ff] font-mono text-xs shadow-[0_0_25px_rgba(0,29,61,0.35)] animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-[#3a86ff] flex-shrink-0" />
                <span>ALLOCATION REQUEST CONFIRMED // WELCOME TO THE CIRCLE.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter collector email..."
                    required
                    className="w-full pl-10 pr-4 py-3 bg-[#000e1f]/90 border border-[#001d3d]/30 rounded-xl text-white placeholder-slate-400 text-xs font-mono focus:outline-none focus:border-[#3a86ff] focus:ring-1 focus:ring-[#3a86ff]/50 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#001d3d] hover:bg-[#003566] text-white border border-[#003566] font-mono text-xs font-bold rounded-xl transition-all hover:shadow-[0_0_20px_rgba(0,29,61,0.5)] hover:-translate-y-0.5 active:scale-95 flex-shrink-0"
                >
                  <span>JOIN CIRCLE</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <div className="flex items-center justify-center lg:justify-start gap-4 mt-3 text-[10px] font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-slate-600" /> End-to-End Encrypted
              </span>
              <span>•</span>
              <span>Strictly 0 Spam</span>
              <span>•</span>
              <span>Instant Confirmation</span>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================
          2. LUXURY TRUST PILLARS (WARRANTY & ASSURANCE BADGES)
         ======================================================== */}
      <div className="border-b border-[#001d3d]/20 bg-[#000e1f]/70 py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#3a86ff]/10 border border-[#3a86ff]/25 flex items-center justify-center text-[#3a86ff] flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white tracking-tight">5-Year Global Warranty</div>
              <div className="text-[11px] text-slate-400 mt-0.5 font-light">Swiss atelier recalibration included</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#3a86ff]/10 border border-[#3a86ff]/25 flex items-center justify-center text-[#3a86ff] flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white tracking-tight">Insured Global Transit</div>
              <div className="text-[11px] text-slate-400 mt-0.5 font-light">Complimentary priority armored freight</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#3a86ff]/10 border border-[#3a86ff]/25 flex items-center justify-center text-[#3a86ff] flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white tracking-tight">Grade 5 Ti-6Al-4V Certified</div>
              <div className="text-[11px] text-slate-400 mt-0.5 font-light">Diamond-faceted aerospace alloy</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#3a86ff]/10 border border-[#3a86ff]/25 flex items-center justify-center text-[#3a86ff] flex-shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white tracking-tight">10 ATM / 100M Rating</div>
              <div className="text-[11px] text-slate-400 mt-0.5 font-light">100% helium sniffer pressure verified</div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================
          3. MAIN NAVIGATION ARCHITECTURE (4 COLUMNS)
         ======================================================== */}
      <div className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Col 1: Brand & Atelier Dossier */}
          <div className="lg:col-span-2 flex flex-col justify-between pr-0 lg:pr-6">
            <div>
              <a href="#" className="inline-block group mb-4" aria-label="Veltrix Horology Lab">
                <ChronosLogo size="lg" />
              </a>
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm mb-6 font-light">
                Pioneering the synthesis of Swiss haute horology and sub-nanosecond neural computing. Hand-sculpted in micro-batches from solid aerospace titanium ingots for horological purists.
              </p>

              {/* Atelier Badges */}
              <div className="flex flex-wrap gap-2 font-mono text-[10px] text-slate-400">
                <span className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10">
                  GENEVA ATELIER // NO. 08
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10">
                  ISO 22810 WATERPROOF
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10">
                  CLEANROOM CLASS 100
                </span>
              </div>
            </div>

            {/* Back to Top Quick Action */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-[#3a86ff] transition-colors group"
              >
                <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#3a86ff]/50 group-hover:-translate-y-0.5 transition-all">
                  <ArrowUp className="w-3.5 h-3.5 text-[#3a86ff]" />
                </div>
                <span>RETURN TO APEX // TOP</span>
              </button>
            </div>
          </div>

          {/* Col 2: The Collection */}
          <div>
            <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3a86ff]" />
              <span>COLLECTION</span>
            </div>
            <ul className="space-y-2.5 text-xs font-light text-slate-400">
              <li>
                <a href="#collection" className="hover:text-[#3a86ff] transition-colors flex items-center justify-between group">
                  <span>Chrome Silver 2.0</span>
                  <span className="text-[10px] font-mono text-slate-600 group-hover:text-[#3a86ff] transition-colors">$449</span>
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#3a86ff] transition-colors flex items-center justify-between group">
                  <span>Gunmetal Black 2.0</span>
                  <span className="text-[10px] font-mono text-slate-600 group-hover:text-[#3a86ff] transition-colors">$479</span>
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#3a86ff] transition-colors flex items-center justify-between group">
                  <span>Ice Blue Chrono</span>
                  <span className="text-[10px] font-mono text-slate-600 group-hover:text-[#3a86ff] transition-colors">$469</span>
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#3a86ff] transition-colors flex items-center justify-between group">
                  <span>Dark Green Expedition</span>
                  <span className="text-[10px] font-mono text-slate-600 group-hover:text-[#3a86ff] transition-colors">$489</span>
                </a>
              </li>
              <li className="pt-2 border-t border-white/5">
                <a href="#metallurgy" className="hover:text-[#3a86ff] transition-colors flex items-center gap-1 text-[11px] font-mono text-[#3a86ff]">
                  <span>METALLURGY FINISHES</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#3a86ff] transition-colors text-[11px] font-mono text-slate-500">
                  BESPOKE COMMISSIONING
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Horology Engineering */}
          <div>
            <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3a86ff]" />
              <span>ENGINEERING</span>
            </div>
            <ul className="space-y-2.5 text-xs font-light text-slate-400">
              <li>
                <a href="#scrolly-section" className="hover:text-[#3a86ff] transition-colors">
                  3D Exploded Inspection
                </a>
              </li>
              <li>
                <a href="#specs" className="hover:text-[#3a86ff] transition-colors">
                  Grade 5 Ti-6Al-4V Unibody
                </a>
              </li>
              <li>
                <a href="#specs" className="hover:text-[#3a86ff] transition-colors">
                  Dual-Curved Sapphire Lens
                </a>
              </li>
              <li>
                <a href="#specs" className="hover:text-[#3a86ff] transition-colors">
                  4nm Neural Horology Core
                </a>
              </li>
              <li>
                <a href="#specs" className="hover:text-[#3a86ff] transition-colors">
                  1,000Hz Optical Telemetry
                </a>
              </li>
              <li>
                <a href="#specs" className="hover:text-[#3a86ff] transition-colors flex items-center gap-1 text-[11px] font-mono text-[#3a86ff] pt-2 border-t border-white/5">
                  <span>ALL TECHNICAL SPECS</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Ecosystem & Client Care */}
          <div>
            <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3a86ff]" />
              <span>CONCIERGE</span>
            </div>
            <ul className="space-y-2.5 text-xs font-light text-slate-400">
              <li>
                <a href="#watch-faces" className="hover:text-[#3a86ff] transition-colors">
                  Dynamic Watch Faces
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#3a86ff] transition-colors">
                  Collector Vault &amp; Packaging
                </a>
              </li>
              <li>
                <a href="#specs" className="hover:text-[#3a86ff] transition-colors">
                  10 ATM Water Certification
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#3a86ff] transition-colors">
                  NFC Authenticity Certificate
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3a86ff] transition-colors">
                  Atelier Recalibration Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3a86ff] transition-colors text-[11px] font-mono text-slate-500 pt-2 border-t border-white/5">
                  INTERNATIONAL CONCIERGE
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ========================================================
          4. LEGAL, COPYRIGHT & HOROLOGY COMPLIANCE
         ======================================================== */}
      <div className="border-t border-[#001d3d]/20 bg-[#00050d]/80 py-8 px-6 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-400">
        <div>
          &copy; {new Date().getFullYear()} VELTRIX HOROLOGY LABS INC. SWISS PRECISION &amp; NEURAL SILICON. ALL RIGHTS RESERVED.
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <a href="#" className="hover:text-[#3a86ff] transition-colors">
            PRIVACY DOSSIER
          </a>
          <a href="#" className="hover:text-[#3a86ff] transition-colors">
            TERMS OF OWNERSHIP
          </a>
          <a href="#" className="hover:text-[#3a86ff] transition-colors">
            ISO CERTIFICATION
          </a>
          <a href="#" className="hover:text-[#3a86ff] transition-colors">
            SAR COMPLIANCE
          </a>
        </div>
      </div>

    </footer>
  );
}
