import React from 'react'
import { Metadata } from 'next'
// Force this page to be dynamic so that Next.js does not cache it
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { Product, Product as ProductType } from '../../../../payload/payload-types'
import { fetchDoc } from '../../../_api/fetchDoc'
import { fetchDocs } from '../../../_api/fetchDocs'
import { Blocks } from '../../../_components/Blocks'
import { ProductHero } from '../../../_heros/Product'
import { generateMeta } from '../../../_utilities/generateMeta'
import LayoutWithNoHeaderAndFooter from '../../../layouts/withNoFooter/layout'
import { ProductContent } from '../ProductContent'
import { RelatedMovies } from '../RelatedMovies'
export default async function Products({ params: { slug } }) {
  const { isEnabled: isDraftMode } = draftMode()

  let product: Product | null = null
  let hideFooter = false

  let productDetails
  let productFaq

  try {
    product = await fetchDoc<Product>({
      collection: 'products',
      slug,
      draft: isDraftMode,
    })
    hideFooter = product ? product.hideFooter : false
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }

  if (!product) {
    notFound()
  }

  const { relatedProducts } = product
  if (product.layout) {
    // Iteruj przez każdy element w layout
    product.layout.forEach(layoutItem => {
      // Sprawdź, czy obiekt layoutItem ma właściwość columns
      if (layoutItem.blockType === 'content' && layoutItem.columns) {
        // Jeśli columns istnieje, możesz uzyskać do niego dostęp tutaj
        const columns = layoutItem.columns
        // Możesz dalej przetwarzać columns
        // np. możesz iterować przez każdą kolumnę i wykonywać odpowiednie operacje
        productDetails = columns[1]
        productFaq = columns[2]
      }
    })
  }

  return (
    // Przekazanie hideFooter do RootLayout
    <LayoutWithNoHeaderAndFooter>
      <ProductHero product={product} />
      <ProductContent product={product} />
      <RelatedMovies />
    </LayoutWithNoHeaderAndFooter>
  )
}

export async function generateStaticParams() {
  try {
    const products = await fetchDocs<ProductType>('products')
    return products?.map(({ slug }) => ({ slug }))
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode()

  let product: Product | null = null

  try {
    product = await fetchDoc<Product>({
      collection: 'products',
      slug,
      draft: isDraftMode,
    })
  } catch (error) { }

  return generateMeta({ doc: product })
}
