'use client'

import React, { Fragment } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'

import { Product } from '../../../payload/payload-types'
import { AddToCartButton } from '../../_components/AddToCartButton'
import Gal from '../../_components/Gal'
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'

import 'react-tabs/style/react-tabs.css'

import classes from './index.module.scss'

export const ProductHero: React.FC<{
  product: Product
}> = ({ product }) => {
  const {
    title,
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

  let images = []

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
  return (
    <Gutter className={classes.productHero}>
      <div className={classes.mediaWrapper}>
        {!metaImage && <div className={classes.placeholder}>No image</div>}
        {metaImage && typeof metaImage !== 'string' && <Gal images={images} />}
      </div>

      <div className={classes.details}>
        <h3 className={classes.title}>{title}</h3>

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
          <p className={classes.stock}>In stock</p>
        </div>
        <p>{`€ ${price}`}</p>

        <div className="pt-5 pb-5">
          <Tabs>
            <TabList>
              <Tab>
                <h6>Description</h6>
              </Tab>
              <Tab>
                <h6>Details</h6>
              </Tab>
              <Tab>
                <h6>FAQ</h6>
              </Tab>
            </TabList>
            <div className="p3">
              <TabPanel className="">
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
                  <RichText content={productDescription.richText} />
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

        <AddToCartButton product={product} className={classes.addToCartButton} />
      </div>
      <br />
    </Gutter>
  )
}
