import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Komponent przyjmujący props 'pages' i opcjonalnie 'posts'
const PostsCard = ({ pages }) => {
  if (!pages || pages.length === 0) return null // Sprawdzamy, czy pages istnieje

  return (
    <>
      {pages.map((item, index) => {
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
              24 Jun, 2024 <span className="text-2xl">•</span> 12 min read
            </h4>
          </div>
        )
      })}
    </>
  )
}

export default PostsCard
