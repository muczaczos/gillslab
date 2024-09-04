'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import styles from './index.module.scss'

const NewsCarousel = ({ images, catLabels }) => {
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
      className={`${styles.slider} slider`}
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {images.map((image, index) => (
        <div className={`${styles.slide} slide z-10`} key={index}>
          <div className="max-w-sm w-full rounded-2xl overflow-hidden shadow-lg frame-gradient">
            <div className="p-4">
              <div className="w-full rounded-xl overflow-hidden">
                <div className="z-50 h-[8rem] w-full relative">
                  <Image src={image} alt="Example Image" layout="fill" objectFit="cover" />
                </div>
              </div>
            </div>
            {catLabels && (
              <div className="p-3 pt-0 ">
                <h2 className="text-xl text-primary opacity-80 font-bold">{catLabels[index]}</h2>
                <p className="text-primary text-sm leading-4 max-w-full break-words overflow-hidden">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non, ipsam consectetur
                  rerum sit qui accusantium architecto vero, corporis tempora perspiciatis
                  distinctio placeat quae aut odit sint veritatis possimus sapiente. Fuga.
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="flex-shrink-0 w-[100px]"></div>
    </div>
  )
}

export default NewsCarousel
