'use client' //you must use this directive when you wanna use 'pathname'

import React from 'react'
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
      className="flex justify-between items-center p-1 fixed bg-primary-light w-full z-60"
    >
      <div className="scale-75">
        <Image
          src="/media/logo3.png" // Ścieżka do obrazu w katalogu public
          alt="GillsLab logotype"
          width={240} // Szerokość obrazu
          height={20} // Wysokość obrazu
        />
      </div>
      <div className="flex p-2">
        <HamburgerMenu />
      </div>
    </nav>
  )
}

export default HeaderComponent
