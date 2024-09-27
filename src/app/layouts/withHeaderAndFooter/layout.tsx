// app/layouts/with-header-footer/layout.tsx

import React from 'react'
import { FaHeart, FaHome, FaShoppingCart, FaUser } from 'react-icons/fa'

import { Footer } from '../../_components/Footer'
import { Header } from '../../_components/Header' // Ścieżki do komponentów mogą się różnić

export default function LayoutWithHeaderFooter({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      {/* Fixed footer */}

    </>
  )
}
