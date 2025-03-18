import { draftMode } from 'next/headers'

import type { Page, Product } from '../../payload/payload-types'
import { fetchDoc } from '../_api/fetchDoc'
import { fetchDocs } from '../_api/fetchDocs'

export const fetchProductsByCategory = async (category_slug: string): Promise<Page[]> => {
  const { isEnabled: isDraftMode } = draftMode()

  try {
    const products = await fetchDocs<Product>('products', isDraftMode)

    // Filtrujemy produkty należące do danej kategorii
    const filteredProducts = products.filter(product =>
      product.categories?.some(
        category =>
          typeof category === 'object' && 'slug' in category && category.slug === category_slug,
      ),
    )

    // Pobieramy pełne informacje o stronach dla tych produktów
    const pages = await Promise.all(
      filteredProducts.map(product =>
        fetchDoc<Page>({
          collection: 'products',
          slug: product.slug,
          draft: isDraftMode,
        }),
      ),
    )

    return pages
  } catch (error: unknown) {
    if (error instanceof Error) {
      // console.error('Error fetching pages by category:', error.message)
    } else {
      //  console.error('Unexpected error:', error)
    }
    return []
  }
}
