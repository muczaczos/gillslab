'use client'

import React from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'

import { Product } from '../../../../payload/payload-types'
import RichText from '../../../_components/RichText'

import { Gutter } from '../../../_components/Gutter'

import 'react-tabs/style/react-tabs.css'

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
    <Gutter className="bg-customWhite">
      {/*Descriptions */}
      <section className="pt-5 pb-5 bg-customWhite">
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
  )
}
