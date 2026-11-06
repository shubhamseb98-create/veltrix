'use client';

import { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 239;
const FRAME_PREFIX = '/p1_frames/frame_';
const FRAME_EXT = '.webp?v=1';

function getFramePath(index) {
  return `${FRAME_PREFIX}${String(index).padStart(4, '0')}${FRAME_EXT}`;
}

const FINISH_STAGES = [
  {
    id: 0,
    range: [1, 58],
    scrollTarget: 0.10,
    name: 'DLC Stealth Obsidian',
    subtitle: 'Diamond-Like Carbon — Deep Space Black',
    tag: 'FINISH 01 — VAPOR DEPOSITION',
    description:
      'Vapor-deposited diamond crystalline matrix bonded at 400°C. Absorbs 99.2% of incident light with zero reflection, engineered for extreme covert durability.',
    swatchBg: '#18181b',
    swatchBorder: '#71717a',
    accentColor: '#e4e4e7',
    accentClass: 'text-zinc-200 border-zinc-700 bg-zinc-900/80',
    shortName: 'Obsidian',
    specs: [
      { label: 'HARDNESS', val: '3,200 HV DLC' },
      { label: 'COATING', val: 'Vapor Carbon' },
      { label: 'WEIGHT', val: '64g Ultra-Dense' },
    ],
  },
  {
    id: 1,
    range: [59, 115],
    scrollTarget: 0.36,
    name: 'Natural Titanium Satin',
    subtitle: 'Grade 5 Ti-6Al-4V — Directional Satin Brush',
    tag: 'FINISH 02 — RAW METALLURGY',
    description:
      'Sculpted from a single solid aerospace ingot. Hand-finished with micro-abrasive directional satin brushing to exhibit the raw silvery luster of Grade 5 titanium.',
    swatchBg: '#e2e8f0',
    swatchBorder: '#38bdf8',
    accentColor: '#3a86ff',
    accentClass: 'text-[#3a86ff] border-[#3a86ff]/40 bg-[#3a86ff]/10',
    shortName: 'Natural',
    specs: [
      { label: 'ALLOY', val: 'Ti-6Al-4V Grade 5' },
      { label: 'TREATMENT', val: 'Satin Brushing' },
      { label: 'BIO-COMPAT', val: 'Hypoallergenic' },
    ],
  },
  {
    id: 2,
    range: [116, 172],
    scrollTarget: 0.62,
    name: 'Crimson Burgundy Atelier',
    subtitle: 'Micro-Arc Ceramic Anodization — Wine Red',
    tag: 'FINISH 03 — ANODIZED COUTURE',
    description:
      'Deep crimson wine-red anodized bezel paired with midnight burgundy link accents. Built for unmistakable presence, balancing technical prowess with haute horology.',
    swatchBg: '#881337',
    swatchBorder: '#fb7185',
    accentColor: '#fb7185',
    accentClass: 'text-rose-400 border-rose-500/40 bg-rose-950/40',
    shortName: 'Crimson',
    specs: [
      { label: 'ANODIZATION', val: 'Micro-Arc Plasma' },
      { label: 'TONE', val: 'Deep Royal Wine' },
      { label: 'DIAL', val: 'Sunburst Crimson' },
    ],
  },
  {
    id: 3,
    range: [173, 239],
    scrollTarget: 0.88,
    name: 'Frosted Azure Platinum',
    subtitle: 'High-Luster Cold Steel — Mirror Chamfers',
    tag: 'FINISH 04 — LIQUID METAL',
    description:
      'Precision electropolished to mirror brilliance with hand-beveled chamfers. High-density cold-forged luster creates an unyielding luxury timepiece presence.',
    swatchBg: '#38bdf8',
    swatchBorder: '#7dd3fc',
    accentColor: '#3a86ff',
    accentClass: 'text-sky-400 border-sky-500/40 bg-sky-950/40',
    shortName: 'Frosted',
    specs: [
      { label: 'FINISH', val: 'Electropolished' },
      { label: 'ALLOY', val: 'Cold-Forged 904L' },
      { label: 'CHAMFERS', val: 'Diamond Cut' },
    ],
  },
];

export default function ColorScrollerSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const frameTextRef = useRef(null);
  const progressBarRef = useRef(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const activeStageRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    const container = containerRef.current;

    const frameImages = new Array(TOTAL_FRAMES + 1);
    let targetFrame = 1;
    let currentFrame = 1;
    let lastRenderedFrameVal = -1;
    let animationId;

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium';
      drawFrames(currentFrame, true);
    }

    function getValidImage(idx) {
      if (idx < 1 || idx > TOTAL_FRAMES) return null;
      const img = frameImages[idx];
      if (img && img.complete && img.naturalWidth > 0) return img;

      // Smart nearest loaded frame lookup
      for (let offset = 1; offset < 35; offset++) {
        const left = frameImages[idx - offset];
        if (left && left.complete && left.naturalWidth > 0) return left;
        const right = frameImages[idx + offset];
        if (right && right.complete && right.naturalWidth > 0) return right;
      }
      return null;
    }

    // High-fidelity smooth sub-frame crossfade rendering
    function drawFrames(frameVal, force = false) {
      if (!force && Math.abs(frameVal - lastRenderedFrameVal) < 0.01) return;

      const canvasW = canvas.width;
      const canvasH = canvas.height;

      // Solid pure black canvas background
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
      let drawY;
      if (isMobile) {
        // Mobile Framing: watch centered vertically between top header and bottom controls
        const targetW = Math.min(canvasW * 0.58, canvasH * 0.30);
        scale = targetW / 602;
        drawY = Math.round((canvasH - Math.round(imgH * scale)) / 2) - Math.round(canvasH * 0.015);
      } else {
        scale = Math.min(scaleW, scaleH) * 0.70;
        drawY = Math.round((canvasH - Math.round(imgH * scale)) / 2) - Math.round(canvasH * 0.04);
      }

      const drawW = Math.round(imgW * scale);
      const drawH = Math.round(imgH * scale);
      const drawX = Math.round((canvasW - drawW) / 2);

      // Draw primary base frame
      ctx.globalAlpha = 1.0;
      ctx.drawImage(img1, 0, 0, imgW, imgH, drawX, drawY, drawW, drawH);

      // Soft subpixel crossfade between adjacent frames for buttery transitions
      if (blend > 0.01 && f2 !== f1) {
        const img2 = getValidImage(f2);
        if (img2 && img2 !== img1) {
          ctx.globalAlpha = blend;
          ctx.drawImage(img2, 0, 0, imgW, imgH, drawX, drawY, drawW, drawH);
          ctx.globalAlpha = 1.0;
        }
      }

      lastRenderedFrameVal = frameVal;
    }

    // Two-tier Preloading:
    // 1. First preload 24 key evenly-spaced anchor frames across the entire video
    // 2. Then preload the rest sequentially in background
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
        if (idx === 1) drawFrames(1, true);

        // When all key anchor frames are loaded, app is ready with zero missing frame gaps
        if (keyLoadedCount >= Math.min(15, keyIndices.length)) {
          setIsReady(true);
        }
      };
      img.onerror = () => {
        keyLoadedCount++;
      };
    });

    // Background loader for all remaining frames
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

      // Direct DOM update for instant 120fps scrubbing bar without React re-render overhead
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${Math.round(progress * 100)}%`;
      }

      // Map progress smoothly to continuous floating frame 1.00..239.00
      targetFrame = 1 + progress * (TOTAL_FRAMES - 1);

      // Determine active finish stage across the 4 finishes
      let nextStage = 0;
      if (progress < 0.24) {
        nextStage = 0;
      } else if (progress < 0.48) {
        nextStage = 1;
      } else if (progress < 0.72) {
        nextStage = 2;
      } else {
        nextStage = 3;
      }

      if (activeStageRef.current !== nextStage) {
        activeStageRef.current = nextStage;
        setActiveStageIndex(nextStage);
      }
    }

    function renderLoop() {
      // Responsive snappy lerp damping (0.24) so frames instantly follow user scrolling
      const diff = targetFrame - currentFrame;
      if (Math.abs(diff) > 0.005) {
        currentFrame += diff * 0.24;
      } else {
        currentFrame = targetFrame;
      }

      drawFrames(currentFrame);

      // Direct DOM update for frame counter without re-rendering JSX on every rAF
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

  const scrollToFinish = (targetProgress) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    const targetY = scrollTop + rect.top + targetProgress * totalScrollable;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };

  const currentStage = FINISH_STAGES[activeStageIndex];

  return (
    <section
      id="metallurgy"
      ref={containerRef}
      className="relative w-full h-[280vh] sm:h-[300vh] bg-black font-sans selection:bg-[#3a86ff]/20 border-t border-[#001d3d]/25"
    >
      {/* Sticky Viewport Container: Pure Solid Black Stage for 100% Crisp 3D Watch Contrast */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between pointer-events-none bg-black">
        {/* ========================================================
            ATMOSPHERIC ROYAL BLUE AMBIENT LIGHTING & BLUEPRINT GRID TEXTURE
           ======================================================== */}
        {/* Atmospheric Royal Blue Ambient Lighting */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: `
              radial-gradient(ellipse 75% 65% at 10% 40%, rgba(31, 52, 145, 0.32) 0%, rgba(15, 23, 85, 0.16) 35%, rgba(5, 10, 45, 0.04) 60%, transparent 80%),
              radial-gradient(ellipse 70% 60% at 90% 30%, rgba(35, 47, 159, 0.28) 0%, rgba(18, 25, 95, 0.14) 35%, rgba(6, 12, 50, 0.03) 60%, transparent 78%),
              radial-gradient(circle 600px at 50% 50%, rgba(58, 134, 255, 0.06) 0%, rgba(31, 52, 145, 0.02) 50%, transparent 75%)
            `,
          }}
        />

        {/* Cybernetic Blueprint Grid Texture */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `
              radial-gradient(circle, rgba(58, 134, 255, 0.18) 1px, transparent 1px),
              linear-gradient(to right, rgba(58, 134, 255, 0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(58, 134, 255, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, #000 35%, transparent 92%)',
            WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, #000 35%, transparent 92%)',
          }}
        />

        
        {/* Fullscreen Canvas Rendering Watch Video Frames (Pure Solid Black Backdrop) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block z-10 mix-blend-screen"
        />

        {/* Top Header & Frame Scrubber */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 md:pt-24 flex items-center justify-between gap-3 pointer-events-auto">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 mb-1 sm:mb-1.5">
              <span className="w-3.5 sm:w-4 h-[1.5px] bg-[#3a86ff] rounded-full" />
              <span className="font-mono text-[9px] sm:text-xs font-semibold tracking-[0.2em] text-[#3a86ff] uppercase">
                METALLURGY ATELIER
              </span>
            </div>
            <h2 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight truncate">
              Crafted in Every Light.
            </h2>
          </div>

          {/* Real-time Scrubbing Meter - Compact on Mobile */}
          <div className="flex items-center gap-2 sm:gap-4 bg-[#000e1f]/92 backdrop-blur-md px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-[#001d3d]/25 shadow-lg flex-shrink-0">
            <div className="flex flex-col text-right">
              <span className="font-mono text-[8px] sm:text-[10px] text-slate-400 tracking-wider">SCRUB PROGRESS</span>
              <span ref={frameTextRef} className="font-mono text-[10px] sm:text-xs font-bold text-[#3a86ff]">
                FRAME 001 / {TOTAL_FRAMES}
              </span>
            </div>
            <div className="w-12 sm:w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-[#3a86ff] rounded-full transition-all duration-75"
                style={{ width: '0%' }}
              />
            </div>
          </div>
        </div>

        {/* Active Stage Callout Card & Swatch Controls */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 mt-auto mb-3 sm:mb-6 md:mb-10 pointer-events-auto">
          {/* DESKTOP LAYOUT (lg:flex) - Preserves original multi-column atelier card */}
          <div className="hidden lg:flex items-end justify-between gap-6">
            {/* Left Detail Card */}
            <div className="w-full max-w-[360px] bg-[#000e1f]/92 backdrop-blur-xl border border-[#001d3d]/30 hover:border-[#3a86ff]/60 shadow-[0_20px_50px_rgba(0,0,0,0.7)] rounded-2xl p-5 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded-md border ${currentStage.accentClass}`}>
                  {currentStage.tag}
                </span>
                <span className="font-mono text-xs text-slate-400">
                  {activeStageIndex + 1} OF 4
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-0.5 tracking-tight">
                {currentStage.name}
              </h3>
              <p className="font-mono text-xs text-[#3a86ff] mb-2 font-medium">
                {currentStage.subtitle}
              </p>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {currentStage.description}
              </p>

              {/* Technical Specifications Pill Grid */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10">
                {currentStage.specs.map((s, idx) => (
                  <div key={idx} className="bg-white/5 rounded-lg p-2 border border-white/5">
                    <span className="block font-mono text-[9px] text-slate-400 tracking-wider uppercase mb-0.5">
                      {s.label}
                    </span>
                    <span className="block font-mono text-[11px] font-bold text-white truncate">
                      {s.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Swatches Bar */}
            <div className="flex flex-col items-end gap-2">
              <div className="font-mono text-[10px] text-slate-400 tracking-widest uppercase flex items-center gap-1.5">
                <span>CLICK COLOR TO JUMP</span>
                <span className="text-[#3a86ff]">↓</span>
              </div>

              <div className="flex items-center gap-2.5 bg-[#000e1f]/92 backdrop-blur-xl border border-[#001d3d]/25 p-2 rounded-2xl shadow-xl">
                {FINISH_STAGES.map((stage, idx) => {
                  const isActive = activeStageIndex === idx;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => scrollToFinish(stage.scrollTarget)}
                      className={`group flex items-center gap-2 px-3 py-2 rounded-xl transition-all whitespace-nowrap ${
                        isActive
                          ? 'bg-white/10 border border-white/20 shadow-md'
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full transition-transform ${
                          isActive ? 'scale-125 ring-2 ring-white/50' : 'group-hover:scale-110'
                        }`}
                        style={{
                          backgroundColor: stage.swatchBg,
                          border: `1.5px solid ${stage.swatchBorder}`,
                        }}
                      />
                      <span
                        className={`text-xs font-medium tracking-wide transition-colors ${
                          isActive ? 'text-white font-semibold' : 'text-slate-400 group-hover:text-slate-200'
                        }`}
                      >
                        {stage.shortName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* MOBILE LAYOUT (lg:hidden) - Streamlined, 100% zero overlap over the watch */}
          <div className="lg:hidden flex flex-col gap-2 w-full">
            {/* Sleek Mobile Finish Information Pill */}
            <div className="w-full bg-[#000e1f]/94 backdrop-blur-xl border border-[#001d3d]/35 rounded-xl p-2.5 shadow-xl">
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border ${currentStage.accentClass} flex-shrink-0`}>
                    0{activeStageIndex + 1}
                  </span>
                  <span className="font-bold text-white text-xs sm:text-sm tracking-tight truncate">
                    {currentStage.name}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-slate-400 flex-shrink-0">
                  {activeStageIndex + 1} OF 4
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-300 pt-1 border-t border-white/10">
                <span className="text-[#3a86ff] truncate">{currentStage.subtitle.split(/[//—\-]/)[0].trim()}</span>
                <span className="text-slate-400 flex-shrink-0 ml-2">
                  {currentStage.specs[0].val} • {currentStage.specs[2].val.replace(' Ultra-Dense', '')}
                </span>
              </div>
            </div>

            {/* Mobile Swatches: 4-Column Grid (Zero Cutoff, Zero Overflow) */}
            <div className="w-full">
              <div className="grid grid-cols-4 gap-1.5 bg-[#000e1f]/94 backdrop-blur-xl border border-[#001d3d]/35 p-1.5 rounded-xl shadow-lg">
                {FINISH_STAGES.map((stage, idx) => {
                  const isActive = activeStageIndex === idx;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => scrollToFinish(stage.scrollTarget)}
                      className={`flex items-center justify-center gap-1.5 py-1.5 px-1 rounded-lg transition-all ${
                        isActive
                          ? 'bg-white/15 border border-white/30 shadow'
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <span
                        className={`w-3 h-3 rounded-full flex-shrink-0 ${
                          isActive ? 'scale-110 ring-2 ring-white/60' : ''
                        }`}
                        style={{
                          backgroundColor: stage.swatchBg,
                          border: `1px solid ${stage.swatchBorder}`,
                        }}
                      />
                      <span
                        className={`text-[10px] font-mono tracking-tight truncate ${
                          isActive ? 'text-white font-bold' : 'text-slate-400'
                        }`}
                      >
                        {stage.shortName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Instruction Hint at bottom center */}
        <div className="relative z-20 pb-4 text-center pointer-events-auto hidden sm:block">
          <div className="hidden sm:inline-flex items-center gap-2 text-xs font-mono text-slate-400 animate-bounce">
            <span>SCROLL DOWN TO EXPLORE FINISHES</span>
            <span>↓</span>
          </div>
        </div>

        {/* Preload status banner (only if initial loading) */}
        {!isReady && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-[#000e1f]/92 backdrop-blur-md border border-[#001d3d]/30 px-6 py-4 rounded-xl flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-[#3a86ff] border-t-transparent rounded-full animate-spin" />
            <div className="font-mono text-xs text-slate-300">
              OPTIMIZING 4K SEQUENCES ({loadedCount}/{TOTAL_FRAMES})...
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
