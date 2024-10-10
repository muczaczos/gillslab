'use client'

import React, { Fragment } from 'react'
import { GiWateringCan, GiWeight } from 'react-icons/gi'
import { IoArrowBackOutline, IoHeartOutline, IoShareOutline } from 'react-icons/io5'
import { LiaTemperatureLowSolid } from 'react-icons/lia'
import { TbSunOff } from 'react-icons/tb'
import Image from 'next/image'

import { Product } from '../../../payload/payload-types'
import { AddToCartButton } from '../../_components/AddToCartButton'
import RichText from '../../_components/RichText'
import SmallCarousel from '../../_components/SmallCarousel'

import 'react-tabs/style/react-tabs.css'

import classes from './index.module.scss'

export const ProductHero: React.FC<{
  product: Product
}> = ({ product }) => {
  const {
    title,
    title2,
    shortInfo1,
    shortInfo2,
    shortInfo3,
    shortInfo4,
    categories,
    price,
    media1,
    media2,
    media3,
  } = product
  let productDescription
  let productDetails
  let productFaq
  const images = []
  const icons = [GiWateringCan, LiaTemperatureLowSolid, GiWeight, TbSunOff]
  const infoLabels = [shortInfo1, shortInfo2, shortInfo3, shortInfo4]

  if (media1) {
    images.push(media1['url'])
  }
  if (media2) {
    images.push(media2['url'])
  }
  if (media3) {
    images.push(media3['url'])
  }

  // Sprawdź, czy istnieje layout w produkcie, aby uniknąć błędów w czasie wykonania
  if (product.layout) {
    // Iteruj przez każdy element w layout
    product.layout.forEach(layoutItem => {
      // Sprawdź, czy obiekt layoutItem ma właściwość columns
      if (layoutItem.blockType === 'content' && layoutItem.columns) {
        // Jeśli columns istnieje, możesz uzyskać do niego dostęp tutaj
        const columns = layoutItem.columns
        // Możesz dalej przetwarzać columns
        // np. możesz iterować przez każdą kolumnę i wykonywać odpowiednie operacje
        productDescription = columns[0]
        productDetails = columns[1]
        productFaq = columns[2]
      }
    })
  }
  const websiteUrl = process.env.NEXT_PUBLIC_SERVER_URL
  return (
    <>
      {/* main image with buttons */}
      <section className="bg-primary pt-5 pb-16">
        <div className="flex justify-between px-5 pt-5 pb-7">
          <div>
            <IoArrowBackOutline className="text-3xl text-customWhite md:text-6xl" />
          </div>
          <div>
            <IoShareOutline className="text-3xl text-customWhite mr-5 md:text-6xl" />
            <IoHeartOutline className="text-3xl text-customWhite md:text-6xl" />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-1/2 sm:w-3/4 ">
            <Image
              alt="Product Image"
              src={`${websiteUrl}/media/gtLabel.png`}
              height="300"
              width="400"
              className="mb-5 mx-auto bg-customWhite"
            />
          </div>
        </div>
      </section>

      {/* hr */}
      <div className="bg-customWhite pt-5 pb-3 md:pt-10 md:pb-8">
        <hr className="border-l-gray-100 w-1/3 opacity-30 py-0 my-0" />
      </div>

      {/* titles, short descriptions, price and addToCart button */}
      <section className="px-5 bg-customWhite pb-5">
        <h3 className="text-primary text-2xl md:text-4xl">{title}</h3>
        <p className="text-primary-light text-xl md:text-2xl">{title2}</p>

        {/* In stock and price*/}
        <div className={classes.categoryWrapper}>
          <p className="text-green-700 text-md font-bold md:text-xl">In stock</p>
        </div>
        <RichText
          className="mb-10 text-lg text-customGray-dark font-medium md:text-2xl"
          content={productDescription.richText}
        />
        <SmallCarousel icons={icons} catLabels={infoLabels} images={null} />
        <div className="mt-5 flex justify-between items-center pb-5">
          <p className="text-primary text-5xl font-medium md:text-8xl">{`€${price}`}</p>
          <AddToCartButton
            product={product}
            className="bg-secondary px-3 flex h-16 items-center text-customWhite font-bold md:h-24"
          />
        </div>
      </section>
    </>
  )
}
