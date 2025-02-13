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
    <div className="">
      <div className={``}>
        <div className="lg:flex lg:justify-between lg:w-full">
          {/*Gallery */}
          <ProductGallery product={product} />

          {/*Details and FAQ */}
          <section className={` pl-5 ${classes.contentGradient} lg:w-1/2 `}>
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
            <div className="hidden lg:block lg:mt-6 mx-5 border-solid border-b-1 border-r-1 border-t-0 border-l-0 border-customWhite pl-5 py-4">
              <div className="h-10"></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
