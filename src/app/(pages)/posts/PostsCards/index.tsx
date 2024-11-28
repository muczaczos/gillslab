import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import PostsCard from '../../../_components/PostCard'

const PostsCards = ({ pages }) => {
  // Podzielmy strony na 2 grupy: parzyste i nieparzyste
  const evenPages = pages.filter((_, index) => index % 2 === 0) // Elementy o parzystych indeksach
  const oddPages = pages.filter((_, index) => index % 2 !== 0) // Elementy o nieparzystych indeksach

  const everyFourthPage = pages.filter((_, index) => index % 4 === 0) // Elementy o indeksach 1, 5, 9, 13, ...
  const everyFourthPageStartingFromSecond = pages.filter((_, index) => index % 4 === 2)
  const everyFourthPageStartingFromThird = pages.filter((_, index) => (index - 1) % 4 === 0)
  const everyFourthPageStartingFromFourth = pages.filter((_, index) => (index - 3) % 4 === 0)

  return (
    <div className="md:max-w-[1536px]">
      <section className="csm:hidden sm:hidden flex w-full bg-customWhite">
        <div className="w-full p-2">
          <PostsCard pages={pages} />
        </div>
      </section>

      <section className="hidden csm:flex csm:w-full sm:flex sm:w-full md:hidden bg-customWhite">
        {/* Kolumna dla elementów o parzystych indeksach */}
        <div className="w-1/2 p-2">
          <PostsCard pages={evenPages} />
        </div>

        {/* Kolumna dla elementów o nieparzystych indeksach */}
        <div className="w-1/2 p-2">
          <PostsCard pages={oddPages} />
        </div>
      </section>

      <section className="hidden md:flex md:w-full bg-customWhite">
        {/* Kolumna dla elementów o parzystych indeksach */}
        <div className="w-1/4 p-2">
          <PostsCard pages={everyFourthPage} />
        </div>

        <div className="w-1/4 p-2">
          <PostsCard pages={everyFourthPageStartingFromSecond} />
        </div>

        <div className="w-1/4 p-2">
          <PostsCard pages={everyFourthPageStartingFromThird} />
        </div>

        {/* Kolumna dla elementów o nieparzystych indeksach */}
        <div className="w-1/4 p-2">
          <PostsCard pages={everyFourthPageStartingFromFourth} />
        </div>
      </section>

    </div>
  )
}

export default PostsCards
