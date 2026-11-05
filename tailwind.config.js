/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#000000',
          blue: '#001d3d',
          royal: '#001d3d',
          accent: '#3a86ff',
          dark: '#000000',
          surface: '#04060F',
          card: '#080B1C',
          silver: '#e2e8f0',
          muted: '#94a3b8',
          dim: '#64748b',
        }
      },
      fontFamily: {
        heading: ['var(--font-poppins)', 'sans-serif'],
        sans: ['var(--font-poppins)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      }
    },
  },
  plugins: [],
};
