/* =====================================================================
   Shared frame geometry. The canvas (CakeCanvasScroller) and the callout
   dots (StoryOverlays) both use this, so they always line up.
   ===================================================================== */

export const MOBILE_BREAKPOINT = 768;

/** Source frames are 1280x720 */
export const FRAME_ASPECT = 1280 / 720;

/** Desktop: image height as a fraction of the screen (the 0.92 you tuned the callouts on) */
export const DESKTOP_SCALE = 0.92;

/**
 * MOBILE: how much of the screen HEIGHT the frame fills (0 to 1).
 * The frame is wider than a phone, so the sides are cropped (centred on the cake).
 *   0.60 = balanced (default)
 *   0.80 = cake much bigger, a bit blurrier, less empty space
 *   1.00 = frame fills the whole screen height
 */
export const MOBILE_FILL = 0.6;

export type Rect = { drawW: number; drawH: number; drawX: number; drawY: number };

/** Where the frame is drawn on a mobile screen of W x H pixels. */
export function mobileDrawRect(W: number, H: number): Rect {
  const drawH = H * MOBILE_FILL;
  const drawW = drawH * FRAME_ASPECT;
  return { drawW, drawH, drawX: (W - drawW) / 2, drawY: (H - drawH) / 2 };
}

/**
 * Converts a callout target (screen %, tuned on desktop) into the matching
 * screen % on mobile, so the dot still lands on the same spot of the cake.
 * Assumes the targets were tuned on a roughly 16:9 desktop screen.
 */
export function mobileTargetPercent(
  t: { x: number; y: number },
  W: number,
  H: number
) {
  const { drawW, drawH } = mobileDrawRect(W, H);
  // position inside the image (0 to 1)
  const fx = 0.5 + (t.x - 50) / (DESKTOP_SCALE * 100);
  const fy = 0.5 + (t.y - 50) / (DESKTOP_SCALE * 100);
  return {
    x: 50 + (fx - 0.5) * (drawW / W) * 100,
    y: 50 + (fy - 0.5) * (drawH / H) * 100,
  };
}