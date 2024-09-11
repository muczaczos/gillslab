import React from 'react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { Product, Product as ProductType } from '../../../../payload/payload-types'
import { fetchDoc } from '../../../_api/fetchDoc'
import { fetchDocs } from '../../../_api/fetchDocs'
import { Blocks } from '../../../_components/Blocks'
import { HR } from '../../../_components/HR'
import { ProductHero } from '../../../_heros/Product'
import { generateMeta } from '../../../_utilities/generateMeta'
import RootLayout from '../../../layout' // Import RootLayout, jeśli potrzebujesz na poziomie strony

// Force this page to be dynamic so that Next.js does not cache it
export const dynamic = 'force-dynamic'

export default async function Products({ params: { slug } }) {
  const { isEnabled: isDraftMode } = draftMode()

  let product: Product | null = null
  let hideFooter = false

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

  return (
    // Przekazanie hideFooter do RootLayout
    <RootLayout hideFooter={hideFooter}>
      <ProductHero product={product} />
      <HR />
      <Blocks
        disableTopPadding
        blocks={[
          {
            blockType: 'relatedProducts',
            blockName: 'Related Product',
            relationTo: 'products',
            introContent: [
              {
                type: 'h3',
                children: [
                  {
                    text: 'Related Products',
                  },
                ],
              },
            ],
            docs: relatedProducts,
          },
        ]}
      />
    </RootLayout>
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
