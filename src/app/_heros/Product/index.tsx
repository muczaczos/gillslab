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
      <div className="lg:flex">
        {/* main image with buttons */}
        <section className="bg-primary pt-5 pb-16 lg:w-1/2">
          <div className="flex justify-between px-5 pt-5 pb-7 lg:mb-20">
            <div>
              <IoArrowBackOutline className="text-3xl text-customWhite md:text-6xl lg:text-5xl" />
            </div>
            <div>
              <IoShareOutline className="text-3xl text-customWhite mr-5 md:text-6xl lg:text-5xl" />
              <IoHeartOutline className="text-3xl text-customWhite md:text-6xl lg:text-5xl" />
            </div>
          </div>
          <div className="flex justify-center items-center">
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
        <div className="lg:hidden bg-customWhite pt-5 pb-3 md:pt-10 md:pb-8">
          <hr className="border-l-gray-100 w-1/3 opacity-30 py-0 my-0" />
        </div>

        {/* titles, short descriptions, price and addToCart button */}
        <section className="px-5 bg-customWhite pb-5 lg:w-1/2 lg:pt-12">
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
          <div className="lg:hidden">
            <SmallCarousel icons={icons} catLabels={infoLabels} images={null} />
          </div>
          <div className="hidden lg:flex lg:flex-col lg:gap-5 xxl:flex-row xxl:gap-0 justify-center pb-10 2xl:pb-28">
            <div className="flex justify-center">
              <div className="ml-4 flex gap-2 p-2 bg-white flex-col justify-center items-center shadow-[4px_4px_0px_rgba(0,0,0,0.2)] min-w-[45%] 2xl:min-w-[40%] transition-transform duration-300 ease-in-out rounded-xl h-[140px]">
                <GiWateringCan size={50} color="#4968AC" />
                <h3 className="text-xs text-primary opacity-70 md:text-lg">"Watering needed"</h3>
              </div>
              <div className="ml-4 flex gap-2 p-2 bg-white flex-col justify-center items-center shadow-[4px_4px_0px_rgba(0,0,0,0.2)] min-w-[45%] 2xl:min-w-[40%] transition-transform duration-300 ease-in-out rounded-xl h-[140px]">
                <GiWateringCan size={50} color="#4968AC" />
                <h3 className="text-xs text-primary opacity-70 md:text-lg">"Watering needed"</h3>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="ml-4 flex gap-2 p-2 bg-white flex-col justify-center items-center shadow-[4px_4px_0px_rgba(0,0,0,0.2)] min-w-[45%] 2xl:min-w-[40%] transition-transform duration-300 ease-in-out rounded-xl h-[140px]">
                <GiWateringCan size={50} color="#4968AC" />
                <h3 className="text-xs text-primary opacity-70 md:text-lg">"Watering needed"</h3>
              </div>
              <div className="ml-4 flex gap-2 p-2 bg-white flex-col justify-center items-center shadow-[4px_4px_0px_rgba(0,0,0,0.2)] min-w-[45%] 2xl:min-w-[40%] transition-transform duration-300 ease-in-out rounded-xl h-[140px]">
                <GiWateringCan size={50} color="#4968AC" />
                <h3 className="text-xs text-primary opacity-70 md:text-lg">"Watering needed"</h3>
              </div>
            </div>
          </div>
          <div className="mt-5 flex justify-between items-center pb-5">
            <p className="text-primary text-5xl font-medium md:text-8xl lg:text-6xl">{`€${price}`}</p>
            <AddToCartButton
              product={product}
              className="bg-secondary px-3 flex h-16 items-center text-customWhite font-bold md:h-24 lg:h-16 lg:px-1"
            />
          </div>
        </section>
      </div>
    </>
  )
}
