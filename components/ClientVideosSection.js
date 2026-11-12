'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useAnimationFrame,
  useTransform,
  useReducedMotion,
  animate,
} from 'motion/react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowUpRight,
  Captions,
  Film,
  UserCheck,
} from 'lucide-react';

const LUXURY_EASE = [0.22, 1, 0.36, 1];

const CLIENT_STORIES = [
  {
    id: 'arjun-mehta',
    name: 'Arjun Mehta',
    role: 'Motorsport Telemetry Engineer',
    location: 'Bengaluru, IN',
    edition: 'Gunmetal Black 2.0',
    finishTag: 'DLC STEALTH OBSIDIAN',
    poster: '/clients/client-1.jpg',
    videoSrc: null,
    bRollVideo: '/videos/smartwatch-part-1.mp4',
    durationSec: 38,
    durationLabel: '0:38',
    rating: '5.0',
    headlineQuote: 'Built like pit-wall hardware, yet 64 grams light.',
    fullQuote:
      'In the garage and trackside, I wear carbon chronographs every day — yet nothing disappears on the wrist quite like the VELTRIX Gunmetal DLC chassis. Zero reflections under pit gantry rigs, and the dual-frequency GNSS trace stays dead-on through concrete chicanes.',
    metrics: [
      { label: 'CASE HARDNESS', val: '3,200 HV DLC' },
      { label: 'DAILY WEAR', val: '64g Carbon Matte' },
    ],
    cues: [
      {
        at: 0,
        text: 'Trackside lighting destroys glossy displays — VELTRIX stays crisp with zero glare.',
      },
      {
        at: 12,
        text: 'The DLC gunmetal coat took three months of wrench work without a single hairline mark.',
      },
      {
        at: 25,
        text: 'Sub-millisecond crown detents feel mechanical, almost like a Leica aperture dial.',
      },
    ],
  },
  {
    id: 'elena-vance',
    name: 'Elena Vance',
    role: 'Architectural Director',
    location: 'Zurich, CH',
    edition: 'Chrome Silver 2.0',
    finishTag: 'NATURAL TITANIUM SATIN',
    poster: '/clients/client-2.jpg',
    videoSrc: null,
    bRollVideo: '/videos/smartwatch-part-2.mp4',
    durationSec: 44,
    durationLabel: '0:44',
    rating: '5.0',
    headlineQuote: 'Architectural geometry you can read from a meter away.',
    fullQuote:
      'Most smartwatches look like toys on dark wool tailoring. The octagonal chamfered bezel and satin titanium multi-link bracelet on VELTRIX actually read like brutalist Swiss horology — calm, crisp, and effortless between studio reviews and evening dinners.',
    metrics: [
      { label: 'OPTICAL SHIELD', val: 'Mohs-9 Sapphire' },
      { label: 'ENDURANCE', val: '14-Day Power' },
    ],
    cues: [
      {
        at: 0,
        text: 'What caught my eye first was the octagon chamfer — pure industrial minimalism.',
      },
      {
        at: 14,
        text: 'The magnetic titanium links drape cleanly under tailored cuffs with zero pinch.',
      },
      {
        at: 29,
        text: 'Two weeks between magnetic charges means I never carry a watch puck to Milan.',
      },
    ],
  },
  {
    id: 'marcus-reed',
    name: 'Marcus Reed',
    role: 'Ultra-Trail & Alpine Athlete',
    location: 'Chamonix, FR',
    edition: 'Dark Green Edition',
    finishTag: 'FOREST FLUOROPOLYMER',
    poster: '/clients/client-3.jpg',
    videoSrc: null,
    bRollVideo: '/videos/smartwatch-part-1.mp4',
    durationSec: 52,
    durationLabel: '0:52',
    rating: '4.9',
    headlineQuote: 'Four-day ridge traverses with optical heart lock intact.',
    fullQuote:
      'Above 3,200 meters in freezing mist, gloved hands usually struggle with touch bezels. VELTRIX pairs a high-grip knurled crown with 1,000Hz cardiac sampling and barometric storm alerts that stayed calibrated across an entire 90km alpine loop.',
    metrics: [
      { label: 'CARDIAC LOCK', val: '1,000Hz 8-Channel' },
      { label: 'SUBMERSION', val: '10 ATM / 100M' },
    ],
    cues: [
      {
        at: 0,
        text: 'Up at Chamonix ridge before dawn — the 2,000-nit screen stays readable through fog.',
      },
      {
        at: 18,
        text: 'Gloved thumb turns on the digital crown beat swipe menus every single time.',
      },
      {
        at: 35,
        text: 'Laser-perforated forest band vents sweat instantly on 2,000m vertical climbs.',
      },
    ],
  },
  {
    id: 'sora-takahashi',
    name: 'Sora Takahashi',
    role: 'Sound Designer & Creative Lead',
    location: 'Tokyo, JP',
    edition: 'Apex Clay Titanium',
    finishTag: 'GRADE 5 TI + APEX CLAY',
    poster: '/clients/client-4.jpg',
    videoSrc: null,
    bRollVideo: '/videos/smartwatch-part-2.mp4',
    durationSec: 36,
    durationLabel: '0:36',
    rating: '5.0',
    headlineQuote: 'Quietly addictive haptic crown feedback in the studio.',
    fullQuote:
      'During twelve-hour mastering sessions I refuse anything that buzzes obnoxiously on my desk. VELTRIX delivers precision haptic micro-clicks when scrubbing timers, while the terracotta fluoroelastomer strap balances a brushed titanium silhouette.',
    metrics: [
      { label: 'HAPTIC ENGINE', val: 'Linear Z-Axis' },
      { label: 'RAPID CHARGE', val: '80% in 35 Min' },
    ],
    cues: [
      {
        at: 0,
        text: 'Long studio sessions demand hardware that stays silent unless you ask it for data.',
      },
      {
        at: 12,
        text: 'The linear haptic crown click feels subtle and grounded, never cheap or noisy.',
      },
      {
        at: 24,
        text: '35-minute fast charge while brewing pour-over coffee gets me through three straight days.',
      },
    ],
  },
  {
    id: 'clara-julian',
    name: 'Clara & Julian Rossi',
    role: 'Industrial Collectors',
    location: 'Milan, IT',
    edition: 'Duo Titanium Series',
    finishTag: 'BRUSHED TITANIUM PAIR',
    poster: '/bento/card6_couple_lifestyle.webp',
    videoSrc: null,
    bRollVideo: '/videos/smartwatch-part-1.mp4',
    durationSec: 41,
    durationLabel: '0:41',
    rating: '5.0',
    headlineQuote: 'Refined enough for Milanese evenings, rugged enough to travel.',
    fullQuote:
      'We wanted wearables that look intentional next to mechanical dress pieces. From lakeside mornings in Como to late studio dinners, the Grade 5 titanium finish patinates into life seamlessly without ever feeling like consumer plastic.',
    metrics: [
      { label: 'ALLOY SPEC', val: 'Ti-6Al-4V Grade 5' },
      { label: 'DUAL SYNC', val: '4nm Neural Core' },
    ],
    cues: [
      {
        at: 0,
        text: 'Most wearables clash with linen and tailoring — brushed titanium never does.',
      },
      {
        at: 14,
        text: 'Sapphire crystal shrugs off luggage gates and daily knocks without a scratch.',
      },
      {
        at: 28,
        text: 'Two weeks of travel autonomy means one charger stays home in the drawer.',
      },
    ],
  },
];

