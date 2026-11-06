'use client';

export default function WatchFacesSection() {
  return (
    <section
      id="watch-faces"
      className="relative w-full bg-black text-white font-sans select-none overflow-hidden flex flex-col justify-center items-center py-16 sm:py-24 md:py-32 space-y-16 sm:space-y-24 md:space-y-32"
    >
      {/* ========================================================
          1. TOP SHOWCASE: SMART WATCH INTERFACES & APPS
          - 100% Pure Solid Black (#000000) backdrop
          - Edge-to-edge smartwatch interfaces floating on deep pitch black
         ======================================================== */}
      <div className="w-full relative z-10 flex items-center justify-center px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="w-full max-w-[1920px] mx-auto flex items-center justify-center">
          <img
            src="/images/smart-interfaces-fullscreen.jpg"
            alt="VELTRIX Smart Watch Interfaces and Features"
            className="w-full h-auto max-h-[85vh] object-contain block"
            loading="eager"
          />
        </div>
      </div>

      {/* ========================================================
          2. BOTTOM SHOWCASE: FITNESS & WORKOUT TELEMETRY
          - Center Chronos timepiece with 4 floating performance telemetry widgets
          - Edge-feathered pure black blend
         ======================================================== */}
      <div className="w-full relative z-10 flex items-center justify-center px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="w-full max-w-[1920px] mx-auto flex items-center justify-center">
          <img
            src="/images/fitness-telemetry.jpg"
            alt="VELTRIX Precision Workout Telemetry & Metrics"
            className="w-full h-auto max-h-[85vh] object-contain block"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
