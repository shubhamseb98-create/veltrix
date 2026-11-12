'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const LUXURY_EASE = [0.22, 1, 0.36, 1];

const revealUp = (delay = 0, y = 24) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, delay, ease: LUXURY_EASE },
});

export default function WatchFacesSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const showcase1Y = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const showcase2Y = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <section
      ref={sectionRef}
      id="watch-faces"
      className="relative w-full bg-black text-white font-sans select-none overflow-hidden flex flex-col justify-center items-center pt-[60px] pb-[60px] space-y-[60px]"
    >
      {/* ========================================================
          1. TOP SHOWCASE: SMART WATCH INTERFACES & APPS
         ======================================================== */}
      <div className="w-full flex flex-col items-center">
        {/* Showcase 1 Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 px-4">
          <motion.div
            {...revealUp(0, 14)}
            className="inline-flex items-center gap-2 mb-2 sm:mb-2.5"
          >
            <span className="w-4 sm:w-5 h-[1.5px] bg-[#3a86ff] rounded-full" />
            <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-[#3a86ff] uppercase">
              VELTRIX DYNAMIC INTERFACES
            </span>
          </motion.div>
          <motion.h2
            {...revealUp(0.08, 22)}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            Intelligence at Every Glance
          </motion.h2>
          <motion.p
            {...revealUp(0.16, 18)}
            className="text-slate-400 text-xs sm:text-sm md:text-base font-normal leading-relaxed max-w-xl mx-auto mt-2 sm:mt-3"
          >
            From intuitive media controls and real-time biometric rings to instant messaging. Engineered for frictionless daily control.
          </motion.p>
        </div>

        {/* Showcase 1 Image */}
        <motion.div
          style={{ y: showcase1Y }}
          className="w-full max-w-5xl lg:max-w-6xl mx-auto relative z-10 flex items-center justify-center px-4 sm:px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: LUXURY_EASE }}
            className="w-full"
          >
            <img
              src="/images/smart-interfaces-fullscreen.png?v=v3clean"
              alt="VELTRIX Smart Watch Interfaces and Features"
              className="w-full h-auto block"
              loading="eager"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* ========================================================
          2. BOTTOM SHOWCASE: FITNESS & WORKOUT TELEMETRY
         ======================================================== */}
      <div className="w-full flex flex-col items-center">
        {/* Showcase 2 Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 px-4">
          <motion.div
            {...revealUp(0, 14)}
            className="inline-flex items-center gap-2 mb-2 sm:mb-2.5"
          >
            <span className="w-4 sm:w-5 h-[1.5px] bg-[#3a86ff] rounded-full" />
            <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-[#3a86ff] uppercase">
              ATHLETIC PERFORMANCE TELEMETRY
            </span>
          </motion.div>
          <motion.h2
            {...revealUp(0.08, 22)}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            Precision Performance Tracking
          </motion.h2>
          <motion.p
            {...revealUp(0.16, 18)}
            className="text-slate-400 text-xs sm:text-sm md:text-base font-normal leading-relaxed max-w-xl mx-auto mt-2 sm:mt-3"
          >
            Multi-frequency GPS routing, 1,000Hz cardiac sampling, and advanced workout load telemetry built directly into aerospace-grade titanium.
          </motion.p>
        </div>

        {/* Showcase 2 Image */}
        <motion.div
          style={{ y: showcase2Y }}
          className="w-full max-w-4xl lg:max-w-5xl mx-auto relative z-10 flex items-center justify-center px-4 sm:px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: LUXURY_EASE }}
            className="w-full"
          >
            <img
              src="/images/fitness-telemetry.png?v=crispHQ"
              alt="VELTRIX Precision Workout Telemetry & Metrics"
              className="w-full h-auto block"
              loading="lazy"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
