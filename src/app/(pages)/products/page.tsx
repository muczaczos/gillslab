import React, { useState, useEffect } from 'react'
import { draftMode } from 'next/headers'

import { Category, Page } from '../../../payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import { Blocks } from '../../_components/Blocks'
import { Gutter } from '../../_components/Gutter'
import { HR } from '../../_components/HR'
import LayoutWithHeaderFooter from '../../layouts/withHeaderAndFooter/layout'
import Filters from './Filters'

import classes from './index.module.scss'

const Products = async () => {
  const { isEnabled: isDraftMode } = draftMode()

  const [page, setPage] = useState<Page | null>(null)
  const [categories, setCategories] = useState<Category[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch page and categories
        const fetchedPage = await fetchDoc<Page>({
          collection: 'pages',
          slug: 'products',
          draft: isDraftMode,
        })

        const fetchedCategories = await fetchDocs<Category>('categories')

        setPage(fetchedPage)
        setCategories(fetchedCategories)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [isDraftMode])

  // Sprawdzenie, czy dane są dostępne
  if (isLoading) {
    return <div>Loading...</div> // Komunikat ładowania
  }

  if (!page) {
    return <div>Page not found</div> // Obsługa błędu braku strony
  }

  if (!categories) {
    return <div>Categories not found</div> // Obsługa błędu braku kategorii
  }

  return (
    <LayoutWithHeaderFooter>
      <div className="bg-customWhite">
        <Gutter className={classes.products}>
          <Filters categories={categories} />
          <Blocks blocks={page.layout} disableTopPadding={true} />
        </Gutter>
      </div>
    </LayoutWithHeaderFooter>
  )
}

export default Products
