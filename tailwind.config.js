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
        gold: {
          DEFAULT: '#E8A93A',
          50: '#FDF6E9',
          100: '#FAEBC9',
          400: '#EDBB5E',
          500: '#E8A93A',
          600: '#CC8F23',
          700: '#A6741B',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(14, 42, 74, 0.25)',
      },
      backgroundImage: {
        'navy-gradient': 'linear-gradient(135deg, #0A1F38 0%, #123457 60%, #1B4470 100%)',
      },
    },
  },
  plugins: [],
}
