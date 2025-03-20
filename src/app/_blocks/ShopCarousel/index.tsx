'use client'
import React, { useEffect, useState } from 'react'

import { Product } from '../../../payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import { Gutter } from '../../_components/Gutter'
import ProductsCarousel from '../../_components/ProductsCarousel'

type Props = {
  title: string
}

export const ShopCarousel: React.FC<Props> = ({ title }) => {
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
        console.error('Błąd pobierania danych produktów:', error)
      }

      // Filtrowanie produktów według kategorii
      const filtered = products.filter(product =>
        product.categories?.some(category => category.slug === title)
      )

      setFilteredProducts(filtered)
      setLoading(false)
    }

    fetchData()
  }, [title]) // Zaktualizuj dane, jeśli `title` się zmieni

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Gutter className="pb-20 justify-center flex flex-wrap">
      <h2 className="text-lg font-bold text-customGray-dark mb-2">{title}</h2>
      <ProductsCarousel filteredPages={filteredProducts} category={title} />
    </Gutter>
  )
}
