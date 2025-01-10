import React, { useState } from 'react'
import Link from 'next/link'

const Sidebar = () => {
  const [isShopOpen, setIsShopOpen] = useState(false)

  const toggleShopMenu = () => {
    setIsShopOpen(!isShopOpen)
  }

  return (
    <div className="w-5/6 pt-20 px-5 h-full bg-transparent z-50">
      {/* Shop section */}
      <div onClick={toggleShopMenu} className="pt-1 flex items-center justify-between">
        <p
          onClick={toggleShopMenu}
          className="text-customWhite font-semibold text-xl block pb-3 cursor-pointer"
        >
          Shop
        </p>
        <div
          onClick={toggleShopMenu}
          className="text-customWhite font-semibold text-xl pb-3 cursor-pointer bg-transparent"
        >
          {isShopOpen ? '-' : '+'}
        </div>
      </div>
      {isShopOpen && (
        <div className="pl-4">
          <Link href="cubensis-grow-kits">
            <p className="text-customWhite font-semibold text-lg pb-2 cursor-pointer">
              Cubensis Growkits
            </p>
          </Link>
          <Link href="/cubensis-spore-syringes">
            <p className="text-customWhite font-semibold text-lg pb-2 cursor-pointer">
              Cubensis Spore Syringes
            </p>
          </Link>
          <Link href="/cubensis-liquid-cultures">
            <p className="text-customWhite font-semibold text-lg pb-2 cursor-pointer">
              Cubensis Liquid Cultures
            </p>
          </Link>
          <Link href="/laboratory-equipments">
            <p className="text-customWhite font-semibold text-lg pb-2 cursor-pointer">
              Laboratory Equipments
            </p>
          </Link>
          <Link href="/substrates">
            <p className="text-customWhite font-semibold text-lg pb-2 cursor-pointer">Substrates</p>
          </Link>
        </div>
      )}

      {/* Other sections */}
      <Link href="/contact">
        <div className="pt-1">
          <p className="text-customWhite font-semibold text-xl block pb-3">Contact</p>
        </div>
      </Link>
      <Link href="/conditions">
        <div className="pt-1">
          <p className="text-customWhite font-semibold text-xl block pb-3">Conditions</p>
        </div>
      </Link>
      <Link href="/privacy">
        <div className="pt-1">
          <p className="text-customWhite font-semibold text-xl block pb-3">Privacy</p>
        </div>
      </Link>
      <Link href="/payment">
        <div className="pt-1">
          <p className="text-customWhite font-semibold text-xl block pb-3">Payment</p>
        </div>
      </Link>
      <Link href="/shipping">
        <div className="pt-1">
          <p className="text-customWhite font-semibold text-xl block pb-3">Shipping</p>
        </div>
      </Link>
      <Link href="/blog">
        <div className="pt-1">
          <p className="text-customWhite font-semibold text-xl block pb-3">Blog</p>
        </div>
      </Link>
      <Link href="/vlog">
        <div className="pt-1">
          <p className="text-customWhite font-semibold text-xl block pb-3">Vlog</p>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar
