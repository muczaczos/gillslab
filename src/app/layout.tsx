import React from 'react'
import { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Script from 'next/script'

import { AdminBar } from './_components/AdminBar'
import MobileStickyMenu from './_components/MobileStickyMenu'
import { Providers } from './_providers'
import { InitTheme } from './_providers/Theme/InitTheme'
import { mergeOpenGraph } from './_utilities/mergeOpenGraph'

import './_css/app.scss'
import '../css/compiledTailwind.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-jost',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link rel="icon" href="/media/el2-icon.svg" sizes="32x32" />
        <link rel="icon" href="/media/el2-icon.svg" type="image/svg+xml" />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-DJ62PVHDXD"></Script>
        <Script id="google-analitics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-DJ62PVHDXD');
            `}
        </Script>
      </head>
      <body className={`bg-customWhite ${montserrat.variable}`}>
        <Providers>
          <AdminBar />
          <main>{children}</main>
          <MobileStickyMenu />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://payloadcms.com'),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
  openGraph: mergeOpenGraph(),
}
