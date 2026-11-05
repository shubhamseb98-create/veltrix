'use client';

import { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 239;
const FRAME_EXT = '.webp?v=f1_v1';

function getFramePath(index) {
  const pad = String(index).padStart(4, '0');
  return `/frames/frame_${pad}${FRAME_EXT}`;
}

export default function WatchScrollCanvas() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;

    // Cache frames permanently in memory
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

      // Full width (100vw) and full 100vh height (cover scale)
      const scale = Math.max(scaleW, scaleH);

      const drawW = imgW * scale;
      const drawH = imgH * scale;
      const drawX = (canvasW - drawW) / 2;
      const drawY = (canvasH - drawH) / 2;

      ctx.drawImage(img, 0, 0, imgW, imgH, drawX, drawY, drawW, drawH);
      lastDrawnFrame = idx;
    }

    // Preload key frames first
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

        if (idx === 1) {
          drawFrame(1);
        }

        if (keyLoadedCount >= Math.min(keyIndices.length, 6)) {
          setIsReady(true);
        }
      };
      img.onerror = () => {
        keyLoadedCount++;
        totalLoaded++;
      };
    });

    // Load remaining frames
    const remainingIndices = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      if (!keyIndices.includes(i)) {
        remainingIndices.push(i);
      }
    }

    let batchIdx = 0;
    const BATCH_SIZE = 8;

    function loadNextBatch() {
      if (batchIdx >= remainingIndices.length) return;
      const currentBatch = remainingIndices.slice(batchIdx, batchIdx + BATCH_SIZE);
      batchIdx += BATCH_SIZE;

      let batchLoaded = 0;
      currentBatch.forEach((idx) => {
        const img = new Image();
        img.src = getFramePath(idx);
        img.onload = () => {
          frameImages[idx] = img;
          totalLoaded++;
          setLoadedCount(totalLoaded);
          batchLoaded++;
          if (batchLoaded >= currentBatch.length) {
            loadNextBatch();
          }
        };
        img.onerror = () => {
          totalLoaded++;
          batchLoaded++;
          if (batchLoaded >= currentBatch.length) {
            loadNextBatch();
          }
        };
      });
    }

    setTimeout(loadNextBatch, 50);

    function onScroll() {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const scrollDist = window.innerHeight * 3.5;
      const progress = Math.min(Math.max(-rect.top / scrollDist, 0), 1);

      targetFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(progress * (TOTAL_FRAMES - 1)) + 1));
    }

    function renderLoop() {
      const diff = targetFrame - currentFrame;
      if (Math.abs(diff) > 0.05) {
        currentFrame += diff * 0.28;
      } else {
        currentFrame = targetFrame;
      }

      const drawIdx = Math.round(currentFrame);
      if (drawIdx !== lastDrawnFrame) {
        drawFrame(drawIdx);
      }

      animationId = requestAnimationFrame(renderLoop);
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', onScroll, { passive: true });

    resizeCanvas();
    onScroll();
    animationId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const progressPct = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <section
      ref={containerRef}
      id="scrolly-section"
      className="relative w-full h-[450vh] bg-black select-none"
    >
      <div className="sticky top-0 left-0 w-full h-screen bg-black overflow-hidden flex items-center justify-center">

        {/* Luxury Glass Preloader Pill - Deep Royal Navy #001d3d */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 pointer-events-none ${
            isReady ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          <div className="bg-neutral-950/85 backdrop-blur-xl border border-[#001d3d]/50 px-5 py-3 rounded-full flex items-center gap-3 shadow-[0_0_30px_rgba(0,29,61,0.35)]">
            <div className="w-4 h-4 border-2 border-[#3a86ff]/20 border-t-[#3a86ff] rounded-full animate-spin flex-shrink-0" />
            <div className="font-mono text-[11px] text-slate-300 tracking-wider">
              INITIALIZING 3D ENGINE <span className="text-[#3a86ff] font-bold">// {progressPct}%</span>
            </div>
          </div>
        </div>

        {/* Full Viewport Canvas (100vw x 100vh full-bleed, original video background intact) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block z-10 pointer-events-none"
        />

        {/* Top Floating Stage HUD - Minimal & Sleek in Royal Blue #001d3d */}
        <div className="absolute top-5 sm:top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 bg-neutral-950/85 border border-[#001d3d]/40 rounded-full backdrop-blur-xl shadow-lg pointer-events-none max-w-[90vw]">
          <span className="w-2 h-2 rounded-full bg-[#3a86ff] animate-pulse flex-shrink-0" />
          <span className="font-mono text-[10px] sm:text-[11px] text-[#3a86ff] font-semibold tracking-widest uppercase truncate">
            VELTRIX // 3D APEX HOROLOGY
          </span>
          <span className="text-white/20 font-mono text-xs">|</span>
          <span className="font-mono text-[10px] sm:text-[11px] text-slate-300 tracking-wider truncate">
            SCROLL TO INSPECT
          </span>
        </div>

      </div>
    </section>
  );
}
