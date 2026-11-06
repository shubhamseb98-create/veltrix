'use client';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full h-[calc(100vh-73px)] min-h-[680px] flex flex-col justify-between items-center text-center px-6 pt-12 pb-10 bg-black overflow-hidden select-none"
    >
      {/* Cinematic Ambient Glow Behind Banner */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.14)_0%,rgba(2,132,199,0.06)_50%,rgba(0,0,0,0)_75%)] blur-[80px] pointer-events-none" />

      {/* Subtle Grid Accent Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Center Main Headline (Massive Cinematic Banner Scale) */}
      <div className="relative z-10 max-w-5xl mx-auto my-auto py-6">
        <h1 className="font-heading font-extrabold text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] tracking-tight uppercase leading-[0.9] text-white">
          CHRONOS
        </h1>
        <div className="font-heading font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] tracking-tight uppercase leading-[0.95] mt-1 bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
          T-01
        </div>

        <p className="text-slate-400 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto mt-6 leading-relaxed">
          Sculpted from a solid titanium ingot. Scroll down to trigger the exploded 3D mechanical deconstruction.
        </p>
      </div>

      {/* Bottom Pinned Telemetry & Scroll Cue */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between font-mono text-[11px] text-slate-500 border-t border-white/5 pt-6">
        <div className="hidden sm:block text-left tracking-wider">
          <span className="text-slate-400">LATENCY:</span> 60FPS LERP <br />
          <span className="text-slate-400">TOLERANCE:</span> &plusmn;0.005mm
        </div>

        {/* Center Mouse Scroll Indicator */}
        <a
          href="#scrolly-section"
          className="mx-auto sm:mx-0 flex flex-col items-center gap-2.5 text-cyan-400/90 hover:text-cyan-300 transition-colors group cursor-pointer"
        >
          <div className="w-[20px] h-[34px] border-2 border-cyan-400/70 group-hover:border-cyan-400 rounded-full flex justify-center pt-1.5 transition-colors shadow-[0_0_12px_rgba(0,240,255,0.2)]">
            <div className="w-1 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
          </div>
          <span className="font-mono text-[10px] tracking-[0.22em] text-cyan-400 uppercase">
            SCROLL DOWN TO PLAY
          </span>
        </a>

        <div className="hidden sm:block text-right tracking-wider">
          <span className="text-slate-400">EDITION:</span> BATCH 01 <br />
          <span className="text-slate-400">ALLOY:</span> Ti-6Al-4V
        </div>
      </div>
    </section>
  );
}
