import React from 'react'

import { Gutter } from '../../_components/Gutter'
import LayoutWithHeaderFooter from '../../layouts/withHeaderAndFooter/layout'

const Blog = async () => {
  return (
    <LayoutWithHeaderFooter>
      <Gutter className="pb-32">
        <h1>Blog</h1>
      </Gutter>
    </LayoutWithHeaderFooter>
  )
}

export default Blog
