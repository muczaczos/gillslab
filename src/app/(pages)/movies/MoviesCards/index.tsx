import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import MoviesCard from '../MoviesCard'

const MoviesCards = ({ movies }) => {
  // Podzielmy strony na 2 grupy: parzyste i nieparzyste
  const evenPages = movies.filter((_, index) => index % 2 === 0) // Elementy o parzystych indeksach
  const oddPages = movies.filter((_, index) => index % 2 !== 0) // Elementy o nieparzystych indeksach

  const everyFourthPage = movies.filter((_, index) => index % 4 === 0) // Elementy o indeksach 1, 5, 9, 13, ...
  const everyFourthPageStartingFromSecond = movies.filter((_, index) => index % 4 === 2)
  const everyFourthPageStartingFromThird = movies.filter((_, index) => (index - 1) % 4 === 0)
  const everyFourthPageStartingFromFourth = movies.filter((_, index) => (index - 3) % 4 === 0)

  return (
    <div className="md:max-w-[1536px]">
      <section className="csm:hidden sm:hidden flex w-full bg-customWhite">
        <div className="w-full p-2">
          <MoviesCard movies={movies} />
        </div>
      </section>

      <section className="hidden csm:flex csm:w-full sm:flex sm:w-full md:hidden bg-customWhite">
        {/* Kolumna dla elementów o parzystych indeksach */}
        <div className="w-1/2 p-2">
          <MoviesCard movies={evenPages} />
        </div>

        {/* Kolumna dla elementów o nieparzystych indeksach */}
        <div className="w-1/2 p-2">
          <MoviesCard movies={oddPages} />
        </div>
      </section>

      <section className="hidden md:flex md:w-full bg-customWhite">
        {/* Kolumna dla elementów o parzystych indeksach */}
        <div className="w-1/4 p-2">
          <MoviesCard movies={everyFourthPage} />
        </div>

        <div className="w-1/4 p-2">
          <MoviesCard movies={everyFourthPageStartingFromSecond} />
        </div>

        <div className="w-1/4 p-2">
          <MoviesCard movies={everyFourthPageStartingFromThird} />
        </div>

        {/* Kolumna dla elementów o nieparzystych indeksach */}
        <div className="w-1/4 p-2">
          <MoviesCard movies={everyFourthPageStartingFromFourth} />
        </div>
      </section>
    </div>
  )
}

export default MoviesCards
