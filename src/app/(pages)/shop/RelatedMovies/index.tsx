'use client'

import React, { useEffect, useRef, useState } from 'react'
import { FaArrowAltCircleUp } from 'react-icons/fa'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import Image from 'next/image'

import { Product } from '../../../../payload/payload-types'
import { Gutter } from '../../../_components/Gutter'
import NewsCarousel from '../../../_components/NewsCarousel'
import RelatedCarousel from '../../../_components/RelatedCarousel'
import RichText from '../../../_components/RichText'
import { fetchMovies } from '../../[slug]/BlogVlogNews/fetchMovies'

import 'react-tabs/style/react-tabs.css'

import classes from './index.module.scss'
// Definicja typu dla props

export const RelatedMovies: React.FC<{ product: Product }> = ({ product }) => {
  const [movies, setMovies] = useState<any[]>([]) // Przechowujemy filmy w stanie
  const [loading, setLoading] = useState<boolean>(true) // Przechowujemy stan ładowania

  const [error, setError] = useState<string | null>(null) // Przechowujemy stan błędu
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const moviesData = await fetchMovies() // Wywołanie naszej funkcji fetch
        setMovies(moviesData) // Ustawiamy stan na pobrane filmy
      } catch (error) {
        setError('Failed to load movies') // Ustawiamy błąd, jeśli coś poszło nie tak
      } finally {
        setLoading(false) // Zmieniamy stan ładowania na false
      }
    }

    loadMovies() // Wywołanie asynchronicznej funkcji
  }, []) // Pusta tablica zależności, żeby wywołało się tylko raz
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

  const catLabels = ['Growkit 1', 'Growkit 2', 'Growkit 3', 'Growkit 4', 'Growkit 5']

  if (loading) return <div>Loading...</div> // Wyświetlamy ładowanie
  if (error) return <div>{error}</div> // Wyświetlamy błąd

  const vlogSlugs = movies.slice(0, 5).map(vlogs => `${vlogs.youtubeLink}`)
  const vlogTitles = movies.slice(0, 5).map(vlogs => `${vlogs.title}`)
  const vlogImages = movies
    .slice(0, 5) // Pobiera ostatnie 5 elementów z tablicy
    .map(vlogs => `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/media/${vlogs.media.filename}`) // Dodaje prefiks do ścieżki

  return (
    <>
      <div className={classes.diagonalRelated}></div>
      <div className={`mt-[-2.2rem] ${classes.relatedGradient} `}>
        {/*Related */}
        <section className="">
          <div className="mt-8 mx-5 border-solid border-b-0 border-r-0 border-t-1 border-l-1 border-primary pl-5 py-4">
            <h6 className="text-primary text-4xl md:text-6xl font-medium">Related</h6>
          </div>
          <RelatedCarousel product={product} icons={null} images={images2} catLabels={catLabels} />
        </section>

        {/*Movies */}
        <section>
          <div className="mb-10 mt-6 mx-5 border-solid border-b-0 border-r-0 border-t-1 border-l-1 border-primary pl-5 py-4">
            <h6 className="text-primary text-4xl md:text-6xl font-medium">Movies</h6>
          </div>
          <NewsCarousel
            catLabels={null}
            images={vlogImages}
            content={null}
            slugs={vlogSlugs}
            vlogTitles={vlogTitles}
          />
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
