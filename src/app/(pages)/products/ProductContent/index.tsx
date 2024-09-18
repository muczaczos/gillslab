'use client'

import React from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import Image from 'next/image'

import { Product } from '../../../../payload/payload-types'
import { Gutter } from '../../../_components/Gutter'
import RichText from '../../../_components/RichText'
import ProductGallery from '../ProductGallery'

import 'react-tabs/style/react-tabs.css'

import classes from './index.module.scss'

export const ProductContent: React.FC<{
  product: Product
}> = ({ product }) => {
  let productDetails
  let productFaq
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
        productDetails = columns[1]
        productFaq = columns[2]
      }
    })
  }

  return (
    <>
      <div className={classes.diagonalGallery}></div>
      <Gutter className={`mt-[-2.25rem] ${classes.contentGradient}`}>
        <div className="mt-8 border-solid border-b-0 border-r-0 border-t-1 border-l-1 border-customWhite pl-5 py-4">
          <h6 className="text-customWhite text-4xl font-medium">Gallery</h6>
        </div>

        {/*Gallery */}
        <ProductGallery />

        {/*Details and FAQ */}
        <section className="mb-10">
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
        </section>
      </Gutter>
    </>
  )
}
