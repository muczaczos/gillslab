/** @type {import('next').NextConfig} */
const ContentSecurityPolicy = require('./csp')
const redirects = require('./redirects')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', process.env.NEXT_PUBLIC_SERVER_URL]
      .filter(Boolean)
      .map(url => url.replace(/https?:\/\//, '')),
  },
  redirects,
  async headers() {
    const headers = []

    if (!process.env.NEXT_PUBLIC_IS_LIVE) {
      headers.push({
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
        source: '/:path*',
      })
    }

    headers.push({
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: ContentSecurityPolicy,
        },
      ],
    })

    return headers
  },

  // Dodaj sekcję rewrites tutaj
  async rewrites() {
    return [
      {
        source: '/(cubensis-spore-syringe | cubensis-grow-kits | cubensis-liquid-cultures )/:slug', // Użycie dynamicznych segmentów dla kategorii i produktu
        destination: '/products/:slug', // Docelowa strona produktu
      },
    ]
  },

  async redirects() {
    return [
      {
        source: '/products', // Źródłowy URL
        destination: '/', // Docelowy URL (strona główna)
        permanent: true, // Przekierowanie 301 (stałe przekierowanie)
      },
    ]
  },
}

module.exports = nextConfig
