'use client';

export default function WatchFacesSection() {
  return (
    <section
      id="watch-faces"
      className="relative w-full min-h-screen lg:h-screen bg-black text-white font-sans select-none overflow-hidden flex flex-col justify-center items-center"
    >
      {/* ========================================================
          FULLSCREEN PURE SOLID BLACK SHOWCASE
          - 100% Pure Solid Black (#000000) backdrop
          - Zero glows, zero grids, zero borders
          - Edge-to-edge smartwatch interfaces floating on deep pitch black
         ======================================================== */}
      <div className="w-full h-full relative z-10 flex items-center justify-center px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="w-full max-w-[1920px] mx-auto flex items-center justify-center">
          <img
            src="/images/smart-interfaces-fullscreen.jpg"
            alt="VELTRIX Smart Watch Interfaces and Features"
            className="w-full h-auto max-h-[85vh] object-contain block"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
