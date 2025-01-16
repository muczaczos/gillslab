'use client'
import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'

import { Page, Product } from '../../../payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import { Gutter } from '../../_components/Gutter'
import useFavorites from '../../_components/UseFavorites'

type Props = Extract<Page['layout'][0], { blockType: 'filteredProducts' }> & {
  id?: string
}

export const FilteredProducts = (props: Props) => {
  const { category } = props

  const { favorites, toggleFavorite } = useFavorites()

  const [filteredPages, setFilteredPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch products
        const products = await fetchDocs<Product>('products')

        // Fetch pages for each product
        const pages = await Promise.all(
          products.map(product =>
            fetchDoc<Page>({
              collection: 'products',
              slug: product.slug,
            }),
          ),
        )

        // Filter pages based on category
        const filteredPages = pages.filter(page => page.categories?.[0]?.slug === category)

        // Update state with filtered pages
        setFilteredPages(filteredPages)
      } catch (error) {
        console.error('Error fetching filtered pages:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [category]) // Re-run effect if the category changes

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Gutter>
      <section className="mt-10 flex flex-col gap-5 justify-center md:flex-wrap md:flex-row md:justify-between">
        {filteredPages.map((item, index) => {
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
                  <div className="px-16 pb-3">
                    <Image
                      alt="Cubensis grow kit"
                      src={src}
                      width={150}
                      height={180}
                      className="w-[150px] lg:w-[200px]"
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
    </Gutter>
  )
}
