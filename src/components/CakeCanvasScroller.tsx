"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { StoryOverlays } from "./StoryOverlays";
import {
  MOBILE_BREAKPOINT,
  MOBILE_FILL,
  DESKTOP_SCALE,
  mobileDrawRect,
} from "./frameLayout";

interface CakeCanvasScrollerProps {
  onOpenReserve?: () => void;
  onScrollToFlavours?: () => void;
}

const TOTAL_FRAMES = 300;

/**
 * Scroll distance per frame, in vh. Section height = TOTAL_FRAMES * VH_PER_FRAME.
 * 3.2 keeps the same feel as the old 120 frames / 380vh setup (≈ 960vh).
 * Lower = faster playback, higher = slower.
 */
const VH_PER_FRAME = 3.2;

/** How many frames to download at the same time after frame 1 */
const LOAD_BATCH_SIZE = 10;

const frameSrc = (index: number) =>
  `/sequence/frame-${String(index + 1).padStart(3, "0")}.jpg`;

/** Closest frame to `idx` that has finished loading (searches both directions) */
function findNearestLoaded(
  images: HTMLImageElement[],
  idx: number
): HTMLImageElement | null {
  for (let d = 0; d < TOTAL_FRAMES; d++) {
    for (const j of [idx - d, idx + d]) {
      const candidate = images[j];
      if (candidate && candidate.complete && candidate.naturalWidth > 0) {
        return candidate;
      }
    }
  }
  return null;
}

export const CakeCanvasScroller: React.FC<CakeCanvasScrollerProps> = ({
  onOpenReserve,
  onScrollToFlavours,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastDrawnFrameRef = useRef<number>(-1);
  const animFrameIdRef = useRef<number | null>(null);

  const [initialFrameLoaded, setInitialFrameLoaded] = useState(false);

  // Scroll Progress and Spring smoothing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 28,
    stiffness: 180,
    restDelta: 0.0005,
    mass: 0.2,
  });

  // Helper to draw an image onto the canvas with HiDPI support
  const drawImgToCanvas = useCallback(
    (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Exact matching studio background fill
      ctx.fillStyle = "#ECEDE7";
      ctx.fillRect(0, 0, displayWidth, displayHeight);

      const isMobile = displayWidth < MOBILE_BREAKPOINT;

      let drawW: number;
      let drawH: number;
      let drawX: number;
      let drawY: number;

      if (isMobile) {
        // MOBILE: size the frame by screen HEIGHT (not width) so the empty bands
        // at the top and bottom disappear. The sides get cropped, centred on the cake.
        // Tune with MOBILE_FILL in frameLayout.ts
        ({ drawW, drawH, drawX, drawY } = mobileDrawRect(displayWidth, displayHeight));
      } else {
        // DESKTOP: unchanged. Frame is contained with comfortable negative space.
        const imgWidth = img.naturalWidth || 1280;
        const imgHeight = img.naturalHeight || 720;
        const imgAspect = imgWidth / imgHeight;
        const canvasAspect = displayWidth / displayHeight;

        if (canvasAspect > imgAspect) {
          drawH = displayHeight * DESKTOP_SCALE;
          drawW = drawH * imgAspect;
        } else {
          drawW = displayWidth * DESKTOP_SCALE;
          drawH = drawW / imgAspect;
        }
        drawX = (displayWidth - drawW) / 2;
        drawY = (displayHeight - drawH) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.restore();
    },
    []
  );

  // Canvas drawing function
  const renderFrame = useCallback(
    (frameIdx: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = imagesRef.current[frameIdx];

      if (!img || !img.complete || img.naturalWidth === 0) {
        // Exact frame isn't loaded yet: show the nearest loaded one.
        // lastDrawnFrameRef is left unchanged, so the loop retries
        // until the real frame arrives.
        const fallbackImg = findNearestLoaded(imagesRef.current, frameIdx);
        if (fallbackImg) drawImgToCanvas(canvas, ctx, fallbackImg);
        return;
      }

      drawImgToCanvas(canvas, ctx, img);
      lastDrawnFrameRef.current = frameIdx;
    },
    [drawImgToCanvas]
  );

  // Progressive preload: frame 1 first, then the rest in small batches
  useEffect(() => {
    let isCancelled = false;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    imagesRef.current = images;

    const load = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (!isCancelled && i === 0) {
            setInitialFrameLoaded(true);
            renderFrame(0);
          }
          resolve();
        };
        img.onerror = () => resolve(); // a missing frame never blocks the queue
        img.src = frameSrc(i);
        images[i] = img;
      });

    (async () => {
      await load(0); // highest priority

      for (let i = 1; i < TOTAL_FRAMES && !isCancelled; i += LOAD_BATCH_SIZE) {
        const count = Math.min(LOAD_BATCH_SIZE, TOTAL_FRAMES - i);
        await Promise.all(Array.from({ length: count }, (_, k) => load(i + k)));
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [renderFrame]);

  // requestAnimationFrame render loop driven by smoothProgress
  useEffect(() => {
    const loop = () => {
      const p = smoothProgress.get();
      // Map 0.0 -> 1.0 to frame 0 -> TOTAL_FRAMES - 1
      const targetFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(p * (TOTAL_FRAMES - 1)))
      );

      if (targetFrame !== lastDrawnFrameRef.current) {
        renderFrame(targetFrame);
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [smoothProgress, renderFrame]);

  // Window resize handler to maintain sharp render
  useEffect(() => {
    const handleResize = () => {
      const frameToDraw = lastDrawnFrameRef.current >= 0 ? lastDrawnFrameRef.current : 0;
      renderFrame(frameToDraw);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderFrame]);

  return (
    <section
      id="overview"
      ref={containerRef}
      className="relative bg-studio-bg"
      style={{ height: `${TOTAL_FRAMES * VH_PER_FRAME}vh` }}
    >
      {/* ----------------- STICKY VIEWPORT CONTAINER ----------------- */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-studio-bg">
        {/* Subtle Ambient Blush Studio Glow */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div
            className="w-[85vw] max-w-[900px] h-[85vh] max-h-[900px] rounded-full blur-3xl opacity-70 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(246, 236, 234, 0.95) 0%, rgba(247, 247, 245, 0) 75%)",
            }}
          />
        </div>

        {/* Instant Hero Image Layer: Visible on 0ms initial load before first paint.
            On mobile it is sized by height too, so there is no jump when the canvas takes over. */}
        <div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
            initialFrameLoaded ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={frameSrc(0)}
            alt="JustMelts Signature Cake"
            className="w-full h-full object-contain max-w-[1280px] max-h-[720px] max-md:!h-[var(--mobile-fill)] max-md:!w-auto max-md:!max-w-none max-md:!max-h-none"
            style={
              { "--mobile-fill": `${MOBILE_FILL * 100}vh` } as React.CSSProperties
            }
            fetchPriority="high"
            decoding="async"
          />
        </div>

        {/* Full-bleed HTML5 Canvas for smooth 60fps image-sequence playback */}
        <canvas
          ref={canvasRef}
          className="relative z-10 w-full h-full object-contain pointer-events-none"
          style={{
            backgroundColor: "#ECEDE7",
          }}
        />

        {/* Hero Brand Overlays (fades away cleanly on scroll, NO cards or popups covering the cake) */}
        <StoryOverlays progress={smoothProgress} />

        {/* Thin champagne scroll progress bar. Driven by motion values, so no React re-renders per frame */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-charcoal/5 z-30 pointer-events-none">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-blush via-champagne to-blush-deep"
            style={{ scaleX: smoothProgress }}
          />
        </div>
      </div>
    </section>
  );
};