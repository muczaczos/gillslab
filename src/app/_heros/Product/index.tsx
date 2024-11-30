'use client'

import React, { Fragment, useEffect, useState } from 'react'
import { GiPressureCooker, GiWateringCan, GiWeight } from 'react-icons/gi'
import { IoArrowBackOutline, IoHeart, IoHeartOutline, IoShareOutline } from 'react-icons/io5'
import { LiaTemperatureLowSolid } from 'react-icons/lia'
import { TbSunOff } from 'react-icons/tb'
import Image from 'next/image'
import Link from 'next/link'

import { Product } from '../../../payload/payload-types'
import { AddToCartButton } from '../../_components/AddToCartButton'
import DynamicIcon from '../../_components/DaynamicIcon'
import RichText from '../../_components/RichText'
import ShareModal from '../../_components/ShareModal'
import SmallCarousel from '../../_components/SmallCarousel'

import 'react-tabs/style/react-tabs.css'

import classes from './index.module.scss'

export const ProductHero: React.FC<{ product: Product }> = ({ product }) => {
  const {
    slug,
    id,
    title,
    title2,
    shortInfo1,
    shortInfo2,
    shortInfo3,
    shortInfo4,
    icons,
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
        const columns = layoutItem.columns
        productDescription = columns[0]
        productDetails = columns[1]
        productFaq = columns[2]
      }
    })
  }

  const websiteUrl = process.env.NEXT_PUBLIC_SERVER_URL

  //********************************************* */
  // Stan do zarządzania ulubionymi
  const [isFavorite, setIsFavorite] = useState(false)

  // Sprawdź localStorage przy załadowaniu komponentu
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    setIsFavorite(favorites.includes(slug))
  }, [slug])

  // Funkcja do zarządzania ulubionymi
  const handleFavoriteToggle = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []

    if (isFavorite) {
      // Usuń z ulubionych
      const updatedFavorites = favorites.filter(favSlug => favSlug !== slug)
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
      setIsFavorite(false)
    } else {
      // Dodaj do ulubionych
      favorites.push(slug)
      localStorage.setItem('favorites', JSON.stringify(favorites))
      setIsFavorite(true)
    }
  }
  //********************************************* */

  return (
    <>
      <div className="lg:flex">
        {/* main image with buttons */}
        <section className="bg-primary pt-5 pb-16 lg:w-1/2">
          <div className="flex justify-between px-5 pt-5 pb-7 lg:mb-20">
            <Link
              href="#"
              onClick={e => {
                e.preventDefault()
                window.history.back()
              }}
            >
              <IoArrowBackOutline className="text-3xl text-customWhite md:text-6xl lg:text-5xl" />
            </Link>
            <div className="flex">
              <ShareModal />

              {/* Ikona serca z obsługą kliknięcia */}
              {isFavorite ? (
                <IoHeart
                  className="text-secondary text-3xl md:text-6xl lg:text-5xl"
                  onClick={handleFavoriteToggle}
                />
              ) : (
                <IoHeartOutline
                  className="text-3xl text-customWhite md:text-6xl lg:text-5xl"
                  onClick={handleFavoriteToggle}
                />
              )}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="sm:w-full">
            {typeof product.media1 === 'object' && product.media1 !== null && 'url' in product.media1 ? (
              <Image
                alt="Product Image"
                src={product.media1.url}
                height="300"
                width="500"
                className="mb-5 mx-auto"
              />
            ) : (
              <p>Image not available</p> // Alternatywa, jeśli media1 nie ma url
            )}
            </div>
          </div>
        </section>
        {/* /////////////////////// */}

        {/* hr */}
        <div className="lg:hidden bg-customWhite pt-5 pb-3 md:pt-10 md:pb-8">
          <hr className="border-l-gray-100 w-1/3 opacity-30 py-0 my-0" />
        </div>
        {/* /////////////////////// */}

        {/* titles, short descriptions, price and addToCart button */}
        <section className="px-5 bg-customWhite pb-5 lg:w-1/2 lg:pt-12">
          <h3 className="text-primary text-2xl md:text-4xl">{title}</h3>
          <p className="text-primary-light text-xl md:text-2xl">{title2}</p>

          {/* In stock and short text */}
          <div className={classes.categoryWrapper}>
            <p className="text-green-700 text-md font-bold md:text-xl">In stock</p>
          </div>
          <RichText
            className="mb-10 text-lg text-customGray-dark font-medium md:text-2xl"
            content={productDescription.richText}
          />
          {/* /////////////////////// */}

          {/* Short info for mobile */}
          <div className="lg:hidden">
            <SmallCarousel links={null} icons={icons} catLabels={infoLabels} images={null} />
          </div>
          {/* /////////////////////// */}

          {/* Short info for desktop */}
          <div className="hidden lg:flex lg:flex-col lg:gap-5 xxl:flex-row xxl:gap-0 justify-center pb-10 2xl:pb-28 ">
            <div className="flex w-full">
              <div className="w-1/2 ml-4 flex gap-2 p-2 bg-white flex-col justify-center items-center shadow-[4px_4px_0px_rgba(0,0,0,0.2)] transition-transform duration-300 ease-in-out rounded-xl h-[140px]">
                <DynamicIcon
                  library={product.icons[0].iconLibrary}
                  name={product.icons[0].iconName}
                  size={50}
                  color="#4968AC"
                />
                <h3 className="text-xs text-primary opacity-70 md:text-lg">{shortInfo1}</h3>
              </div>
              <div className="w-1/2 ml-4 flex gap-2 p-2 bg-white flex-col justify-center items-center shadow-[4px_4px_0px_rgba(0,0,0,0.2)] transition-transform duration-300 ease-in-out rounded-xl h-[140px]">
                <DynamicIcon
                  library={product.icons[1].iconLibrary}
                  name={product.icons[1].iconName}
                  size={50}
                  color="#4968AC"
                />
                <h3 className="text-xs text-primary opacity-70 md:text-lg">{shortInfo2}</h3>
              </div>
            </div>
            <div className="flex justify-center w-full">
              <div className="w-1/2 ml-4 flex gap-2 p-2 bg-white flex-col justify-center items-center shadow-[4px_4px_0px_rgba(0,0,0,0.2)]  transition-transform duration-300 ease-in-out rounded-xl h-[140px]">
                <DynamicIcon
                  library={product.icons[2].iconLibrary}
                  name={product.icons[2].iconName}
                  size={50}
                  color="#4968AC"
                />
                <h3 className="text-xs text-primary opacity-70 md:text-lg">{shortInfo3}</h3>
              </div>
              <div className="w-1/2 ml-4 flex gap-2 p-2 bg-white flex-col justify-center items-center shadow-[4px_4px_0px_rgba(0,0,0,0.2)]  transition-transform duration-300 ease-in-out rounded-xl h-[140px]">
                <DynamicIcon
                  library={product.icons[3].iconLibrary}
                  name={product.icons[3].iconName}
                  size={50}
                  color="#4968AC"
                />
                <h3 className="text-xs text-primary opacity-70 md:text-lg">{shortInfo4}</h3>
              </div>
            </div>
          </div>
          {/* /////////////////////// */}

          {/* Price and add to cart button */}
          <div className="mt-5 flex justify-between items-center pb-5">
            <p className="text-primary text-5xl font-medium md:text-8xl lg:text-6xl">{`€${price}`}</p>
            <AddToCartButton
              product={product}
              className="bg-secondary px-3 flex h-16 items-center text-customWhite font-bold md:h-24 lg:h-16 lg:px-1"
            />
          </div>
          {/* /////////////////////// */}
        </section>
        {/* /////////////////////// */}
      </div>
    </>
  )
}
