import React from 'react'

import { Footer } from '../../_components/Footer'
import { Header } from '../../_components/Header' //

export default function LayoutWithHeaderFooter({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
