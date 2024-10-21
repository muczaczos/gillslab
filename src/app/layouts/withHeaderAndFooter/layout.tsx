import React from 'react'
import { FaHome, FaRegHeart, FaShoppingCart, FaUser } from 'react-icons/fa'
import { Footer } from '../../_components/Footer'
import { Header } from '../../_components/Header' // Ścieżki do komponentów mogą się różnić
import { useCart } from '../../_providers/Cart'
import { Providers } from '../../_providers'

export default function LayoutWithHeaderFooter({ children }: { children: React.ReactNode }) {
  const { cart } = useCart()
  let totalItem = 0

  cart?.items?.forEach(item => {
    if (typeof item.product === 'object' && item.quantity) {
      totalItem += item.quantity
    }
  })

  return (
    <>
      {/* Fixed footer with icons */}
      <div className="md:hidden m-5 rounded-3xl z-50 fixed bottom-0 left-0 right-0 bg-opacity-50 bg-secondary p-4 flex justify-around items-center">
        <FaHome className="text-customWhite text-2xl" />
        <FaRegHeart className="text-customWhite text-2xl" />
        {/* Cart icon with total items count */}
        <div className="relative">
          <FaShoppingCart className="text-customWhite text-2xl" />
          {totalItem > 0 && (
            <span className="absolute top-[-8px] right-[-10px] bg-red-600 text-white rounded-full px-2 py-0 text-xs font-bold">
              {totalItem}
            </span>
          )}
        </div>
        <FaUser className="text-customWhite text-2xl" />
      </div>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
