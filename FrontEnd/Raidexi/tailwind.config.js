/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./Raidexi/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
    "./Shared/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Brand Gold ────────────────── */
        primary: "#f2a60d",
        "primary-dark": "#d4a00f",

        /* ── Surfaces ──────────────────── */
        "background-dark": "#1a1510",
        "background-light": "#f8f7f5",
        "surface-dark": "#221c15",
        "surface-hover": "#2a241d",
        "surface-card": "#1e1914",
        "panel-bg": "#221c15",
        "panel-header": "#262018",
        "input-bg": "#1a1612",
        "terminal-black": "#13100c",
        "background-card": "#1e1914",

        /* ── Text ──────────────────────── */
        "text-main": "#f2f0ed",
        "text-secondary": "#e0dcd5",
        "text-muted": "#b8b19d",
        "text-dim": "#9c9486",
        "text-dark": "#181611",
        "text-aged": "#e6e1d3",
        "paper-white": "#e6e1d6",

        /* ── Borders ───────────────────── */
        "border-subtle": "#383429",
        "border-color": "#44402f",
        "border-brass": "#544c3b",
        "border-dark": "#544d3b",
        "border-highlight": "#544b3b",
        "border-retro": "#44402f",
        "decor-dark": "#3a3429",

        /* ── Accent ────────────────────── */
        "accent-brass": "#f2a60d",

        /* ── Gold Palette ──────────────── */
        gold: {
          400: "#FACC15",
          500: "#EAB308",
          600: "#CA8A04",
          700: "#A16207",
          accent: "#E6B325",
        },
      },
      fontFamily: {
        display: ["Newsreader", "serif"],
        sans: ["Inter", "Noto Sans", "sans-serif"],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      borderRadius: {
        DEFAULT: "0px",
        sm: "2px",
        md: "4px",
        lg: "6px",
        xl: "8px",
        "2xl": "12px",
        "3xl": "16px",
        full: "9999px",
        none: "0px",
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        marquee: "marquee 25s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};
