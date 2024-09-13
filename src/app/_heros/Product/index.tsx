'use client'

import React, { Fragment } from 'react'
import { GiWateringCan, GiWeight } from 'react-icons/gi'
import {
  IoArrowBackOutline,
  IoArrowBackSharp,
  IoHeartOutline,
  IoShareOutline,
} from 'react-icons/io5'
import { LiaTemperatureLowSolid } from 'react-icons/lia'
import { TbSunOff } from 'react-icons/tb'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import Image from 'next/image'

import { Product } from '../../../payload/payload-types'
import { AddToCartButton } from '../../_components/AddToCartButton'
import Gal from '../../_components/Gal'
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
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
    categories,
    price,
    media1,
    media2,
    media3,
    layout,
    meta: { image: metaImage, description } = {},
  } = product
  let productDescription
  let productDetails
  let productFaq

  const images = []
  const icons = [GiWateringCan, LiaTemperatureLowSolid, GiWeight, TbSunOff]
  const infoLabels = ['Watering needed', 'Betwen 20-25*C', 'Weight 1.2kg', 'No direct sun']

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
            <IoArrowBackOutline className="text-3xl text-customWhite" />
          </div>
          <div>
            <IoShareOutline className="text-3xl text-customWhite mr-5" />
            <IoHeartOutline className="text-3xl text-customWhite" />
          </div>
        </div>
        <div className="">
          <Image
            alt="Product Image"
            src={`${websiteUrl}/media/gtLabel.png`}
            height="300"
            width="200"
            className="mb-5 mx-auto bg-customWhite"
          />
        </div>
      </section>
      <div className="bg-customWhite pt-5 pb-3">
        <hr className="border-l-gray-100 w-1/3 opacity-30 py-0 my-0" />
      </div>
      {/* titles and descriptions */}
      <section className="px-5 bg-customWhite">
        <div className="">
          <h3 className="text-primary text-2xl">{title}</h3>
          <p className="text-primary-light text-xl">{title2}</p>

          {/* In stock and price*/}
          <div className={classes.categoryWrapper}>
            <div className={classes.categories}>
              {categories?.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  const { title: categoryTitle } = category

                  const titleToUse = categoryTitle || 'Untitled category'

                  const isLast = index === categories.length - 1

                  return (
                    <p key={index} className={classes.category}>
                      {titleToUse} {!isLast && <Fragment>, &nbsp;</Fragment>}
                      <span className={classes.separator}>|</span>
                    </p>
                  )
                }
              })}
            </div>
            <p className="text-green-700 text-md font-bold">In stock</p>
          </div>
          <RichText
            className="mb-10 text-lg text-customGray-dark font-medium"
            content={productDescription.richText}
          />
          <SmallCarousel icons={icons} catLabels={infoLabels} images={null} />
          <div className="mt-5 flex justify-between items-center">
            <p className="text-primary text-5xl font-medium">{`€${price}`}</p>
            <AddToCartButton
              product={product}
              className="bg-secondary px-3 flex h-16 items-center text-customWhite font-bold"
            />
          </div>
          {/*Descriptions */}
          <div className="pt-5 pb-5">
            <Tabs>
              <TabList>
                <Tab>
                  <h6>Details</h6>
                </Tab>
                <Tab>
                  <h6>FAQ</h6>
                </Tab>
              </TabList>
              <div className="p3">
                <TabPanel>
                  <div
                    style={{
                      height: '200px', // Stała wysokość ramki
                      overflowX: 'auto', // Przewijanie poziome w przypadku długiego tekstu
                      overflowY: 'auto', // Przewijanie pionowe w przypadku długiego tekstu
                      border: 'none', // Usunięcie obramowania
                      outline: 'none', // Usunięcie obramowania po kliknięciu
                      scrollbarWidth: 'thin' /* Grubość paska przewijania */,
                      scrollbarColor:
                        'rgba(0, 0, 0, 0.3) rgba(0, 0, 0, 0)' /* Kolor paska przewijania */,
                    }}
                  >
                    <RichText content={productDetails.richText} />
                  </div>
                </TabPanel>
                <TabPanel>
                  <div
                    style={{
                      height: '200px', // Stała wysokość ramki
                      overflowX: 'auto', // Przewijanie poziome w przypadku długiego tekstu
                      overflowY: 'auto', // Przewijanie pionowe w przypadku długiego tekstu
                      border: 'none', // Usunięcie obramowania
                      outline: 'none', // Usunięcie obramowania po kliknięciu
                      scrollbarWidth: 'thin' /* Grubość paska przewijania */,
                      scrollbarColor:
                        'rgba(0, 0, 0, 0.3) rgba(0, 0, 0, 0)' /* Kolor paska przewijania */,
                    }}
                  >
                    <RichText content={productFaq.richText} />
                  </div>
                </TabPanel>
              </div>
            </Tabs>
          </div>
        </div>
        <br />
      </section>
    </>
  )
}
