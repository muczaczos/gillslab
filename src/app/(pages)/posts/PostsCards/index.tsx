import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import PostsCard from '../../../_components/PostCard'

const PostsCards = ({ pages, posts }) => {
  // Podzielmy strony na 2 grupy: parzyste i nieparzyste
  const evenPages = pages.filter((_, index) => index % 2 === 0) // Elementy o parzystych indeksach
  const oddPages = pages.filter((_, index) => index % 2 !== 0) // Elementy o nieparzystych indeksach

  const everyFourthPage = pages.filter((_, index) => index % 4 === 0) // Elementy o indeksach 1, 5, 9, 13, ...
  const everyFourthPageStartingFromSecond = pages.filter((_, index) => index % 4 === 2)
  const everyFourthPageStartingFromThird = pages.filter((_, index) => (index - 1) % 4 === 0)
  const everyFourthPageStartingFromFourth = pages.filter((_, index) => (index - 3) % 4 === 0)

  console.log('wszystko' + pages)
  console.log('kolumna1 ' + everyFourthPage)
  console.log('kolumna2' + everyFourthPageStartingFromSecond)
  console.log('kolumna3' + everyFourthPageStartingFromThird)

  return (
    <>
      <section className="flex w-full">
        <div className="w-full p-2">
          <PostsCard pages={pages} posts={posts} />
        </div>
      </section>

      <section className="flex w-full">
        {/* Kolumna dla elementów o parzystych indeksach */}
        <div className="w-1/2 p-2">
          <PostsCard pages={evenPages} posts={posts} />
        </div>

        {/* Kolumna dla elementów o nieparzystych indeksach */}
        <div className="w-1/2 p-2">
          <PostsCard pages={oddPages} posts={posts} />
        </div>
      </section>

      <section className="flex w-full">
        {/* Kolumna dla elementów o parzystych indeksach */}
        <div className="w-1/4 p-2">
          {everyFourthPage.map((item, index) => {
            const src = process.env.NEXT_PUBLIC_SERVER_URL + '/media/' + item.meta.image.filename
            const href = `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/${posts[index].slug}`
            const title = item.title

            return (
              <div key={index} className="mb-4">
                <Link href={href}>
                  <Image
                    className="w-full h-auto object-cover rounded-md"
                    alt={title}
                    src={src}
                    width={450}
                    height={0} // Automatyczna wysokość
                  />
                </Link>
                <h6 className="text-center mt-2">{title}</h6>
              </div>
            )
          })}
        </div>

        <div className="w-1/4 p-2">
          {everyFourthPageStartingFromSecond.map((item, index) => {
            const src = process.env.NEXT_PUBLIC_SERVER_URL + '/media/' + item.meta.image.filename
            const href = `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/${posts[index].slug}`
            const title = item.title

            return (
              <div key={index} className="mb-4">
                <Link href={href}>
                  <Image
                    className="w-full h-auto object-cover rounded-md"
                    alt={title}
                    src={src}
                    width={450}
                    height={0} // Automatyczna wysokość
                  />
                </Link>
                <h6 className="text-center mt-2">{title}</h6>
              </div>
            )
          })}
        </div>

        <div className="w-1/4 p-2">
          {everyFourthPageStartingFromThird.map((item, index) => {
            const src = process.env.NEXT_PUBLIC_SERVER_URL + '/media/' + item.meta.image.filename
            const href = `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/${posts[index].slug}`
            const title = item.title

            return (
              <div key={index} className="mb-4">
                <Link href={href}>
                  <Image
                    className="w-full h-auto object-cover rounded-md"
                    alt={title}
                    src={src}
                    width={450}
                    height={0} // Automatyczna wysokość
                  />
                </Link>
                <h6 className="text-center mt-2">{title}</h6>
              </div>
            )
          })}
        </div>

        {/* Kolumna dla elementów o nieparzystych indeksach */}
        <div className="w-1/4 p-2">
          {everyFourthPageStartingFromFourth.map((item, index) => {
            const src = process.env.NEXT_PUBLIC_SERVER_URL + '/media/' + item.meta.image.filename
            const href = `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/${posts[index].slug}`
            const title = item.title

            return (
              <div key={index} className="mb-4">
                <Link href={href}>
                  <Image
                    className="w-full h-auto object-cover rounded-md"
                    alt={title}
                    src={src}
                    width={450}
                    height={0} // Automatyczna wysokość
                  />
                </Link>
                <h6 className="text-center mt-2">{title}</h6>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default PostsCards
