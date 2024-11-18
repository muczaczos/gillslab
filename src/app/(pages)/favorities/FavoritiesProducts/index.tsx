import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { fetchDoc } from '../../../_api/fetchDoc' // Upewnij się, że ścieżka jest poprawna

const FavoritiesProducts = ({ favoriteSlugs }) => {
  const [products, setProducts] = useState([])
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProductsAndPages = async () => {
      try {
        // Pobierz produkty na podstawie slugów
        const fetchedProducts = await Promise.all(
          favoriteSlugs.map(async slug => {
            try {
              const product = await fetchDoc({
                collection: 'products',
                slug: slug,
              })
              return product
            } catch (error) {
              return null // Zwróć null, jeśli wystąpił błąd
            }
          }),
        )

        // Filtruj niepobrane produkty
        const validProducts = fetchedProducts.filter(Boolean)
        setProducts(validProducts)

        // Pobierz strony dla każdego produktu
        const fetchedPages = await Promise.all(
          validProducts.map(async product => {
            try {
              const page = await fetchDoc({
                collection: 'pages', // Zakładam, że kolekcja stron to 'pages'
                slug: product.slug, // Używamy slug produktu do pobrania powiązanej strony
              })
              return page
            } catch (error) {
              return null
            }
          }),
        )

        setPages(fetchedPages.filter(Boolean)) // Filtruj null dla stron
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }

    if (favoriteSlugs.length > 0) {
      fetchProductsAndPages()
    } else {
      setLoading(false) // Jeśli nie ma ulubionych slugów, ustaw loading na false
    }
  }, [favoriteSlugs])

  if (loading) {
    return <div>Loading...</div> // Możesz dodać ładujący komponent
  }
  console.log('product href: ' + JSON.stringify(products, null, 2))
  console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
  return (
    <div className="w-full bg-customWhite">
      <ul className="flex flex-wrap gap-8 justify-center bg-customWhite">
        {products.map((product, index) => (
          <Link
            href={`/${product.categories[index].slug}/${product.slug}`}
            className="shadow-xl bg-[rgba(187,204,241,0.1)] border-2 border-solid border-primary rounded-2xl px-10 pt-10 pb-5"
            key={product.id}
          >
            <li className="">
              <Image
                alt="Cubensis grow kit"
                src={product.media1.url}
                width={250}
                height={180}
                className=""
              />
              <h3 className="text-xl pt-5 text-primary-dark">{product.title}</h3>
              <p className="text-md text-primary font-semibold">Price: ${product.price}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default FavoritiesProducts
