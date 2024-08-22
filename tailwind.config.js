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
        customWhite: {
          DEFAULT: '#F7F9FB',
        },
        // Dodaj inne kolory tutaj
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  blocklist: ['table'],
}
