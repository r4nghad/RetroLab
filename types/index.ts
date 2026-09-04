export interface FilterState {
  brightness: number; // 50-150, 100 = neutral
  contrast: number; // 50-150, 100 = neutral
  saturation: number; // 0-200, 100 = neutral
  temperature: number; // -100 (cool) to 100 (warm), 0 = neutral
  grain: number; // 0-100
  fade: number; // 0-100
  vignette: number; // 0-100
  blur: number; // 0-5 (px)
  scanlines: number; // 0-100
}

export type ControlKey = keyof FilterState;

export interface ControlConfig {
  key: ControlKey;
  label: string;
  min: number;
  max: number;
  step: number;
  unit?: string;
}

export interface Preset {
  id: string;
  name: string;
  description: string;
  values: FilterState;
}
