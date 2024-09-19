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
      className="flex mb-1 justify-between items-center pt-1 pb-2 bg-primary w-full z-60"
    >
      <div className="scale-75">
        <Image
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/logo3.png`} // Ścieżka do obrazu w katalogu public
          alt="GillsLab logotype"
          width={200} // Szerokość obrazu
          height={20} // Wysokość obrazu
        />
      </div>
      <div className="flex mt-2 pr-2">
        <HamburgerMenu />
      </div>
    </nav>
  )
}

export default HeaderComponent
