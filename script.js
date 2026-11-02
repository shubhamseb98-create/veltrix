/**
 * CHRONOS T-01 // Pure 3D Scroll Engine
 * 191 High-Definition Frames (w2.mp4 Green-screen keying perfected)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configuration
  const TOTAL_FRAMES = 191;
  const FRAME_PREFIX = 'frames/frame_';
  const FRAME_EXTENSION = '.webp';
  
  // DOM Elements
  const canvas = document.getElementById('sequence-canvas');
  const ctx = canvas.getContext('2d');
  const scrollyContainer = document.getElementById('scrolly-section');
  const loaderEl = document.getElementById('canvas-loader');
  const loaderText = document.getElementById('loader-progress-text');

  // State
  const frameImages = new Array(TOTAL_FRAMES + 1);
  let loadedCount = 0;
  let targetFrame = 1;
  let currentFrame = 1;
  let lastDrawnFrame = -1;
  let isLoaderDismissed = false;

  // Format index to 4 digits: 1 -> "0001"
  function getFramePath(index) {
    return `${FRAME_PREFIX}${String(index).padStart(4, '0')}${FRAME_EXTENSION}`;
  }

  // Set Canvas Dimensions for Retina / HiDPI Displays
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    
    // Immediate redraw if frame is available
    const frameIndex = Math.round(currentFrame);
    if (frameImages[frameIndex] && frameImages[frameIndex].complete) {
      drawFrame(frameIndex);
    }
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Draw Frame to Canvas with proper aspect ratio and centered breathing room
  function drawFrame(frameIndex) {
    const img = frameImages[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasW = canvas.width;
    const canvasH = canvas.height;

    // Fill pitch black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvasW, canvasH);

    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    const scaleW = canvasW / imgW;
    const scaleH = canvasH / imgH;

    // Scale calculation: give ample breathing room so watch is never cut off
    let scale;
    if (window.innerWidth < 768) {
      scale = Math.min(scaleW, scaleH) * 0.95;
    } else {
      scale = Math.min(scaleW, scaleH) * 0.88;
    }

    const drawW = imgW * scale;
    const drawH = imgH * scale;
    const drawX = (canvasW - drawW) / 2;
    const drawY = (canvasH - drawH) / 2;

    ctx.drawImage(img, 0, 0, imgW, imgH, drawX, drawY, drawW, drawH);
    lastDrawnFrame = frameIndex;
  }

  // Preloading
  function preloadImages() {
    // 1. Immediately load frame 1
    const firstImg = new Image();
    firstImg.src = getFramePath(1);
    firstImg.onload = () => {
      frameImages[1] = firstImg;
      loadedCount++;
      drawFrame(1);
      updateLoaderProgress();
      loadRemainingFrames();
    };
    firstImg.onerror = () => {
      loadRemainingFrames();
    };
  }

  function loadRemainingFrames() {
    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        frameImages[i] = img;
        loadedCount++;
        updateLoaderProgress();
      };
      img.onerror = () => {
        loadedCount++;
        updateLoaderProgress();
      };
    }
  }

  function updateLoaderProgress() {
    const pct = Math.floor((loadedCount / TOTAL_FRAMES) * 100);
    if (loaderText) loaderText.textContent = `LOADING 3D FRAMES // ${pct}%`;

    // Once at least 25 frames are loaded, reveal canvas seamlessly
    if (loadedCount >= 25 && !isLoaderDismissed) {
      isLoaderDismissed = true;
      if (loaderEl) loaderEl.classList.add('loaded');
    }
  }

  // Calculate Scroll Progress
  function updateScrollProgress() {
    const rect = scrollyContainer.getBoundingClientRect();
    const totalScrollable = scrollyContainer.offsetHeight - window.innerHeight;
    const currentScroll = -rect.top;

    let progress = currentScroll / totalScrollable;
    progress = Math.max(0, Math.min(1, progress));

    // Target frame (1 to TOTAL_FRAMES)
    targetFrame = Math.round(progress * (TOTAL_FRAMES - 1)) + 1;
  }

  // Render loop with physics Lerp (Apple-like smooth momentum)
  function renderLoop() {
    currentFrame += (targetFrame - currentFrame) * 0.16;

    const frameToDraw = Math.round(currentFrame);
    if (frameToDraw !== lastDrawnFrame && frameToDraw >= 1 && frameToDraw <= TOTAL_FRAMES) {
      drawFrame(frameToDraw);
    }

    requestAnimationFrame(renderLoop);
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // Thumbnail Switcher
  const purchasePreviewImg = document.getElementById('purchase-product-img');
  const thumbBtns = document.querySelectorAll('.thumb-btn');

  thumbBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      thumbBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const frameNum = parseInt(btn.getAttribute('data-frame'), 10);
      if (purchasePreviewImg) {
        purchasePreviewImg.src = getFramePath(frameNum);
      }
    });
  });

  // Order Now Modal
  const btnOrderNow = document.getElementById('btn-order-now');
  const orderModal = document.getElementById('order-modal');
  const modalClose = document.getElementById('modal-close');
  const modalConfirm = document.getElementById('modal-confirm');

  if (btnOrderNow && orderModal) {
    btnOrderNow.addEventListener('click', () => {
      orderModal.classList.add('open');
    });
  }

  if (modalClose && orderModal) {
    modalClose.addEventListener('click', () => {
      orderModal.classList.remove('open');
    });
  }

  if (modalConfirm && orderModal) {
    modalConfirm.addEventListener('click', () => {
      orderModal.classList.remove('open');
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === orderModal) {
      orderModal.classList.remove('open');
    }
  });

  // Initialize
  preloadImages();
  requestAnimationFrame(renderLoop);
  updateScrollProgress();
});
