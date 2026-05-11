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
        /* ── Brand Blue ────────────────── */
        primary: "#2563eb",
        "primary-light": "#3b82f6",
        "primary-dark": "#1d4ed8",

        /* ── Accent ────────────────────── */
        accent: "#06b6d4",
        "accent-light": "#22d3ee",

        /* ── Surfaces ──────────────────── */
        "background-light": "#f8fafc",
        "background-dark": "#0f172a",
        "surface-white": "#ffffff",
        "surface-light": "#f1f5f9",
        "surface-hover": "#e2e8f0",
        "surface-dark": "#0f172a",
        "surface-card": "#ffffff",
        "panel-bg": "#ffffff",
        "panel-header": "#f8fafc",
        "input-bg": "#f1f5f9",

        /* ── Text ──────────────────────── */
        "text-main": "#0f172a",
        "text-secondary": "#334155",
        "text-muted": "#64748b",
        "text-dim": "#94a3b8",
        "text-dark": "#0f172a",

        /* ── Borders ───────────────────── */
        "border-subtle": "#e2e8f0",
        "border-color": "#cbd5e1",
        "border-dark": "#94a3b8",
        "border-highlight": "#2563eb",

        /* ── Blue Palette ──────────────── */
        blue: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },
      },
      fontFamily: {
        display: ["Outfit", "Inter", "sans-serif"],
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
        DEFAULT: "8px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
        full: "9999px",
        none: "0px",
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        marquee: "marquee 25s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        orbit: "orbit 20s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(100px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(100px) rotate(-360deg)" },
        },
      },
      boxShadow: {
        glass: "0 4px 30px rgba(37, 99, 235, 0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
        "glass-lg": "0 10px 40px -10px rgba(37, 99, 235, 0.1), 0 4px 6px -1px rgba(0,0,0,0.03)",
        "3d": "0 20px 60px -15px rgba(37, 99, 235, 0.12), 0 8px 20px -5px rgba(0,0,0,0.04)",
        "glow-blue": "0 0 20px rgba(37, 99, 235, 0.15), 0 0 60px rgba(37, 99, 235, 0.05)",
        "glow-cyan": "0 0 20px rgba(6, 182, 212, 0.15), 0 0 60px rgba(6, 182, 212, 0.05)",
      },
    },
  },
  plugins: [],
};
