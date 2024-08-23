/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{tsx,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#5A7FD0',
          DEFAULT: '#4968AC',
          dark: '',
        },
        secondary: {
          light: '',
          DEFAULT: '#AC4968',
          dark: ''
        },
        customWhite: {
          DEFAULT: '#F7F9FB',
        },
        // Dodaj inne kolory tutaj
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      },
      animation: {
        slideDown: 'slideDown 0.5s ease-out forwards',
        slideUp: 'slideUp 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  blocklist: ['table'],
}
