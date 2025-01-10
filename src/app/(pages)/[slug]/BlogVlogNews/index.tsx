'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { Gutter } from '../../../_components/Gutter'
import NewsCarousel from '../../../_components/NewsCarousel'
import { fetchMovies } from './fetchMovies'
import { fetchPosts } from './fetchPosts'

import classes from './index.module.scss'

const BlogVlogNews = () => {
  const [movies, setMovies] = useState<any[]>([]) // Przechowujemy filmy w stanie
  const [posts, setPosts] = useState<any[]>([]) // Przechowujemy filmy w stanie
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

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postsData = await fetchPosts() // Wywołanie naszej funkcji fetch
        setPosts(postsData) // Ustawiamy stan na pobrane posty
      } catch (error) {
        setError('Failed to load movies') // Ustawiamy błąd, jeśli coś poszło nie tak
      } finally {
        setLoading(false) // Zmieniamy stan ładowania na false
      }
    }

    loadPosts() // Wywołanie asynchronicznej funkcji
  }, []) // Pusta tablica zależności, żeby wywołało się tylko raz

  if (loading) return <div>Loading...</div> // Wyświetlamy ładowanie
  if (error) return <div>{error}</div> // Wyświetlamy błąd

  const vlogSlugs = movies.slice(0, 5).map(vlogs => `${vlogs.youtubeLink}`)

  const vlogImages = movies
    .slice(0, 5) // Pobiera ostatnie 5 elementów z tablicy
    .map(vlogs => `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/media/${vlogs.media.filename}`) // Dodaje prefiks do ścieżki

  // data.docs.map(news => console.log(news.meta.image.filename))
  // data2.docs.map(vlogs => console.log(vlogs.slug))

  const images3 = posts
    .slice(0, 5) // Pobiera ostatnie 5 elementów z tablicy
    .map(news => `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/media/${news.meta.image.filename}`) // Dodaje prefiks do ścieżki

  const content = posts.slice(0, 5).map(news => news.meta.description)

  const slugs = posts
    .slice(0, 5)
    .map(news => `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/blog/${news.slug}`)

  const catLabels2 = posts.slice(0, 5).map(news => news.title)

  return (
    <div>
      {/* news on blog and vlog */}
      <section className={`${classes.blogvlog} pt-10`}>
        <Gutter>
          <div className="flex justify-between z-0">
            <p className="py-2 font-bold text-xl text-primary z-20 sm:text-3xl">News on Blog</p>
            <Link href={process.env.NEXT_PUBLIC_SERVER_URL + '/blog'}>
              <p className="pt-2 relative top-1 font-bold text-md text-primary sm:text-xl">
                View All
              </p>
            </Link>
          </div>
        </Gutter>
        <NewsCarousel catLabels={catLabels2} images={images3} content={content} slugs={slugs} />

        <div className="pb-10"></div>
        <Gutter>
          <div className="flex justify-between z-10">
            <Link href={process.env.NEXT_PUBLIC_SERVER_URL + '/vlog'}>
              <p className="py-2 relative top-1 font-bold text-md text-primary sm:text-xl">
                View All
              </p>
            </Link>
            <p className="py-2 font-bold text-xl text-primary sm:text-3xl">News on Vlog</p>
          </div>
        </Gutter>
        <NewsCarousel catLabels={null} images={vlogImages} content={null} slugs={vlogSlugs} />
      </section>
      {/* /////////// */}
    </div>
  )
}

export default BlogVlogNews
