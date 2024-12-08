import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import classes from './index.module.scss'

const PostsCards = ({ pages, posts }) => {
  return (
    <section className="w-full flex flex-wrap">
      {pages.map((item, index) => {
        if (pages !== null) {
          if (!pages) return null
          // console.log(pagesmages[index])
          //  console.log('dupa')
          // console.log(posts[0].slug)
          // console.log(process.env.NEXT_PUBLIC_SERVER_URL + '/' + posts[index].slug)

          const src =
            process.env.NEXT_PUBLIC_SERVER_URL + '/media/' + pages[index].meta.image.filename
          const href = process.env.NEXT_PUBLIC_SERVER_URL + '/blog/' + posts[index].slug
          const title = pages[index].title
          const description = pages[index].meta.description.substring(0, 40) + '...'
          return (
            <div className="w-1/2 pr-2 pl-2">
              <Link className="" href={href}>
                <div className="h-50">
                  <Image
                    className="max-h-full max-w-full rounded-xl"
                    alt="Magic Mushroom post image"
                    src={src}
                    width={450}
                    height={200}
                  />
                </div>
              </Link>

              <h6 className="">{title}</h6>
            </div>
          )
        }
        return null
      })}
    </section>
  )
}

export default PostsCards
