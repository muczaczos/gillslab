import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '../../../_components/Button'
import RichText from '../../../_components/RichText'

// Komponent przyjmujący props 'pages' i opcjonalnie 'posts'
const MoviesCard = ({ movies }) => {
  if (!movies || movies.length === 0) return null // Sprawdzamy, czy pages istnieje

  function formatDateWithComma(dateString) {
    const date = new Date(dateString)

    // Pobieramy części daty
    const day = date.toLocaleDateString('en-GB', { day: '2-digit' })
    const month = date.toLocaleDateString('en-GB', { month: 'short' })
    const year = date.toLocaleDateString('en-GB', { year: 'numeric' })

    // Składamy wynik z przecinkiem po miesiącu
    return `${day} ${month}, ${year}`
  }
  console.log('movies')
  console.log(movies[0].layout[0].richText)

  return (
    <>
      {movies.map((item, index) => {
        //const src = process.env.NEXT_PUBLIC_SERVER_URL + '/media/' + item.meta.image.filename
        // const href = `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/${item.slug}`
        const title = item.title
        return (
          <div key={index} className="mb-10 w-full">
            <Link href={movies[index].youtubeLink}>
              <div className="flex justify-center">
                <Image
                  src={movies[index].media.url}
                  alt={movies[index].media.alt}
                  width="500"
                  height="200"
                ></Image>
              </div>
              <h2 className="text-left text-2xl mt-2 text-customGray-dark">{title}</h2>
              <RichText content={movies[index].layout[0].richText} className="mb-2" />
              <Link href={movies[index].youtubeLink}>
                <button className="border-0 rounded-xl text-customWhite text-xl font-black bg-secondary p-2 mb-2 mr-2">
                  Watch Movie
                </button>
              </Link>
              <Link href={movies[index].blogLink}>
                <button className="border-0 rounded-xl text-customWhite text-xl font-black bg-secondary p-2 mb-2 mr-2">
                  Read Blog
                </button>
              </Link>
              <Link href={movies[index].podcastLink}>
                <button className="border-0 rounded-xl text-customWhite text-xl font-black bg-secondary p-2 mb-2 mr-2">
                  Listen Podcast
                </button>
              </Link>
            </Link>
          </div>
        )
      })}
    </>
  )
}

export default MoviesCard
