import React from 'react'
import { FaRegHeart } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'

import classes from './index.module.scss'

const GrowkitsCards = ({ pages, products }) => {
  const baseUrl = process.env.PAYLOAD_PUBLIC_SERVER_URL
  return (
    <section className="mt-10 flex flex-col gap-5 justify-center md:flex-wrap md:flex-row md:justify-between">
      {pages.map((item, index) => {
        if (item !== null) {
          if (!item) return null
          const src = baseUrl + '/media/' + item.meta.image.filename
          const href = process.env.NEXT_PUBLIC_SERVER_URL + '/products/' + item.slug
          const title = item.title
          const description = item.meta.description
          const price = item.price
          return (
            <div className="">
              <Link href={href}>
                <section className="shadow-xl bg-[rgba(187,204,241,0.1)] border-2 border-solid border-primary rounded-2xl">
                  <div className="flex justify-end pt-4 px-4">
                    <FaRegHeart className="text-primary text-4xl" />
                  </div>
                  <div className="px-16 pb-3 w-full">
                    <Image
                      className=""
                      alt="Cubensis grow kit"
                      src={src}
                      width="350"
                      height="180"
                    />
                  </div>
                  <h6 className="pl-5 text-xl text-primary">{title}</h6>
                  <p className="pl-5 text-xl pb-4 font-bold text-primary">€{price}</p>
                </section>
              </Link>
              <Link className={classes.link} href={href}></Link>
            </div>
          )
        }
        return null
      })}
    </section>
  )
}

export default GrowkitsCards
