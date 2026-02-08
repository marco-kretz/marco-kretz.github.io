import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts,md}'],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: '#0d1117',
          border: '#30363d',
          text: '#c9d1d9',
          textDim: '#8b949e',
          accent: '#d29922',
          accentHover: '#e3b341',
          blue: '#58a6ff',
          green: '#238636',
          red: '#da3633',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'ui-monospace', 'Cascadia Code', 'Source Code Pro', 'Menlo', 'Consolas', 'Monaco', 'monospace'],
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
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
            color: '#c9d1d9',
            a: {
              color: '#58a6ff',
              textDecoration: 'underline',
              '&:hover': {
                color: '#d29922',
              },
            },
            h1: {
              color: '#ffffff',
              fontWeight: '700',
              fontFamily: "'JetBrains Mono', ui-monospace, Cascadia Code, Source Code Pro, Menlo, Consolas, Monaco, monospace",
              marginBottom: '1.5rem',
            },
            h2: {
              color: '#ffffff',
              fontWeight: '700',
              fontFamily: "'JetBrains Mono', ui-monospace, Cascadia Code, Source Code Pro, Menlo, Consolas, Monaco, monospace",
              fontSize: '1.25rem',
              marginTop: '2rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              '&::before': {
                content: '">"',
                color: '#d29922',
              },
            },
            h3: {
              color: '#ffffff',
              fontWeight: '600',
              fontFamily: "'JetBrains Mono', ui-monospace, Cascadia Code, Source Code Pro, Menlo, Consolas, Monaco, monospace",
              fontSize: '1.125rem',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              '&::before': {
                content: '">>"',
                color: '#d29922',
                opacity: '0.7',
              },
            },
            h4: {
              color: '#ffffff',
              fontWeight: '600',
              fontFamily: "'JetBrains Mono', ui-monospace, Cascadia Code, Source Code Pro, Menlo, Consolas, Monaco, monospace",
              marginTop: '1rem',
              marginBottom: '0.5rem',
            },
            p: {
              marginTop: '1rem',
              marginBottom: '1rem',
              lineHeight: '1.75',
            },
            strong: {
              color: '#ffffff',
            },
            code: {
              color: '#d29922',
              backgroundColor: '#161b22',
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
              backgroundColor: '#0d1117',
              color: '#c9d1d9',
              marginTop: '2rem',
              marginBottom: '2rem',
              borderRadius: '0.5rem',
            },
            'pre code': {
              color: '#c9d1d9',
              backgroundColor: 'transparent',
              padding: '0',
            },
            blockquote: {
              borderLeftColor: '#30363d',
              fontStyle: 'normal',
              color: '#8b949e',
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
                color: '#d29922',
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
              borderColor: '#30363d',
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            table: {
              fontSize: '0.875rem',
              borderCollapse: 'separate',
              borderSpacing: '0',
              border: '1px solid #30363d',
              borderRadius: '0.5rem',
              overflow: 'hidden',
              backgroundColor: '#161b22',
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            thead: {
              color: '#ffffff',
              backgroundColor: '#0d1117',
              borderBottomColor: '#30363d',
            },
            th: {
              fontWeight: '600',
              fontFamily: "'JetBrains Mono', ui-monospace, Cascadia Code, Source Code Pro, Menlo, Consolas, Monaco, monospace",
              padding: '0.75rem 1rem',
              textAlign: 'left',
              borderRight: '1px solid #30363d',
              '&:last-child': {
                borderRight: 'none',
              },
            },
            tbody: {
              color: '#c9d1d9',
            },
            td: {
              padding: '0.75rem 1rem',
              borderRight: '1px solid #30363d',
              '&:last-child': {
                borderRight: 'none',
              },
            },
            tr: {
              borderBottomColor: '#30363d',
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
