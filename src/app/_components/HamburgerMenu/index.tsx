'use client' // Dodaj to na początku pliku

import { useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi' // Import ikon z Heroicons

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
    <div className="relative z-40">
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
          <ul className="list-none p-4 text-center">
            <li>
              <a href="#" className="text-customWhite text-bold font-black text-4xl block">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-customWhite text-bold font-black text-4xl">
                About
              </a>
            </li>
            <li className="mt-0">
              <a href="#" className="text-customWhite text-bold font-black text-4xl leading-none">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="text-customWhite text-bold font-black text-4xl">
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
