'use client' // Dodaj to na początku pliku

import { useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi' // Import ikon z Heroicons
import Link from 'next/link'

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
          className={`fixed flex inset-0 bg-primary ${isClosing ? 'animate-slideUp' : 'animate-slideDown'
            }`}
        >
          <div
            className="absolute inset-0 bg-no-repeat bg-cover opacity-5"
            style={{ backgroundImage: "url('/media/eyes.png')" }}
          ></div>
          <div className="w-1/6 h-full flex flex-col justify-between items-center bg-secondary">
            <div className="pt-5">
              <p>J</p>
              <p>J</p>
              <p>J</p>
            </div>
            <div className="pb-5">
              <p>J</p>
              <p>J</p>
              <p>J</p>
            </div>
          </div>
          <Sidebar />
        </div>
      )}
    </div>
  )
}
