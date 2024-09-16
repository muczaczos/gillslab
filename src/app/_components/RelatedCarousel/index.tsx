'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import styles from './index.module.scss'
import { FaRegHeart } from 'react-icons/fa'

const RelatedCarousel = ({ icons, images, catLabels }) => {
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

  return (
    <div
      className={styles.slider}
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
            <div className="flex justify-end">
              <FaRegHeart className="text-primary text-xl" />
            </div>
            <div className="flex justify-center mt-1 mb-3">
              <Image src={image} alt={`Slide ${index}`} width={80} height={100} />
            </div>
            <p className="mt-5 text-lg font-bold text-primary leading-3">{catLabels[index]}</p>
            <p className="text-lg text-primary">$40</p>
          </div>
        ))}
      <div className="flex-shrink-0 w-[100px]"></div>
    </div>
  )
}

export default RelatedCarousel
