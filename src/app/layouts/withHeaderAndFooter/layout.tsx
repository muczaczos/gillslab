// app/layouts/with-header-footer/layout.tsx

import React from 'react'
import { FaHome, FaRegHeart, FaShoppingCart, FaUser } from 'react-icons/fa'

import { Footer } from '../../_components/Footer'
import { Header } from '../../_components/Header' // Ścieżki do komponentów mogą się różnić

export default function LayoutWithHeaderFooter({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="z-50 fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 flex justify-around items-center">
        <FaHome className="text-gray-600 text-2xl" />
        <FaRegHeart className="text-gray-600 text-2xl" />
        <FaShoppingCart className="text-gray-600 text-2xl" />
        <FaUser className="text-gray-600 text-2xl" />
      </div>
      <Header />
      <main>{children}</main>
      <Footer />
      {/* Fixed footer */}

    </>
  )
}
