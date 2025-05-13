'use client'
import React, { useEffect, useState } from 'react'

import { Product } from '../../../payload/payload-types'
import { fetchFilteredProducts } from '../../_api/fetchFilteredProducts' // <- Twój nowy fetcher
import { Gutter } from '../../_components/Gutter'
import ProductsCarousel from '../../_components/ProductsCarousel'

type Props = {
  title: string
  category_slug: string
  disable: boolean
}

export const ShopCarousel: React.FC<Props> = ({ title, category_slug }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await fetchFilteredProducts(category_slug)
        setFilteredProducts(products)
      } catch (error) {
        //console.error('❌ Błąd pobierania produktów:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [category_slug])

  if (loading) {
    return <div>Loading...</div>
  }

  if (filteredProducts.length === 0) {
    return (
      <Gutter className="pb-20 justify-center">
        <h2 className="text-primary-dark">{title}</h2>
        <p className="text-center text-gray-500 mt-4">Brak produktów w tej kategorii.</p>
      </Gutter>
    )
  }

  return (
    <Gutter className="pb-20 justify-center">
      <h2 className="text-primary-dark">{title}</h2>
      <ProductsCarousel filteredPages={filteredProducts} category={category_slug} />
    </Gutter>
  )
}
