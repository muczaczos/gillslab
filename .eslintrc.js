module.exports = {
  root: true,
  extends: [
    'plugin:@next/next/recommended', // Next.js reguły
    '@payloadcms', // Reguły Payload CMS
    'plugin:prettier/recommended', // Integracja Prettiera z ESLintem
  ],
  ignorePatterns: ['**/payload-types.ts'], // Ignorowanie wygenerowanych plików
  plugins: ['prettier'], // Wtyczka Prettiera
  rules: {
    'import/default': 'off', // Wyłącza regułę dla domyślnego importu
    'no-unused-vars': 'warn', // Zmienia błąd na ostrzeżenie
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto', // Rozwiązuje problemy z końcem linii
      },
    ],
  },
}
