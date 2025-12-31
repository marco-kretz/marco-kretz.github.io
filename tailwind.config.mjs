/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: '#0d1117',
          border: '#30363d',
          text: '#c9d1d9',
          textDim: '#8b949e',
          accent: '#d29922', // Warm amber
          accentHover: '#e3b341',
          blue: '#58a6ff',
          green: '#238636',
          red: '#da3633',
        },
      },
      fontFamily: {
        mono: ['ui-monospace', 'Cascadia Code', 'Source Code Pro', 'Menlo', 'Consolas', 'Monaco', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'cursor': 'cursor 1s step-end infinite',
        'typing': 'typing 3.5s steps(40, end)',
      },
      keyframes: {
        cursor: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [],
};
