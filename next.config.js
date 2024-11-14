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
        source: '/cubensis-grow-kits/:slug',  // dla kategorii cubensis-grow-kits
        destination: '/products/:slug',      // docelowa strona produktu
      },
      {
        source: '/substrates/:slug',          // dla kategorii substrates
        destination: '/products/:slug',      // docelowa strona produktu
      },
      {
        source: '/cubensis-spore-syringe/:slug',          // dla kategorii substrates
        destination: '/products/:slug',      // docelowa strona produktu
      },
      {
        source: '/cubensis-liquid-cultures/:slug',          // dla kategorii substrates
        destination: '/products/:slug',      // docelowa strona produktu
      },
      {
        source: '/lab-equipments/:slug',          // dla kategorii substrates
        destination: '/products/:slug',      // docelowa strona produktu
      },
      {
        source: '/blog',          // dla kategorii substrates
        destination: '/posts',      // docelowa strona produktu
      },
      {
        source: '/blog/:slug',          // dla kategorii substrates
        destination: '/posts/:slug',      // docelowa strona produktu
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
