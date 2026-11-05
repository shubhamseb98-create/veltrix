'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ShieldCheck,
  Cpu,
  BatteryCharging,
  Droplets,
  Layers,
  Sparkles,
  ChevronDown,
  Zap,
  Activity,
  Compass,
} from 'lucide-react';

const TOTAL_FRAMES = 239;
const FRAME_PREFIX = '/spec_frames/frame_';
const FRAME_EXT = '.webp?v=v4_newpp';

function getFramePath(index) {
  return `${FRAME_PREFIX}${String(index).padStart(4, '0')}${FRAME_EXT}`;
}

// Ultra-smooth continuous trajectory calculation
function getSmoothTrajectory(p, isMobile) {
  let x = 0.0;
  let y = 0.0;

  function smoothStep(edge0, edge1, val) {
    const t = Math.min(1.0, Math.max(0.0, (val - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
  }

  // Horizontal trajectory (x: -1.0 to +1.0)
  if (isMobile) {
    x = 0.0; // Stays centered on mobile
  } else if (p < 0.12) {
    x = 0.0; // Hero Center
  } else if (p < 0.18) {
    x = smoothStep(0.12, 0.18, p); // Glides to RIGHT (+1.0)
  } else if (p < 0.28) {
    x = 1.0; // Locked on RIGHT (Station 1 active on LEFT)
  } else if (p < 0.36) {
    x = 1.0 - 2.0 * smoothStep(0.28, 0.36, p); // Glides across to LEFT (-1.0)
  } else if (p < 0.46) {
    x = -1.0; // Locked on LEFT (Station 2 active on RIGHT)
  } else if (p < 0.54) {
    x = -1.0 + 2.0 * smoothStep(0.46, 0.54, p); // Glides across to RIGHT (+1.0)
  } else if (p < 0.64) {
    x = 1.0; // Locked on RIGHT (Station 3 active on LEFT)
  } else if (p < 0.72) {
    x = 1.0 - 2.0 * smoothStep(0.64, 0.72, p); // Glides across to LEFT (-1.0)
  } else if (p < 0.81) {
    x = -1.0; // Locked on LEFT (Station 4 active on RIGHT)
  } else if (p < 0.89) {
    x = -1.0 + smoothStep(0.81, 0.89, p); // Glides back to CENTER (0.0)
  } else {
    x = 0.0; // Final Center
  }

  // Vertical trajectory (y: offset relative to viewport height)
  if (isMobile) {
    if (p < 0.08) {
      y = 0.04; // Hero position comfortably below header
    } else if (p < 0.18) {
      // Silky-smooth continuous glide from hero to station view (zero sudden jumps)
      const t = smoothStep(0.08, 0.18, p);
      y = 0.04 + (-0.16 - 0.04) * t;
    } else if (p < 0.82) {
      y = -0.16; // Stable upper position for Stations 1 to 4
    } else if (p < 0.90) {
      // Smooth glide to Blueprint Matrix position
      const t = smoothStep(0.82, 0.90, p);
      y = -0.16 + (-0.20 - (-0.16)) * t;
    } else {
      y = -0.20; // Final matrix view
    }
  } else {
    if (p < 0.10) {
      y = 0.04; // Gentle downward nudge (+4vh) giving generous breathing room below header
    } else if (p < 0.18) {
      y = 0.04 * (1.0 - smoothStep(0.10, 0.18, p)); // Smoothly glides to 0.0 for side stations
    } else if (p < 0.83) {
      y = 0.0; // Perfect vertical center for all 4 side stations
    } else if (p < 0.90) {
      y = -0.18 * smoothStep(0.83, 0.90, p); // Floats upward into upper-center
    } else {
      y = -0.18; // Locked in upper-center above Blueprint Matrix
    }
  }

  return [x, y];
}

export default function InteractiveSpecsSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const frameTextRef = useRef(null);
  const progressBarRef = useRef(null);

  // Direct DOM refs for 60fps hardware-composited text animations
  const card0Ref = useRef(null); // Hero Intro
  const card1Ref = useRef(null); // Station 1 (Chassis)
  const card2Ref = useRef(null); // Station 2 (Optics)
  const card3Ref = useRef(null); // Station 3 (Neural Co-Processor)
  const card4Ref = useRef(null); // Station 4 (Seal & Battery)
  const card5Ref = useRef(null); // Station 5 (Blueprint Matrix)
  const brandWatermarkRef = useRef(null); // Giant 'VELTRIX' behind-watch watermark

  const [isReady, setIsReady] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    const container = containerRef.current;

    const frameImages = new Array(TOTAL_FRAMES + 1);
    let targetFrame = 1;
    let currentFrame = 1;
    let targetProgressVal = 0;
    let currentProgressVal = 0;
    let lastRenderedFrameVal = -1;
    let lastRenderedProgressVal = -1;
    let animationId;

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium';
      drawFrames(currentFrame, currentProgressVal, true);
    }

    function getValidImage(idx) {
      if (idx < 1 || idx > TOTAL_FRAMES) return null;
      const img = frameImages[idx];
      if (img && img.complete && img.naturalWidth > 0) return img;

      for (let offset = 1; offset < 35; offset++) {
        const left = frameImages[idx - offset];
        if (left && left.complete && left.naturalWidth > 0) return left;
        const right = frameImages[idx + offset];
        if (right && right.complete && right.naturalWidth > 0) return right;
      }
      return null;
    }

    function drawFrames(frameVal, progressVal, force = false) {
      if (
        !force &&
        Math.abs(frameVal - lastRenderedFrameVal) < 0.01 &&
        Math.abs(progressVal - lastRenderedProgressVal) < 0.0005
      ) {
        return;
      }

      const canvasW = canvas.width;
      const canvasH = canvas.height;

      // Pure black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvasW, canvasH);

      const f1 = Math.max(1, Math.min(TOTAL_FRAMES, Math.floor(frameVal)));
      const f2 = Math.min(TOTAL_FRAMES, f1 + 1);
      const blend = frameVal - f1;

      const img1 = getValidImage(f1);
      if (!img1) return;

      const imgW = img1.naturalWidth;
      const imgH = img1.naturalHeight;

      const scaleW = canvasW / imgW;
      const scaleH = canvasH / imgH;

      const isMobile = window.innerWidth < 1024;
      let scale;
      if (isMobile) {
        // Compact luxury mobile scale (~165-180px): gives generous space for station specs
        const targetH = Math.min(canvasH * 0.26, canvasW * 0.50);
        scale = targetH / 739;
      } else {
        scale = Math.min(scaleW, scaleH) * 0.58;
      }

      const drawW = Math.round(imgW * scale);
      const drawH = Math.round(imgH * scale);

      // Trajectory calculation:
      // Controlled moderate shift (160px to 230px max) keeps the watch close to the text with a natural ~80-100px gap
      const [shiftXFactor, shiftYFactor] = getSmoothTrajectory(progressVal, isMobile);
      const maxShiftX = isMobile ? 0 : Math.max(160, Math.min(230, Math.round(canvasW * 0.15)));

      const offsetX = Math.round(shiftXFactor * maxShiftX);
      const offsetY = Math.round(shiftYFactor * canvasH);

      const drawX = Math.round((canvasW - drawW) / 2) + offsetX;
      const drawY = Math.round((canvasH - drawH) / 2) + offsetY;

      ctx.globalAlpha = 1.0;
      ctx.drawImage(img1, 0, 0, imgW, imgH, drawX, drawY, drawW, drawH);

      if (blend > 0.01 && f2 !== f1) {
        const img2 = getValidImage(f2);
        if (img2 && img2 !== img1) {
          ctx.globalAlpha = blend;
          ctx.drawImage(img2, 0, 0, imgW, imgH, drawX, drawY, drawW, drawH);
          ctx.globalAlpha = 1.0;
        }
      }

      // Clean source frames from newpp.mp4 (no watermark block required)

      lastRenderedFrameVal = frameVal;
      lastRenderedProgressVal = progressVal;
    }

    // Direct DOM style updates for butter-smooth 60fps text transitions
    function updateTextStyles(p) {
      // Brand Watermark (VELTRIX) behind watch
      if (brandWatermarkRef.current) {
        if (p <= 0.08) {
          brandWatermarkRef.current.style.opacity = '1';
          brandWatermarkRef.current.style.transform = 'translate(-50%, calc(-50% + 4vh)) scale(1)';
          brandWatermarkRef.current.style.visibility = 'visible';
        } else if (p <= 0.16) {
          const t = (p - 0.08) / 0.08;
          const ease = t * t * (3 - 2 * t);
          brandWatermarkRef.current.style.opacity = String(Math.max(0, 1 - ease));
          brandWatermarkRef.current.style.transform = `translate(-50%, calc(-50% + ${(4 * (1 - ease)).toFixed(2)}vh)) scale(${1 + ease * 0.05})`;
          brandWatermarkRef.current.style.visibility = 'visible';
        } else {
          brandWatermarkRef.current.style.opacity = '0';
          brandWatermarkRef.current.style.visibility = 'hidden';
        }
      }

      // Station 0: Hero Intro
      if (card0Ref.current) {
        if (p <= 0.06) {
          card0Ref.current.style.opacity = '1';
          card0Ref.current.style.transform = 'translateY(0px)';
          card0Ref.current.style.visibility = 'visible';
          card0Ref.current.style.pointerEvents = 'auto';
        } else if (p <= 0.12) {
          const t = (p - 0.06) / 0.06;
          const ease = t * t * (3 - 2 * t);
          card0Ref.current.style.opacity = String(Math.max(0, 1 - ease));
          card0Ref.current.style.transform = `translateY(${-ease * 20}px)`;
          card0Ref.current.style.visibility = 'visible';
          card0Ref.current.style.pointerEvents = 'none';
        } else {
          card0Ref.current.style.opacity = '0';
          card0Ref.current.style.visibility = 'hidden';
          card0Ref.current.style.pointerEvents = 'none';
        }
      }

      function applyText(ref, inStart, inEnd, outStart, outEnd) {
        if (!ref.current) return;
        if (p < inStart || p > outEnd) {
          ref.current.style.opacity = '0';
          ref.current.style.visibility = 'hidden';
          ref.current.style.pointerEvents = 'none';
          return;
        }
        ref.current.style.visibility = 'visible';
        if (p < inEnd) {
          const t = (p - inStart) / (inEnd - inStart);
          const ease = t * t * (3 - 2 * t);
          ref.current.style.opacity = String(ease);
          ref.current.style.transform = `translateY(${(1 - ease) * 16}px)`;
          ref.current.style.pointerEvents = 'none';
          return;
        }
        if (p <= outStart) {
          ref.current.style.opacity = '1';
          ref.current.style.transform = 'translateY(0px)';
          ref.current.style.pointerEvents = 'auto';
          return;
        }
        const t = (p - outStart) / (outEnd - outStart);
        const ease = t * t * (3 - 2 * t);
        ref.current.style.opacity = String(Math.max(0, 1 - ease));
        ref.current.style.transform = `translateY(${-ease * 16}px)`;
        ref.current.style.pointerEvents = 'none';
      }

      applyText(card1Ref, 0.13, 0.18, 0.28, 0.33); // Station 1 (LEFT)
      applyText(card2Ref, 0.33, 0.38, 0.46, 0.51); // Station 2 (RIGHT)
      applyText(card3Ref, 0.51, 0.56, 0.64, 0.69); // Station 3 (LEFT)
      applyText(card4Ref, 0.69, 0.74, 0.81, 0.85); // Station 4 (RIGHT)

      // Station 5: Blueprint Matrix Summary
      if (card5Ref.current) {
        if (p < 0.85) {
          card5Ref.current.style.opacity = '0';
          card5Ref.current.style.visibility = 'hidden';
          card5Ref.current.style.pointerEvents = 'none';
        } else if (p < 0.90) {
          const t = (p - 0.85) / 0.05;
          const ease = t * t * (3 - 2 * t);
          card5Ref.current.style.opacity = String(ease);
          card5Ref.current.style.transform = `translateY(${(1 - ease) * 24}px)`;
          card5Ref.current.style.visibility = 'visible';
          card5Ref.current.style.pointerEvents = 'none';
        } else {
          card5Ref.current.style.opacity = '1';
          card5Ref.current.style.transform = 'translateY(0px)';
          card5Ref.current.style.visibility = 'visible';
          card5Ref.current.style.pointerEvents = 'auto';
        }
      }
    }

    // Two-tier preloading
    let totalLoaded = 0;
    const keyIndices = [];
    for (let i = 1; i <= TOTAL_FRAMES; i += 10) {
      keyIndices.push(i);
    }
    if (!keyIndices.includes(TOTAL_FRAMES)) keyIndices.push(TOTAL_FRAMES);

    let keyLoadedCount = 0;
    keyIndices.forEach((idx) => {
      const img = new Image();
      img.src = getFramePath(idx);
      img.onload = () => {
        frameImages[idx] = img;
        keyLoadedCount++;
        totalLoaded++;
        setLoadedCount(totalLoaded);
        if (idx === 1) drawFrames(1, 0, true);

        if (keyLoadedCount >= Math.min(15, keyIndices.length)) {
          setIsReady(true);
        }
      };
      img.onerror = () => {
        keyLoadedCount++;
      };
    });

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      if (keyIndices.includes(i)) continue;
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        frameImages[i] = img;
        totalLoaded++;
        setLoadedCount(totalLoaded);
      };
      img.onerror = () => {
        totalLoaded++;
      };
    }

    function handleScroll() {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      let progress = currentScroll / totalScrollable;
      progress = Math.max(0, Math.min(1, progress));

      targetProgressVal = progress;
      targetFrame = 1 + progress * (TOTAL_FRAMES - 1);
    }

    function renderLoop() {
      // Responsive, butter-smooth cinematic deceleration
      const isMobile = window.innerWidth < 1024;
      const lerpSpeed = isMobile ? 0.22 : 0.16;

      const diffFrame = targetFrame - currentFrame;
      if (Math.abs(diffFrame) > 0.005) {
        currentFrame += diffFrame * lerpSpeed;
      } else {
        currentFrame = targetFrame;
      }

      const diffProg = targetProgressVal - currentProgressVal;
      if (Math.abs(diffProg) > 0.0005) {
        currentProgressVal += diffProg * lerpSpeed;
      } else {
        currentProgressVal = targetProgressVal;
      }

      drawFrames(currentFrame, currentProgressVal);
      updateTextStyles(currentProgressVal);

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${Math.round(currentProgressVal * 100)}%`;
      }

      if (frameTextRef.current) {
        const rounded = Math.round(currentFrame);
        frameTextRef.current.innerText = `FRAME ${String(rounded).padStart(3, '0')} / ${TOTAL_FRAMES}`;
      }

      animationId = requestAnimationFrame(renderLoop);
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll, { passive: true });

    resizeCanvas();
    renderLoop();
    handleScroll();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section
      id="specs"
      ref={containerRef}
      className="relative w-full h-[850vh] bg-black font-sans select-none border-t border-[#001d3d]/20"
    >
      {/* ========================================================
          STICKY VIEWPORT STAGE (Locked 100vh stage during scroll)
         ======================================================== */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">

        {/* ========================================================
            ATMOSPHERIC ROYAL BLUE GLOW BLOOMS (Matching Reference Design)
           ======================================================== */}
        {/* Bottom-Left Rich Royal Blue Bloom (Exactly as circled in bottom-left) */}
        <div
          className="absolute -left-20 sm:-left-32 -bottom-20 sm:-bottom-28 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at 35% 65%, rgba(31, 52, 145, 0.75) 0%, rgba(15, 23, 85, 0.40) 45%, transparent 72%)',
            filter: 'blur(95px)',
          }}
        />

        {/* Top-Right Soft Royal Blue Bloom (Exactly as circled in top-right) */}
        <div
          className="absolute -right-16 sm:-right-24 -top-16 sm:-top-24 w-[480px] sm:w-[620px] h-[450px] sm:h-[580px] rounded-full pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at 70% 30%, rgba(35, 47, 159, 0.65) 0%, rgba(18, 25, 95, 0.35) 45%, transparent 72%)',
            filter: 'blur(90px)',
          }}
        />

        {/* ========================================================
            SUBTLE TECHNICAL CAD / BLUEPRINT GRID TEXTURE
            - Placed strictly in BACKGROUND (z-0) BEHIND the 3D watch canvas!
            - Styled in Oxford Azure & Midnight Blue
           ======================================================== */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `
              radial-gradient(circle, rgba(58, 134, 255, 0.22) 1px, transparent 1px),
              linear-gradient(to right, rgba(58, 134, 255, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(58, 134, 255, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, #000 35%, transparent 92%)',
            WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, #000 35%, transparent 92%)',
          }}
        />



        {/* ========================================================
            3. GIANT MONUMENTAL "VELTRIX" IN THEME COLOR BEHIND WATCH
               - Placed strictly in BACKGROUND (z-0) BEHIND the 3D watch canvas!
           ======================================================== */}
        <div
          ref={brandWatermarkRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 z-0 pointer-events-none select-none w-full max-w-7xl mx-auto px-6 text-center flex items-center justify-center transition-all duration-300"
          style={{
            transform: 'translate(-50%, calc(-50% + 4vh))',
            maskImage: 'radial-gradient(110px 190px, transparent 68%, black 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 110px 190px at 50% 50%, transparent 68%, black 100%)',
          }}
        >
          <span className="font-heading font-black text-[14vw] sm:text-[15vw] md:text-[165px] lg:text-[180px] xl:text-[180px] 2xl:text-[180px] tracking-[0.14em] sm:tracking-[0.18em] leading-none uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#3a86ff] via-[#3a86ff]/75 to-[#001d3d]/30 drop-shadow-[0_0_45px_rgba(58,134,255,0.15)] pl-[0.14em]">
            VELTRIX
          </span>
        </div>

        {/* ========================================================
            4. 3D WATCH CANVAS (Layer 10 - IN FRONT OF ALL BACKGROUND LINES & TEXTURES)
           ======================================================== */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-10 mix-blend-screen" />

        {/* Ambient Top & Bottom Vignettes */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black via-black/60 to-transparent pointer-events-none z-15" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-15" />

        {/* Scrubbing HUD (Top Right Corner - Contained strictly within max-w-7xl) */}
        <div className="absolute inset-x-0 top-20 sm:top-24 z-30 pointer-events-none">
          <div className="max-w-7xl mx-auto px-6 flex justify-end">
            <div className="hidden sm:flex items-center gap-3 sm:gap-4 bg-[#000e1f]/85 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-[#001d3d]/50 shadow-[0_0_30px_rgba(31,52,145,0.30)] pointer-events-auto">
              <div className="flex flex-col text-right">
                <span className="font-mono text-[9px] sm:text-[10px] text-slate-400 tracking-wider">
                  SPEC TIMELINE
                </span>
                <span ref={frameTextRef} className="font-mono text-[11px] sm:text-xs font-bold text-[#3a86ff]">
                  FRAME 001 / {TOTAL_FRAMES}
                </span>
              </div>
              <div className="w-16 sm:w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  ref={progressBarRef}
                  className="h-full bg-[#3a86ff] rounded-full transition-all duration-75"
                  style={{ width: '0%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        {!isReady && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 bg-black/90 backdrop-blur-md border border-white/10 px-6 py-4 rounded-xl flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-[#3a86ff] border-t-transparent rounded-full animate-spin" />
            <div className="font-mono text-xs text-slate-300">
              SYNCHRONIZING SPECIFICATION FRAMES ({loadedCount}/{TOTAL_FRAMES})...
            </div>
          </div>
        )}

        {/* ========================================================
            3. HERO INTRO HEADER (Station 0: Upper Center)
               - Elevated with generous padding to prevent collapsing into watch
           ======================================================== */}
        <div
          ref={card0Ref}
          className="absolute inset-x-4 top-16 sm:top-20 lg:top-24 max-w-2xl mx-auto text-center z-20 pointer-events-none"
        >
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/5 border border-[#001d3d]/25 mb-2 text-[#3a86ff] font-mono text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3a86ff] shadow-[0_0_8px_#3a86ff]" />
            <span>SUB-NANOSECOND HOROLOGY ARCHITECTURE</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight mb-2 sm:mb-2.5">
            Technical Specifications
          </h2>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-950/80 border border-[#001d3d]/25 backdrop-blur-md text-[11px] sm:text-xs font-mono text-slate-300 shadow-xl">
            <span>SCROLL DOWN TO EXPLORE ARCHITECTURE</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#3a86ff] animate-bounce" />
          </div>
        </div>

        {/* ========================================================
            4. CENTERED EDITORIAL 2-COLUMN STAGE (APPLE-STYLE)
               - No heavy card boxes or dark borders
               - Tight, natural ~80-100px gap with the watch
               - Left Column: Station 1 & Station 3
               - Right Column: Station 2 & Station 4
           ======================================================== */}
        <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
          <div className="w-full max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 h-full items-center pointer-events-none">

                        {/* ----------------------------------------------------
                LEFT COLUMN (Station 1: Titanium & Station 3: Neural)
                - High-tech frosted glass instrument cards
               ---------------------------------------------------- */}
            <div className="pointer-events-none grid grid-cols-1 grid-rows-1 justify-items-end pr-0 lg:pr-10 bottom-3 sm:bottom-8 lg:bottom-auto absolute lg:relative inset-x-3 sm:inset-x-6 lg:inset-x-auto">
              
              {/* STATION 1: Grade 5 Titanium Monolith */}
              <div
                ref={card1Ref}
                className="col-start-1 row-start-1 w-full max-w-[430px] pointer-events-none select-none text-left bg-[#000e1f]/92 sm:bg-[#000e1f]/95 backdrop-blur-2xl border border-[#001d3d]/50 hover:border-[#3a86ff]/50 rounded-2xl p-3.5 sm:p-5 shadow-[0_16px_45px_rgba(0,0,0,0.85),0_0_35px_rgba(31,52,145,0.20)] transition-all"
                style={{ opacity: 0 }}
              >
                {/* Stage Tag & Step Indicator */}
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-2.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#3a86ff]/10 border border-[#3a86ff]/25 text-[#3a86ff]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3a86ff] shadow-[0_0_8px_#3a86ff] animate-pulse" />
                    <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                      01 // AEROSPACE CHASSIS
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-xs text-slate-400">
                    <span className="text-white font-bold">01</span>
                    <span className="text-white/20">/</span>
                    <span className="text-slate-500">04</span>
                    <div className="flex items-center gap-1 ml-1.5">
                      <span className="w-3.5 h-1.5 rounded-full bg-[#3a86ff] shadow-[0_0_6px_#3a86ff]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
                    </div>
                  </div>
                </div>

                {/* Main Heading */}
                <h3 className="font-heading font-extrabold text-lg sm:text-2xl text-white tracking-tight leading-tight mb-1">
                  Grade 5 Titanium Monolith
                </h3>

                {/* Subtitle */}
                <p className="font-mono text-[11px] sm:text-xs text-[#3a86ff] font-medium tracking-wide mb-2 sm:mb-2.5">
                  Ti-6Al-4V Aerospace Ingot // 5-Axis CNC Facets
                </p>

                {/* Description */}
                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed mb-3 sm:mb-3.5 line-clamp-2 sm:line-clamp-none">
                  Milled from a single solid aerospace ingot with diamond-cut chamfers and hand-finished satin brushing. Engineered for extreme structural rigidity with a 64-gram featherlight footprint.
                </p>

                {/* Segmented Glass Metric Cells */}
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5 pt-2.5 sm:pt-3 border-t border-white/10">
                  <div className="bg-white/5 border border-white/5 rounded-xl p-2 sm:p-2.5">
                    <span className="block font-mono text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-wider mb-0.5">
                      DIAMOND DLC HARDNESS
                    </span>
                    <div className="font-heading font-black text-lg sm:text-xl text-white tracking-tight">
                      3,200 <span className="text-xs font-mono font-bold text-[#3a86ff]">HV</span>
                    </div>
                    <span className="block text-[9px] sm:text-[10px] font-mono text-slate-400 mt-0.5 truncate">
                      Vapor-Deposited Matrix
                    </span>
                  </div>

                  <div className="bg-white/5 border border-white/5 rounded-xl p-2 sm:p-2.5">
                    <span className="block font-mono text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-wider mb-0.5">
                      NET CHASSIS MASS
                    </span>
                    <div className="font-heading font-black text-lg sm:text-xl text-white tracking-tight">
                      64 <span className="text-xs font-mono font-bold text-[#3a86ff]">GRAMS</span>
                    </div>
                    <span className="block text-[9px] sm:text-[10px] font-mono text-slate-400 mt-0.5 truncate">
                      Featherlight Net Mass
                    </span>
                  </div>
                </div>

                {/* Clean Feature Line */}
                <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#3a86ff] flex-shrink-0" />
                  <span className="truncate">Directional Satin Brushing + 45° Mirror Chamfers</span>
                </div>
              </div>

              {/* STATION 3: Neural S-01 Co-Processor */}
              <div
                ref={card3Ref}
                className="col-start-1 row-start-1 w-full max-w-[430px] pointer-events-none select-none text-left bg-[#000e1f]/92 sm:bg-[#000e1f]/95 backdrop-blur-2xl border border-[#001d3d]/50 hover:border-[#3a86ff]/50 rounded-2xl p-3.5 sm:p-5 shadow-[0_16px_45px_rgba(0,0,0,0.85),0_0_35px_rgba(31,52,145,0.20)] transition-all"
                style={{ opacity: 0 }}
              >
                {/* Stage Tag & Step Indicator */}
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-2.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#3a86ff]/10 border border-[#3a86ff]/25 text-[#3a86ff]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3a86ff] shadow-[0_0_8px_#3a86ff] animate-pulse" />
                    <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                      03 // BIONIC CORE
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-xs text-slate-400">
                    <span className="text-white font-bold">03</span>
                    <span className="text-white/20">/</span>
                    <span className="text-slate-500">04</span>
                    <div className="flex items-center gap-1 ml-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
                      <span className="w-3.5 h-1.5 rounded-full bg-[#3a86ff] shadow-[0_0_6px_#3a86ff]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
                    </div>
                  </div>
                </div>

                {/* Main Heading */}
                <h3 className="font-heading font-extrabold text-lg sm:text-2xl text-white tracking-tight leading-tight mb-1">
                  Neural S-01 Co-Processor
                </h3>

                {/* Subtitle */}
                <p className="font-mono text-[11px] sm:text-xs text-[#3a86ff] font-medium tracking-wide mb-2 sm:mb-2.5">
                  4nm Neural Silicon Substrate // 8-Ch Optical Array
                </p>

                {/* Description */}
                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed mb-3 sm:mb-3.5 line-clamp-2 sm:line-clamp-none">
                  Multi-layer high-density substrate housing the 4nm neural co-processor paired with an 8-channel optical array delivering 1,000Hz continuous cardiac and oxygen telemetry.
                </p>

                {/* Segmented Glass Metric Cells */}
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5 pt-2.5 sm:pt-3 border-t border-white/10">
                  <div className="bg-white/5 border border-white/5 rounded-xl p-2 sm:p-2.5">
                    <span className="block font-mono text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-wider mb-0.5">
                      PROCESS NODE
                    </span>
                    <div className="font-heading font-black text-lg sm:text-xl text-white tracking-tight">
                      4 <span className="text-xs font-mono font-bold text-[#3a86ff]">NM</span>
                    </div>
                    <span className="block text-[9px] sm:text-[10px] font-mono text-slate-400 mt-0.5 truncate">
                      Neural Silicon Substrate
                    </span>
                  </div>

                  <div className="bg-white/5 border border-white/5 rounded-xl p-2 sm:p-2.5">
                    <span className="block font-mono text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-wider mb-0.5">
                      CONTINUOUS POLLING
                    </span>
                    <div className="font-heading font-black text-lg sm:text-xl text-white tracking-tight">
                      1,000 <span className="text-xs font-mono font-bold text-[#3a86ff]">HZ</span>
                    </div>
                    <span className="block text-[9px] sm:text-[10px] font-mono text-slate-400 mt-0.5 truncate">
                      Biometric Sampling
                    </span>
                  </div>
                </div>

                {/* Clean Feature Line */}
                <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-slate-300">
                  <Compass className="w-3.5 h-3.5 text-[#3a86ff] flex-shrink-0" />
                  <span className="truncate">±0.001 ms Atomic Accuracy // Real-time Telemetry</span>
                </div>
              </div>

            </div>

            {/* ----------------------------------------------------
                RIGHT COLUMN (Station 2: Optics & Station 4: Seal)
                - High-tech frosted glass instrument cards
               ---------------------------------------------------- */}
            <div className="pointer-events-none grid grid-cols-1 grid-rows-1 justify-items-start pl-0 lg:pl-10 col-start-1 lg:col-start-2 bottom-3 sm:bottom-8 lg:bottom-auto absolute lg:relative inset-x-3 sm:inset-x-6 lg:inset-x-auto">
              
              {/* STATION 2: Ultra Retina AMOLED & Sapphire */}
              <div
                ref={card2Ref}
                className="col-start-1 row-start-1 w-full max-w-[430px] pointer-events-none select-none text-left bg-[#000e1f]/92 sm:bg-[#000e1f]/95 backdrop-blur-2xl border border-[#001d3d]/50 hover:border-[#3a86ff]/50 rounded-2xl p-3.5 sm:p-5 shadow-[0_16px_45px_rgba(0,0,0,0.85),0_0_35px_rgba(31,52,145,0.20)] transition-all"
                style={{ opacity: 0 }}
              >
                {/* Stage Tag & Step Indicator */}
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-2.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#3a86ff]/10 border border-[#3a86ff]/25 text-[#3a86ff]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3a86ff] shadow-[0_0_8px_#3a86ff] animate-pulse" />
                    <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                      02 // OPTICAL SHIELD
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-xs text-slate-400">
                    <span className="text-white font-bold">02</span>
                    <span className="text-white/20">/</span>
                    <span className="text-slate-500">04</span>
                    <div className="flex items-center gap-1 ml-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
                      <span className="w-3.5 h-1.5 rounded-full bg-[#3a86ff] shadow-[0_0_6px_#3a86ff]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
                    </div>
                  </div>
                </div>

                {/* Main Heading */}
                <h3 className="font-heading font-extrabold text-lg sm:text-2xl text-white tracking-tight leading-tight mb-1">
                  Ultra Retina AMOLED & Sapphire
                </h3>

                {/* Subtitle */}
                <p className="font-mono text-[11px] sm:text-xs text-[#3a86ff] font-medium tracking-wide mb-2 sm:mb-2.5">
                  Dual-Curved Synthetic Sapphire // 120Hz Dynamic
                </p>

                {/* Description */}
                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed mb-3 sm:mb-3.5 line-clamp-2 sm:line-clamp-none">
                  Custom curved synthetic sapphire crystal protects a 480 × 480 ultra-dense AMOLED display with sub-nanosecond response and razor-sharp legibility under direct alpine sunlight.
                </p>

                {/* Segmented Glass Metric Cells */}
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5 pt-2.5 sm:pt-3 border-t border-white/10">
                  <div className="bg-white/5 border border-white/5 rounded-xl p-2 sm:p-2.5">
                    <span className="block font-mono text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-wider mb-0.5">
                      PEAK LUMINANCE
                    </span>
                    <div className="font-heading font-black text-lg sm:text-xl text-white tracking-tight">
                      3,000 <span className="text-xs font-mono font-bold text-[#3a86ff]">NITS</span>
                    </div>
                    <span className="block text-[9px] sm:text-[10px] font-mono text-slate-400 mt-0.5 truncate">
                      Alpine Peak Lumens
                    </span>
                  </div>

                  <div className="bg-white/5 border border-white/5 rounded-xl p-2 sm:p-2.5">
                    <span className="block font-mono text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-wider mb-0.5">
                      SURFACE HARDNESS
                    </span>
                    <div className="font-heading font-black text-lg sm:text-xl text-white tracking-tight">
                      MOHS 9 <span className="text-xs font-mono font-bold text-[#3a86ff]">SCALE</span>
                    </div>
                    <span className="block text-[9px] sm:text-[10px] font-mono text-slate-400 mt-0.5 truncate">
                      Synthetic Sapphire Shield
                    </span>
                  </div>
                </div>

                {/* Clean Feature Line */}
                <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-slate-300">
                  <Cpu className="w-3.5 h-3.5 text-[#3a86ff] flex-shrink-0" />
                  <span className="truncate">480 × 480 Resolution // 454 PPI True Retina</span>
                </div>
              </div>

              {/* STATION 4: 10 ATM & 72h Matrix */}
              <div
                ref={card4Ref}
                className="col-start-1 row-start-1 w-full max-w-[430px] pointer-events-none select-none text-left bg-[#000e1f]/92 sm:bg-[#000e1f]/95 backdrop-blur-2xl border border-[#001d3d]/50 hover:border-[#3a86ff]/50 rounded-2xl p-3.5 sm:p-5 shadow-[0_16px_45px_rgba(0,0,0,0.85),0_0_35px_rgba(31,52,145,0.20)] transition-all"
                style={{ opacity: 0 }}
              >
                {/* Stage Tag & Step Indicator */}
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-2.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#3a86ff]/10 border border-[#3a86ff]/25 text-[#3a86ff]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3a86ff] shadow-[0_0_8px_#3a86ff] animate-pulse" />
                    <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                      04 // HERMETIC SEAL & POWER
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-xs text-slate-400">
                    <span className="text-white font-bold">04</span>
                    <span className="text-white/20">/</span>
                    <span className="text-slate-500">04</span>
                    <div className="flex items-center gap-1 ml-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
                      <span className="w-3.5 h-1.5 rounded-full bg-[#3a86ff] shadow-[0_0_6px_#3a86ff]" />
                    </div>
                  </div>
                </div>

                {/* Main Heading */}
                <h3 className="font-heading font-extrabold text-lg sm:text-2xl text-white tracking-tight leading-tight mb-1">
                  10 ATM (100M) & 72h Matrix
                </h3>

                {/* Subtitle */}
                <p className="font-mono text-[11px] sm:text-xs text-[#3a86ff] font-medium tracking-wide mb-2 sm:mb-2.5">
                  Solid Polymer Battery // 100% Helium Chamber Tested
                </p>

                {/* Description */}
                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed mb-3 sm:mb-3.5 line-clamp-2 sm:line-clamp-none">
                  Chamber-tested with 100% helium sniffer verification to ensure absolute water resistance up to 10 ATM. Solid polymer battery matrix delivers up to 72 hours of uninterrupted biometrics.
                </p>

                {/* Segmented Glass Metric Cells */}
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5 pt-2.5 sm:pt-3 border-t border-white/10">
                  <div className="bg-white/5 border border-white/5 rounded-xl p-2 sm:p-2.5">
                    <span className="block font-mono text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-wider mb-0.5">
                      DEPTH RATING
                    </span>
                    <div className="font-heading font-black text-lg sm:text-xl text-white tracking-tight">
                      100 <span className="text-xs font-mono font-bold text-[#3a86ff]">METERS</span>
                    </div>
                    <span className="block text-[9px] sm:text-[10px] font-mono text-slate-400 mt-0.5 truncate">
                      10 ATM Depth Rating
                    </span>
                  </div>

                  <div className="bg-white/5 border border-white/5 rounded-xl p-2 sm:p-2.5">
                    <span className="block font-mono text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-wider mb-0.5">
                      EXPEDITION LIFE
                    </span>
                    <div className="font-heading font-black text-lg sm:text-xl text-white tracking-tight">
                      72 <span className="text-xs font-mono font-bold text-[#3a86ff]">HOURS</span>
                    </div>
                    <span className="block text-[9px] sm:text-[10px] font-mono text-slate-400 mt-0.5 truncate">
                      Solid Polymer Endurance
                    </span>
                  </div>
                </div>

                {/* Clean Feature Line */}
                <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-slate-300">
                  <Zap className="w-3.5 h-3.5 text-[#3a86ff] flex-shrink-0" />
                  <span className="truncate">Rapid Magnetic Induction // 0–80% in 35 Minutes</span>
                </div>
              </div>

            </div>

          </div>
        </div>

                {/* ========================================================
            5. STATION 5: COMPLETE BLUEPRINT MATRIX (Bottom Center)
               - High-tech luxury frosted glass instrument card
               - 4 Segmented Matrix cells in Oxford Blue & Royal Navy
           ======================================================== */}
        <div
          ref={card5Ref}
          className="absolute inset-x-0 bottom-3 sm:bottom-8 z-20 pointer-events-none text-center"
          style={{ opacity: 0 }}
        >
          <div className="w-full max-w-4xl mx-auto px-3 sm:px-6">
            <div className="bg-[#000e1f]/92 sm:bg-[#000e1f]/95 backdrop-blur-2xl border border-[#001d3d]/50 hover:border-[#3a86ff]/50 rounded-2xl p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-all">
              
              {/* Header Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#3a86ff]/10 border border-[#3a86ff]/25 mb-2 sm:mb-2.5 text-[#3a86ff]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3a86ff] shadow-[0_0_8px_#3a86ff] animate-pulse" />
                <span className="font-mono text-[9px] sm:text-xs font-bold tracking-widest uppercase">
                  TECHNICAL BLUEPRINT // COMPLETE MATRIX
                </span>
              </div>

              {/* Title & Concise Subtitle */}
              <h3 className="font-heading font-extrabold text-lg sm:text-2xl md:text-3xl text-white tracking-tight leading-tight mb-1">
                VELTRIX T-01 Engineering Summary
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm font-light max-w-xl mx-auto mb-3 sm:mb-4 line-clamp-1 sm:line-clamp-none">
                Every curve, chamfer, and sub-nanosecond calculation synchronized into a single aerospace titanium instrument.
              </p>

              {/* 4 Segmented Matrix Cells */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-left pt-2.5 sm:pt-3.5 border-t border-white/10">
                {/* CHASSIS */}
                <div className="bg-white/5 border border-white/5 rounded-xl p-2.5 sm:p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-wider block">
                      CHASSIS
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3a86ff]" />
                  </div>
                  <strong className="text-white text-xs sm:text-sm md:text-base font-extrabold block truncate">
                    Grade 5 Ti-6Al-4V
                  </strong>
                  <span className="text-[10px] sm:text-xs text-[#3a86ff] font-mono mt-0.5 block truncate">
                    64g // 3,200 HV DLC
                  </span>
                </div>

                {/* OPTICS */}
                <div className="bg-white/5 border border-white/5 rounded-xl p-2.5 sm:p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-wider block">
                      OPTICS
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3a86ff]" />
                  </div>
                  <strong className="text-white text-xs sm:text-sm md:text-base font-extrabold block truncate">
                    Ultra AMOLED
                  </strong>
                  <span className="text-[10px] sm:text-xs text-[#3a86ff] font-mono mt-0.5 block truncate">
                    3,000 Nits // Mohs 9
                  </span>
                </div>

                {/* COMPUTE */}
                <div className="bg-white/5 border border-white/5 rounded-xl p-2.5 sm:p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-wider block">
                      COMPUTE
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3a86ff]" />
                  </div>
                  <strong className="text-white text-xs sm:text-sm md:text-base font-extrabold block truncate">
                    Neural S-01
                  </strong>
                  <span className="text-[10px] sm:text-xs text-[#3a86ff] font-mono mt-0.5 block truncate">
                    4nm // 1,000Hz Bio
                  </span>
                </div>

                {/* ENDURANCE */}
                <div className="bg-white/5 border border-white/5 rounded-xl p-2.5 sm:p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-wider block">
                      ENDURANCE
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3a86ff]" />
                  </div>
                  <strong className="text-white text-xs sm:text-sm md:text-base font-extrabold block truncate">
                    10 ATM / 100M
                  </strong>
                  <span className="text-[10px] sm:text-xs text-[#3a86ff] font-mono mt-0.5 block truncate">
                    72h // Fast Charge
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
