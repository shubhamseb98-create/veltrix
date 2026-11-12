'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const WORD = 'VELTRIX';
const LUXURY_EASE = [0.22, 1, 0.36, 1];

export default function ParticleWordmark() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const pointerRef = useRef({
    x: -9999,
    y: -9999,
    vx: 0,
    vy: 0,
    active: false,
  });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let particles = [];
    let rafId = null;
    let isLoopRunning = false;
    let isDisposed = false;
    let logicalWidth = 0;
    let logicalHeight = 0;
    let dotRadius = 1.45;
    let repulsionRadius = 110;

    function buildParticles() {
      const rect = container.getBoundingClientRect();
      if (!rect.width) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      logicalWidth = Math.floor(rect.width);

      // Compute responsive wordmark sizing with vertical scatter headroom
      let fontSize = Math.max(46, Math.min(logicalWidth * 0.16, 152));
      let letterSpacing = fontSize * 0.06;

      // Offscreen rasterization in matching Poppins 900 font
      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      const chars = WORD.split('');
      const measureTotalWidth = (size, spacing) => {
        offCtx.font = `900 ${size}px Poppins, -apple-system, BlinkMacSystemFont, sans-serif`;
        const widths = chars.map((ch) => offCtx.measureText(ch).width);
        const total =
          widths.reduce((acc, w) => acc + w, 0) +
          spacing * Math.max(0, chars.length - 1);
        return { widths, total };
      };

      let { widths: charWidths, total: totalWidth } = measureTotalWidth(fontSize, letterSpacing);
      if (totalWidth > logicalWidth * 0.92) {
        const fitRatio = (logicalWidth * 0.92) / totalWidth;
        fontSize = Math.max(32, fontSize * fitRatio);
        letterSpacing = fontSize * 0.06;
        ({ widths: charWidths, total: totalWidth } = measureTotalWidth(fontSize, letterSpacing));
      }

      logicalHeight = Math.max(148, Math.round(fontSize * 1.85));

      const gridGap = logicalWidth < 520 ? 3.5 : logicalWidth < 900 ? 4.4 : 5;
      dotRadius = gridGap * 0.31;
      repulsionRadius = Math.max(68, Math.min(fontSize * 0.95, 132));

      canvas.style.width = `${logicalWidth}px`;
      canvas.style.height = `${logicalHeight}px`;
      canvas.width = Math.round(logicalWidth * dpr);
      canvas.height = Math.round(logicalHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      offscreen.width = logicalWidth;
      offscreen.height = logicalHeight;
      offCtx.clearRect(0, 0, logicalWidth, logicalHeight);
      offCtx.font = `900 ${fontSize}px Poppins, -apple-system, BlinkMacSystemFont, sans-serif`;
      offCtx.fillStyle = '#ffffff';
      offCtx.textBaseline = 'middle';
      offCtx.textAlign = 'left';

      let cursorX = (logicalWidth - totalWidth) / 2;
      const centerY = logicalHeight / 2;

      chars.forEach((ch, idx) => {
        offCtx.fillText(ch, cursorX, centerY);
        cursorX += charWidths[idx] + letterSpacing;
      });

      const imgData = offCtx.getImageData(0, 0, logicalWidth, logicalHeight).data;
      const nextParticles = [];

      // Sample pixel alpha on a uniform grid to create crisp dot-matrix letterforms
      const startOffset = Math.floor(gridGap / 2);
      for (let y = startOffset; y < logicalHeight - 0.5; y += gridGap) {
        const py = Math.min(logicalHeight - 1, Math.round(y));
        for (let x = startOffset; x < logicalWidth - 0.5; x += gridGap) {
          const px = Math.min(logicalWidth - 1, Math.round(x));
          const alpha = imgData[(py * logicalWidth + px) * 4 + 3];
          if (alpha > 48) {
            const normAlpha = Math.min(1, alpha / 220);
            nextParticles.push({
              x,
              y,
              homeX: x,
              homeY: y,
              vx: 0,
              vy: 0,
              baseAlpha: 0.35 + normAlpha * 0.58,
              sizeScale: 0.78 + normAlpha * 0.28,
              jitterAngle: (Math.random() - 0.5) * 1.45,
              jitterForce: 0.72 + Math.random() * 0.85,
              seedAngle: Math.random() * Math.PI * 2,
              spring: 0.048 + Math.random() * 0.024,
              friction: 0.83 + Math.random() * 0.05,
            });
          }
        }
      }

      particles = nextParticles;
      drawFrame(true);
    }

    function drawFrame(forceStatic = false) {
      ctx.clearRect(0, 0, logicalWidth, logicalHeight);
      const ptr = pointerRef.current;
      let needsMoreFrames = false;

      // Decay stored cursor momentum each frame
      ptr.vx *= 0.75;
      ptr.vy *= 0.75;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!shouldReduceMotion && !forceStatic) {
          if (ptr.active) {
            const dx = p.x - ptr.x;
            const dy = p.y - ptr.y;
            const distSq = dx * dx + dy * dy;
            const rSq = repulsionRadius * repulsionRadius;

            if (distSq < rSq) {
              const dist = Math.sqrt(distSq);
              const power = (repulsionRadius - dist) / repulsionRadius;
              const baseAngle = dist > 0.01 ? Math.atan2(dy, dx) : p.seedAngle;
              const scatterAngle = baseAngle + p.jitterAngle * power * 0.85;
              const forceScale = Math.max(0.55, repulsionRadius / 120);
              const push = Math.pow(power, 1.25) * 14.5 * forceScale * p.jitterForce;

              p.vx += Math.cos(scatterAngle) * push + ptr.vx * power * 0.16;
              p.vy += Math.sin(scatterAngle) * push + ptr.vy * power * 0.16;
              needsMoreFrames = true;
            }
          }

          // Damped spring return toward original dot-matrix position
          const returnX = (p.homeX - p.x) * p.spring;
          const returnY = (p.homeY - p.y) * p.spring;
          p.vx = (p.vx + returnX) * p.friction;
          p.vy = (p.vy + returnY) * p.friction;
          p.x += p.vx;
          p.y += p.vy;

          if (
            Math.abs(p.homeX - p.x) > 0.08 ||
            Math.abs(p.homeY - p.y) > 0.08 ||
            Math.abs(p.vx) > 0.04 ||
            Math.abs(p.vy) > 0.04
          ) {
            needsMoreFrames = true;
          } else {
            p.x = p.homeX;
            p.y = p.homeY;
            p.vx = 0;
            p.vy = 0;
          }
        }

        // Compute subtle electric-blue shimmer when particle scatters far from rest
        const disp = Math.hypot(p.x - p.homeX, p.y - p.homeY);
        const excite = Math.min(1, disp / 38);
        const r = Math.round(248 - excite * 120);
        const g = Math.round(250 - excite * 70);
        const b = 255;
        const alpha = Math.max(0.28, p.baseAlpha * (1 - excite * 0.22));
        const radius = dotRadius * p.sizeScale * (1 - excite * 0.14);

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      return needsMoreFrames;
    }

    function step() {
      if (isDisposed) return;
      const keepAnimating = drawFrame(false);
      if (keepAnimating || pointerRef.current.active) {
        rafId = window.requestAnimationFrame(step);
      } else {
        isLoopRunning = false;
        rafId = null;
      }
    }

    function ensureLoopRunning() {
      if (shouldReduceMotion || isLoopRunning || isDisposed) return;
      isLoopRunning = true;
      rafId = window.requestAnimationFrame(step);
    }

    let resizeTimer = null;
    const resizeObserver = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (!isDisposed) buildParticles();
      }, 90);
    });

    async function init() {
      buildParticles();
      resizeObserver.observe(container);

      if (document.fonts && document.fonts.ready) {
        try {
          await document.fonts.ready;
          if (!isDisposed) buildParticles();
        } catch {
          // Proceed cleanly with initial font metrics
        }
      }
    }

    init();

    function handlePointerMove(e) {
      if (shouldReduceMotion) return;
      const rect = canvas.getBoundingClientRect();
      const nextX = e.clientX - rect.left;
      const nextY = e.clientY - rect.top;
      const ptr = pointerRef.current;

      if (ptr.active) {
        ptr.vx = Math.max(-40, Math.min(40, nextX - ptr.x));
        ptr.vy = Math.max(-40, Math.min(40, nextY - ptr.y));
      } else {
        ptr.vx = 0;
        ptr.vy = 0;
      }

      ptr.x = nextX;
      ptr.y = nextY;
      ptr.active = true;
      ensureLoopRunning();
    }

    function handlePointerLeave() {
      pointerRef.current.active = false;
      pointerRef.current.x = -9999;
      pointerRef.current.y = -9999;
      ensureLoopRunning();
    }

    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);
    canvas.addEventListener('pointercancel', handlePointerLeave);

    return () => {
      isDisposed = true;
      window.clearTimeout(resizeTimer);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      canvas.removeEventListener('pointercancel', handlePointerLeave);
    };
  }, [shouldReduceMotion]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: LUXURY_EASE }}
      className="relative w-full py-2 sm:py-4 flex items-center justify-center select-none"
    >
      <h1 className="sr-only">{WORD}</h1>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="block cursor-default touch-pan-y"
      />
    </motion.div>
  );
}
