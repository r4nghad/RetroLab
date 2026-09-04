import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0E0C0A",
        surface: "#1A1611",
        surface2: "#221D16",
        hairline: "#332C22",
        paper: "#F5EFE3",
        muted: "#B8AE9C",
        safelight: {
          DEFAULT: "#F2622E",
          dim: "#C4501F",
        },
        phosphor: {
          DEFAULT: "#8FBFAA",
          dim: "#5E8974",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-plex-sans)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      backgroundImage: {
        grain: "url('/grain.png')",
      },
    },
  },
  plugins: [],
};

export default config;
