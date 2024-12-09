'use client'

import React, { Suspense, useEffect, useState } from 'react'

import LayoutWithHeaderFooter from '../../layouts/withHeaderAndFooter/layout'
import PostsCards from './PostsCards'
import PostsContent from './PostsContent'

const Posts = () => {
  return (
    <LayoutWithHeaderFooter>
      <Suspense fallback={<div>Loading posts...</div>}>
        <PostsContent />
      </Suspense>
    </LayoutWithHeaderFooter>
  )
}

export default Posts
