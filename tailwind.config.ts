import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // La Espiga Verde — paleta de marca (hex exactos en globals.css)
        // Canales RGB para poder usar opacidades: text-ink/70, bg-ink/55…
        green: "rgb(var(--green-rgb, 79 136 83) / <alpha-value>)",
        ink: "rgb(var(--ink-rgb, 29 25 14) / <alpha-value>)",
        brown: "rgb(var(--brown-rgb, 104 88 57) / <alpha-value>)",
        beige: "rgb(var(--beige-rgb, 191 168 149) / <alpha-value>)",
        gold: "rgb(var(--gold-rgb, 152 127 83) / <alpha-value>)",
        olive: "rgb(var(--olive-rgb, 60 60 35) / <alpha-value>)",
        paper: "rgb(var(--paper-rgb, 239 231 219) / <alpha-value>)",
        cream: "rgb(var(--cream-rgb, 228 215 196) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
