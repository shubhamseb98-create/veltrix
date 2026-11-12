'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function WebsiteLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = '';
    }, 1100);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={() => { document.body.style.overflow = ''; }}>
      {isVisible && (
        <motion.div
          key="veltrix-curtain-loader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center overflow-hidden"
          style={{ willChange: 'transform' }}
        >
          {/* Pure, Clean, Crisp Logo (NO grid lines, NO glow haze blobs) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center justify-center px-6 gap-4"
          >
            <img
              src="/watch-logo.png"
              alt="VELTRIX"
              className="h-12 sm:h-16 w-auto object-contain select-none"
            />
            <div className="w-32 sm:w-40 h-[1.5px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: 'left' }}
                className="w-full h-full bg-gradient-to-r from-[#173296] via-[#3a86ff] to-[#38bdf8]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
