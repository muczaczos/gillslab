import React from 'react'
import { draftMode } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

import { Page, Post } from '../../../payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import { fetchPosts } from '../../_components/FetchPosts'
import { Gutter } from '../../_components/Gutter'
import { HR } from '../../_components/HR'
import LayoutWithHeaderFooter from '../../layouts/withHeaderAndFooter/layout'
import PostsCards from './PostsCards'

import classes from './index.module.scss'

const Posts = async () => {
  let pages = []
  pages = await fetchPosts(1, 2)
  return (
    <LayoutWithHeaderFooter>
      <div className="pr-2 pl-2 bg-customWhite w-full md:flex md:flex-col items-center ">
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
        <PostsCards pages={pages} />
        <div className="mb-40"></div>
      </div>
    </LayoutWithHeaderFooter>
  )
}

export default Posts
