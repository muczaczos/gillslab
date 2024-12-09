'use client'

import React, { Suspense, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'

import { Post } from '../../../payload/payload-types'
import { fetchPosts } from '../../_components/FetchPosts'
import LayoutWithHeaderFooter from '../../layouts/withHeaderAndFooter/layout'

const PostsCards = dynamic(() => import('./PostsCards'), { suspense: true })

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [showAll, setShowAll] = useState<boolean>(false)

  const router = useRouter()
  const searchParams = useSearchParams()

  const getPosts = async (page: number, perPage: number) => {
    try {
      const postsData = await fetchPosts(page, perPage)
      setPosts(postsData.docs)
      setTotalPages(postsData.totalPages)
    } catch (error) {
      //console.error('Error fetching posts:', error)
    }
  }

  useEffect(() => {
    const fetchPostsOnLoad = () => {
      const pageFromUrl = searchParams?.get('page')
      const currentPageNum = pageFromUrl ? parseInt(pageFromUrl, 10) : 1

      const savedShowAll = sessionStorage.getItem('showAll') === 'true'
      setShowAll(savedShowAll)
      setCurrentPage(currentPageNum)

      if (savedShowAll) {
        getPosts(1, 9999)
      } else {
        getPosts(currentPageNum, 4)
      }
    }

    fetchPostsOnLoad()
  }, [searchParams])

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
      setShowAll(false)
      sessionStorage.setItem('showAll', 'false')
      router.push(`/blog?page=${newPage}`)
    }
  }

  const handleSeeAllToggle = () => {
    setShowAll(true)
    sessionStorage.setItem('showAll', 'true')
    router.push('/blog')
  }

  const handleReturnToPagination = () => {
    setShowAll(false)
    sessionStorage.setItem('showAll', 'false')
    router.push(`/blog?page=${currentPage}`)
  }

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

        {!showAll && totalPages > 1 && (
          <div className="flex w-full justify-between px-5 items-center md:max-w-[1536px]">
            <div className="flex items-center justify-center mt-5 space-x-2">
              <button
                className="appearance-none border-none bg-transparent text-xl text-customGray-dark disabled:text-customGray-light"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {'<'}
              </button>
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
                ),
              )}
              <button
                className="appearance-none border-none bg-transparent text-xl text-customGray-dark disabled:text-customGray-light"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                {'>'}
              </button>
            </div>
          </div>
        )}

        <Suspense fallback={<div>Loading posts...</div>}>
          <PostsCards posts={posts} />
        </Suspense>

        <div className="mb-40"></div>
      </div>
    </LayoutWithHeaderFooter>
  )
}

export default Posts
