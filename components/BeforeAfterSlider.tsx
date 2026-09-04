"use client";

import { useCallback, useRef, useState } from "react";

interface BeforeAfterSliderProps {
  originalUrl: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  aspectRatio: number; // width / height
}

export default function BeforeAfterSlider({
  originalUrl,
  canvasRef,
  aspectRatio,
}: BeforeAfterSliderProps) {
  const [dividerPct, setDividerPct] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setDividerPct(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-full select-none overflow-hidden rounded-sm bg-surface"
      style={{ aspectRatio: `${aspectRatio}` }}
      onPointerDown={(e) => {
        draggingRef.current = true;
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (draggingRef.current) updateFromClientX(e.clientX);
      }}
      onPointerUp={() => (draggingRef.current = false)}
      onPointerLeave={() => (draggingRef.current = false)}
    >
      {/* Before: original image, full width */}
      <img
        src={originalUrl}
        alt="Original photo"
        className="absolute inset-0 h-full w-full object-contain"
        draggable={false}
      />

      {/* After: processed canvas, clipped to reveal only right of the divider */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 0 0 ${dividerPct}%)` }}
      >
        <canvas ref={canvasRef} className="h-full w-full object-contain" />
      </div>

      {/* Divider handle */}
      <div
        className="pointer-events-none absolute top-0 h-full w-px bg-paper/70"
        style={{ left: `${dividerPct}%` }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-paper/70 bg-base/80 backdrop-blur">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-paper">
            <path d="M8 5l-5 7 5 7M16 5l5 7-5 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <span className="absolute left-3 top-3 rounded-sm bg-base/70 px-2 py-1 text-[11px] tracking-wide text-muted">
        BEFORE
      </span>
      <span className="absolute right-3 top-3 rounded-sm bg-base/70 px-2 py-1 text-[11px] tracking-wide text-safelight">
        AFTER
      </span>
    </div>
  );
}
