import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import classes from './index.module.scss'

const SyringesCards = ({ pages }) => {
  return (
    <section className="mt-10 flex flex-col gap-5 justify-center md:flex-wrap md:flex-row md:justify-between">
      {pages.map(item => {
        if (item !== null) {
          if (!item) return null
          const src = '/media/' + item.meta.image.filename
          const href = `/shop/${item.categories[0].slug}/${item.slug}`
          const title = item.title
          const price = item.price
          return (
            <div className="">
              <Link className="" href={href}>
                <div className="w-full">
                  <Image className="" alt="Cubensis grow kit" src={src} width="350" height="180" />
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

export default SyringesCards
