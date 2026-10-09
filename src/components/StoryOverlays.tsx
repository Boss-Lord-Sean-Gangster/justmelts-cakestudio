"use client";

import React, { useEffect, useState } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { MOBILE_BREAKPOINT, mobileTargetPercent } from "./frameLayout";


interface StoryOverlaysProps {
  progress: MotionValue<number>;
  /** Must match TOTAL_FRAMES in CakeCanvasScroller */
  totalFrames?: number;
  onOpenReserve?: () => void;
  onScrollToFlavours?: () => void;
}

/* =====================================================================
   CONFIG: tune these to match your frames
   ===================================================================== */

/** Glass blur on first load. It fully clears by this scroll progress (0.03 ≈ the first 30vh of scrolling). */
const BLUR_CLEAR_AT = 0.03;
const BLUR_PX = 18;

/** Frame number (1 to totalFrames) after which all callouts fade out together. */
const EXPLODE_END_FRAME = 285;

/** Where the callout cards sit on small screens (card top-centre, in % of the screen). */
const MOBILE_CARD_TOP = 74;

type Point = { x: number; y: number };

interface Callout {
  title: string;
  text: string;
  /** Frame at which this callout starts to appear */
  frame: number;
  side: "left" | "right";
  /**
   * % of the screen. The line starts here, at the card's edge:
   * right-middle of the card for "left" callouts, left-middle for "right" callouts.
   */
  card: Point;
  /**
   * % of the screen (desktop). The dot lands here, on the cake. Scrub to the frame and adjust.
   * On mobile this is converted automatically, so you only tune it once, on desktop.
   */
  target: Point;
}

const CALLOUTS: Callout[] = [
  {
    title: "The Best Chocolate",
    text: "We use the best chocolate that melts in your mouth, not in your hands.",
    frame: 120,
    side: "left",
    card: { x: 27, y: 22 },
    target: { x: 44, y: 36 },
  },
  {
    title: "Eggless, by design",
    text: "Recipes built from scratch to be soft and rich without a single egg.",
    frame: 145,
    side: "right",
    card: { x: 73, y: 26 },
    target: { x: 57, y: 38 },
  },
  {
    title: "Seasonal fruit",
    text: "Real fruit and essences, no shortcuts.",
    frame: 170,
    side: "left",
    card: { x: 26, y: 50 },
    target: { x: 43, y: 50 },
  },
  {
    title: "Hand-layered sponge",
    text: "Baked to order and layered by hand so every slice is even.",
    frame: 195,
    side: "right",
    card: { x: 74, y: 52 },
    target: { x: 58, y: 52 },
  },
  {
    title: "Silky Cream",
    text: "Whipped light and not too sweet, so the flavours do the talking.",
    frame: 220,
    side: "left",
    card: { x: 27, y: 76 },
    target: { x: 45, y: 64 },
  },
  {
    title: "Baked this morning",
    text: "Made to order in our Noida kitchen and delivered the same day.",
    frame: 245,
    side: "right",
    card: { x: 73, y: 76 },
    target: { x: 56, y: 66 },
  },
];

/* =====================================================================
   Helpers
   ===================================================================== */

/** Keeps a list of progress values strictly increasing (framer-motion needs ascending ranges) */
const asc = (...values: number[]) =>
  values.reduce<number[]>(
    (acc, n) => [...acc, acc.length ? Math.max(n, acc[acc.length - 1] + 0.0005) : n],
    []
  );

function useIsMobile(breakpoint = MOBILE_BREAKPOINT) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

