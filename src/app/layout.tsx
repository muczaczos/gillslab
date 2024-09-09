
import React from 'react'
import { FaHeart, FaHome, FaShoppingCart, FaUser } from 'react-icons/fa'
import { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { usePathname } from 'next/navigation'
import Script from 'next/script'

import { AdminBar } from './_components/AdminBar'
import { Footer } from './_components/Footer'
import { Header } from './_components/Header'
import { Providers } from './_providers'
import { InitTheme } from './_providers/Theme/InitTheme'
import { mergeOpenGraph } from './_utilities/mergeOpenGraph'

import './_css/app.scss'
import '../css/compiledTailwind.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-jost',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {

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
      <body className={montserrat.variable}>
        <Providers>
          <AdminBar />
          {/* @ts-expect-error */}
          <Header />
          <main>{children}</main>
          {/* @ts-expect-error */}
          <Footer />

          {/* Fixed footer */}
          <div className="z-30 fixed bottom-5 left-0 right-0 mx-auto flex justify-between rounded-full bg-secondary bg-opacity-70 text-white max-w-[90%] w-full px-10 py-4">
            <FaHeart className="text-customWhite text-3xl" />
            <FaUser className="text-customWhite text-3xl" />
            <FaShoppingCart className="text-customWhite text-3xl" />
            <FaHome className="text-customWhite text-3xl" />
          </div>
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
