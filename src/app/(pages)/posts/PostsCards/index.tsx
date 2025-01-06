import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import PostsCard from '../../../_components/PostCard'

const PostsCards = ({ posts }) => {
  if (!posts || posts.length === 0) return null // Jeśli nie ma filmów, nic nie renderuj

  if (posts.length === 1) {
    // Jeśli jest tylko jeden film, renderuj go w pełnej szerokości
    return (
      <div className="w-full md:max-w-[1536px] bg-customWhite p-4 flex justify-center md:justify-start">
        <div className="w-full justify-center md:w-1/4">
          <PostsCard posts={posts} />
        </div>
      </div>
    )
  }

  // Podzielmy strony na 2 grupy: parzyste i nieparzyste
  const evenPages = posts.filter((_, index) => index % 2 === 0) // Elementy o parzystych indeksach
  const oddPages = posts.filter((_, index) => index % 2 !== 0) // Elementy o nieparzystych indeksach

  const everyFourthPage = posts.filter((_, index) => index % 4 === 0) // Elementy o indeksach 1, 5, 9, 13, ...
  const everyFourthPageStartingFromSecond = posts.filter((_, index) => index % 4 === 2)
  const everyFourthPageStartingFromThird = posts.filter((_, index) => (index - 1) % 4 === 0)
  const everyFourthPageStartingFromFourth = posts.filter((_, index) => (index - 3) % 4 === 0)

  return (
    <div className="md:max-w-[1536px]">
      <section className="csm:hidden sm:hidden flex w-full bg-customWhite">
        <div className="w-full p-2">
          <PostsCard posts={posts} />
        </div>
      </section>

      <section className="hidden csm:flex csm:w-full sm:flex sm:w-full md:hidden bg-customWhite">
        {/* Kolumna dla elementów o parzystych indeksach */}
        <div className="w-1/2 p-2">
          <PostsCard posts={evenPages} />
        </div>

        {/* Kolumna dla elementów o nieparzystych indeksach */}
        <div className="w-1/2 p-2">
          <PostsCard posts={oddPages} />
        </div>
      </section>

      <section className="hidden md:flex md:w-full bg-customWhite">
        {/* Kolumna dla elementów o parzystych indeksach */}
        <div className="w-1/4 p-2">
          <PostsCard posts={everyFourthPage} />
        </div>

        <div className="w-1/4 p-2">
          <PostsCard posts={everyFourthPageStartingFromSecond} />
        </div>

        <div className="w-1/4 p-2">
          <PostsCard posts={everyFourthPageStartingFromThird} />
        </div>

        {/* Kolumna dla elementów o nieparzystych indeksach */}
        <div className="w-1/4 p-2">
          <PostsCard posts={everyFourthPageStartingFromFourth} />
        </div>
      </section>
    </div>
  )
}

export default PostsCards
