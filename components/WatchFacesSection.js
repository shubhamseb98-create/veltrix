'use client';

export default function WatchFacesSection() {
  return (
    <section
      id="watch-faces"
      className="relative w-full py-16 sm:py-24 md:py-28 bg-black text-white font-sans select-none overflow-hidden flex flex-col justify-center items-center border-t border-[#001d3d]/25 border-b border-[#001d3d]/25"
    >
      {/* ========================================================
          ATMOSPHERIC ROYAL BLUE AMBIENT LIGHTING
          - Smooth feathered lighting matching the VELTRIX luxury theme
         ======================================================== */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse 85% 70% at 50% 50%, rgba(31, 52, 145, 0.32) 0%, rgba(15, 23, 85, 0.14) 45%, transparent 78%)
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
          maskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, #000 40%, transparent 92%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, #000 40%, transparent 92%)',
        }}
      />

      {/* ========================================================
          IMAGE SHOWCASE CONTAINER
          - Seamlessly blends into solid black background
          - Responsive scaling with high-resolution 2x asset
         ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10 flex flex-col items-center justify-center">
        <div className="w-full flex justify-center items-center">
          <img
            src="/images/smart-interfaces-2x.jpg"
            alt="VELTRIX Smart Watch Interfaces and Features"
            className="w-full max-w-6xl h-auto object-contain block drop-shadow-[0_25px_60px_rgba(0,29,61,0.65)] transition-transform duration-700 hover:scale-[1.01]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
