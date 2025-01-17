'use client' // you must use this directive when you wanna use 'pathname'

import React, { useState } from 'react'
import { BiSolidDownArrow } from 'react-icons/bi'
import { FaHouse } from 'react-icons/fa6'
import { FiHeart, FiShoppingCart, FiUser } from 'react-icons/fi'
import { RiArrowDownSLine } from 'react-icons/ri'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Header } from '../../../../payload/payload-types'
import { useCart } from '../../../_providers/Cart'
import { noHeaderFooterUrls } from '../../../constants'
import { Gutter } from '../../Gutter'
import HamburgerMenu from '../../HamburgerMenu'
import { HeaderNav } from '../Nav'

const HeaderComponent = ({ header }: { header: Header }) => {
  const pathname = usePathname()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const { cart } = useCart()
  let totalItem = 0

  return (
    <nav
      // add class 'hide' when noHeaderFooterUrls includes proper pathname
      className="md:flex md:justify-center pt-1 pb-2 bg-primary z-60 md:pl-7 md:pr-7 md:pb-4 md:pt-4 md:bg-primary"
    >
      <section className="mb-1 flex justify-between md:items-center md:mb-0 md:w-[1536px]">
        <div className="scale-75">
          <Link href="/">
            <Image
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/logo3.png`} // Ścieżka do obrazu w katalogu public
              alt="GillsLab logotype"
              width={200} // Szerokość obrazu
              height={20} // Wysokość obrazu
            />
          </Link>
        </div>
        <div className="flex mt-2 pr-2 md:hidden">
          <HamburgerMenu />
        </div>
        <div className="hidden md:flex text-customWhite font-semibold gap-10">
          <Link className="text-customWhite" href={'/about'}>
            <p className="mr-1">About</p>
          </Link>

          {/* Dropdown for 'Our Products' */}
          <div className="relative">
            <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
              <p>Our Products</p>
              <RiArrowDownSLine className="mt-[6px]" />
            </div>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-1 bg-primary-light text-customWhite rounded-lg shadow-lg w-[150px]">
                <ul className="pt-2">
                  <Link href="/shop/cubensis-grow-kits">
                    <li className="group px-4 py-1 hover:bg-customWhite">
                      <p className="text-customWhite group-hover:text-primary-dark">Growkits</p>
                    </li>
                  </Link>
                  <Link href="/shop/cubensis-spore-syringes">
                    <li className="group px-4 py-1 hover:bg-customWhite">
                      <p className="text-customWhite group-hover:text-primary-dark">Spores</p>
                    </li>
                  </Link>
                  <Link href="/shop/cubensis-liquid-cultures">
                    <li className="group px-4 py-1 hover:bg-customWhite rounded-b-lg">
                      <p className="text-customWhite group-hover:text-primary-dark">Cultures</p>
                    </li>
                  </Link>
                  <Link href="/shop/laboratory-equipments">
                    <li className="group px-4 py-1 hover:bg-customWhite rounded-b-lg">
                      <p className="text-customWhite group-hover:text-primary-dark">Laboratory</p>
                    </li>
                  </Link>
                  <Link href="/shop/substrates">
                    <li className="group px-4 py-1 hover:bg-customWhite rounded-b-lg">
                      <p className="text-customWhite group-hover:text-primary-dark">Substrates</p>
                    </li>
                  </Link>
                </ul>
              </div>
            )}
          </div>

          <Link href="/contact">
            <p className="mr-1 text-customWhite">Contact</p>
          </Link>
          <Link href="/blog">
            <p className="text-customWhite">Blog</p>
          </Link>
        </div>

        <div className="hidden md:flex text-customWhite gap-2">
          <Link className="text-customWhite" href="/">
            <FaHouse />
          </Link>
          <Link className="text-customWhite relative" href="/cart">
            <FiShoppingCart className="text-2xl" />
            {cart?.items?.length > 0 && (
              <>
                {cart?.items?.forEach(item => {
                  if (typeof item.product === 'object' && item.quantity) {
                    totalItem += item.quantity
                  }
                })}
                {/* Badge z ilością produktów */}
                <span className="absolute top-[-8px] right-[-10px] bg-secondary text-customWhite rounded-full px-2 py-0 text-xs font-bold">
                  {totalItem}
                </span>
              </>
            )}
          </Link>

          <Link className="text-customWhite" href="/favorities">
            <FiHeart />
          </Link>
          <Link className="text-customWhite" href="/account">
            <FiUser />
          </Link>
        </div>
      </section>
    </nav>
  )
}

export default HeaderComponent
