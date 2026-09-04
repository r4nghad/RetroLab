"use client";

import { ControlConfig } from "@/types";

interface ControlSliderProps {
  config: ControlConfig;
  value: number;
  onChange: (value: number) => void;
}

export default function ControlSlider({ config, value, onChange }: ControlSliderProps) {
  const displayValue =
    config.key === "blur" ? value.toFixed(1) : Math.round(value).toString();

  return (
    <div className="py-2.5">
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm text-paper">{config.label}</label>
        <span className="rounded-sm bg-surface2 px-1.5 py-0.5 font-mono text-xs text-phosphor">
          {displayValue}
        </span>
      </div>
      <input
        type="range"
        min={config.min}
        max={config.max}
        step={config.step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        aria-label={config.label}
      />
    </div>
  );
}
