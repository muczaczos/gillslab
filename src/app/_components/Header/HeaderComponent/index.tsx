'use client' //you must use this directive when you wanna use 'pathname'

import React from 'react'
import { BiSolidDownArrow } from 'react-icons/bi'
import { FaHouse } from 'react-icons/fa6'
import { FiHeart, FiShoppingCart, FiUser } from 'react-icons/fi'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { RiArrowDownSLine } from "react-icons/ri";

import { Header } from '../../../../payload/payload-types'
import { noHeaderFooterUrls } from '../../../constants'
import { Gutter } from '../../Gutter'
import HamburgerMenu from '../../HamburgerMenu'
import { HeaderNav } from '../Nav'

const HeaderComponent = ({ header }: { header: Header }) => {
  const pathname = usePathname()

  return (
    <nav //add class 'hide' when noHeaderFooterUrls includes proper pathname
      className="flex mb-1 justify-between items-center pt-1 pb-2 bg-primary w-full z-60 md:mb-0 md:pl-7 md:pr-7 md:pb-4 md:pt-4 md:bg-[#5A7FD0]"
    >
      <div className="scale-75">
        <Image
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/logo3.png`} // Ścieżka do obrazu w katalogu public
          alt="GillsLab logotype"
          width={200} // Szerokość obrazu
          height={20} // Wysokość obrazu
        />
      </div>
      <div className="flex mt-2 pr-2 md:hidden">
        <HamburgerMenu />
      </div>
      <div className="hidden md:flex text-customWhite font-semibold gap-3">
        <p>About</p>
        <div className="flex">
          <p>Our Products</p>
          <RiArrowDownSLine className="mt-[6px]" />
        </div>
        <p>Contact</p>
        <p>Shipping</p>
      </div>
      <div className="hidden md:flex text-customWhite gap-2">
        <FaHouse />
        <FiShoppingCart />
        <FiHeart />
        <FiUser />
      </div>
    </nav>
  )
}

export default HeaderComponent
