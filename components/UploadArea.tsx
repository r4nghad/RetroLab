"use client";

import { useCallback, useRef, useState } from "react";

interface UploadAreaProps {
  onImageSelected: (file: File) => void;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function UploadArea({ onImageSelected }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file) return;
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError("Please use a JPG, PNG, or WEBP image.");
        return;
      }
      setError(null);
      onImageSelected(file);
    },
    [onImageSelected]
  );

  return (
    <div className="w-full max-w-xl">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFile(e.dataTransfer.files[0]);
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        className={`relative cursor-pointer rounded-sm border transition-colors duration-200 ${
          isDragging
            ? "border-safelight bg-surface2"
            : "border-hairline bg-surface hover:border-muted"
        }`}
      >
        {/* Sprocket holes along the top edge — film strip motif */}
        <div className="flex justify-between px-4 pt-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="h-2 w-2 rounded-[1px] bg-hairline" />
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 px-8 py-14 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-hairline">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted">
              <path d="M12 16V4M12 4L7 9M12 4l5 5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-paper">Drop a photo here</p>
            <p className="mt-1 text-sm text-muted">or click to browse — JPG, PNG, WEBP</p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
            className="mt-2 rounded-sm bg-safelight px-6 py-2.5 text-sm font-medium text-base transition-colors hover:bg-safelight-dim"
          >
            Upload image
          </button>
        </div>

        {/* Sprocket holes along the bottom edge */}
        <div className="flex justify-between px-4 pb-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="h-2 w-2 rounded-[1px] bg-hairline" />
          ))}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>

      {error && <p className="mt-3 text-sm text-safelight">{error}</p>}
    </div>
  );
}
