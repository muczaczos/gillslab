import { useEffect, useState } from 'react'
import { draftMode } from 'next/headers'

import { Page, Product } from '../../../payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'

type Props = {
  categorySlug: string
}

export const useFilteredProducts = ({ categorySlug }: Props) => {
  const { isEnabled: isDraftMode } = draftMode() // Sprawdzamy, czy tryb roboczy jest włączony
  const [filteredProducts, setFilteredProducts] = useState<Page[]>([]) // Przechowujemy przefiltrowane dane
  const [loading, setLoading] = useState(true) // Stan ładowania
  const [error, setError] = useState<string | null>(null) // Potencjalny błąd

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Pobieramy wszystkie produkty
        const products = await fetchDocs<Product>('products')

        // Dla każdego produktu pobieramy szczegóły
        const pages = await Promise.all(
          products.map(product =>
            fetchDoc<Page>({
              collection: 'products',
              slug: product.slug,
              draft: isDraftMode,
            }),
          ),
        )

        // Filtrowanie stron według kategorii
        const filtered = pages.filter((page: any) => page?.categories?.[0]?.slug === categorySlug)

        // Ustawienie przefiltrowanych wyników
        setFilteredProducts(filtered)
      } catch (err) {
        setError('Błąd pobierania danych') // W przypadku błędu
        console.error(err)
      } finally {
        setLoading(false) // Ustawienie stanu ładowania na fałsz po zakończeniu
      }
    }

    fetchData() // Wywołanie funkcji fetchData
  }, [categorySlug, isDraftMode]) // Funkcja będzie się wywoływać, gdy `categorySlug` lub `isDraftMode` się zmienią

  return { filteredProducts, loading, error } // Zwracamy dane, stan ładowania i ewentualne błędy
}
