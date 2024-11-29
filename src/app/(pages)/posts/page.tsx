'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Post } from '../../../payload/payload-types'
import { fetchPosts } from '../../_components/FetchPosts'
import LayoutWithHeaderFooter from '../../layouts/withHeaderAndFooter/layout'
import PostsCards from './PostsCards'

import classes from './index.module.scss'

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]) // Tablica postów
  const [totalPages, setTotalPages] = useState<number>(0) // Liczba stron
  const [currentPage, setCurrentPage] = useState<number>(1) // Numer aktualnej strony

  const router = useRouter()
  const searchParams = useSearchParams()

  // Funkcja fetchująca posty
  const getPosts = async (page: number) => {
    const postsData = await fetchPosts(page, 4) // 4 posty na stronę
    setPosts(postsData.docs) // Ustawiamy posty
    setTotalPages(postsData.totalPages) // Ustawiamy liczbę stron
  }

  // Pobranie postów na podstawie query params
  useEffect(() => {
    const pageFromUrl = searchParams.get('page')
    const currentPageNum = pageFromUrl ? parseInt(pageFromUrl, 10) : 1
    setCurrentPage(currentPageNum)
    getPosts(currentPageNum)
  }, [searchParams]) // Zaktualizuj za każdym razem, gdy searchParams się zmienia

  // Funkcja zmieniająca stronę
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage) // Zaktualizuj stan
      router.push(`/blog?page=${newPage}`) // Zaktualizuj URL
    }
  }

  return (
    <LayoutWithHeaderFooter>
      <div className="pr-2 pl-2 bg-customWhite w-full md:flex md:flex-col items-center">
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
        <PostsCards posts={posts} />

        {/* Paginacja */}
        <div className="pagination">
          {/* Przycisk do pierwszej strony */}
          <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
            First
          </button>

          {/* Przycisk do poprzedniej strony */}
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>

          {/* Linki do stron */}
          <span>
            Page {currentPage} of {totalPages}
          </span>

          {/* Przycisk do następnej strony */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>

          {/* Przycisk do ostatniej strony */}
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        </div>

        <div className="mb-40"></div>
      </div>
    </LayoutWithHeaderFooter>
  )
}

export default Posts
