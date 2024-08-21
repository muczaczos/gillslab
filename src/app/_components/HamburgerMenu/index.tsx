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
        className="flex bg-white items-center justify-center w-12 h-12 text-3xl focus:outline-none border-0 z-50"
        onClick={toggleMenu}
      >
        {isOpen ? <HiX className="fixed text-black z-50" /> : <HiMenu className="text-black" />}
      </button>

      {/* Menu po otwarciu */}
      {isOpen && (
        <div className="fixed inset-0 bg-white flex flex-col justify-center items-center z-40">
          {/* Przycisk zamykania menu */}
          <ul className="list-none p-4 space-y-8 text-center">
            <li>
              <a href="#" className="text-black text-2xl block">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-black text-2xl block">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-black text-2xl block">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="text-black text-2xl block">
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
