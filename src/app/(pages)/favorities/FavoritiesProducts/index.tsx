import React, { useEffect, useState } from 'react'

import { fetchDoc } from '../../../_api/fetchDoc' // Upewnij się, że ścieżka jest poprawna

const FavoritiesProducts = ({ favoriteSlugs }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await Promise.all(
        favoriteSlugs.map(async slug => {
          try {
            const product = await fetchDoc({
              collection: 'products',
              slug: slug,
            })
            return product
          } catch (error) {
            console.error(`Error fetching product with slug ${slug}:`, error)
            return null // Zwróć null, jeśli wystąpił błąd
          }
        }),
      )

      // Filtrujemy null z produktów, które nie mogły zostać pobrane
      setProducts(fetchedProducts.filter(Boolean))
      setLoading(false)
    }

    if (favoriteSlugs.length > 0) {
      fetchProducts()
    } else {
      setLoading(false) // Jeśli nie ma ulubionych slugów, ustaw loading na false
    }
  }, [favoriteSlugs])

  if (loading) {
    return <div>Loading...</div> // Możesz dodać ładujący komponent
  }

  return (
    <div>
      <h2>Ulubione Produkty</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            {/* Dodaj inne szczegóły produktu, jak obraz, cena itp. */}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FavoritiesProducts
