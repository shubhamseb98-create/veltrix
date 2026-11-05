'use client';

import { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 239;
const FRAME_PREFIX = '/frames/frame_';
const FRAME_EXT = '.webp?v=f1_v1';

function getFramePath(index) {
  return `${FRAME_PREFIX}${String(index).padStart(4, '0')}${FRAME_EXT}`;
}

const PART_STAGES = [
  {
    id: 0,
    tag: 'PART 01 // UNIBODY',
    title: 'Grade 5 Titanium Chassis',
    desc: 'Precision 5-axis CNC sculpted from solid aerospace Ti-6Al-4V bar stock. Diamond-cut angular facets meet a hand-brushed satin finish with micro-tolerances.',
    position: 'left',
    normX: 0.385,
    normY: 0.490, // Points cleanly to outer titanium faceted bezel
    specs: [
      { label: 'ALLOY', val: 'Ti-6Al-4V' },
      { label: 'TOLERANCE', val: '±0.005mm' },
    ],
    scrollTarget: 0.08,
  },
  {
    id: 1,
    tag: 'PART 02 // OPTICAL SHIELD',
    title: 'Dual-Curved Sapphire Crystal',
    desc: 'Mohs-9 hardness sapphire crystal lens engineered with 7-layer anti-reflective nanocoating. Floats above the high-contrast chronograph dial without glare.',
    position: 'left',
    normX: 0.420,
    normY: 0.430, // Points directly to curved sapphire glass
    specs: [
      { label: 'HARDNESS', val: 'Mohs 9' },
      { label: 'COATING', val: '7-Layer AR' },
    ],
    scrollTarget: 0.32,
  },
  {
    id: 2,
    tag: 'PART 03 // BIONIC CORE',
    title: 'Neural Engine & Biometrics',
    desc: 'Multi-layer high-density substrate housing the 4nm neural co-processor. Paired with an 8-channel optical array delivering 1,000Hz continuous cardiac sampling.',
    position: 'left',
    normX: 0.470,
    normY: 0.560, // Accurately points to 4nm Neural Engine co-processor
    specs: [
      { label: 'SAMPLING', val: '1,000Hz Bio' },
      { label: 'PROCESSOR', val: '4nm Neural' },
    ],
    scrollTarget: 0.55,
  },
  {
    id: 3,
    tag: 'PART 04 // POWER & SOUND',
    title: 'Solid Polymer Cell & Acoustics',
    desc: '580mAh solid-electrolyte cell engineered for 14 days of unbroken power. Flanked by an airtight acoustic chamber with laser-drilled resonance ports.',
    position: 'right',
    normX: 0.585,
    normY: 0.630, // Points to battery & acoustic cavity base
    specs: [
      { label: 'ENDURANCE', val: '336 Hours' },
      { label: 'CHARGE', val: '0-80% in 35m' },
    ],
    scrollTarget: 0.76,
  },
  {
    id: 4,
    tag: 'PART 05 // CONTROL & BRACELET',
    title: 'Tactile Crown & Link Clasp',
    desc: 'Micro-knurled digital crown with instantaneous haptic feedback. Integrated solid titanium link bracelet with dual deployment butterfly clasp.',
    position: 'right',
    normX: 0.615,
    normY: 0.440, // Points directly to digital crown knob
    specs: [
      { label: 'FEEDBACK', val: 'Linear Haptic' },
      { label: 'SEAL', val: '10 ATM (100M)' },
    ],
    scrollTarget: 0.94,
  },
];

export default function WatchScrollCanvas() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const activeStageRef = useRef(0);

  const [pinPos, setPinPos] = useState({ x: 0, y: 0, visible: false });
  const [cardAnchor, setCardAnchor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;

    // Cache frames permanently in memory - NO garbage collection on stage change
    const frameImages = new Array(TOTAL_FRAMES + 1);
    let targetFrame = 1;
    let currentFrame = 1;
    let lastDrawnFrame = -1;
    let animationId;

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      const idx = Math.round(currentFrame);
      drawFrame(idx);
      updatePinPosition();
    }

    function updatePinPosition() {
      const isMobile = window.innerWidth < 1024;
      // Full width and 100vh height (Cover scale matching canvas draw)
      const scale = Math.max(window.innerWidth / 1920, window.innerHeight / 1080);
      const drawW = 1920 * scale;
      const drawH = 1080 * scale;
      const drawX = (window.innerWidth - drawW) / 2;
      const drawY = (window.innerHeight - drawH) / 2;

      const current = PART_STAGES[activeStageRef.current];
      if (current) {
        const targetX = drawX + (current.normX * drawW);
        const targetY = drawY + (current.normY * drawH);
        setPinPos({ x: targetX, y: targetY, visible: !isMobile });

        // Connect cleanly to card border
        if (current.position === 'left' && leftCardRef.current) {
          const cardRect = leftCardRef.current.getBoundingClientRect();
          setCardAnchor({ x: cardRect.right, y: cardRect.top + cardRect.height / 2 });
        } else if (current.position === 'right' && rightCardRef.current) {
          const cardRect = rightCardRef.current.getBoundingClientRect();
          setCardAnchor({ x: cardRect.left, y: cardRect.top + cardRect.height / 2 });
        }
      }
    }

    function drawFrame(idx) {
      if (idx < 1 || idx > TOTAL_FRAMES) return;

      let img = frameImages[idx];
      if (!img || !img.complete || img.naturalWidth === 0) {
        // Fallback to closest loaded frame to avoid black flickers
        for (let offset = 1; offset < 35; offset++) {
          if (idx - offset >= 1 && frameImages[idx - offset] && frameImages[idx - offset].complete) {
            img = frameImages[idx - offset];
            break;
          }
          if (idx + offset <= TOTAL_FRAMES && frameImages[idx + offset] && frameImages[idx + offset].complete) {
            img = frameImages[idx + offset];
            break;
          }
        }
      }

      if (!img || !img.complete || img.naturalWidth === 0) return;

      const canvasW = canvas.width;
      const canvasH = canvas.height;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvasW, canvasH);

      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;

      const scaleW = canvasW / imgW;
      const scaleH = canvasH / imgH;

      // Full width (100vw) and full 100vh height (object-fit: cover)
      const scale = Math.max(scaleW, scaleH);

      const drawW = imgW * scale;
      const drawH = imgH * scale;
      const drawX = (canvasW - drawW) / 2;
      const drawY = (canvasH - drawH) / 2;

      ctx.drawImage(img, 0, 0, imgW, imgH, drawX, drawY, drawW, drawH);
      lastDrawnFrame = idx;
    }

    // Two-tier Preloading:
    // 1. Immediately fire requests for key anchor frames across the sequence in parallel
    const keyIndices = [];
    for (let i = 1; i <= TOTAL_FRAMES; i += 10) {
      keyIndices.push(i);
    }
    if (!keyIndices.includes(TOTAL_FRAMES)) keyIndices.push(TOTAL_FRAMES);

    let keyLoadedCount = 0;
    let totalLoaded = 0;

    keyIndices.forEach((idx) => {
      const img = new Image();
      img.src = getFramePath(idx);
      img.onload = () => {
        frameImages[idx] = img;
        keyLoadedCount++;
        totalLoaded++;
        setLoadedCount(totalLoaded);

        // Frame 1 draws immediately upon arrival - watch is visible right away!
        if (idx === 1) {
          drawFrame(1);
          updatePinPosition();
        }

        // Ready as soon as key milestone frames are loaded (<150ms)
        if (keyLoadedCount >= Math.min(8, keyIndices.length)) {
          setIsReady(true);
        }
      };
      img.onerror = () => {
        keyLoadedCount++;
        totalLoaded++;
        setLoadedCount(totalLoaded);
      };
    });

    // 2. Preload remaining frames smoothly in background
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
        setLoadedCount(totalLoaded);
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

      // Calculate target frame smoothly from scroll progress
      targetFrame = Math.round(progress * (TOTAL_FRAMES - 1)) + 1;

      // Determine active stage without jitter
      let nextStage = 0;
      if (progress < 0.20) {
        nextStage = 0;
      } else if (progress < 0.44) {
        nextStage = 1;
      } else if (progress < 0.65) {
        nextStage = 2;
      } else if (progress < 0.85) {
        nextStage = 3;
      } else {
        nextStage = 4;
      }

      if (nextStage !== activeStageRef.current) {
        setActiveStage(nextStage);
      }
    }

    function renderLoop() {
      // Cinematic continuous deceleration
      const diff = targetFrame - currentFrame;
      if (Math.abs(diff) > 0.05) {
        currentFrame += diff * 0.12;
      } else {
        currentFrame = targetFrame;
      }

      const idx = Math.round(currentFrame);
      if (idx !== lastDrawnFrame) {
        drawFrame(idx);
      }

      animationId = requestAnimationFrame(renderLoop);
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll, { passive: true });

    resizeCanvas();
    renderLoop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Re-sync pin position when activeStage changes
  useEffect(() => {
    activeStageRef.current = activeStage;
    const isMobile = window.innerWidth < 1024;
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080) * (isMobile ? 0.64 : 0.80);
    const drawW = 1920 * scale;
    const drawH = 1080 * scale;
    const drawX = (window.innerWidth - drawW) / 2;
    const drawY = (window.innerHeight - drawH) / 2 + (isMobile ? -window.innerHeight * 0.06 : 0);

    const current = PART_STAGES[activeStage];
    if (current) {
      const targetX = drawX + (current.normX * drawW);
      const targetY = drawY + (current.normY * drawH);
      setPinPos({ x: targetX, y: targetY, visible: !isMobile });

      if (current.position === 'left' && leftCardRef.current) {
        const cardRect = leftCardRef.current.getBoundingClientRect();
        setCardAnchor({ x: cardRect.right, y: cardRect.top + cardRect.height / 2 });
      } else if (current.position === 'right' && rightCardRef.current) {
        const cardRect = rightCardRef.current.getBoundingClientRect();
        setCardAnchor({ x: cardRect.left, y: cardRect.top + cardRect.height / 2 });
      }
    }
  }, [activeStage]);

  const progressPct = Math.round((loadedCount / TOTAL_FRAMES) * 100);
  const currentPart = PART_STAGES[activeStage];

  // SVG Leader Line Path: precise clean diagonal from card anchor to pinpoint on watch
  let linePath = '';
  if (pinPos.visible && cardAnchor.x > 0) {
    const isLeft = currentPart.position === 'left';
    const midX = isLeft
      ? cardAnchor.x + (pinPos.x - cardAnchor.x) * 0.50
      : cardAnchor.x + (pinPos.x - cardAnchor.x) * 0.50;
    linePath = `M ${cardAnchor.x} ${cardAnchor.y} L ${midX} ${cardAnchor.y} L ${pinPos.x} ${pinPos.y}`;
  }

  return (
    <section
      ref={containerRef}
      id="scrolly-section"
      className="relative w-full h-[450vh] bg-black select-none"
    >
      <div className="sticky top-0 left-0 w-full h-screen bg-black overflow-hidden flex items-center justify-center">

        {/* Ambient Top & Bottom Vignettes for Seamless Section Blending */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black via-black/60 to-transparent pointer-events-none z-15" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-15" />

        {/* Luxury Glass Preloader Pill (Theme-matched, non-blocking, NO full black screen) */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 pointer-events-none ${
            isReady ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          <div className="bg-neutral-950/85 backdrop-blur-xl border border-[#6D8F63]/30 px-5 py-3 rounded-full flex items-center gap-3 shadow-[0_0_30px_rgba(57,255,136,0.15)]">
            <div className="w-4 h-4 border-2 border-[#39FF88]/20 border-t-[#39FF88] rounded-full animate-spin flex-shrink-0" />
            <div className="font-mono text-[11px] text-slate-300 tracking-wider">
              INITIALIZING 3D ENGINE <span className="text-[#39FF88] font-bold">// {progressPct}%</span>
            </div>
          </div>
        </div>

        {/* Full Viewport Canvas (Transparent mix-blend-screen so glows & grid shine through!) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block z-10 pointer-events-none"
        />

        {/* Ultra-Delicate SVG Leader Line (1px hairline) */}
        <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible">
          <defs>
            <linearGradient id="mintLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#39FF88" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#6D8F63" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {linePath && (
            <>
              {/* Leader Line Path */}
              <path
                d={linePath}
                fill="none"
                stroke="url(#mintLineGrad)"
                strokeWidth="1.2"
                strokeDasharray="4 3"
                className="transition-all duration-300 ease-out"
              />
              {/* Card Anchor Node Dot */}
              <circle
                cx={cardAnchor.x}
                cy={cardAnchor.y}
                r="3"
                fill="#39FF88"
                className="transition-all duration-300"
              />
            </>
          )}
        </svg>

        {/* Ultra-Minimal Micro Pinpoint (Illuminated Laser Target Dot) */}
        {pinPos.visible && (
          <div
            className="absolute z-20 pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
            style={{ left: `${pinPos.x}px`, top: `${pinPos.y}px` }}
          >
            <div className="relative flex items-center justify-center w-6 h-6">
              {/* Pulsing Target Halo */}
              <span className="absolute w-5 h-5 rounded-full border border-[#39FF88]/60 animate-ping" />
              {/* Crisp Technical Ring */}
              <span className="absolute w-4 h-4 rounded-full border border-[#39FF88]/40 bg-[#39FF88]/10" />
              {/* Neon Mint Laser Target Center (3.5px) */}
              <span className="w-1.5 h-1.5 rounded-full bg-[#39FF88] shadow-[0_0_12px_#39FF88]" />
            </div>
          </div>
        )}

        {/* Top Floating Stage HUD */}
        <div className="absolute top-5 sm:top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 bg-neutral-950/85 border border-[#6D8F63]/30 rounded-full backdrop-blur-xl shadow-lg pointer-events-none max-w-[90vw]">
          <span className="w-2 h-2 rounded-full bg-[#39FF88] animate-pulse flex-shrink-0" />
          <span className="font-mono text-[10px] sm:text-[11px] text-[#39FF88] font-semibold tracking-widest uppercase truncate">
            3D EXPLODED INSPECTION
          </span>
          <span className="text-white/20 font-mono text-xs">|</span>
          <span className="font-mono text-[10px] sm:text-[11px] text-slate-300 tracking-wider truncate">
            {currentPart.title}
          </span>
        </div>

        {/* Part Details Cards - Intimate max-w-5xl Container for tight, balanced ~80-100px gap */}
        <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
          <div className="w-full max-w-5xl mx-auto px-6 flex items-center justify-between pointer-events-none">
            {/* Left Side Callout */}
            <div className="hidden lg:flex flex-col justify-center w-[310px] pointer-events-auto">
              {currentPart.position === 'left' && (
                <div
                  ref={leftCardRef}
                  key={currentPart.id}
                  className="bg-neutral-950/85 border border-[#6D8F63]/30 hover:border-[#39FF88]/50 rounded-2xl p-5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 animate-[fadeIn_0.3s_ease-out] group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#39FF88] shadow-[0_0_8px_#39FF88]" />
                      <span className="font-mono text-[10px] text-[#39FF88] tracking-[0.2em] font-semibold uppercase">
                        {currentPart.tag}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[#6D8F63] font-bold px-2 py-0.5 rounded bg-[#6D8F63]/10 border border-[#6D8F63]/25">
                      0{activeStage + 1}
                    </span>
                  </div>
                  <h3 className="font-heading font-extrabold text-xl text-white tracking-tight leading-snug mb-2">
                    {currentPart.title}
                  </h3>
                  <p className="text-slate-300 text-xs font-light leading-relaxed mb-4">
                    {currentPart.desc}
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10">
                    {currentPart.specs.map((sp, idx) => (
                      <div key={idx} className="bg-white/[0.03] rounded-lg px-2.5 py-1.5 border border-white/5">
                        <span className="block font-mono text-[9px] text-slate-400 uppercase tracking-wider mb-0.5">
                          {sp.label}
                        </span>
                        <span className="block font-mono text-[11px] font-bold text-[#39FF88] truncate">
                          {sp.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Side Callout */}
            <div className="hidden lg:flex flex-col justify-center w-[310px] pointer-events-auto ml-auto">
              {currentPart.position === 'right' && (
                <div
                  ref={rightCardRef}
                  key={currentPart.id}
                  className="bg-neutral-950/85 border border-[#6D8F63]/30 hover:border-[#39FF88]/50 rounded-2xl p-5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 animate-[fadeIn_0.3s_ease-out] group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#39FF88] shadow-[0_0_8px_#39FF88]" />
                      <span className="font-mono text-[10px] text-[#39FF88] tracking-[0.2em] font-semibold uppercase">
                        {currentPart.tag}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[#6D8F63] font-bold px-2 py-0.5 rounded bg-[#6D8F63]/10 border border-[#6D8F63]/25">
                      0{activeStage + 1}
                    </span>
                  </div>
                  <h3 className="font-heading font-extrabold text-xl text-white tracking-tight leading-snug mb-2">
                    {currentPart.title}
                  </h3>
                  <p className="text-slate-300 text-xs font-light leading-relaxed mb-4">
                    {currentPart.desc}
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10">
                    {currentPart.specs.map((sp, idx) => (
                      <div key={idx} className="bg-white/[0.03] rounded-lg px-2.5 py-1.5 border border-white/5">
                        <span className="block font-mono text-[9px] text-slate-400 uppercase tracking-wider mb-0.5">
                          {sp.label}
                        </span>
                        <span className="block font-mono text-[11px] font-bold text-[#39FF88] truncate">
                          {sp.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Callout Card - Responsive & Touch-Optimized */}
        <div className="lg:hidden absolute bottom-4 sm:bottom-6 inset-x-0 z-20 pointer-events-none px-4 sm:px-6 max-w-lg mx-auto">
          <div className="bg-neutral-950/90 border border-[#6D8F63]/30 rounded-2xl p-4 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#39FF88] shadow-[0_0_6px_#39FF88]" />
                <span className="font-mono text-[10px] text-[#39FF88] tracking-wider font-semibold uppercase">
                  {currentPart.tag}
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#6D8F63] font-bold px-2 py-0.5 rounded bg-[#6D8F63]/10 border border-[#6D8F63]/25">
                0{activeStage + 1} / 0{PART_STAGES.length}
              </span>
            </div>
            <h4 className="font-heading font-extrabold text-base text-white mb-1 tracking-tight">
              {currentPart.title}
            </h4>
            <p className="text-slate-300 text-xs font-light leading-relaxed mb-2 line-clamp-2">
              {currentPart.desc}
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
              {currentPart.specs.map((sp, idx) => (
                <div key={idx} className="flex-1 bg-white/[0.03] rounded-lg px-2 py-1 border border-white/5 text-center">
                  <span className="block font-mono text-[8px] text-slate-400 uppercase">
                    {sp.label}
                  </span>
                  <span className="block font-mono text-[10px] font-bold text-[#39FF88] truncate">
                    {sp.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