/** Current screen size, used to place the dots on mobile */
function useViewport() {
  const [size, setSize] = useState({ w: 390, h: 844 });

  useEffect(() => {
    const update = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}

/* =====================================================================
   One key-point callout: rectangular card + dot-ended leader line
   ===================================================================== */

interface CalloutItemProps {
  item: Callout;
  index: number;
  progress: MotionValue<number>;
  totalFrames: number;
  /** Frame at which this callout fades out */
  hideAtFrame: number;
  isMobile: boolean;
  viewport: { w: number; h: number };
}

const CalloutItem: React.FC<CalloutItemProps> = ({
  item,
  index,
  progress,
  totalFrames,
  hideAtFrame,
  isMobile,
  viewport,
}) => {
  const toProgress = (frame: number) => frame / (totalFrames - 1);

  const start = toProgress(item.frame);
  const [s, cardIn, hideStart, hideEnd] = asc(
    start,
    start + 0.03,
    toProgress(hideAtFrame),
    toProgress(hideAtFrame) + 0.03
  );
  const [lineStart, lineEnd] = asc(start + 0.01, start + 0.05);
  const [dotStart, dotEnd] = asc(lineEnd - 0.01, lineEnd + 0.01);

  // Card: fades, rises and scales in
  const cardOpacity = useTransform(progress, [s, cardIn, hideStart, hideEnd], [0, 1, 1, 0]);
  const cardY = useTransform(progress, [s, cardIn], [14, 0]);
  const cardScale = useTransform(progress, [s, cardIn], [0.95, 1]);

  // Line draws from the card to the cake, then the dot pops in
  const lineLength = useTransform(progress, [lineStart, lineEnd], [0, 1]);
  const lineOpacity = useTransform(progress, [lineStart, lineEnd, hideStart, hideEnd], [0, 1, 1, 0]);
  const dotOpacity = useTransform(progress, [dotStart, dotEnd, hideStart, hideEnd], [0, 1, 1, 0]);

  // Where the line starts: the card's edge (desktop) or the card's top-centre (mobile)
  const ax = isMobile ? 50 : item.card.x;
  const ay = isMobile ? MOBILE_CARD_TOP : item.card.y;

  // Where the dot lands: desktop target as-is, or converted to the mobile frame layout
  const target = isMobile
    ? mobileTargetPercent(item.target, viewport.w, viewport.h)
    : item.target;
  const tx = target.x;
  const ty = target.y;

  const positionClasses = isMobile
    ? "-translate-x-1/2 w-[min(86vw,340px)]"
    : `-translate-y-1/2 w-[clamp(170px,19vw,270px)] ${
        item.side === "left" ? "-translate-x-full" : ""
      }`;

  return (
    <>
      {/* Leader line with circular dots */}
      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <motion.line
          x1={`${ax}%`}
          y1={`${ay}%`}
          x2={`${tx}%`}
          y2={`${ty}%`}
          stroke="currentColor"
          strokeWidth={1.25}
          strokeLinecap="round"
          className="text-charcoal/55"
          style={{ pathLength: lineLength, opacity: lineOpacity }}
        />

        {/* small dot at the card end */}
        <motion.circle
          cx={`${ax}%`}
          cy={`${ay}%`}
          r={2.5}
          fill="currentColor"
          className="text-charcoal/60"
          style={{ opacity: lineOpacity }}
        />

        {/* dot on the cake, with a soft pulse */}
        <motion.g style={{ opacity: dotOpacity }}>
          <motion.circle
            cx={`${tx}%`}
            cy={`${ty}%`}
            r={5}
            fill="currentColor"
            className="text-blush-deep"
          />
          <motion.circle
            cx={`${tx}%`}
            cy={`${ty}%`}
            r={5}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.25}
            className="text-blush-deep"
            animate={{ scale: [1, 2.6], opacity: [0.7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        </motion.g>
      </svg>

      {/* Rectangular card (outer div positions it, inner motion div animates it) */}
      <div
        className={`absolute ${positionClasses}`}
        style={{ left: `${ax}%`, top: `${ay}%` }}
      >
        <motion.div
          style={{ opacity: cardOpacity, y: cardY, scale: cardScale }}
          className="rounded-md border border-champagne/45 bg-white/80 px-4 py-3.5 text-left shadow-[0_12px_32px_-12px_rgba(0,0,0,0.25)] backdrop-blur-md"
        >
          <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.24em] text-blush-deep">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-serif text-lg leading-tight text-charcoal lg:text-xl">
            {item.title}
          </h3>
          <p className="mt-1 text-xs font-light leading-relaxed text-charcoal-muted lg:text-[13px]">
            {item.text}
          </p>
        </motion.div>
      </div>
    </>
  );
};

/* =====================================================================
   Main overlay
   ===================================================================== */

export const StoryOverlays: React.FC<StoryOverlaysProps> = ({
  progress,
  totalFrames = 300,
}) => {
  const isMobile = useIsMobile();
  const viewport = useViewport();

  // Glass blur on top of the canvas: heavy at load, gone after the first scroll
  const glassBlur = useTransform(
    progress,
    [0, BLUR_CLEAR_AT],
    [`blur(${BLUR_PX}px)`, "blur(0px)"]
  );
  const glassTint = useTransform(
    progress,
    [0, BLUR_CLEAR_AT],
    ["rgba(255, 255, 255, 0.28)", "rgba(255, 255, 255, 0)"]
  );
  const glassOpacity = useTransform(progress, [0, BLUR_CLEAR_AT], [1, 0]);

  // Hero Brand Typography (0 - 18%): fades gently as user scrolls down
  const heroOpacity = useTransform(progress, [0, 0.12, 0.18], [1, 0.8, 0]);
  const heroY = useTransform(progress, [0, 0.15], [0, -35]);
  const heroScale = useTransform(progress, [0, 0.15], [1, 0.98]);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between">
      {/* ----------------- GLASS BLUR (clears on first scroll) ----------------- */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backdropFilter: glassBlur,
          WebkitBackdropFilter: glassBlur,
          backgroundColor: glassTint,
          opacity: glassOpacity,
        }}
      />

      {/* ----------------- HERO BRAND MESSAGING (0 - 18%) ----------------- */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
        className="absolute inset-x-0 top-0 pt-20 sm:pt-24 px-6 text-center flex flex-col items-center"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#FFFFFF]/80 border border-champagne/35 mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blush-deep animate-pulse" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-charcoal/80 font-medium">
              100% Eggless Bakery • Delhi NCR
            </span>
          </div>

          {/* Brand Headline */}
          {/* <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.98] mb-3 font-normal text-charcoal">
            JUSTMELTS
          </h1> */}

           <Image
                src={"/images/justmelts-logo-straight.png"}
                alt="JustMelts"
                width={550}
                height={117}
                // className={styles.logoImg}
              />
          

          {/* Brand Subheadline */}
          <p className="font-serif italic text-xl sm:text-3xl md:text-4xl text-charcoal/85 mb-4 font-light tracking-wide">
            Made for moments worth melting into.
          </p>

          {/* Supporting Copy */}
          <p className="text-sm sm:text-base md:text-lg text-charcoal-muted max-w-xl font-light leading-relaxed">
            Thoughtfully crafted cakes, desserts and celebrations — made fresh, made beautifully, made for you.
          </p>
        </div>
      </motion.div>

      {/* Scroll Cue at Bottom (fades out early) */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="absolute bottom-10 inset-x-0 flex flex-col items-center space-y-2 pointer-events-none text-center"
      >
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-charcoal/45 font-medium">
          Scroll to explore the craft
        </span>
        <div className="w-5 h-8 rounded-full border border-champagne/40 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1.5 rounded-full bg-blush-deep"
          />
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-champagne/70 animate-bounce" />
      </motion.div>

      {/* ----------------- KEY POINT CALLOUTS (during the explosion) ----------------- */}
      <div className="absolute inset-0">
        {CALLOUTS.map((item, i) => (
          <CalloutItem
            key={item.title}
            item={item}
            index={i}
            progress={progress}
            totalFrames={totalFrames}
            // Desktop: all callouts stay until the explosion ends.
            // Mobile: one at a time, so each leaves when the next one arrives.
            hideAtFrame={
              isMobile ? CALLOUTS[i + 1]?.frame ?? EXPLODE_END_FRAME : EXPLODE_END_FRAME
            }
            isMobile={isMobile}
            viewport={viewport}
          />
        ))}
      </div>
    </div>
  );
};