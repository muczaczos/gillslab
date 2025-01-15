import React from 'react'
import { Gutter } from '../../_components/Gutter'
import { fetchDocs } from '../../_api/fetchDocs'
import { fetchDoc } from '../../_api/fetchDoc'
import { Product, Page } from '../../../payload/payload-types'

type Props = Extract<Page['layout'][0], { blockType: 'filteredProducts' }> & {
  id?: string
}

export const FilteredProducts = async (props: Props) => {
  const { category } = props

  const products = await fetchDocs<Product>('products')
  const pages = await Promise.all(
    products.map(product =>
      fetchDoc<Page>({
        collection: 'products',
        slug: product.slug,
      }),
    ),
  )

  const filteredPages = pages.filter(page => page.categories?.[0]?.slug === category)

  return (
    <Gutter className="pb-20 justify-center flex flex-wrap">
      <h1>Filtered Products</h1>
      {filteredPages.map(page => (
        <div key={page.id}>
          <h2>{page.title}</h2>
        </div>
      ))}
    </Gutter>
  )
}
