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
    const handleMouseMove = event => {
      if (!isDown) return
      event.preventDefault()
      const x = event.pageX - slider.offsetLeft
      const walk = x - startX
      slider.scrollLeft = scrollLeft - walk
    }

    const handleTouchMove = event => {
      if (!isDown) return
      event.preventDefault()
      const x = event.touches[0].pageX - slider.offsetLeft
      const walk = x - startX
      slider.scrollLeft = scrollLeft - walk
    }

    if (slider) {
      slider.addEventListener('mousemove', handleMouseMove)
      slider.addEventListener('touchmove', handleTouchMove)

      return () => {
        slider.removeEventListener('mousemove', handleMouseMove)
        slider.removeEventListener('touchmove', handleTouchMove)
      }
    }
  }, [isDown, startX, scrollLeft])

  const handleMouseDown = event => {
    setIsDown(true)
    setStartX(event.pageX - sliderRef.current.offsetLeft)
    setScrollLeft(sliderRef.current.scrollLeft)
  }

  const handleTouchStart = event => {
    setIsDown(true)
    setStartX(event.touches[0].pageX - sliderRef.current.offsetLeft)
    setScrollLeft(sliderRef.current.scrollLeft)
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
      className={`${styles.slider} slider`} // Połączenie Tailwind i SCSS klas
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {images.map((image, index) => (
        <div className={`${styles.slide} slide`} key={index}>
          <div className="max-w-sm w-full rounded-2xl overflow-hidden shadow-lg frame-gradient">
            <div className="p-4">
              <div className="w-full rounded-xl overflow-hidden">
                <div className="h-[8rem] w-full relative">
                  <Image
                    src={image} // Podaj ścieżkę do swojego obrazu
                    alt="Example Image"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>
            {catLabels && (
              <div className="p-3 pt-0">
                <h2 className="text-xl text-customWhite font-bold">{catLabels[index]}</h2>
                <p className="text-customWhite text-sm leading-4 max-w-full break-words overflow-hidden">
                  {catLabels[index] + catLabels[index] + catLabels[index] + catLabels[index] + catLabels[index]}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default NewsCarousel
