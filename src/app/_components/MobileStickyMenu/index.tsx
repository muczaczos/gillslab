'use client'

import React from 'react'
import { FaHome, FaRegHeart, FaShoppingCart, FaUser } from 'react-icons/fa'
import Link from 'next/link'

import { useCart } from '../../_providers/Cart'

const MobileStickyMenu = () => {
  const { cart } = useCart()
  let totalItem = 0

  cart?.items?.forEach(item => {
    if (typeof item.product === 'object' && item.quantity) {
      totalItem += item.quantity
    }
  })

  return (
    <div className="md:hidden m-5 rounded-3xl z-50 fixed bottom-0 left-0 right-0 bg-opacity-50 bg-secondary p-4 flex justify-around items-center">
      <Link href="/">
        <FaHome className="text-customWhite text-2xl" />
      </Link>
      <Link href="/favorities">
        <FaRegHeart className="text-customWhite text-2xl" />
      </Link>
      <Link href="/cart">
        {/* Cart icon with total items count */}
        <div className="relative">
          <FaShoppingCart className="text-customWhite text-2xl" />
          {totalItem > 0 && (
            <span className="absolute top-[-8px] right-[-10px] bg-secondary text-customWhite rounded-full px-2 py-0 text-xs font-bold">
              {totalItem}
            </span>
          )}
        </div>
      </Link>
      <Link href="/account">
        <FaUser className="text-customWhite text-2xl" />
      </Link>
    </div>
  )
}

export default MobileStickyMenu
