/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0E2A4A',
          50: '#EAF0F6',
          100: '#CFDCE9',
          400: '#1B4470',
          500: '#123457',
          600: '#0E2A4A',
          700: '#0A1F38',
          800: '#071627',
          900: '#040D18',
        },
        blue: {
          DEFAULT: '#2F6FED',
          50: '#EDF3FF',
          100: '#D7E4FF',
          300: '#8FB0F5',
          400: '#5A8AF0',
          500: '#2F6FED',
          600: '#2358CC',
          700: '#1B449E',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(14, 42, 74, 0.25)',
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1.04) translate3d(0, 0, 0)' },
          '100%': { transform: 'scale(1.17) translate3d(-1.5%, -1%, 0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translate3d(0, 26px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        pageIn: {
          '0%': { opacity: '0', transform: 'translate3d(0, 14px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        marquee: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -10px, 0)' },
        },
        scrollDot: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '75%': { transform: 'translateY(13px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '0' },
        },
        dash: { to: { strokeDashoffset: '-20' } },
        progress: { '0%': { width: '0%' }, '100%': { width: '100%' } },
        blob: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(5%, -7%, 0) scale(1.18)' },
        },
        sheen: {
          '0%': { transform: 'translateX(-120%) skewX(-18deg)' },
          '100%': { transform: 'translateX(320%) skewX(-18deg)' },
        },
      },
      animation: {
        kenburns: 'kenburns 14s ease-out forwards',
        'kenburns-slow': 'kenburns 22s ease-out forwards',
        'fade-up': 'fadeUp 0.95s cubic-bezier(0.2, 0.8, 0.2, 1) both',
        'fade-in': 'fadeIn 1s ease-out both',
        'page-in': 'pageIn 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) backwards',
        marquee: 'marquee 48s linear infinite',
        float: 'float 7s ease-in-out infinite',
        'scroll-dot': 'scrollDot 1.9s ease-in-out infinite',
        dash: 'dash 1.1s linear infinite',
        progress: 'progress 6.5s linear forwards',
        blob: 'blob 16s ease-in-out infinite',
        sheen: 'sheen 3.4s ease-in-out infinite',
      },
      backgroundImage: {
        'navy-gradient': 'linear-gradient(135deg, #0A1F38 0%, #123457 60%, #1B4470 100%)',
      },
    },
  },
  plugins: [],
}
