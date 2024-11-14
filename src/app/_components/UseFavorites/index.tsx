// useFavorites.js
import { useEffect, useState } from 'react'

const useFavorites = () => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    // Ładowanie ulubionych z localStorage
    if (typeof window !== 'undefined') {
      const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
      setFavorites(savedFavorites)
    }
  }, [])

  const toggleFavorite = slug => {
    let updatedFavorites
    if (favorites.includes(slug)) {
      // Usuń z ulubionych
      updatedFavorites = favorites.filter(favSlug => favSlug !== slug)
    } else {
      // Dodaj do ulubionych
      updatedFavorites = [...favorites, slug]
    }
    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  return { favorites, toggleFavorite }
}

export default useFavorites
