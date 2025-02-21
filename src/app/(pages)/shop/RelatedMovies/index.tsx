'use client'

import React, { useEffect, useRef } from 'react'
import { FaArrowAltCircleUp } from 'react-icons/fa'

import { Product } from '../../../../payload/payload-types'
import NewsCarousel from '../../../_components/NewsCarousel'
import RelatedCarousel from '../../../_components/RelatedCarousel'

import 'react-tabs/style/react-tabs.css'

import classes from './index.module.scss'
// Definicja typu dla props

export const RelatedMovies: React.FC<{ product: Product }> = ({ product }) => {
  const sliderRef = useRef(null)
  const images2 = [
    '/media/gtLabel.png',
    '/media/mckLabel.png',
    '/media/gtLabel.png',
    '/media/mckLabel.png',
    '/media/gtLabel.png',
  ]

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Płynne przewijanie
    })
  }

  useEffect(() => {
    const slider = sliderRef.current
    if (slider) {
      slider.style.scrollBehavior = 'smooth' // Ustawienie płynnego przewijania przy montowaniu komponentu
    }
  }, []) // Pusta tablica zależności, aby kod wykonał się tylko raz po montowaniu komponentu

  const catLabels = ['Growkit 1', 'Growkit 2', 'Growkit 3', 'Growkit 4', 'Growkit 5']

  return (
    <>
      <div className={classes.diagonalRelated}></div>
      <div className={`mt-[-2.2rem] ${classes.relatedGradient} `}>
        {/*Related */}
        <section className="">
          <div className="mt-8 mx-5 border-solid border-b-0 border-r-0 border-t-1 border-l-1 border-primary pl-5 py-4">
            <h6 className="text-primary text-4xl md:text-6xl font-medium">Related</h6>
          </div>
          <RelatedCarousel product={product} />
        </section>

        {/*Movies */}
        <section>
          <div className="mb-10 mt-6 mx-5 border-solid border-b-0 border-r-0 border-t-1 border-l-1 border-primary pl-5 py-4">
            <h6 className="text-primary text-4xl md:text-6xl font-medium">Movies</h6>
          </div>
          <NewsCarousel catLabels={null} images={images2} content={null} slugs={null} />
        </section>

        {/* hr */}
        <div className="bg-transparent mt-10 pb-3">
          <hr className="border-l-gray-100 w-1/3 opacity-30 py-0 my-0" />
        </div>

        <div onClick={scrollToTop} className="flex justify-end mr-10 mt-10 mb-20">
          <FaArrowAltCircleUp className="text-8xl text-primary" />
        </div>
      </div>
    </>
  )
}
