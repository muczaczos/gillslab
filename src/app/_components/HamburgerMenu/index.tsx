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
          className={`fixed inset-0 bg-primary flex flex-col justify-center items-center ${
            isClosing ? 'animate-slideUp' : 'animate-slideDown'
          }`}
        >
          <div
            className="absolute inset-0 bg-no-repeat bg-cover opacity-5"
            style={{ backgroundImage: "url('/media/eyes.png')" }}
          ></div>
          <ul className="list-none p-4 text-center z-50 w-full">
            <Link href="/about">
              <div className="border-0 border-b border-b-customWhite-light border-solid pt-1">
                <p className="text-customWhite font-bold text-2xl block pb-1">About</p>
              </div>
            </Link>
            <Link className="" href="/cubensis-grow-kits">
              <div className="border-0 border-b border-b-customWhite-light border-solid pt-1">
                <p className="text-customWhite font-bold text-2xl block pb-1">Growkits</p>
              </div>
            </Link>
            <Link className="" href="/cubensis-spore-syringes">
              <div className="border-0 border-b border-b-customWhite-light border-solid pt-1">
                <p className="text-customWhite font-bold text-2xl block pb-1">Spores</p>
              </div>
            </Link>
            <Link className="" href="/cubensis-liquid-cultures">
              <div className="border-0 border-b border-b-customWhite-light border-solid pt-1">
                <p className="text-customWhite font-bold text-2xl block pb-1">Cultures</p>
              </div>
            </Link>
            <Link className="" href="/substrates">
              <div className="border-0 border-b border-b-customWhite-light border-solid pt-1">
                <p className="text-customWhite font-bold text-2xl block pb-1">Substrates</p>
              </div>
            </Link>
            <Link className="" href="/laboratory-equipments">
              <div className="border-0 border-b border-b-customWhite-light border-solid pt-1">
                <p className="text-customWhite font-bold text-2xl block pb-1">Lab</p>
              </div>
            </Link>
            <Link className="" href="/favorities">
              <div className="border-0 border-b border-b-customWhite-light border-solid pt-1">
                <p className="text-customWhite font-bold text-2xl block pb-1">Favorities</p>
              </div>
            </Link>
            <Link className="" href="/contact">
              <div className="border-0 border-b border-b-customWhite-light border-solid pt-1">
                <p className="text-customWhite font-bold text-2xl block pb-1">Contact</p>
              </div>
            </Link>
            <Link className="" href="/shipping">
              <div className="border-0 border-b border-b-customWhite-light border-solid pt-1">
                <p className="text-customWhite font-bold text-2xl block pb-1">Shipping</p>
              </div>
            </Link>
            <Link className="" href="/blog">
              <div className="border-0 border-b border-b-customWhite-light border-solid pt-1">
                <p className="text-customWhite font-bold text-2xl block pb-1">Blog</p>
              </div>
            </Link>
            <Link className="" href="/payments">
              <div className="border-0 border-b border-b-customWhite-light border-solid pt-1">
                <p className="text-customWhite font-bold text-2xl block pb-1">Payments</p>
              </div>
            </Link>
            <Link className="" href="/vlog">
              <div className="border-0 border-b border-b-customWhite-light border-solid pt-1">
                <p className="text-customWhite font-bold text-2xl block pb-1">Vlog</p>
              </div>
            </Link>
            <Link className="" href="/conditions">
              <div className="border-0 border-b border-b-customWhite-light border-solid pt-1">
                <p className="text-customWhite font-bold text-2xl block pb-1">Conditions</p>
              </div>
            </Link>
            <Link className="" href="/privacy">
              <div className="border-0 border-b border-b-customWhite-light border-solid pt-1">
                <p className="text-customWhite font-bold text-2xl block pb-1">Privacy</p>
              </div>
            </Link>
          </ul>
        </div>
      )}
    </div>
  )
}
