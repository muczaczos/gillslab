'use client'

import React, { useEffect, useState } from 'react'

import { Page } from '../../../payload/payload-types'
import { fetchProductsByCategory } from '../../_api/fetchProductsByCategory'
import { Gutter } from '../../_components/Gutter'
import ProductsCarousel from '../../_components/ProductsCarousel'

type ShopCarouselBlockProps = {
  title: string
  category_slug: string
}

const ShopCarouselBlock: React.FC<ShopCarouselBlockProps> = ({ title, category_slug }) => {
  const [products, setProducts] = useState<Page[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true)
      const fetchedProducts = await fetchProductsByCategory(category_slug)
      setProducts(fetchedProducts)
      setIsLoading(false)
    }

    loadProducts()
  }, [category_slug])

  if (isLoading) {
    return <p>Ładowanie produktów...</p>
  }

  return (
    <Gutter className="pb-20 justify-center flex flex-wrap">
      <h2 className="text-lg font-bold text-customGray-dark mb-2">{title}</h2>
      <ProductsCarousel filteredPages={products} category={category_slug} />
    </Gutter>
  )
}

export default ShopCarouselBlock
