import React, { Suspense } from 'react'

import LayoutWithHeaderFooter from '../../layouts/withHeaderAndFooter/layout'
import PostsContent from './PostsContent'

const Posts = () => {
  const serverUrl = process.env.PAYLOAD_PUBLIC_SERVER_URL

  return (
    <LayoutWithHeaderFooter>
      <Suspense fallback={<div>Loading posts...</div>}>
        <PostsContent serverUrl={serverUrl} />
      </Suspense>
    </LayoutWithHeaderFooter>
  )
}

export default Posts
