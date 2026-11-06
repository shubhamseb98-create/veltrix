'use client';

export default function WatchFacesSection() {
  return (
    <section
      id="watch-faces"
      className="relative w-full bg-black text-white font-sans select-none overflow-hidden flex flex-col justify-center items-center pt-[60px] pb-[60px] space-y-[60px]"
    >
      {/* ========================================================
          1. TOP SHOWCASE: SMART WATCH INTERFACES & APPS
         ======================================================== */}
      <div className="w-full flex flex-col items-center relative">
        {/* Subtle Ambient Radial Glow Behind Header & Watches */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] lg:w-[1100px] h-[380px] bg-gradient-to-r from-[#1F3491]/25 via-[#3a86ff]/18 to-[#1F3491]/25 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[420px] h-[180px] bg-[#3a86ff]/10 blur-[90px] rounded-full pointer-events-none" />

        {/* Showcase 1 Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 px-4 relative z-10">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-2.5">
            <span className="w-4 sm:w-5 h-[1.5px] bg-[#3a86ff] rounded-full" />
            <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-[#3a86ff] uppercase">
              VELTRIX DYNAMIC INTERFACES
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Intelligence at Every Glance
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base font-normal leading-relaxed max-w-xl mx-auto mt-2 sm:mt-3">
            From intuitive media controls and real-time biometric rings to instant messaging. Engineered for frictionless daily control.
          </p>
        </div>

        {/* Showcase 1 Image */}
        <div className="w-full max-w-5xl lg:max-w-6xl mx-auto relative z-10 flex items-center justify-center px-4 sm:px-6">
          <img
            src="/images/smart-interfaces-fullscreen.png?v=v3clean"
            alt="VELTRIX Smart Watch Interfaces and Features"
            className="w-full h-auto block mix-blend-screen relative z-10"
            loading="eager"
          />
        </div>
      </div>

      {/* ========================================================
          2. BOTTOM SHOWCASE: FITNESS & WORKOUT TELEMETRY
         ======================================================== */}
      <div className="w-full flex flex-col items-center relative">
        {/* Subtle Atmospheric Radial Glow Behind Header & Watch Stage */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] lg:w-[920px] h-[440px] bg-gradient-to-r from-[#1F3491]/30 via-[#3a86ff]/20 to-[#1F3491]/30 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[340px] bg-[#3a86ff]/16 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[420px] h-[180px] bg-[#3a86ff]/10 blur-[90px] rounded-full pointer-events-none" />

        {/* Showcase 2 Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 px-4 relative z-10">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-2.5">
            <span className="w-4 sm:w-5 h-[1.5px] bg-[#3a86ff] rounded-full" />
            <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-[#3a86ff] uppercase">
              ATHLETIC PERFORMANCE TELEMETRY
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Precision Performance Tracking
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base font-normal leading-relaxed max-w-xl mx-auto mt-2 sm:mt-3">
            Multi-frequency GPS routing, 1,000Hz cardiac sampling, and advanced workout load telemetry built directly into aerospace-grade titanium.
          </p>
        </div>

        {/* Showcase 2 Image */}
        <div className="w-full max-w-4xl lg:max-w-5xl mx-auto relative z-10 flex items-center justify-center px-4 sm:px-6">
          <img
            src="/images/fitness-telemetry.png?v=crispHQ"
            alt="VELTRIX Precision Workout Telemetry & Metrics"
            className="w-full h-auto block mix-blend-screen relative z-10"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
