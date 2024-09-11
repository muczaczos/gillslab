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
      <div className="z-30 fixed bottom-5 left-0 right-0 mx-auto flex justify-between rounded-full bg-secondary bg-opacity-70 text-white max-w-[90%] w-full px-10 py-4">
        <FaHeart className="text-customWhite text-3xl" />
        <FaUser className="text-customWhite text-3xl" />
        <FaShoppingCart className="text-customWhite text-3xl" />
        <FaHome className="text-customWhite text-3xl" />
      </div>
    </>
  )
}
