'use client';

export default function WatchFacesSection() {
  return (
    <section
      id="watch-faces"
      className="relative w-full min-h-screen lg:h-screen bg-black text-white font-sans select-none overflow-hidden flex flex-col justify-center items-center border-t border-[#001d3d]/25 border-b border-[#001d3d]/25"
    >
      {/* ========================================================
          ATMOSPHERIC ROYAL BLUE AMBIENT LIGHTING
          - Smooth feathered lighting matching the VELTRIX luxury theme
         ======================================================== */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 50% 50%, rgba(31, 52, 145, 0.35) 0%, rgba(15, 23, 85, 0.15) 50%, transparent 80%)
          `,
        }}
      />

      {/* ========================================================
          SUBTLE TECHNICAL CAD / BLUEPRINT GRID TEXTURE
         ======================================================== */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(58, 134, 255, 0.18) 1px, transparent 1px),
            linear-gradient(to right, rgba(58, 134, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(58, 134, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, #000 45%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, #000 45%, transparent 95%)',
        }}
      />

      {/* ========================================================
          FULLSCREEN EDGE-TO-EDGE IMAGE SHOWCASE
          - Stretches across full screen width without artificial max-width constraints
          - Perfectly centered vertically within 100vh viewport
         ======================================================== */}
      <div className="w-full h-full relative z-10 flex items-center justify-center px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="w-full max-w-[1920px] mx-auto flex items-center justify-center">
          <img
            src="/images/smart-interfaces-fullscreen.jpg"
            alt="VELTRIX Smart Watch Interfaces and Features"
            className="w-full h-auto max-h-[85vh] object-contain block drop-shadow-[0_25px_80px_rgba(0,29,61,0.7)]"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
