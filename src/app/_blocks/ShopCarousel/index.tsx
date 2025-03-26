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
  disable: boolean
}

export const ShopCarousel: React.FC<Props> = ({ title, category_slug }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Pobierz listę produktów (ogólny zarys)
        const fetchedProducts = await fetchDocs<Product>('products')
        console.log('📦 Produkty z API:', fetchedProducts)

        // Równoległe pobieranie pełnych danych produktów
        const productPromises = fetchedProducts.map(prod => {
          console.log(`Fetching: ${prod.slug}`)
          return fetchDoc<Product>({
            collection: 'products',
            slug: prod.slug,
          })
        })

        const products = await Promise.all(productPromises)
        console.log('✅ Wszystkie produkty pobrane:', products)

        // Filtrowanie produktów po kategorii i dodatkowo usunięcie tych, które mają disabled = true
        const filtered = products.filter(
          product =>
            !product.disable && // Wyklucza produkty z disabled = true
            product.categories?.some(
              category =>
                typeof category === 'object' &&
                'slug' in category &&
                category.slug === category_slug,
            ),
        )

        console.log('🎯 Produkty po filtracji:', filtered)

        setFilteredProducts(filtered)
      } catch (error) {
        console.error('Błąd pobierania danych produktów:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [category_slug])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Gutter className="pb-20 justify-center">
      <h2 className="text-primary-dark">{title}</h2>
      <ProductsCarousel filteredPages={filteredProducts} category={category_slug} />
    </Gutter>
  )
}
