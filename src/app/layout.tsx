import React from 'react'
import dynamic from 'next/dynamic'
import { Montserrat } from 'next/font/google'
import Script from 'next/script'

import { AdminBar } from './_components/AdminBar'
import { Providers } from './_providers'
import { InitTheme } from './_providers/Theme/InitTheme'

import './_css/app.scss'
import '../css/compiledTailwind.css'

// Dynamiczny import Header i Footer
const Header = dynamic(() => import('./_components/Header').then(mod => mod.Header), { ssr: true })
const Footer = dynamic(() => import('./_components/Footer').then(mod => mod.Footer), { ssr: true })

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-jost',
})

export default function RootLayout({
  children,
  hideFooter = false,
}: {
  children: React.ReactNode
  hideFooter?: boolean
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link rel="icon" href="/media/el2-icon.svg" sizes="32x32" />
        <link rel="icon" href="/media/el2-icon.svg" type="image/svg+xml" />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-DJ62PVHDXD"></Script>
        <Script id="google-analytics">
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
          <Header />
          <main>{children}</main>
          {!hideFooter && <Footer />}
        </Providers>
      </body>
    </html>
  )
}
