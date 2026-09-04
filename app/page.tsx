"use client";

import { useCallback, useState } from "react";
import UploadArea from "@/components/UploadArea";
import PrivacyBadge from "@/components/PrivacyBadge";
import Editor from "@/components/Editor";

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("photo");

  const handleImageSelected = useCallback((file: File) => {
    // FileReader keeps this entirely client-side — no upload, no network call.
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImageUrl(reader.result);
        setFileName(file.name.replace(/\.[^/.]+$/, "") || "photo");
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const handleReset = useCallback(() => {
    setImageUrl(null);
  }, []);

  if (imageUrl) {
    return <Editor imageUrl={imageUrl} fileName={fileName} onReset={handleReset} />;
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Ambient background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #F2622E 0%, transparent 40%), radial-gradient(circle at 80% 70%, #8FBFAA 0%, transparent 45%)",
        }}
      />

      {/* Sprocket-hole rail down the left edge — film strip motif */}
      <div className="pointer-events-none absolute left-6 top-0 hidden h-full flex-col justify-evenly py-10 md:flex">
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} className="h-3 w-3 rounded-[2px] border border-hairline" />
        ))}
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-20 md:pl-24">
        <div className="animate-fade-up flex flex-col items-center text-center">
          <span className="mb-6 rounded-full border border-hairline px-3 py-1 text-xs tracking-wide text-phosphor">
            No uploads. No servers. Just your browser.
          </span>

          <h1 className="font-display text-5xl leading-[1.05] text-paper sm:text-6xl md:text-7xl">
            Make Your Photos
            <br />
            <span className="italic text-safelight">Timeless</span>
          </h1>

          <p className="mt-6 max-w-md text-balance text-base text-muted sm:text-lg">
            Ten film-inspired presets and full manual control — grain, fade, vignette,
            scanlines — rendered live in your browser.
          </p>

          <div className="mt-10">
            <UploadArea onImageSelected={handleImageSelected} />
          </div>

          <PrivacyBadge className="mt-8" />
        </div>
      </div>
    </main>
  );
}
