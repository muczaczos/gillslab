module.exports = {
  root: true,
  extends: ['plugin:@next/next/recommended', '@payloadcms'],
  ignorePatterns: ['**/payload-types.ts'],
  plugins: ['prettier'],
  rules: {
    'import/default': 'off', // Wyłącza regułę dla domyślnego importu
    'no-unused-vars': 'warn', // Zmienia błąd na ostrzeżenie
  },
}
