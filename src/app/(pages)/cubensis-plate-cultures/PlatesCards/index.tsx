import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import classes from './index.module.scss'

const PlatesCards = ({ pages, products }) => {
  return (
    <section className="mt-10 flex flex-col gap-5 justify-center md:flex-wrap md:flex-row md:justify-between">
      {pages.map((item, index) => {
        if (item !== null) {
          if (!item) return null
          const src = '/media/' + item.meta.image.filename
          const href = process.env.NEXT_PUBLIC_SERVER_URL + '/products/' + item.slug
          const title = item.title
          const description = item.meta.description
          const price = item.price
          return (
            <div className="">
              <Link className="" href={href}>
                <div className="w-full">
                  <Image
                    className=""
                    alt="Cubensis plate culture"
                    src={src}
                    width="350"
                    height="180"
                  />
                </div>
              </Link>
              <Link className={classes.link} href={href}>
                <div className={classes.priceTitle}>
                  <h6 className={classes.title}>{title}</h6>
                  <p>€{price}</p>
                </div>
              </Link>
            </div>
          )
        }
        return null
      })}
    </section>
  )
}

export default PlatesCards
