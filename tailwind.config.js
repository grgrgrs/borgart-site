/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy:  '#071B5C',
          blue:  '#1249D8',
          bright:'#145BFF',
          soft:  '#EAF1FF',
          ink:   '#101828',
          slate: '#475467',
          light: '#F7F9FC',
        },
        warm: {
          50:  '#f7f9fc',
          100: '#eaf1ff',
          200: '#eaeff7',
          300: '#dce3f0',
          400: '#1249d8',
          500: '#145bff',
          600: '#667085',
          700: '#475467',
          800: '#101828',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#101828",
            a: { color: "#1249D8", textDecoration: "underline", textUnderlineOffset: "3px" },
            strong: { color: "#101828" },
            h1: { color: "#101828" },
            h2: { color: "#101828" },
            h3: { color: "#101828" },
            h4: { color: "#101828" },
            p: { color: "#475467" },
          }
        },
      }
    }
  },
  plugins: [ require("@tailwindcss/typography") ]
};
