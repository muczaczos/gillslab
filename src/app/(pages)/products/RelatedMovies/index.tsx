'use client'

import React from 'react'
import { FaArrowAltCircleUp } from 'react-icons/fa'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import Image from 'next/image'

import { Product } from '../../../../payload/payload-types'
import { Gutter } from '../../../_components/Gutter'
import NewsCarousel from '../../../_components/NewsCarousel'
import RelatedCarousel from '../../../_components/RelatedCarousel'
import RichText from '../../../_components/RichText'

import 'react-tabs/style/react-tabs.css'

import classes from './index.module.scss'

export const RelatedMovies: React.FC<{}> = () => {
  const images2 = [
    '/media/gtLabel.png',
    '/media/mckLabel.png',
    '/media/gtLabel.png',
    '/media/mckLabel.png',
    '/media/gtLabel.png',
  ]

  const catLabels = ['Growkit 1', 'Growkit 2', 'Growkit 3', 'Growkit 4', 'Growkit 5']

  return (
    <Gutter className={classes.relatedGradient}>
      {/*Related */}
      <section>
        <div className="mt-8 border-solid border-b-0 border-r-0 border-t-1 border-l-1 border-primary pl-5 py-4">
          <h6 className="text-primary text-4xl font-medium">Related</h6>
        </div>
        <RelatedCarousel icons={null} images={images2} catLabels={catLabels} />

      </section>

      {/*Movies */}
      <section>
        <div className="mb-10 mt-6 border-solid border-b-0 border-r-0 border-t-1 border-l-1 border-primary pl-5 py-4">
          <h6 className="text-primary text-4xl font-medium">Movies</h6>
        </div>
        <NewsCarousel catLabels={null} images={images2} />
      </section>

      {/* hr */}
      <div className="bg-transparent mt-10 pb-3">
        <hr className="border-l-gray-100 w-1/3 opacity-30 py-0 my-0" />
      </div>

      <div className="flex justify-end mt-10">
        <FaArrowAltCircleUp className="text-8xl text-primary" />
      </div>
    </Gutter>
  )
}
