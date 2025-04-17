import React from 'react'

import { fetchFooter } from '../../_api/fetchGlobals'
import { Footer } from '../../_components/Footer'
import FooterComponent from '../../_components/Footer/FooterComponent'
import { Header } from '../../_components/Header' //

export default async function LayoutWithHeaderFooter({ children }: { children: React.ReactNode }) {
  const footerData = await fetchFooter()

  return (
    <>
      <Header />
      <main>{children}</main>

      <FooterComponent footer={footerData} />
    </>
  )
}
