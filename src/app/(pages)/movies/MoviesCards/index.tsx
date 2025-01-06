import React from 'react'
import MoviesCard from '../MoviesCard'

const MoviesCards = ({ movies }) => {
  if (!movies || movies.length === 0) return null // Jeśli nie ma filmów, nic nie renderuj

  if (movies.length === 1) {
    // Jeśli jest tylko jeden film, renderuj go w pełnej szerokości
    return (
      <div className="w-full md:max-w-[1536px] bg-customWhite p-4 flex justify-center md:justify-start">
        <div className="w-full flex justify-center md:w-1/4">
          <MoviesCard movies={movies} />
        </div>
      </div>
    )
  }

  // Podzielmy strony na grupy dla różnych układów
  const evenPages = movies.filter((_, index) => index % 2 === 0)
  const oddPages = movies.filter((_, index) => index % 2 !== 0)
  const everyFourthPage = movies.filter((_, index) => index % 4 === 0)
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
        <div className="w-1/2 p-2">
          <MoviesCard movies={evenPages} />
        </div>
        <div className="w-1/2 p-2">
          <MoviesCard movies={oddPages} />
        </div>
      </section>

      <section className="hidden md:flex md:w-full bg-customWhite">
        <div className="w-1/4 p-2">
          <MoviesCard movies={everyFourthPage} />
        </div>
        <div className="w-1/4 p-2">
          <MoviesCard movies={everyFourthPageStartingFromSecond} />
        </div>
        <div className="w-1/4 p-2">
          <MoviesCard movies={everyFourthPageStartingFromThird} />
        </div>
        <div className="w-1/4 p-2">
          <MoviesCard movies={everyFourthPageStartingFromFourth} />
        </div>
      </section>
    </div>
  )
}

export default MoviesCards
