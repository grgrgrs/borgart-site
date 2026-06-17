/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx}"],
  theme: {
    extend: {
      colors: {
        warm: {
          50:  '#faf9f7',
          100: '#f5f3ef',
          200: '#f0ede8',
          300: '#e8e5e0',
          400: '#c4b5a0',
          500: '#a8c4b8',
          600: '#8a8a8a',
          700: '#5a5a5a',
          800: '#1a1a1a',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#1a1a1a",
            a: { color: "#1a1a1a", textDecoration: "underline", textUnderlineOffset: "3px" },
            strong: { color: "#1a1a1a" },
            h1: { color: "#1a1a1a" },
            h2: { color: "#1a1a1a" },
            h3: { color: "#1a1a1a" },
            h4: { color: "#1a1a1a" },
            p: { color: "#5a5a5a" },
          }
        },
      }
    }
  },
  plugins: [ require("@tailwindcss/typography") ]
};
