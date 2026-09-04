import { ControlConfig, FilterState } from "@/types";

export const DEFAULT_FILTERS: FilterState = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  temperature: 0,
  grain: 0,
  fade: 0,
  vignette: 0,
  blur: 0,
  scanlines: 0,
};

export const CONTROLS: ControlConfig[] = [
  { key: "brightness", label: "Brightness", min: 50, max: 150, step: 1 },
  { key: "contrast", label: "Contrast", min: 50, max: 150, step: 1 },
  { key: "saturation", label: "Saturation", min: 0, max: 200, step: 1 },
  { key: "temperature", label: "Temperature", min: -100, max: 100, step: 1 },
  { key: "grain", label: "Grain", min: 0, max: 100, step: 1 },
  { key: "fade", label: "Fade", min: 0, max: 100, step: 1 },
  { key: "vignette", label: "Vignette", min: 0, max: 100, step: 1 },
  { key: "blur", label: "Blur", min: 0, max: 5, step: 0.1 },
  { key: "scanlines", label: "Scanlines", min: 0, max: 100, step: 1 },
];

function clamp(v: number): number {
  return v < 0 ? 0 : v > 255 ? 255 : v;
}

/**
 * Renders `source` onto `canvas` with the given filters applied.
 * Runs entirely in the browser using the Canvas 2D API — no network
 * requests, no image data ever leaves the client.
 *
 * Pipeline:
 *  1. Native CSS-style filters (brightness/contrast/saturation/blur) applied
 *     during drawImage — fast, GPU-accelerated by the browser.
 *  2. Per-pixel adjustments (temperature, fade, grain) via getImageData.
 *  3. Overlay effects (vignette, scanlines) drawn on top.
 */
export function applyFilters(
  canvas: HTMLCanvasElement,
  source: HTMLImageElement,
  filters: FilterState,
  maxDimension?: number
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let w = source.naturalWidth;
  let h = source.naturalHeight;

  if (maxDimension && Math.max(w, h) > maxDimension) {
    const scale = maxDimension / Math.max(w, h);
    w = Math.round(w * scale);
    h = Math.round(h * scale);
  }

  canvas.width = w;
  canvas.height = h;

  // 1. Native filters
  const cssFilterParts = [
    `brightness(${filters.brightness}%)`,
    `contrast(${filters.contrast}%)`,
    `saturate(${filters.saturation}%)`,
  ];
  if (filters.blur > 0) cssFilterParts.push(`blur(${filters.blur}px)`);

  ctx.filter = cssFilterParts.join(" ");
  ctx.drawImage(source, 0, 0, w, h);
  ctx.filter = "none";

  // 2. Per-pixel adjustments
  const needsPixelPass = filters.temperature !== 0 || filters.fade > 0 || filters.grain > 0;
  if (needsPixelPass) {
    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;
    const temp = filters.temperature * 0.6;
    const fadeAmt = filters.fade / 100;
    const grainAmt = filters.grain;

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];

      if (temp !== 0) {
        r += temp;
        b -= temp;
      }

      if (fadeAmt > 0) {
        r += (205 - r) * fadeAmt * 0.4;
        g += (198 - g) * fadeAmt * 0.4;
        b += (188 - b) * fadeAmt * 0.4;
      }

      if (grainAmt > 0) {
        const noise = (Math.random() - 0.5) * grainAmt * 2.2;
        r += noise;
        g += noise;
        b += noise;
      }

      data[i] = clamp(r);
      data[i + 1] = clamp(g);
      data[i + 2] = clamp(b);
    }

    ctx.putImageData(imageData, 0, 0);
  }

  // 3. Vignette overlay
  if (filters.vignette > 0) {
    const grad = ctx.createRadialGradient(
      w / 2,
      h / 2,
      Math.min(w, h) * 0.2,
      w / 2,
      h / 2,
      Math.max(w, h) * 0.75
    );
    grad.addColorStop(0, "rgba(0,0,0,0)");
    grad.addColorStop(1, `rgba(0,0,0,${(filters.vignette / 100) * 0.85})`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }

  // 4. Scanlines overlay
  if (filters.scanlines > 0) {
    ctx.fillStyle = `rgba(0,0,0,${filters.scanlines / 180})`;
    const step = 3;
    for (let y = 0; y < h; y += step) {
      ctx.fillRect(0, y, w, 1);
    }
  }
}
