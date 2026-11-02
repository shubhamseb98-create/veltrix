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
          sage: '#6D8F63',
          neon: '#39FF88',
          dark: '#000000',
          surface: '#050806',
          card: '#0a100c',
          cyan: '#39FF88',
          blue: '#6D8F63',
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