// Repeat 5 distinct stories 3x around a 15-slot full-width 3D cylinder (24deg apart)
// so no duplicate portrait ever appears beside itself on the visible front arc.
const SLOT_COUNT = 15;
const STEP_DEG = 360 / SLOT_COUNT;
const BARREL_SLOTS = Array.from({ length: SLOT_COUNT }, (_, slotIdx) => ({
  slotIdx,
  storyIndex: slotIdx % CLIENT_STORIES.length,
  baseAngle: slotIdx * STEP_DEG,
}));

const WAVEFORM_WEIGHTS = [
  0.38, 0.72, 0.54, 0.92, 0.65, 0.44, 0.85, 0.6,
  0.96, 0.5, 0.76, 0.42, 0.88, 0.62, 0.48, 0.7,
];

function formatTime(totalSeconds) {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function getActiveCueText(cues, currentSec) {
  if (!cues || !cues.length) return '';
  let chosen = cues[0].text;
  for (let i = 0; i < cues.length; i++) {
    if (currentSec >= cues[i].at) {
      chosen = cues[i].text;
    }
  }
  return chosen;
}

function normalizeRelativeAngle(angleDeg) {
  return (((angleDeg % 360) + 540) % 360) - 180;
}

function BarrelCard({
  slot,
  rotation,
  barrelRadius,
  cardWidth,
  cardHeight,
  onCardClick,
}) {
  const story = CLIENT_STORIES[slot.storyIndex];

  // Smooth depth falloff as cards turn away toward the cylinder edges
  const cardOpacity = useTransform(rotation, (rot) => {
    const absRel = Math.abs(normalizeRelativeAngle(slot.baseAngle + rot));
    if (absRel > 92) return 0;
    return Math.max(0.24, 1 - (absRel / 96) * 0.7);
  });

  const pointerEvents = useTransform(rotation, (rot) => {
    const absRel = Math.abs(normalizeRelativeAngle(slot.baseAngle + rot));
    return absRel > 86 ? 'none' : 'auto';
  });

  return (
    <motion.div
      style={{
        width: cardWidth,
        height: cardHeight,
        left: -cardWidth / 2,
        top: -cardHeight / 2,
        transform: `rotateY(${slot.baseAngle}deg) translateZ(${barrelRadius}px)`,
        backfaceVisibility: 'hidden',
        opacity: cardOpacity,
        pointerEvents,
      }}
      className="absolute"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => onCardClick(slot.storyIndex, slot.baseAngle)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onCardClick(slot.storyIndex, slot.baseAngle);
          }
        }}
        className="group relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#050814] border border-white/15 hover:border-[#3a86ff]/75 transition-colors duration-300 shadow-[0_24px_60px_rgba(0,0,0,0.85)] cursor-pointer select-none outline-none"
      >
        <img
          src={story.poster}
          alt={`${story.name} — ${story.edition}`}
          draggable={false}
          loading="eager"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
        />

        {/* Subtle Dark Bottom Scrim */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/95 via-black/55 to-transparent pointer-events-none" />

        {/* Duration Pill */}
        <div className="absolute top-3 right-3 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/55 backdrop-blur-md border border-white/15 font-mono text-[9px] tracking-wider text-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3a86ff] animate-pulse" />
            {story.durationLabel}
          </span>
        </div>

        {/* Clean Minimal Bottom Caption + Play Trigger */}
        <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 z-10 flex items-end justify-between gap-2.5 pointer-events-none">
          <div className="min-w-0">
            <div className="font-mono text-[9px] tracking-widest text-[#3a86ff] uppercase truncate">
              {story.edition}
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate mt-0.5">
              {story.name}
            </h3>
            <p className="text-[10px] sm:text-[11px] text-slate-300/80 truncate">
              {story.role}
            </p>
          </div>

          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/55 backdrop-blur-md border border-white/25 group-hover:border-[#3a86ff] group-hover:bg-[#173296] group-hover:scale-110 transition-all duration-300 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(37,99,235,0.35)]">
            <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ClientVideoModal({
  stories,
  activeIndex,
  onClose,
  onSelectIndex,
}) {
  const story = stories[activeIndex];
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showCaptions, setShowCaptions] = useState(true);
  const [viewMode, setViewMode] = useState('client');
  const [currentSec, setCurrentSec] = useState(0);

  const totalSec = story.durationSec;

  useEffect(() => {
    setCurrentSec(0);
    setIsPlaying(true);
    setViewMode('client');
  }, [activeIndex]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onSelectIndex((activeIndex + 1) % stories.length);
      } else if (e.key === 'ArrowLeft') {
        onSelectIndex((activeIndex - 1 + stories.length) % stories.length);
      } else if (e.key === ' ') {
        const tag = document.activeElement?.tagName;
        if (tag !== 'BUTTON' && tag !== 'A') {
          e.preventDefault();
          setIsPlaying((prev) => !prev);
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, stories.length, onClose, onSelectIndex]);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = isMuted;
    if (isPlaying) {
      const playPromise = vid.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    } else {
      vid.pause();
    }
  }, [isPlaying, isMuted, viewMode, activeIndex]);

  useEffect(() => {
    if (!isPlaying) return;
    let rafId = null;
    let lastTs = performance.now();

    function tick(now) {
      const dt = Math.min(0.1, (now - lastTs) / 1000);
      lastTs = now;
      setCurrentSec((prev) => {
        const next = prev + dt;
        if (next >= totalSec) {
          onSelectIndex((activeIndex + 1) % stories.length);
          return 0;
        }
        return next;
      });
      rafId = window.requestAnimationFrame(tick);
    }

    rafId = window.requestAnimationFrame(tick);
    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, [isPlaying, totalSec, activeIndex, stories.length, onSelectIndex]);

  const progressPct = Math.min(100, Math.max(0, (currentSec / totalSec) * 100));
  const activeCue = getActiveCueText(story.cues, currentSec);
  const hasRealClientVideo = Boolean(story.videoSrc);
  const showingVideoTag = viewMode === 'broll' || hasRealClientVideo;

  function handleScrubClick(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width) return;
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const targetSec = ratio * totalSec;
    setCurrentSec(targetSec);
    if (videoRef.current && hasRealClientVideo) {
      videoRef.current.currentTime = targetSec;
    }
  }

  function handleViewEdition() {
    onClose();
    const targetEl = document.getElementById('collection');
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <motion.div
      key="client-video-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/88 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      <motion.div
        key={story.id}
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.96 }}
        transition={{ duration: 0.35, ease: LUXURY_EASE }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#030714] border border-[#001d3d]/60 rounded-3xl overflow-hidden shadow-[0_25px_90px_rgba(31,52,145,0.45)] grid grid-cols-1 md:grid-cols-12 my-auto"
      >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          whileHover={{ rotate: 90, scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Close video story"
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/70 border border-white/15 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#3a86ff]/60 transition-colors"
        >
          <X className="w-4 h-4" />
        </motion.button>

        {/* Left Column: 9:14 Cinematic Video Reel Player */}
        <div className="md:col-span-6 relative h-[430px] sm:h-[500px] md:h-[560px] bg-black overflow-hidden">
          {/* Segmented Top Story Progress Bars */}
          <div className="absolute inset-x-4 top-4 z-20 flex items-center gap-1.5">
            {stories.map((item, idx) => {
              let fill = 0;
              if (idx < activeIndex) fill = 100;
              else if (idx === activeIndex) fill = progressPct;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectIndex(idx)}
                  aria-label={`Play ${item.name} video story`}
                  className="flex-1 h-1 rounded-full bg-white/20 overflow-hidden cursor-pointer hover:h-1.5 transition-all"
                >
                  <div
                    className="h-full bg-[#3a86ff] rounded-full"
                    style={{ width: `${fill}%` }}
                  />
                </button>
              );
            })}
          </div>

          {/* Mode Toggle Pill */}
          <div className="absolute left-4 top-8 z-20 flex items-center gap-1.5">
            <button
              onClick={() => setViewMode(viewMode === 'client' ? 'broll' : 'client')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 hover:border-[#3a86ff]/60 font-mono text-[10px] tracking-wider text-slate-200 transition-colors"
            >
              <Film className="w-3 h-3 text-[#3a86ff]" />
              <span>{viewMode === 'client' ? 'WATCH CUTAWAY' : 'BACK TO CLIENT'}</span>
            </button>
          </div>

          {/* Video / Cinematic Reel Viewport */}
          <div
            onClick={() => setIsPlaying((prev) => !prev)}
            className="relative w-full h-full cursor-pointer select-none"
          >
            {showingVideoTag ? (
              <video
                ref={videoRef}
                key={viewMode === 'broll' ? story.bRollVideo : story.videoSrc}
                src={viewMode === 'broll' ? story.bRollVideo : story.videoSrc}
                poster={story.poster}
                autoPlay
                loop={viewMode === 'broll'}
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <motion.img
                key={story.poster}
                src={story.poster}
                alt={`${story.name} dispatch`}
                initial={{ scale: 1.0 }}
                animate={
                  isPlaying
                    ? { scale: [1.0, 1.07, 1.02], x: [0, -6, 4], y: [0, -4, 2] }
                    : { scale: 1.03, x: 0, y: 0 }
                }
                transition={{
                  duration: 14,
                  repeat: isPlaying ? Infinity : 0,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                }}
                className="w-full h-full object-cover object-top"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/45 pointer-events-none" />

            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div className="w-16 h-16 rounded-full bg-black/65 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-2xl">
                    <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Synchronized Captions */}
          <AnimatePresence mode="wait">
            {showCaptions && activeCue && (
              <motion.div
                key={activeCue}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-x-4 bottom-20 z-20 pointer-events-none"
              >
                <div className="bg-black/75 backdrop-blur-md border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-[13px] text-white text-center leading-relaxed shadow-lg">
                  &ldquo;{activeCue}&rdquo;
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Player Controls & Audio Spectrum */}
          <div className="absolute inset-x-0 bottom-0 z-20 p-4 bg-gradient-to-t from-black via-black/90 to-transparent">
            <div
              onClick={handleScrubClick}
              role="slider"
              aria-label="Seek video timeline"
              aria-valuemin={0}
              aria-valuemax={totalSec}
              aria-valuenow={Math.round(currentSec)}
              tabIndex={0}
              className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer mb-3 group"
            >
              <div
                className="h-full bg-gradient-to-r from-[#173296] to-[#3a86ff] rounded-full"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying((prev) => !prev)}
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#3a86ff] text-white flex items-center justify-center transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5 ml-0.5" />
                  )}
                </button>
                <span className="font-mono text-[11px] text-slate-300 tabular-nums">
                  {formatTime(currentSec)} / {formatTime(totalSec)}
                </span>
              </div>

              <div className="hidden sm:flex items-end gap-[2.5px] h-5" aria-hidden="true">
                {WAVEFORM_WEIGHTS.map((weight, i) => (
                  <motion.span
                    key={i}
                    animate={
                      isPlaying && !isMuted
                        ? {
                            height: [
                              `${Math.max(20, weight * 40)}%`,
                              `${Math.max(30, weight * 100)}%`,
                              `${Math.max(20, weight * 50)}%`,
                            ],
                          }
                        : { height: `${Math.max(18, weight * 30)}%` }
                    }
                    transition={
                      isPlaying && !isMuted
                        ? {
                            duration: 0.45 + (i % 5) * 0.12,
                            repeat: Infinity,
                            repeatType: 'mirror',
                            ease: 'easeInOut',
                          }
                        : { duration: 0.25 }
                    }
                    className={`w-[2.5px] rounded-full ${
                      isMuted ? 'bg-slate-600' : 'bg-[#3a86ff]'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowCaptions((prev) => !prev)}
                  aria-label="Toggle subtitles"
                  className={`p-1.5 rounded-full border transition-colors ${
                    showCaptions
                      ? 'bg-[#3a86ff]/20 border-[#3a86ff]/50 text-[#7ab0ff]'
                      : 'bg-white/5 border-white/15 text-slate-400 hover:text-white'
                  }`}
                >
                  <Captions className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsMuted((prev) => !prev)}
                  aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                  className="p-1.5 rounded-full bg-white/10 border border-white/15 hover:border-[#3a86ff]/60 text-slate-200 hover:text-white transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-3.5 h-3.5" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-[#3a86ff]" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Client Profile, Transcript & Watch CTA */}
        <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 pr-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#001d3d]/40 border border-[#3a86ff]/35 font-mono text-[10px] tracking-wider text-[#3a86ff] uppercase">
                <UserCheck className="w-3 h-3" />
                VERIFIED CLIENT STORY
              </span>
              <span className="inline-flex items-center gap-0.5 text-[#3a86ff]">
                {Array.from({ length: 5 }).map((_, starIdx) => (
                  <Star key={starIdx} className="w-3 h-3 fill-[#3a86ff]" />
                ))}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-4">
              {story.name}
            </h3>
            <p className="font-mono text-xs text-slate-400 tracking-wide mt-1">
              {story.role} • {story.location}
            </p>

            <blockquote className="mt-5 text-sm sm:text-base text-slate-300 leading-relaxed border-l-2 border-[#3a86ff] pl-4">
              &ldquo;{story.fullQuote}&rdquo;
            </blockquote>

            <div className="grid grid-cols-2 gap-3 mt-6">
              {story.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="p-3.5 rounded-xl bg-black/50 border border-[#001d3d]/40"
                >
                  <div className="font-mono text-[9px] text-slate-400 tracking-widest uppercase">
                    {metric.label}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white mt-1">
                    {metric.val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-5 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-mono text-[9px] text-slate-400 tracking-wider uppercase">
                  WORN TIMEPIECE
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white">
                  {story.edition}{' '}
                  <span className="text-[#3a86ff] font-mono text-[10px]">
                    ({story.finishTag})
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() =>
                    onSelectIndex((activeIndex - 1 + stories.length) % stories.length)
                  }
                  aria-label="Previous client story"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/15 hover:border-[#3a86ff]/60 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onSelectIndex((activeIndex + 1) % stories.length)}
                  aria-label="Next client story"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/15 hover:border-[#3a86ff]/60 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <motion.button
              onClick={handleViewEdition}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#173296] to-[#2563EB] hover:from-[#1e3eb8] hover:to-[#3b82f6] text-white font-mono font-bold text-xs tracking-wider shadow-[0_0_24px_rgba(37,99,235,0.45)] border border-[#3b82f6]/40 flex items-center justify-center gap-2 transition-colors"
            >
              <span>EXPLORE WATCH LINEUP</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ClientVideosSection() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const rotation = useMotionValue(0);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStateRef = useRef({
    startX: 0,
    prevX: 0,
    startRot: 0,
    velocity: 0,
    maxMove: 0,
  });
  const activeAnimRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(null);
  const [stageDims, setStageDims] = useState({
    cardWidth: 270,
    cardHeight: 360,
    radius: 740,
    perspective: 1810,
  });

  const shouldReduceMotion = useReducedMotion();

  // Compute full-width responsive 3D barrel cylinder dimensions
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    function updateDims() {
      const w = el.clientWidth || window.innerWidth;
      const radius = Math.round(Math.max(480, Math.min(w * 0.54, 920)));
      const arc = (2 * Math.PI * radius) / SLOT_COUNT;
      const cardWidth = Math.round(Math.max(176, Math.min(arc * 0.88, 296)));
      const cardHeight = Math.round((cardWidth * 4) / 3);
      const perspective = Math.round(radius * 2.45);
      setStageDims({ cardWidth, cardHeight, radius, perspective });
    }

    updateDims();
    const ro = new ResizeObserver(updateDims);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Continuous gentle barrel rotation matching Motion's Gallery Barrel feel
  useAnimationFrame((_, delta) => {
    if (
      shouldReduceMotion ||
      isHoveredRef.current ||
      isDraggingRef.current ||
      activeIndex !== null ||
      activeAnimRef.current
    ) {
      return;
    }
    const dtSec = Math.min(0.05, delta / 1000);
    rotation.set(rotation.get() - 8 * dtSec);
  });

  function stepBarrel(direction) {
    if (activeAnimRef.current) {
      activeAnimRef.current.stop();
    }
    const current = rotation.get();
    const snappedTarget = Math.round(current / STEP_DEG) * STEP_DEG + direction * STEP_DEG;
    activeAnimRef.current = animate(rotation, snappedTarget, {
      type: 'spring',
      stiffness: 170,
      damping: 26,
      onComplete: () => {
        activeAnimRef.current = null;
      },
    });
  }

  function handlePointerDown(e) {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    if (activeAnimRef.current) {
      activeAnimRef.current.stop();
      activeAnimRef.current = null;
    }
    isDraggingRef.current = true;
    dragStateRef.current = {
      startX: e.clientX,
      prevX: e.clientX,
      startRot: rotation.get(),
      velocity: 0,
      maxMove: 0,
    };

    const handleMove = (ev) => {
      if (!isDraggingRef.current) return;
      const dx = ev.clientX - dragStateRef.current.startX;
      const stepDelta = (ev.clientX - dragStateRef.current.prevX) * 0.24;
      dragStateRef.current.prevX = ev.clientX;
      dragStateRef.current.velocity = stepDelta;
      dragStateRef.current.maxMove = Math.max(dragStateRef.current.maxMove, Math.abs(dx));
      rotation.set(dragStateRef.current.startRot + dx * 0.24);
    };

    const handleUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
      window.removeEventListener('pointercancel', handleUp);

      const vel = dragStateRef.current.velocity;
      if (Math.abs(vel) > 0.35) {
        const projected = rotation.get() + vel * 12;
        activeAnimRef.current = animate(rotation, projected, {
          type: 'spring',
          stiffness: 120,
          damping: 24,
          mass: 0.9,
          onComplete: () => {
            activeAnimRef.current = null;
          },
        });
      }
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    window.addEventListener('pointercancel', handleUp);
  }

  function handleCardClick(storyIndex) {
    // Ignore accidental click right at the end of a horizontal drag gesture
    if (dragStateRef.current.maxMove > 8) return;
    setActiveIndex(storyIndex);
  }

  return (
    <section
      ref={sectionRef}
      id="client-videos"
      className="relative w-full pt-[60px] pb-[60px] bg-black border-t border-[#001d3d]/20 select-none overflow-hidden font-sans flex flex-col justify-center"
    >
      {/* Subtle Royal Blue Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[520px] pointer-events-none">
        <motion.div
          animate={{ opacity: [0.55, 0.85, 0.55], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full rounded-full"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(31, 52, 145, 0.28) 0%, rgba(0, 29, 61, 0.14) 48%, transparent 72%)',
            filter: 'blur(90px)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10 flex flex-col justify-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: LUXURY_EASE }}
          className="text-center max-w-3xl mx-auto mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-2.5">
            <span className="w-4 sm:w-5 h-[1.5px] bg-[#3a86ff] rounded-full" />
            <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-[#3a86ff] uppercase">
              VELTRIX OWNER STORIES
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Worn by Precision Purists.
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base font-normal leading-relaxed max-w-2xl mx-auto mt-2.5 sm:mt-3">
            Drag to rotate or select any client story to watch their verified field dispatch.
          </p>
        </motion.div>
      </div>

      {/* Full-Width 3D Cylindrical Barrel Slider Stage */}
      <motion.div
        ref={stageRef}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.75, ease: LUXURY_EASE }}
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
        onPointerDown={handlePointerDown}
        style={{ height: `${stageDims.cardHeight + 36}px` }}
        className="relative z-10 w-full overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
      >
        {/* Subtle Edge Vignette Fades for Seamless Horizon */}
        <div className="absolute inset-y-0 left-0 w-8 sm:w-14 bg-gradient-to-r from-black via-black/60 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 sm:w-14 bg-gradient-to-l from-black via-black/60 to-transparent z-20 pointer-events-none" />

        {/* Unclipped Perspective Viewport */}
        <div
          style={{ perspective: `${stageDims.perspective}px` }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Barrel Drum Shifted Back by Radius so Front Slot Sits Crisp 1:1 */}
          <div
            style={{
              transform: `translateZ(-${stageDims.radius}px)`,
              transformStyle: 'preserve-3d',
            }}
            className="relative w-0 h-0 flex items-center justify-center"
          >
            <motion.div
              style={{
                rotateY: rotation,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-0 h-0"
            >
              {BARREL_SLOTS.map((slot) => (
                <BarrelCard
                  key={slot.slotIdx}
                  slot={slot}
                  rotation={rotation}
                  barrelRadius={stageDims.radius}
                  cardWidth={stageDims.cardWidth}
                  cardHeight={stageDims.cardHeight}
                  onCardClick={handleCardClick}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Minimal Navigation Arrows & Hint */}
      <div className="relative z-10 mt-5 flex items-center justify-center gap-4 px-4">
        <motion.button
          onClick={() => stepBarrel(1)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Rotate gallery left"
          className="w-9 h-9 rounded-full bg-white/5 border border-white/15 hover:border-[#3a86ff]/60 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.button>

        <span className="font-mono text-[10px] tracking-[0.2em] text-slate-400 uppercase">
          DRAG OR SELECT STORY
        </span>

        <motion.button
          onClick={() => stepBarrel(-1)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Rotate gallery right"
          className="w-9 h-9 rounded-full bg-white/5 border border-white/15 hover:border-[#3a86ff]/60 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Interactive Story Video Reel Modal */}
      <AnimatePresence>
        {activeIndex !== null && (
          <ClientVideoModal
            stories={CLIENT_STORIES}
            activeIndex={activeIndex}
            onClose={() => setActiveIndex(null)}
            onSelectIndex={setActiveIndex}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
