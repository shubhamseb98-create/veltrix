export default function SpecsSection() {
  const specs = [
    {
      category: 'CHASSIS',
      primary: 'Grade 5 Titanium (Ti-6Al-4V)',
      secondary: '45.0mm diameter, 12.8mm thickness, 22mm lug width. Weight: 68g.',
    },
    {
      category: 'DISPLAY',
      primary: '1.95-Inch Ultra Retina AMOLED',
      secondary: '480 × 480 px, 454 PPI, 2,000 Nits peak brightness, Sapphire Crystal.',
    },
    {
      category: 'BATTERY',
      primary: '580mAh Solid Polymer Matrix',
      secondary: 'Up to 14 days standard usage; Fast magnetic inductive dock.',
    },
    {
      category: 'WATER RESISTANCE',
      primary: '10 ATM (100 Meters / 330 Feet)',
      secondary: 'Suitable for high-velocity water sports and deep swimming.',
    },
  ];

  return (
    <section
      id="specs"
      className="relative w-full min-h-screen lg:h-screen pt-[80px] pb-[80px] px-6 bg-black border-t border-white/10 flex flex-col justify-center select-none overflow-hidden"
    >
      <div className="max-w-4xl mx-auto w-full my-auto flex flex-col justify-center">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Technical Specifications
          </h2>
        </div>

        <div className="border-t border-white/10 divide-y divide-white/10">
          {specs.map((item, idx) => (
            <div
              key={idx}
              className="py-6 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-baseline hover:bg-white/[0.03] px-4 -mx-4 rounded-lg transition-colors"
            >
              <div className="font-mono text-xs text-cyan-400 font-semibold tracking-wider">
                {item.category}
              </div>
              <div className="flex flex-col gap-1">
                <strong className="text-white text-base font-semibold">{item.primary}</strong>
                <span className="text-slate-400 text-sm leading-relaxed">{item.secondary}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
