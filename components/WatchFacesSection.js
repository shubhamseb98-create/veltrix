'use client';

export default function WatchFacesSection() {
  return (
    <section
      id="watch-faces"
      className="relative w-full bg-black text-white font-sans select-none overflow-hidden flex flex-col justify-center items-center py-12 sm:py-20 md:py-24 space-y-16 sm:space-y-24 md:space-y-32"
    >
      {/* ========================================================
          1. TOP SHOWCASE: SMART WATCH INTERFACES & APPS
          - Reduced balanced width
          - Pure Solid Black (#000000) backdrop
         ======================================================== */}
      <div className="w-full max-w-5xl mx-auto relative z-10 flex items-center justify-center px-4 sm:px-6">
        <img
          src="/images/smart-interfaces-fullscreen.jpg?v=pureblack"
          alt="VELTRIX Smart Watch Interfaces and Features"
          className="w-full h-auto block"
          loading="eager"
        />
      </div>

      {/* ========================================================
          2. BOTTOM SHOWCASE: FITNESS & WORKOUT TELEMETRY
          - Center Chronos timepiece with 4 floating performance telemetry widgets
          - Reduced balanced width matching top showcase
          - 100% Pure Solid Black (#000000) background without any blue glow
         ======================================================== */}
      <div className="w-full max-w-5xl mx-auto relative z-10 flex items-center justify-center px-4 sm:px-6">
        <img
          src="/images/fitness-telemetry.jpg?v=pureblack"
          alt="VELTRIX Precision Workout Telemetry & Metrics"
          className="w-full h-auto block"
          loading="lazy"
        />
      </div>
    </section>
  );
}
