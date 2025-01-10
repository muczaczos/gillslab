'use client'
import React, { useEffect, useState } from 'react'
import { FaHouse } from 'react-icons/fa6'
import { FiHeart, FiShoppingCart, FiUser } from 'react-icons/fi'
import { RiArrowDownSLine } from 'react-icons/ri'
import Image from 'next/image'
import Link from 'next/link'

import { Header as HeaderType } from '../../../payload/payload-types'
import { fetchHeader } from '../../_api/fetchGlobals'
import HeaderComponent from './HeaderComponent'
import { HeaderNav } from './Nav'

import classes from './index.module.scss'

export function Header() {
  const [header, setHeader] = useState<HeaderType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadHeader = async () => {
      try {
        const headerData = await fetchHeader()
        setHeader(headerData)
      } catch (error) {
        setError('Failed to load header')
      } finally {
        setLoading(false)
      }
    }

    loadHeader()
  }, [])

  if (loading) {
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
            <div className="relative z-[60]">
              {/* Przycisk menu */}
              <button className="flex items-center justify-center bg-primary w-12 h-12 text-3xl focus:outline-none border-none z-40">
                <div className="flex flex-col bg-primary items-center justify-center w-8 h-8">
                  <div className="w-8 h-1 bg-customWhite mb-1"></div>
                  <div className="w-8 h-1 bg-customWhite mb-1"></div>
                  <div className="w-8 h-1 bg-customWhite mb-1"></div>
                </div>
              </button>
            </div>
          </div>
          <div className="hidden md:flex text-customWhite font-semibold gap-10">
            <Link className="text-customWhite" href={'/about'}>
              <p className="mr-1">About</p>
            </Link>

            {/* Dropdown for 'Our Products' */}
            <div className="relative">
              <div className="flex items-center cursor-pointer">
                <p>Our Products</p>
                <RiArrowDownSLine className="mt-[6px]" />
              </div>
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
    ) // Możesz użyć spinnera lub innego wskaźnika ładowania
  }

  if (error) {
    return <div>{error}</div> // Wyświetl błąd w przypadku problemów z ładowaniem
  }

  if (!header) {
    return <div>No header data available</div> // Wyświetl domyślną treść, jeśli brak danych
  }

  return <HeaderComponent header={header} />
}
