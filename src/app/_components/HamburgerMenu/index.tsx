'use client' // Dodaj to na początku pliku

import { useState } from 'react'
import {
  FaFacebook,
  FaHome,
  FaInstagram,
  FaRegHeart,
  FaShoppingCart,
  FaUser,
  FaVimeo,
} from 'react-icons/fa'
import { HiMenu, HiX } from 'react-icons/hi' // Import ikon z Heroicons
import Link from 'next/link'

import { useCart } from '../../_providers/Cart'
import Sidebar from './Sidebar'

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const toggleMenu = () => {
    if (isOpen) {
      setIsClosing(true)
      setTimeout(() => {
        setIsOpen(false)
        setIsClosing(false)
      }, 500) // Czas trwania animacji zamykania
    } else {
      setIsOpen(true)
    }
  }

  const { cart } = useCart()
  let totalItem = 0

  cart?.items?.forEach(item => {
    if (typeof item.product === 'object' && item.quantity) {
      totalItem += item.quantity
    }
  })

  return (
    <div className="relative z-[60]">
      {/* Przycisk menu */}
      <button
        className="flex items-center justify-center bg-primary w-12 h-12 text-3xl focus:outline-none border-none z-40"
        onClick={toggleMenu}
      >
        {isOpen && !isClosing ? (
          // Krzyżyk (X)
          <div className="fixed top-4 right-4 z-50 w-8 h-8 transform">
            <p className="text-customWhite font-bold">X</p>
          </div>
        ) : (
          // Hamburger menu
          <div className="flex flex-col bg-primary items-center justify-center w-8 h-8">
            <div className="w-8 h-1 bg-customWhite mb-1"></div>
            <div className="w-8 h-1 bg-customWhite mb-1"></div>
            <div className="w-8 h-1 bg-customWhite mb-1"></div>
          </div>
        )}
      </button>

      {/* Menu po otwarciu i zamykaniu */}
      {(isOpen || isClosing) && (
        <div
          className={`fixed flex inset-0 bg-primary ${
            isClosing ? 'animate-slideRight' : 'animate-slideLeft'
          }`}
        >
          <div
            className="absolute inset-0 bg-no-repeat bg-cover opacity-5"
            style={{ backgroundImage: "url('/media/eyes.png')" }}
          ></div>
          <div className="border-r border border-customWhite w-1/6 h-full flex flex-col justify-between items-center bg-secondary bg-opacity-50 z-50">
            <div className="pt-5 flex flex-col">
              <Link href="/" className="pb-3">
                <FaHome className="text-customWhite text-2xl" />
              </Link>
              <Link href="/favorities" className="pb-3">
                <FaRegHeart className="text-customWhite text-2xl" />
              </Link>
              <Link href="/cart" className="pb-3">
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
            <div className="pb-5 flex flex-col">
              <Link href="https://www.facebook.com" className="pb-3">
                <FaFacebook className="text-customWhite text-2xl" />
              </Link>
              <Link href="https://www.instagram.com" className="pb-3">
                <FaInstagram className="text-customWhite text-2xl" />
              </Link>
              <Link href="https://www.vimeo.com" className="pb-3">
                <FaVimeo className="text-customWhite text-2xl" />
              </Link>
            </div>
          </div>
          <Sidebar />
        </div>
      )}
    </div>
  )
}
