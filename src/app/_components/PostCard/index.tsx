import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Komponent przyjmujący props 'pages' i opcjonalnie 'posts'
const PostsCard = ({ posts }) => {
  if (!posts || posts.length === 0) return null // Sprawdzamy, czy pages istnieje

  function formatDateWithComma(dateString) {
    const date = new Date(dateString)

    // Pobieramy części daty
    const day = date.toLocaleDateString('en-GB', { day: '2-digit' })
    const month = date.toLocaleDateString('en-GB', { month: 'short' })
    const year = date.toLocaleDateString('en-GB', { year: 'numeric' })

    // Składamy wynik z przecinkiem po miesiącu
    return `${day} ${month}, ${year}`
  }

  return (
    <>
      {posts.map((item, index) => {
        const src = process.env.NEXT_PUBLIC_SERVER_URL + '/media/' + item.meta.image.filename
        const href = `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/${item.slug}`
        const title = item.title
        return (
          <div key={index} className="mb-10">
            <Link href={href}>
              <Image
                className="w-full h-auto object-cover rounded-md"
                alt={title}
                src={src}
                width={450}
                height={0} // Automatyczna wysokość
              />
            </Link>
            <h3 className="text-left text-xl mt-2 text-customGray-dark">{title}</h3>
            <h4 className="text-lg font-medium text-customGray-light">
              {formatDateWithComma(item.publishedAt)} <span className="text-2xl">•</span>{' '}
              {item.readingTime} min read
            </h4>
          </div>
        )
      })}
    </>
  )
}

export default PostsCard
