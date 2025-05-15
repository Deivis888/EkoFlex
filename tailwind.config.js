/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0f0ff',
          200: '#bae2ff',
          300: '#7ccfff',
          400: '#38b6ff',
          500: '#0099ff',
          600: '#007acc',
          700: '#0066cc',
          800: '#004c99',
          900: '#003366',
          950: '#001a33',
        },
        secondary: {
          50: '#edfcff',
          100: '#d6f7ff',
          200: '#b5f2ff',
          300: '#83eaff',
          400: '#48d9ff',
          500: '#1ebeff',
          600: '#069eff',
          700: '#007fd6',
          800: '#0667ae',
          900: '#0b578d',
          950: '#083656',
        },
        accent: {
          50: '#fff8ed',
          100: '#ffefd6',
          200: '#ffdcad',
          300: '#ffc275',
          400: '#ff9f3d',
          500: '#ff7e15',
          600: '#ff6205',
          700: '#cc4902',
          800: '#a13a08',
          900: '#82330b',
          950: '#461604',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};