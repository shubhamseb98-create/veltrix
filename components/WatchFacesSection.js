'use client';

export default function WatchFacesSection() {
  return (
    <section
      id="watch-faces"
      className="relative w-full bg-black text-white font-sans select-none overflow-hidden flex flex-col justify-center items-center py-16 sm:py-24 md:py-32 space-y-20 sm:space-y-28 md:space-y-36"
    >
      {/* ========================================================
          1. TOP SHOWCASE: SMART WATCH INTERFACES & APPS
         ======================================================== */}
      <div className="w-full flex flex-col items-center">
        {/* Showcase 1 Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 px-4">
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
            src="/images/smart-interfaces-fullscreen.png?v=v2new"
            alt="VELTRIX Smart Watch Interfaces and Features"
            className="w-full h-auto block"
            loading="eager"
          />
        </div>
      </div>

      {/* ========================================================
          2. BOTTOM SHOWCASE: FITNESS & WORKOUT TELEMETRY
         ======================================================== */}
      <div className="w-full flex flex-col items-center">
        {/* Showcase 2 Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 px-4">
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
            className="w-full h-auto block"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
