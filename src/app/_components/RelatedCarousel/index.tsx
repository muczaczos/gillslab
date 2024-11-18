'use client'
import React, { useEffect, useRef, useState } from 'react'
import { FaRegHeart } from 'react-icons/fa'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io'
import Image from 'next/image'

import styles from './index.module.scss'

const RelatedCarousel = ({ icons, images, catLabels, product }) => {
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

  return (
    <div className="relative md:flex md:justify-center">
      <div
        className={`${styles.slider}`}
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images &&
          images.map((image, index) => (
            <div className={styles.slide} key={index}>
              <div className="flex justify-end lg:pb-5">
                <FaRegHeart className="text-primary text-xl lg:text-4xl" />
              </div>
              <div className="flex justify-center mt-1 mb-3 lg:mb-10">
                <Image
                  src={image}
                  alt={`Slide ${index}`}
                  width={80}
                  height={100}
                  className="lg:w-1/2"
                />
              </div>
              <p className="mt-5 text-lg font-bold text-primary leading-3 lg:text-3xl lg:ml-5">
                {catLabels[index]}
              </p>
              <p className="text-lg text-primary lg:text-2xl lg:ml-5">$40</p>
            </div>
          ))}
        <div className="flex-shrink-0 w-[100px]"></div>
        <IoIosArrowDropleftCircle
          className="z-50 absolute left-0 text-7xl top-1/2 text-customWhite  bg-primary rounded-full  transform -translate-y-1/2 p-0 hidden md:block"
          onClick={handlePrev}
        />
        <IoIosArrowDroprightCircle
          className="z-50 absolute right-0 top-1/2 transform -translate-y-1/2 text-7xl text-customWhite bg-primary rounded-full p-0 hidden md:block"
          onClick={handleNext}
        />
      </div>
    </div>
  )
}

export default RelatedCarousel
