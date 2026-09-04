import { Preset } from "@/types";
import { DEFAULT_FILTERS } from "./filters";

export const PRESETS: Preset[] = [
  {
    id: "70s-film",
    name: "70s Film",
    description: "Warm, sun-bleached, soft grain",
    values: { ...DEFAULT_FILTERS, brightness: 104, contrast: 104, saturation: 85, temperature: 32, fade: 28, grain: 18, vignette: 22, blur: 0, scanlines: 0 },
  },
  {
    id: "80s-vhs",
    name: "80s VHS",
    description: "Oversaturated tape colors, soft edges",
    values: { ...DEFAULT_FILTERS, brightness: 102, contrast: 112, saturation: 132, temperature: -8, fade: 6, grain: 8, vignette: 12, blur: 0.6, scanlines: 38 },
  },
  {
    id: "90s-camera",
    name: "90s Camera",
    description: "Point-and-shoot punch, slight warmth",
    values: { ...DEFAULT_FILTERS, brightness: 102, contrast: 107, saturation: 112, temperature: 8, fade: 4, grain: 12, vignette: 8, blur: 0, scanlines: 0 },
  },
  {
    id: "y2k-digital",
    name: "Y2K Digital",
    description: "Cool, crisp, early-digital sheen",
    values: { ...DEFAULT_FILTERS, brightness: 106, contrast: 120, saturation: 142, temperature: -18, fade: 0, grain: 4, vignette: 4, blur: 0, scanlines: 0 },
  },
  {
    id: "disposable-camera",
    name: "Disposable Camera",
    description: "Flash-lit, grainy, slightly overexposed",
    values: { ...DEFAULT_FILTERS, brightness: 112, contrast: 96, saturation: 106, temperature: 16, fade: 8, grain: 36, vignette: 32, blur: 0, scanlines: 0 },
  },
  {
    id: "polaroid",
    name: "Polaroid",
    description: "Milky whites, soft contrast, warm cast",
    values: { ...DEFAULT_FILTERS, brightness: 106, contrast: 88, saturation: 80, temperature: 22, fade: 26, grain: 10, vignette: 16, blur: 0.3, scanlines: 0 },
  },
  {
    id: "vintage-film",
    name: "Vintage Film",
    description: "Muted tones, heavy fade, dusty grain",
    values: { ...DEFAULT_FILTERS, brightness: 100, contrast: 94, saturation: 74, temperature: 16, fade: 38, grain: 26, vignette: 26, blur: 0, scanlines: 0 },
  },
  {
    id: "faded-photo",
    name: "Faded Photo",
    description: "Sun-damaged, low contrast, washed out",
    values: { ...DEFAULT_FILTERS, brightness: 107, contrast: 82, saturation: 58, temperature: 6, fade: 52, grain: 6, vignette: 10, blur: 0, scanlines: 0 },
  },
  {
    id: "crt-screen",
    name: "CRT Screen",
    description: "Phosphor glow with visible scanlines",
    values: { ...DEFAULT_FILTERS, brightness: 104, contrast: 116, saturation: 92, temperature: -6, fade: 0, grain: 4, vignette: 24, blur: 0.5, scanlines: 62 },
  },
  {
    id: "vhs-glitch",
    name: "VHS Glitch",
    description: "Degraded tape, cool cast, heavy lines",
    values: { ...DEFAULT_FILTERS, brightness: 100, contrast: 108, saturation: 124, temperature: -22, fade: 4, grain: 16, vignette: 14, blur: 0.4, scanlines: 52 },
  },
];
