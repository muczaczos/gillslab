'use client'
import React from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'

import useFavorites from '../../../../_components/UseFavorites'

const GrowkitsCards = ({ pages }) => {
  // Stan do przechowywania ulubionych produktów
  const { favorites, toggleFavorite } = useFavorites()

  return (
    <section className="mt-10 flex flex-col gap-5 justify-center md:flex-wrap md:flex-row md:justify-between">
      {pages.map((item, index) => {
        if (!item) return null

        const src = item.media1.url
        const href = `/shop/${item.categories[0].slug}/${item.slug}`
        const title = item.title
        const price = item.price

        return (
          <div className="flex justify-center" key={index}>
            <Link href={href}>
              <div className="shadow-xl bg-[rgba(187,204,241,0.1)] border-2 border-solid border-primary rounded-2xl">
                <div className="flex justify-end pt-4 px-4">
                  {/* Warunkowe renderowanie ikony serca */}
                  {favorites.includes(item.slug) ? (
                    <FaHeart
                      className="text-secondary text-4xl cursor-pointer"
                      onClick={e => {
                        e.preventDefault()
                        toggleFavorite(item.slug)
                      }}
                    />
                  ) : (
                    <FaRegHeart
                      className="text-primary text-4xl cursor-pointer"
                      onClick={e => {
                        e.preventDefault()
                        toggleFavorite(item.slug)
                      }}
                    />
                  )}
                </div>

                {/* Powiększony obrazek */}
                <div className="px-16 pb-3">
                  <Image
                    alt="Cubensis grow kit"
                    src={src}
                    width={150 * 1.5} // Powiększenie szerokości 1.5x
                    height={180 * 1.5} // Powiększenie wysokości 1.5x
                    className="w-[225px] lg:w-[300px]" // Powiększona szerokość w Tailwind
                  />
                </div>

                <h6 className="pl-5 text-xl text-primary">{title}</h6>
                <p className="pl-5 text-xl pb-4 font-bold text-primary">€{price}</p>
              </div>
            </Link>
          </div>
        )
      })}
    </section>
  )
}

export default GrowkitsCards
