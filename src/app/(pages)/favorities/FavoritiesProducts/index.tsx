import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { fetchDoc } from '../../../_api/fetchDoc' // Upewnij się, że ścieżka jest poprawna

const FavoritiesProducts = ({ favoriteSlugs }) => {
  const [products, setProducts] = useState([])
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!favoriteSlugs || favoriteSlugs.length === 0) {
      setLoading(false)
      return
    }

    const fetchProductsAndPages = async () => {
      try {
        // Pobierz produkty na podstawie slugów
        const fetchedProducts = await Promise.all(
          favoriteSlugs.map(async slug => {
            try {
              return await fetchDoc({
                collection: 'products',
                slug: slug,
              })
            } catch (error) {
              return null // Zwróć null, jeśli wystąpił błąd
            }
          }),
        )

        const validProducts = fetchedProducts.filter(Boolean)
        setProducts(validProducts)

        // Pobierz strony dla każdego produktu
        const fetchedPages = await Promise.all(
          validProducts.map(async product => {
            try {
              return await fetchDoc({
                collection: 'pages', // Zakładam, że kolekcja stron to 'pages'
                slug: product.slug,
              })
            } catch (error) {
              return null
            }
          }),
        )

        setPages(fetchedPages.filter(Boolean))
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }

    fetchProductsAndPages()
  }, [favoriteSlugs])

  if (loading) {
    return <div>Loading...</div> // Możesz dodać ładujący komponent
  }

  return (
    <div className="w-full bg-customWhite">
      <ul className="flex flex-wrap gap-8 justify-center bg-customWhite">
        {products.map((product, index) =>
          product.categories?.[0]?.slug ? ( // Sprawdzam, czy kategoria istnieje
            <Link
              href={`/shop/${product.categories[0].slug}/${product.slug}`}
              className="shadow-xl bg-[rgba(187,204,241,0.1)] border-2 border-solid border-primary rounded-2xl px-10 pt-10 pb-5"
              key={product.id}
            >
              <li>
                {product.media1?.url ? ( // Sprawdzam, czy istnieje obrazek
                  <Image
                    alt="Cubensis grow kit"
                    src={product.media1.url}
                    width={250}
                    height={180}
                  />
                ) : (
                  <div className="w-[250px] h-[180px] flex items-center justify-center bg-gray-200 text-gray-500">
                    No image available
                  </div>
                )}
                <h3 className="text-xl pt-5 text-primary-dark">{product.title}</h3>
                <p className="text-md text-primary font-semibold">Price: ${product.price}</p>
              </li>
            </Link>
          ) : null,
        )}
      </ul>
    </div>
  )
}

export default FavoritiesProducts
