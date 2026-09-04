# RetroLab

Apply retro and vintage film filters to your photos — entirely in your browser.

## Privacy / architecture

**No image ever leaves the browser.** There is no upload endpoint, no backend,
and no database:

- Uploaded files are read with `FileReader` into a local data URL (`app/page.tsx`).
- All filtering happens on an HTML `<canvas>` using the Canvas 2D API
  (`lib/filters.ts`) — native CSS-style filters for brightness/contrast/
  saturation/blur, then a per-pixel pass for temperature/fade/grain, then
  overlay draws for vignette/scanlines.
- Downloading calls `canvas.toBlob()` and triggers a local file save — the
  pixels never touch a server.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project structure

```
app/
  layout.tsx        Fonts + global HTML shell
  page.tsx           Landing page + upload, hands off to Editor
  globals.css        Tailwind + custom slider styling
components/
  UploadArea.tsx      Drag-and-drop / click-to-browse upload
  Editor.tsx          Orchestrates image load, live re-render, download
  BeforeAfterSlider.tsx  Draggable before/after comparison
  FilterSidebar.tsx   Preset grid + manual control list
  ControlSlider.tsx   Single labeled slider with numeric readout
  PrivacyBadge.tsx    The "processed locally" notice
lib/
  filters.ts          Canvas-based filter engine (the core logic)
  presets.ts           The 10 retro/vintage presets
types/
  index.ts             Shared FilterState / Preset types
```

## Adding a new preset

Add an entry to `lib/presets.ts` — each preset is just a set of `FilterState`
values (brightness, contrast, saturation, temperature, grain, fade, vignette,
blur, scanlines). No changes to the rendering code are needed.

## Adding a new manual control

1. Add the field to `FilterState` in `types/index.ts`.
2. Add its slider config to `CONTROLS` in `lib/filters.ts`.
3. Handle it inside `applyFilters()` in `lib/filters.ts`.
