'use client';

export default function WatchFacesSection() {
  return (
    <section
      id="watch-faces"
      className="relative w-full bg-black text-white font-sans select-none overflow-hidden flex flex-col justify-center items-center py-12 sm:py-20 md:py-24 space-y-16 sm:space-y-24 md:space-y-32"
    >
      {/* ========================================================
          1. TOP SHOWCASE: SMART WATCH INTERFACES & APPS
          - 100% True Edge-to-Edge Full Width
          - Pure Solid Black (#000000) backdrop
         ======================================================== */}
      <div className="w-full relative z-10 flex items-center justify-center px-0">
        <img
          src="/images/smart-interfaces-fullscreen.jpg"
          alt="VELTRIX Smart Watch Interfaces and Features"
          className="w-full h-auto block"
          loading="eager"
        />
      </div>

      {/* ========================================================
          2. BOTTOM SHOWCASE: FITNESS & WORKOUT TELEMETRY
          - Center Chronos timepiece with 4 floating performance telemetry widgets
          - 100% True Edge-to-Edge Full Width across entire viewport
         ======================================================== */}
      <div className="w-full relative z-10 flex items-center justify-center px-0">
        <img
          src="/images/fitness-telemetry.jpg"
          alt="VELTRIX Precision Workout Telemetry & Metrics"
          className="w-full h-auto block"
          loading="lazy"
        />
      </div>
    </section>
  );
}
