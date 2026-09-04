"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_FILTERS, applyFilters } from "@/lib/filters";
import { PRESETS } from "@/lib/presets";
import { FilterState } from "@/types";
import FilterSidebar from "./FilterSidebar";
import BeforeAfterSlider from "./BeforeAfterSlider";
import PrivacyBadge from "./PrivacyBadge";

interface EditorProps {
  imageUrl: string;
  fileName: string;
  onReset: () => void;
}

const MAX_DIMENSION = 2200;

export default function Editor({ imageUrl, fileName, onReset }: EditorProps) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [imageReady, setImageReady] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(4 / 3);
  const [downloadFormat, setDownloadFormat] = useState<"png" | "jpg">("jpg");
  const [isDownloading, setIsDownloading] = useState(false);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  // Load the image element once, from the local data URL (never sent anywhere).
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setAspectRatio(img.naturalWidth / img.naturalHeight);
      setImageReady(true);
    };
    img.src = imageUrl;
    return () => {
      imgRef.current = null;
    };
  }, [imageUrl]);

  // Re-render the canvas whenever filters change, throttled to animation frames
  // so rapid slider dragging stays smooth.
  useEffect(() => {
    if (!imageReady || !imgRef.current || !canvasRef.current) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (imgRef.current && canvasRef.current) {
        applyFilters(canvasRef.current, imgRef.current, filters, MAX_DIMENSION);
      }
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [filters, imageReady]);

  const handleSelectPreset = useCallback((presetId: string) => {
    const preset = PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setFilters(preset.values);
    setActivePresetId(presetId);
  }, []);

  const handleChangeControl = useCallback((key: keyof FilterState, value: number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setActivePresetId(null);
  }, []);

  const handleResetControls = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setActivePresetId(null);
  }, []);

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsDownloading(true);

    const mime = downloadFormat === "png" ? "image/png" : "image/jpeg";
    const quality = downloadFormat === "jpg" ? 0.92 : undefined;

    canvas.toBlob(
      (blob) => {
        setIsDownloading(false);
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${fileName}-retrolab.${downloadFormat}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      },
      mime,
      quality
    );
  }, [downloadFormat, fileName]);

  return (
    <main className="flex min-h-screen flex-col bg-base">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-hairline px-6 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-sm text-muted hover:text-paper"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            New photo
          </button>
          <span className="h-4 w-px bg-hairline" />
          <span className="font-display text-lg italic text-safelight">RetroLab</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex overflow-hidden rounded-sm border border-hairline">
            {(["jpg", "png"] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setDownloadFormat(fmt)}
                className={`px-3 py-1.5 text-xs uppercase tracking-wide ${
                  downloadFormat === fmt ? "bg-surface2 text-paper" : "text-muted"
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
          <button
            onClick={handleDownload}
            disabled={!imageReady || isDownloading}
            className="rounded-sm bg-safelight px-4 py-1.5 text-sm font-medium text-base transition-colors hover:bg-safelight-dim disabled:opacity-50"
          >
            {isDownloading ? "Preparing…" : "Download"}
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Canvas area */}
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
          {imageReady ? (
            <BeforeAfterSlider originalUrl={imageUrl} canvasRef={canvasRef} aspectRatio={aspectRatio} />
          ) : (
            <p className="text-muted">Loading image…</p>
          )}
          <PrivacyBadge />
        </div>

        {/* Sidebar */}
        <aside className="w-full border-t border-hairline bg-surface md:w-80 md:border-l md:border-t-0">
          <FilterSidebar
            filters={filters}
            activePresetId={activePresetId}
            onSelectPreset={handleSelectPreset}
            onChangeControl={handleChangeControl}
            onResetControls={handleResetControls}
          />
        </aside>
      </div>
    </main>
  );
}
