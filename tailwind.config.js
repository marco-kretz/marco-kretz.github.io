import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts,md}'],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: '#0c1210',
          surface: '#141c17',
          border: '#2f4036',
          text: '#c4cfc6',
          textDim: '#8b948c',
          accent: '#c9b86a',
          accentHover: '#d9c87a',
          blue: '#6db3a0',
          green: '#2d8a4e',
          red: '#da3633',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'ui-monospace', 'Cascadia Code', 'Source Code Pro', 'Menlo', 'Consolas', 'Monaco', 'monospace'],
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'IBM Plex Sans', 'system-ui', 'sans-serif'],
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
      typography: {
        DEFAULT: {
          css: {
            color: '#c4cfc6',
            a: {
              color: '#6db3a0',
              textDecoration: 'underline',
              '&:hover': {
                color: '#c9b86a',
              },
            },
            h1: {
              color: '#e8efe9',
              fontWeight: '700',
              fontFamily: "'Space Grotesk', 'IBM Plex Sans', system-ui, sans-serif",
              marginBottom: '1.5rem',
            },
            h2: {
              color: '#e8efe9',
              fontWeight: '700',
              fontFamily: "'Space Grotesk', 'IBM Plex Sans', system-ui, sans-serif",
              fontSize: '1.25rem',
              marginTop: '2rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              '&::before': {
                content: '">"',
                color: '#c9b86a',
              },
            },
            h3: {
              color: '#e8efe9',
              fontWeight: '600',
              fontFamily: "'Space Grotesk', 'IBM Plex Sans', system-ui, sans-serif",
              fontSize: '1.125rem',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              '&::before': {
                content: '">>"',
                color: '#c9b86a',
                opacity: '0.7',
              },
            },
            h4: {
              color: '#e8efe9',
              fontWeight: '600',
              fontFamily: "'Space Grotesk', 'IBM Plex Sans', system-ui, sans-serif",
              marginTop: '1rem',
              marginBottom: '0.5rem',
            },
            p: {
              marginTop: '1rem',
              marginBottom: '1rem',
              lineHeight: '1.75',
            },
            strong: {
              color: '#e8efe9',
            },
            code: {
              color: '#c9b86a',
              backgroundColor: '#141c17',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              fontWeight: '400',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            pre: {
              backgroundColor: '#0c1210',
              color: '#c4cfc6',
              marginTop: '2rem',
              marginBottom: '2rem',
              borderRadius: '0.5rem',
            },
            'pre code': {
              color: '#c4cfc6',
              backgroundColor: 'transparent',
              padding: '0',
            },
            blockquote: {
              borderLeftColor: '#2f4036',
              fontStyle: 'normal',
              color: '#8b948c',
            },
            ul: {
              listStyleType: 'none',
              paddingLeft: '0',
              marginTop: '1rem',
              marginBottom: '1rem',
            },
            'ul > li': {
              position: 'relative',
              paddingLeft: '1.5rem',
              '&::before': {
                content: '"→"',
                position: 'absolute',
                left: '0',
                color: '#c9b86a',
              },
            },
            ol: {
              paddingLeft: '2rem',
              marginTop: '1rem',
              marginBottom: '1rem',
            },
            'li > p': {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            hr: {
              borderColor: '#2f4036',
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            table: {
              fontSize: '0.875rem',
              borderCollapse: 'separate',
              borderSpacing: '0',
              border: '1px solid #2f4036',
              borderRadius: '0.5rem',
              overflow: 'hidden',
              backgroundColor: '#141c17',
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            thead: {
              color: '#e8efe9',
              backgroundColor: '#0c1210',
              borderBottomColor: '#2f4036',
            },
            th: {
              fontWeight: '600',
              fontFamily: "'JetBrains Mono', ui-monospace, Cascadia Code, Source Code Pro, Menlo, Consolas, Monaco, monospace",
              padding: '0.75rem 1rem',
              textAlign: 'left',
              borderRight: '1px solid #2f4036',
              '&:last-child': {
                borderRight: 'none',
              },
            },
            tbody: {
              color: '#c4cfc6',
            },
            td: {
              padding: '0.75rem 1rem',
              borderRight: '1px solid #2f4036',
              '&:last-child': {
                borderRight: 'none',
              },
            },
            tr: {
              borderBottomColor: '#2f4036',
            },
            'tbody tr:last-child': {
              borderBottom: 'none',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};
