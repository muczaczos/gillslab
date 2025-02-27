/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{tsx,ts}'],
  theme: {
    extend: {
      screens: {
        xs: { max: '389px' }, // Breakpoint dla szerokości do 400px
        csm: { min: '390px', max: '639px' },
        xxl: { min: '2000px' },
      },
      colors: {
        productTop: '#4968AC',
        productBottom: '#2D4069',
        primary: {
          light: '#5A7FD0',
          DEFAULT: '#4968AC',
          dark: '#385490',
        },
        secondary: {
          light: '',
          DEFAULT: '#AC4968',
          dark: '',
        },
        customWhite: {
          light: 'rgba(247, 249, 251, 0.1)',
          DEFAULT: '#F7F9FB',
        },
        customGray: {
          DEFAULT: '#7B8291',
          dark: '#484D58',
          light: '#ADB2BC',
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
        slideRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        slideDown: 'slideDown 0.5s ease-out forwards',
        slideUp: 'slideUp 0.5s ease-out forwards',
        slideRight: 'slideRight 0.5s ease-out forwards',
        slideLeft: 'slideLeft 0.5s ease-out forwards',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['hover'], // Obsługa hover dla kolorów tła
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          'text-shadow': '2px 2px 4px rgba(0, 0, 0, 0.5)',
        },
        '.shadow': {
          shadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-md': {
          'text-shadow': '3px 3px 6px rgba(0, 0, 0, 0.6)',
        },
        '.text-shadow-lg': {
          'text-shadow': '4px 4px 8px rgba(0, 0, 0, 0.7)',
        },
        '.text-shadow-none': {
          'text-shadow': 'none',
        },
      }

      addUtilities(newUtilities)
    },
  ],
  corePlugins: {
    preflight: false,
  },
  blocklist: ['table'],
}
