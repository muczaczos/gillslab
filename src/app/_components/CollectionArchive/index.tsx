'use client'

import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import qs from 'qs'

import type { Post, Product } from '../../../payload/payload-types'
import type { ArchiveBlockProps } from '../../_blocks/ArchiveBlock/types'
import { useFilter } from '../../_providers/Filter'
import { Card } from '../Card'
import { PageRange } from '../PageRange'
import { Pagination } from '../Pagination'

import classes from './index.module.scss'

type Result = {
  docs: (Post | Product | string)[]
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage: number
  page: number
  prevPage: number
  totalDocs: number
  totalPages: number
}

export type Props = {
  categories?: ArchiveBlockProps['categories']
  className?: string
  limit?: number
  onResultChange?: (result: Result) => void // eslint-disable-line no-unused-vars
  populateBy?: 'collection' | 'selection'
  populatedDocs?: ArchiveBlockProps['populatedDocs']
  populatedDocsTotal?: ArchiveBlockProps['populatedDocsTotal']
  relationTo?: 'posts' | 'products'
  selectedDocs?: ArchiveBlockProps['selectedDocs']
  showPageRange?: boolean
  sort?: string
}

export const CollectionArchive: React.FC<Props> = props => {
  const { categoryFilters, sort } = useFilter()

  const {
    categories: catsFromProps,
    className,
    limit = 10,
    onResultChange,
    populateBy,
    populatedDocs,
    populatedDocsTotal,
    relationTo,
    selectedDocs,
    showPageRange,
  } = props

  const [results, setResults] = useState<Result>({
    docs: (populateBy === 'collection'
      ? populatedDocs
      : populateBy === 'selection'
      ? selectedDocs
      : []
    )?.map(doc => doc.value),
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: 1,
    page: 1,
    prevPage: 1,
    totalDocs: typeof populatedDocsTotal === 'number' ? populatedDocsTotal : 0,
    totalPages: 1,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const scrollRef = useRef<HTMLDivElement>(null)
  const hasHydrated = useRef(false)
  const isRequesting = useRef(false)
  const [page, setPage] = useState(1)

  const categories = (catsFromProps || [])
    .map(cat => (typeof cat === 'object' ? cat?.id : cat))
    .join(',')

  const scrollToRef = useCallback(() => {
    const { current } = scrollRef
    if (current) {
      // current.scrollIntoView({
      //   behavior: 'smooth',
      // })
    }
  }, [])

  useEffect(() => {
    if (!isLoading && typeof results.page !== 'undefined') {
      // scrollToRef()
    }
  }, [isLoading, scrollToRef, results])

  useEffect(() => {
    let timer: NodeJS.Timeout = null

    if (populateBy === 'collection' && !isRequesting.current) {
      isRequesting.current = true

      // hydrate the block with fresh content after first render
      // don't show loader unless the request takes longer than x ms
      // and don't show it during initial hydration
      timer = setTimeout(() => {
        if (hasHydrated.current) {
          setIsLoading(true)
        }
      }, 500)

      //filter categories in payload CMS dashboard
      if (categories !== '' && categoryFilters.length < 1) {
        categoryFilters.push(categories)
      }
      const searchQuery = qs.stringify(
        {
          depth: 1,
          limit,
          page,
          sort,
          where: {
            ...(categoryFilters && categoryFilters.length > 0
              ? {
                  categories: {
                    in: categoryFilters,
                  },
                }
              : {}),
          },
        },
        { encode: false },
      )

      const makeRequest = async () => {
        try {
          const req = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${relationTo}?${searchQuery}`,
          )

          const json = await req.json()
          clearTimeout(timer)

          const { docs } = json as { docs: Product[] }

          if (docs && Array.isArray(docs)) {
            setResults(json)
            setIsLoading(false)
            if (typeof onResultChange === 'function') {
              onResultChange(json)
            }
          }
        } catch (err) {
          console.warn(err) // eslint-disable-line no-console
          setIsLoading(false)
          setError(`Unable to load "${relationTo} archive" data at this time.`)
        }

        isRequesting.current = false
        hasHydrated.current = true
      }

      void makeRequest()
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [categories, categoryFilters, page, relationTo, onResultChange, sort, limit, populateBy])

  return (
    <div className={[classes.collectionArchive, className].filter(Boolean).join(' ')}>
      <div className={classes.scrollRef} ref={scrollRef} />
      {!isLoading && error && <div>{error}</div>}
      <Fragment>
        {showPageRange !== false && populateBy !== 'selection' && (
          <div className={classes.pageRange}>
            <PageRange
              collection={relationTo}
              currentPage={results.page}
              limit={limit}
              totalDocs={results.totalDocs}
            />
          </div>
        )}
        <div className={classes.grid}>
          {results.docs?.map(result => {
            if (typeof result === 'object' && result !== null) {
              return <Card key={result.id} doc={result} relationTo={relationTo} showCategories />
            }

            return null
          })}
        </div>
        {results.totalPages > 1 && populateBy !== 'selection' && (
          <Pagination
            className={classes.pagination}
            onClick={setPage}
            page={results.page}
            totalPages={results.totalPages}
          />
        )}
      </Fragment>
    </div>
  )
}
