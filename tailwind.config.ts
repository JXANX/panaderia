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
        // Vainilla y Chocolate — paleta de marca (hex exactos en globals.css)
        // Tokens semánticos: cream=background, vanilla=surface, beige=border,
        // caramel=accent, milk=muted, choc=primary, cacao=foreground.
        // Canales RGB para poder usar opacidades: text-cacao/70, bg-cacao/55…
        cream: "rgb(var(--cream-rgb, 255 247 230) / <alpha-value>)",
        vanilla: "rgb(var(--vanilla-rgb, 245 230 200) / <alpha-value>)",
        beige: "rgb(var(--beige-rgb, 234 215 181) / <alpha-value>)",
        caramel: "rgb(var(--caramel-rgb, 215 180 138) / <alpha-value>)",
        milk: "rgb(var(--milk-rgb, 168 124 90) / <alpha-value>)",
        choc: "rgb(var(--choc-rgb, 107 75 62) / <alpha-value>)",
        cacao: "rgb(var(--cacao-rgb, 59 42 35) / <alpha-value>)",
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
