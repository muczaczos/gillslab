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
      className="fixed bg-white w-full z-50"
    >
      <div className="flex justify-end p-4">
        <HamburgerMenu />
      </div>
    </nav>
  )
}

export default HeaderComponent
