/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          deep: '#0B3D62',
          dark: '#062A46',
        },
        teal: {
          DEFAULT: '#1BA098',
          bright: '#22B8B5',
          light: '#e6f7f7',
        },
        'off-white': '#F7F9FA',
        'soft-blue': '#EEF6F8',
        'text-secondary': '#5A6B78',
        border: '#DCE5EA',
        success: '#278A6B',
        warning: '#D89B2B',
        error: '#C94A4A',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        card: '0 2px 12px rgba(11,61,98,0.08)',
        'card-hover': '0 8px 32px rgba(11,61,98,0.14)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [],
}
