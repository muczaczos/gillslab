'use client'
import React, { useEffect, useState } from 'react'

import { Product } from '../../../payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import { Gutter } from '../../_components/Gutter'
import ProductsCarousel from '../../_components/ProductsCarousel'

type Props = {
  title: string
  category_slug: string
}

export const ShopCarousel: React.FC<Props> = ({ title, category_slug }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      let products: Product[] = []

      try {
        const fetchedProducts = await fetchDocs<Product>('products')

        // Pobieranie pełnych danych produktów
        for (let i = 0; i < fetchedProducts.length; i++) {
          const product = await fetchDoc<Product>({
            collection: 'products',
            slug: fetchedProducts[i].slug,
          })
          products.push(product)
        }
      } catch (error) {
        //console.error('Błąd pobierania danych produktów:', error)
      }

      const filtered = products.filter(product =>
        product.categories?.some(
          category => typeof category === 'object' && 'slug' in category && category.slug === category_slug,
        ),
      )

      setFilteredProducts(filtered)
      setLoading(false)
    }

    fetchData()
  }, [category_slug]) // Zaktualizuj dane, jeśli `title` się zmieni

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Gutter className="pb-20 justify-center ">
      <h2>{title}</h2>
      <ProductsCarousel filteredPages={filteredProducts} category={category_slug} />
    </Gutter>
  )
}
