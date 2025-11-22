/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-oswald)', 'sans-serif'], // Usage: font-display
      },
      colors: {
        background: "#050505", // Deep Matte Black
        paper: "#F0F0F0",      // The Cream/White color from your inspo
        accent: "#FF3333",     // A sharp red (like image 4) for hover states
      },
    },
  },
  plugins: [],
};