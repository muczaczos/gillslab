import React, { useState } from 'react'

import FavoritiesProducts from '../FavoritiesProducts' // Upewnij się, że ścieżka jest poprawna
import GetLocalStorage from '../GetLocalStorage' // Upewnij się, że ścieżka jest poprawna

const FavoritiesPage = () => {
  const [favoriteSlugs, setFavoriteSlugs] = useState([]) // Stan dla slugów ulubionych produktów

  return (
    <div>
      <GetLocalStorage setFavoriteSlugs={setFavoriteSlugs} />
      <FavoritiesProducts favoriteSlugs={favoriteSlugs} />
    </div>
  )
}

export default FavoritiesPage
