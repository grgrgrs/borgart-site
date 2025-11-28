/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "#1e293b",              // slate-800
            a: { color: "#0284c7" },       // sky-600
            strong: { color: "#0f172a" },  // slate-900
            h1: { color: "#0f172a" },
            h2: { color: "#0f172a" },
            h3: { color: "#0f172a" },
            h4: { color: "#0f172a" },
            p: { color: "#334155" },       // slate-700
          }
        },
        dark: {
          css: {
            color: "#e2e8f0",              // slate-200
            a: { color: "#38bdf8" },       // sky-300
            strong: { color: "#fff" },
            h1: { color: "#fff" },
            h2: { color: "#fff" },
            h3: { color: "#f1f5f9" },
            p: { color: "#cbd5e1" },       // slate-300
          }
        }
      }
    }
  },
  plugins: [ require("@tailwindcss/typography") ]
};
