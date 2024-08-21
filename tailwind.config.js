/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{tsx,ts}'],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'slide-down': 'slideDown 0.3s ease-in-out forwards',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  blocklist: ['table'],
}
