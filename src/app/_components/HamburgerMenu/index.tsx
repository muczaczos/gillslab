'use client' // Dodaj to na początku pliku

import { useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi' // Import ikon z Heroicons
import Link from 'next/link'

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
          <div className="relative w-8 h-8 transform z-50">
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
          className={`fixed inset-0 bg-primary flex flex-col justify-center items-center ${isClosing ? 'animate-slideUp' : 'animate-slideDown'
            }`}
        >
          <div
            className="absolute inset-0 bg-no-repeat bg-cover opacity-5"
            style={{ backgroundImage: "url('/media/eyes.png')" }}
          ></div>
          <ul className="list-none p-4 text-center z-50">
            <Link className="" href="/about">
              <p className="text-customWhite font-bold text-3xl block pb-2">About</p>
            </Link>
            <Link className="" href="/cubensis-grow-kits">
              <p className="text-customWhite font-bold text-3xl block pb-2">Growkits</p>
            </Link>
            <Link className="" href="/cubensis-spore-syringes">
              <p className="text-customWhite font-bold text-3xl block pb-2">spores</p>
            </Link>
            <Link className="" href="/cubensis-liquid-cultures">
              <p className="text-customWhite font-bold text-3xl block pb-2">Cultures</p>
            </Link>
            <Link className="" href="/substrates">
              <p className="text-customWhite font-bold text-3xl block pb-2">Substrates</p>
            </Link>
            <Link className="" href="/laboratory-equipments">
              <p className="text-customWhite font-bold text-3xl block pb-2">Lab</p>
            </Link>
            <Link className="" href="/favorities">
              <p className="text-customWhite font-bold text-3xl block pb-2">Favorities</p>
            </Link>
            <Link className="" href="/contact">
              <p className="text-customWhite font-bold text-3xl block pb-2">Contact</p>
            </Link>
            <Link className="" href="/shipping">
              <p className="text-customWhite font-bold text-3xl block pb-2">Shipping</p>
            </Link>
            <Link className="" href="/blog">
              <p className="text-customWhite font-bold text-3xl block pb-2">blog</p>
            </Link>
            <Link className="" href="/payments">
              <p className="text-customWhite font-bold text-3xl block pb-2">Payments</p>
            </Link>
            <Link className="" href="/vlog">
              <p className="text-customWhite font-bold text-3xl block pb-2">vlog</p>
            </Link>
            <Link className="" href="/conditions">
              <p className="text-customWhite font-bold text-3xl block pb-2">Conditions</p>
            </Link>
            <Link className="" href="/privacy">
              <p className="text-customWhite font-bold text-3xl block pb-2">Privacy</p>
            </Link>
          </ul>
        </div>
      )}
    </div>
  )
}
