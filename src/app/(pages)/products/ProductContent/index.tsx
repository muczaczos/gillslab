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
          <h6 className="text-customWhite text-4xl font-medium md:text-6xl">Gallery</h6>
        </div>

        {/*Gallery */}
        <ProductGallery />

        {/*Details and FAQ */}
        <section className="mb-10">
          <Tabs>
            <TabList>
              <Tab>
                <h6 className="md:text-6xl">Details</h6>
              </Tab>
              <Tab>
                <h6 className="md:text-6xl">FAQ</h6>
              </Tab>
            </TabList>
            <div className="p-3">
              <TabPanel>
                <div
                  className="
                  h-[200px]        // Domyślna wysokość
                  sm:h-[300px]     // Wyższa ramka na małych ekranach (640px+)
                  md:h-[400px]     // Jeszcze wyższa ramka na średnich ekranach (768px+)
                  overflow-x-auto
                  overflow-y-auto
                  border-none
                  outline-none
                  scrollbar-thin scrollbar-thumb-gray-400
                "
                >
                  <RichText content={productDetails.richText} />
                </div>
              </TabPanel>
              <TabPanel>
                <div
                  className="
                  h-[200px]        // Domyślna wysokość
                  sm:h-[300px]     // Wyższa ramka na małych ekranach (640px+)
                  md:h-[400px]     // Jeszcze wyższa ramka na średnich ekranach (768px+)
                  overflow-x-auto
                  overflow-y-auto
                  border-none
                  outline-none
                  scrollbar-thin scrollbar-thumb-gray-400
                "
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
