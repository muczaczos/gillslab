'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from './index.module.scss'
import DynamicIcon from '../DaynamicIcon'

const SmallCarousel = ({ icons, images, catLabels, links }) => {
  const sliderRef = useRef(null)
  const [isDown, setIsDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  if (links === null) {
    links = ['', '', '', '']
  }
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
          <Link href={`/${links[index]}`}>
            <div className={`${styles.slide} w-[150px] md:w-[200px]`} key={index}>
              <Image src={image} alt={`Slide ${index}`} width={80} height={100} />
              <h3 className="text-xl text-primary opacity-70">{catLabels[index]}</h3>
            </div>
          </Link>
        ))}
      {icons &&
        icons.map((Icon, index) => (
          <Link href={`/${links[index]}`} className="w-full">
            <div className={`${styles.slide} w-[150px] md:w-[200px]`} key={index}>
              {/* Renderowanie ikony */}
              <DynamicIcon
                  library={Icon.iconLibrary}
                  name={Icon.iconName}
                  size={50}
                  color="#4968AC"
              />
              <h3 className="text-xs text-primary opacity-70 md:text-lg">{catLabels[index]}</h3>
            </div>
          </Link>
        ))}
      <div className="flex-shrink-0 w-[100px]"></div>
    </div>
  )
}

export default SmallCarousel
