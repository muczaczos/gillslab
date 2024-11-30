'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Post } from '../../../payload/payload-types'
import { fetchPosts } from '../../_components/FetchPosts'
import LayoutWithHeaderFooter from '../../layouts/withHeaderAndFooter/layout'
import PostsCards from './PostsCards'

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]) // Tablica postów
  const [totalPages, setTotalPages] = useState<number>(0) // Liczba stron
  const [currentPage, setCurrentPage] = useState<number>(1) // Numer aktualnej strony
  const [showAll, setShowAll] = useState<boolean>(false) // Stan dla "See All"
  const [currentPageInput, setCurrentPageInput] = useState<string>('') // Stan lokalny dla inputa

  const router = useRouter()
  const searchParams = useSearchParams()

  // Funkcja fetchująca posty
  const getPosts = async (page: number, perPage: number) => {
    const postsData = await fetchPosts(page, perPage) // Fetch 4 posty na stronę
    setPosts(postsData.docs) // Ustawiamy posty
    setTotalPages(postsData.totalPages) // Ustawiamy liczbę stron
  }

  // Pobranie postów na podstawie query params
  useEffect(() => {
    const pageFromUrl = searchParams.get('page')
    const currentPageNum = pageFromUrl ? parseInt(pageFromUrl, 10) : 1

    const savedShowAll = sessionStorage.getItem('showAll') === 'true' // Odczytaj zapisany stan

    setShowAll(savedShowAll) // Przywróć stan "See All"
    setCurrentPage(currentPageNum)

    if (savedShowAll) {
      // Jeśli pokazujemy wszystkie posty
      getPosts(1, 9999) // Pobierz wszystkie posty
    } else {
      getPosts(currentPageNum, 4) // Paginacja
    }
  }, [searchParams]) // Zaktualizuj przy zmianie query params lub "See All"

  // Funkcja zmieniająca stronę
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage) // Zaktualizuj stan
      setShowAll(false) // Przełącz na paginację
      sessionStorage.setItem('showAll', 'false') // Zapisz stan
      router.push(`/blog?page=${newPage}`) // Zaktualizuj URL
    }
  }

  // Funkcja zmieniająca widoczność wszystkich postów
  const handleSeeAllToggle = () => {
    setShowAll(true) // Przełącz na "See All"
    sessionStorage.setItem('showAll', 'true') // Zapisz stan
    router.push('/blog') // Zmień adres URL na /blog
  }

  // Funkcja powrotu do paginacji
  const handleReturnToPagination = () => {
    setShowAll(false)
    sessionStorage.setItem('showAll', 'false') // Zapisz stan
    router.push(`/blog?page=${currentPage}`) // Powrót do obecnej strony paginacji
  }

  // Funkcja do generowania numerów stron w paginacji
  const renderPageNumbers = () => {
    const pages: (number | string)[] = []
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages)
      } else if (currentPage > totalPages - 3) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      }
    }
    return pages
  }

  return (
    <LayoutWithHeaderFooter>
      <div className="pr-2 pl-2 bg-customWhite w-full flex flex-col items-center">
        <div className="w-full flex flex-col mt-10 mb-2 md:max-w-[1536px]">
          <h1 className="text-primary font-medium">Blog</h1>
          <h2 className="text-primary-light font-normal text-2xl">Discover new articles</h2>
        </div>
        <p className="text-xl text-customGray-dark md:max-w-[1536px]">
          You can find here many informations about mushrooms and their cultivating. Master the art
          of mushrooms cultivation for a bountiful harvest. 🍄 Change your planet to
          planet-of-mushrooms.com 🌎
        </p>
        <div className="p-2"></div>

        {/* Przyciski dla trybów widoku */}
        <div className="flex justify-center mt-5">
          {showAll ? (
            <button
              onClick={handleReturnToPagination}
              className="appearance-none border-none px-4 py-2 bg-primary text-customWhite rounded-lg hover:bg-primary-dark"
            >
              Return to Pagination
            </button>
          ) : (
            <button
              onClick={handleSeeAllToggle}
              className="appearance-none border-none px-4 py-2 bg-primary text-customWhite rounded-lg hover:bg-primary-dark"
            >
              See All
            </button>
          )}
        </div>
        {/* Paginacja (jeśli nie pokazujemy wszystkich postów) */}
        {!showAll && totalPages > 1 && (
          <div className="flex w-full justify-between px-5 items-center md:max-w-[1536px]">
            {/* strzałki i liczby nawigacyjne */}
            <div className="flex items-center justify-center mt-5 space-x-2">
              {/* Strzałka w lewo */}
              <button
                className="appearance-none border-none bg-transparent text-xl text-customGray-dark disabled:text-customGray-light"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {'<'}
              </button>

              {/* Numery stron */}
              {renderPageNumbers().map((page, index) =>
                typeof page === 'number' ? (
                  <button
                    key={index}
                    className={`appearance-none border-none bg-customWhite px-3 py-1 text-customGray-dark ${
                      page === currentPage
                        ? 'bg-primary text-customWhite rounded-full'
                        : 'hover:underline'
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ) : (
                  <span key={index} className="text-customGray-light">
                    {page}
                  </span>
                ),)}
              {/* Strzałka w prawo */}
              <button
                className="appearance-none border-none bg-transparent text-xl text-customGray-dark disabled:text-customGray-light"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                {'>'}
              </button>
            </div>

            {/* Combobox z wyborem strony */}
            <select
              value={currentPage}
              onChange={e => handlePageChange(parseInt(e.target.value, 10))}
              className="ml-4 p-2 border border-gray-300 rounded-md"
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <option key={page} value={page}>
                  Page {page}
                </option>
              ))}
            </select>
          </div>
        )}

        <PostsCards posts={posts} />

        {/* Paginacja (jeśli nie pokazujemy wszystkich postów) */}
        {!showAll && totalPages > 1 && (
          <div className="flex w-full justify-between px-5 items-center md:max-w-[1536px]">
            {/* strzałki i liczby nawigacyjne */}
            <div className="flex items-center justify-center mt-5 space-x-2">
              {/* Strzałka w lewo */}
              <button
                className="appearance-none border-none bg-transparent text-xl text-customGray-dark disabled:text-customGray-light"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {'<'}
              </button>

              {/* Numery stron */}
              {renderPageNumbers().map((page, index) =>
                typeof page === 'number' ? (
                  <button
                    key={index}
                    className={`appearance-none border-none bg-customWhite px-3 py-1 text-customGray-dark ${
                      page === currentPage
                        ? 'bg-primary text-customWhite rounded-full'
                        : 'hover:underline'
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ) : (
                  <span key={index} className="text-customGray-light">
                    {page}
                  </span>
                ),)}

              {/* Strzałka w prawo */}
              <button
                className="appearance-none border-none bg-transparent text-xl text-customGray-dark disabled:text-customGray-light"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                {'>'}
              </button>
            </div>

            {/* Combobox z wyborem strony */}
            <select
              value={currentPage}
              onChange={e => handlePageChange(parseInt(e.target.value, 10))}
              className="ml-4 p-2 mt-5 border border-gray-300 rounded-md"
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <option key={page} value={page}>
                  Page {page}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Przyciski dla trybów widoku */}
        <div className="flex justify-center mt-5">
          {showAll ? (
            <button
              onClick={handleReturnToPagination}
              className="appearance-none border-none px-4 py-2 bg-primary text-customWhite rounded-lg hover:bg-primary-dark"
            >
              Return to Pagination
            </button>
          ) : (
            <button
              onClick={handleSeeAllToggle}
              className="appearance-none border-none px-4 py-2 bg-primary text-customWhite rounded-lg hover:bg-primary-dark"
            >
              See All
            </button>
          )}
        </div>
        <div className="mb-40"></div>
      </div>
    </LayoutWithHeaderFooter>
  )
}

export default Posts
