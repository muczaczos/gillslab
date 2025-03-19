'use client'
import React, { useEffect, useState } from 'react'

import { Page, Product } from '../../../payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import { Gutter } from '../../_components/Gutter'
import ProductsCarousel from '../../_components/ProductsCarousel'

type Props = {
  title: string
}

interface Page {
  slug: string
  title: string
  categories: {
    slug: string
  }
}

export const ShopCarousel: React.FC<Props> = ({ title }) => {
  const [filteredPages, setFilteredPages] = useState<Page[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      let products: Product[] | null = null
      let pages: Page[] = []

      try {
        products = await fetchDocs<Product>('products')

        // Pobieranie pełnych danych produktów
        for (let i = 0; i < products.length; i++) {
          const page = await fetchDoc<Page>({
            collection: 'products',
            slug: products[i].slug,
          })
          pages.push(page)
        }
      } catch (error) {
        //console.error('Błąd pobierania danych produktów:', error)
      }

      // Filtrowanie stron według kategorii
      const filtered = pages.filter(page => {
        // Asercja, że categories na pewno istnieje
        if (page.categories! && page.categories![0]) {
          return page.categories![0].slug === title
        }
        return false
      })

      setFilteredPages(filtered)
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
      <ProductsCarousel filteredPages={filteredPages} category={title} />
    </Gutter>
  )
}
