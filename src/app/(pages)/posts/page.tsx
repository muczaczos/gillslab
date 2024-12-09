'use client'

import React, { Suspense, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'

import { Post } from '../../../payload/payload-types'
import { fetchPosts } from '../../_components/FetchPosts'
import LayoutWithHeaderFooter from '../../layouts/withHeaderAndFooter/layout'

const PostsCards = dynamic(() => import('./PostsCards'), { suspense: true })

const Posts = () => {
  return (
    <LayoutWithHeaderFooter>
      <div className="pr-2 pl-2 bg-customWhite w-full flex flex-col items-center"></div>
    </LayoutWithHeaderFooter>
  )
}

export default Posts
