'use client'
import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io'
import Image from 'next/image'
import Link from 'next/link'

import styles from './index.module.scss'

const ProductsCarousel = ({ filteredPages, category }) => {
  const sliderRef = useRef(null)
  const [isDown, setIsDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  useEffect(() => {
    const slider = sliderRef.current
    if (slider) {
      const firstSlide = slider.querySelector(`.${styles.slide}`)
      const slideWidth = firstSlide ? firstSlide.offsetWidth : 0
      slider.scrollLeft = slideWidth / 2 // Ustawienie początkowego przesunięcia przy montowaniu komponentu
    }
  }, []) // Pusta tablica zależności, aby kod wykonał się tylko raz po montowaniu komponentu

  const handleMouseMove = event => {
    if (!isDown) return
    event.preventDefault()
    const slider = sliderRef.current
    const x = event.pageX - slider.offsetLeft
    const walk = x - startX
    slider.scrollLeft = scrollLeft - walk
  }

  const handleTouchMove = event => {
    if (!isDown) return
    event.preventDefault()
    const slider = sliderRef.current
    const x = event.touches[0].pageX - slider.offsetLeft
    const walk = x - startX
    slider.scrollLeft = scrollLeft - walk
  }

  const handleMouseDown = event => {
    const slider = sliderRef.current
    setIsDown(true)
    setStartX(event.pageX - slider.offsetLeft)
    setScrollLeft(slider.scrollLeft)
  }

  const handleTouchStart = event => {
    const slider = sliderRef.current
    setIsDown(true)
    setStartX(event.touches[0].pageX - slider.offsetLeft)
    setScrollLeft(slider.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsDown(false)
  }

  const handleMouseUp = () => {
    setIsDown(false)
  }

  const handleTouchEnd = () => {
    setIsDown(false)
  }

  const handleNext = () => {
    const slider = sliderRef.current
    const slideWidth = slider.querySelector(`.${styles.slide}`).offsetWidth
    slider.scrollLeft += slideWidth * 1.6 // Zmiana wartości na 1.6, aby przesuwać dwa razy więcej
  }

  const handlePrev = () => {
    const slider = sliderRef.current
    const slideWidth = slider.querySelector(`.${styles.slide}`).offsetWidth
    slider.scrollLeft -= slideWidth * 1.6 // Zmiana wartości na 1.6, aby przesuwać dwa razy więcej
  }

  // Dodanie stylów do smooth scrolling
  const smoothScroll = () => {
    const slider = sliderRef.current
    slider.style.scrollBehavior = 'smooth' // Włączenie płynnego przewijania
  }

  useEffect(() => {
    const slider = sliderRef.current
    if (slider) {
      slider.style.scrollBehavior = 'smooth' // Ustawienie płynnego przewijania przy montowaniu komponentu
    }
  }, []) // Pusta tablica zależności, aby kod wykonał się tylko raz po montowaniu komponentu

  if (!filteredPages) return null

  return (
    <div className="mt-10 relative md:flex md:justify-center">
      <div
        className={`${styles.slider} slider`}
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {filteredPages.map((product, index) => (
          <Link
            href={`${process.env.NEXT_PUBLIC_SERVER_URL}/shop/${category}/${product.slug}`}
            key={index}
            className={`${styles.slide} slide z-10 focus:outline-none`}
          >
            <div className="max-w-sm w-full rounded-2xl overflow-hidden shadow-custom-lg transition-shadow">
              <div className="p-4">
                <div className="flex justify-center w-full rounded-xl overflow-hidden">
                  <div className="z-50 w-[15rem] relative">
                    {product.media1?.url ? (
                      <Image
                        src={product.media1.url}
                        alt="Example Image"
                        width="200"
                        height="200"
                        style={{ objectFit: 'cover' }}
                        loading="eager" // lub priority={true}
                        onError={e => (e.currentTarget.src = '/placeholder.jpg')} // Zamienia na placeholder w razie błędu
                      />
                    ) : (
                      <div className="flex items-center justify-center w-[200px] h-[200px] bg-gray-200 text-gray-500">
                        Chyba jest problem z obrazem w jednym z produktow danej kategoreii
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <p className="max-w-full"></p>
              {!product.title && <div className="w-[20rem] pt-0"></div>}
              {product.title && (
                <div className="p-3 pt-0 ">
                  <h2 className="text-xl md:text-2xl text-primary-dark opacity-80 font-black">
                    {product.title}
                  </h2>
                  <p className="text-primary font-semibold text-sm md:text-lg leading-4 max-w-full break-words overflow-hidden">
                    {product.title2}
                  </p>

                </div>
              )}
            </div>
          </Link>
        ))}
        <div className="flex-shrink-0 w-[100px]"></div>
      </div>

      <IoIosArrowDropleftCircle
        className="z-50 absolute left-0 text-7xl top-1/2 text-customWhite  bg-primary rounded-full  transform -translate-y-1/2 p-0 hidden md:block"
        onClick={handlePrev}
      />
      <IoIosArrowDroprightCircle
        className="z-50 absolute right-0 top-1/2 transform -translate-y-1/2 text-7xl text-customWhite bg-primary rounded-full p-0 hidden md:block"
        onClick={handleNext}
      />
    </div>
  )
}

export default ProductsCarousel
