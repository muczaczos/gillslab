'use client' //you must use this directive when you wanna use 'pathname'

import React from 'react'
import { BiSolidDownArrow } from 'react-icons/bi'
import { FaHouse } from 'react-icons/fa6'
import { FiHeart, FiShoppingCart, FiUser } from 'react-icons/fi'
import { RiArrowDownSLine } from 'react-icons/ri'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Header } from '../../../../payload/payload-types'
import { noHeaderFooterUrls } from '../../../constants'
import { Gutter } from '../../Gutter'
import HamburgerMenu from '../../HamburgerMenu'
import { HeaderNav } from '../Nav'

const HeaderComponent = ({ header }: { header: Header }) => {
  const pathname = usePathname()

  return (
    <nav //add class 'hide' when noHeaderFooterUrls includes proper pathname
      className="md:flex md:justify-center pt-1 pb-2 bg-primary z-60 md:pl-7 md:pr-7 md:pb-4 md:pt-4 md:bg-[#5A7FD0]"
    >
      <section className="mb-1 flex justify-between md:items-center md:mb-0 md:w-[1536px]">
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
        <div className="hidden md:flex text-customWhite font-semibold gap-10">
          <p className="mr-1">About</p>
          <div className="flex">
            <p>Our Products</p>
            <RiArrowDownSLine className="mt-[6px]" />
          </div>
          <p className="mr-1">Contact</p>
          <p className="">Shipping</p>
        </div>
        <div className="hidden md:flex text-customWhite gap-2">
          <FaHouse />
          <FiShoppingCart />
          <FiHeart />
          <FiUser />
        </div>
      </section>
    </nav>
  )
}

export default HeaderComponent
