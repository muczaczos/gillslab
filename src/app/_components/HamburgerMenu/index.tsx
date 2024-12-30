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
          className={`fixed inset-0 bg-primary flex flex-col justify-center items-center ${
            isClosing ? 'animate-slideUp' : 'animate-slideDown'
          }`}
        >
          <div
            className="absolute inset-0 bg-no-repeat bg-cover opacity-5"
            style={{ backgroundImage: "url('/media/eyes.png')" }}
          ></div>
          <div className="flex justify-center gap-2 p-4 text-left z-50 w-full">
            <div>
              <p className="text-customWhite font-black text-3xl underline">Info</p>
              <Link className="" href="/vlog">
                <div className="pt-1">
                  <p className="text-customWhite font-bold text-2xl block pb-3">Vlog</p>
                </div>
              </Link>
              <Link className="" href="/blog">
                <div className="pt-1">
                  <p className="text-customWhite font-bold text-2xl block pb-3">Blog</p>
                </div>
              </Link>
              <Link href="/about">
                <div className=" pt-1">
                  <p className="text-customWhite font-bold text-2xl block pb-3">About</p>
                </div>
              </Link>
              <Link className="" href="/privacy">
                <div className=" pt-1">
                  <p className="text-customWhite font-bold text-2xl block pb-3">Privacy</p>
                </div>
              </Link>
              <Link className="" href="/contact">
                <div className="pt-1">
                  <p className="text-customWhite font-bold text-2xl block pb-3">Contact</p>
                </div>
              </Link>
              <Link className="" href="/shipping">
                <div className="pt-1">
                  <p className="text-customWhite font-bold text-2xl block pb-3">Shipping</p>
                </div>
              </Link>
              <Link className="" href="/payments">
                <div className="pt-1">
                  <p className="text-customWhite font-bold text-2xl block pb-3">Payments</p>
                </div>
              </Link>
              <Link className="" href="/conditions">
                <div className=" pt-1">
                  <p className="text-customWhite font-bold text-2xl block pb-3">Conditions</p>
                </div>
              </Link>
            </div>
            <div>
              <p className="text-customWhite font-black text-3xl underline">Products</p>
              <Link className="" href="/laboratory-equipments">
                <div className="pt-1">
                  <p className="text-customWhite font-bold text-2xl block pb-3">Lab</p>
                </div>
              </Link>
              <Link className="" href="/cubensis-spore-syringes">
                <div className="pt-1">
                  <p className="text-customWhite font-bold text-2xl block pb-3">Spores</p>
                </div>
              </Link>
              <Link className="" href="/cubensis-liquid-cultures">
                <div className="pt-1">
                  <p className="text-customWhite font-bold text-2xl block pb-3">Cultures</p>
                </div>
              </Link>
              <Link className="" href="/cubensis-grow-kits">
                <div className="pt-1">
                  <p className="text-customWhite font-bold text-2xl block pb-3">Growkits</p>
                </div>
              </Link>
              <Link className="" href="/favorities">
                <div className="pt-1">
                  <p className="text-customWhite font-bold text-2xl block pb-3">Favorities</p>
                </div>
              </Link>
              <Link className="" href="/substrates">
                <div className="pt-1">
                  <p className="text-customWhite font-bold text-2xl block pb-3">Substrates</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
