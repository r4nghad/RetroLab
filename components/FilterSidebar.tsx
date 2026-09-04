"use client";

import { CONTROLS } from "@/lib/filters";
import { PRESETS } from "@/lib/presets";
import { FilterState } from "@/types";
import ControlSlider from "./ControlSlider";

interface FilterSidebarProps {
  filters: FilterState;
  activePresetId: string | null;
  onSelectPreset: (presetId: string) => void;
  onChangeControl: (key: keyof FilterState, value: number) => void;
  onResetControls: () => void;
}

export default function FilterSidebar({
  filters,
  activePresetId,
  onSelectPreset,
  onChangeControl,
  onResetControls,
}: FilterSidebarProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-hairline p-4">
        <h2 className="font-display text-lg text-paper">Presets</h2>
        <p className="mt-1 text-xs text-muted">Pick a starting look, then fine-tune below</p>
      </div>

      <div className="grid grid-cols-2 gap-2 border-b border-hairline p-4">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelectPreset(preset.id)}
            className={`rounded-sm border px-3 py-2.5 text-left transition-colors ${
              activePresetId === preset.id
                ? "border-safelight bg-surface2"
                : "border-hairline bg-surface hover:border-muted"
            }`}
          >
            <p className="text-sm font-medium text-paper">{preset.name}</p>
            <p className="mt-0.5 text-[11px] leading-snug text-muted">{preset.description}</p>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between p-4 pb-0">
        <h2 className="font-display text-lg text-paper">Manual controls</h2>
        <button
          onClick={onResetControls}
          className="text-xs text-muted underline decoration-hairline underline-offset-2 hover:text-phosphor"
        >
          Reset
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {CONTROLS.map((control) => (
          <ControlSlider
            key={control.key}
            config={control}
            value={filters[control.key]}
            onChange={(value) => onChangeControl(control.key, value)}
          />
        ))}
      </div>
    </div>
  );
}
