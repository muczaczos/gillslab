"use client"; // Dodaj to na początku pliku

import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi'; // Import ikon z Heroicons

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-50">
      {/* Przycisk menu */}
      <button
        className="flex items-center justify-center w-12 h-12 text-3xl focus:outline-none border-0 z-70"
        onClick={toggleMenu}
      >
        {isOpen ? (
          // Krzyżyk (X)
          <div className="relative w-8 h-8">
            <div className="absolute w-8 h-1 bg-customWhite rotate-45 top-3 left-0"></div>
            <div className="absolute w-8 h-1 bg-customWhite -rotate-45 bottom-3 left-0"></div>
          </div>
        ) : (
          // Hamburger menu
          <div className="flex flex-col items-center justify-center w-8 h-8">
            <div className="w-8 h-1 bg-customWhite mb-1"></div>
            <div className="w-8 h-1 bg-customWhite mb-1"></div>
            <div className="w-8 h-1 bg-customWhite"></div>
          </div>
        )}
      </button>


      {/* Menu po otwarciu */}
      {isOpen && (
        <div className="fixed inset-0 bg-primary-light flex flex-col justify-center items-center z-40">
          {/* Przycisk zamykania menu */}
          <ul className="list-none p-4 space-y-8 text-center">
            <li>
              <a href="#" className="text-customWhite text-2xl block">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-customWhite text-2xl block">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-customWhite text-2xl block">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="text-customWhite text-2xl block">
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
