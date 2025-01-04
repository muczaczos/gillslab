import React, { Suspense } from 'react'
import LayoutWithHeaderFooter from '../../layouts/withHeaderAndFooter/layout'
import MoviesContent from './MoviesContent'

const Movies = () => {
  const serverUrl = process.env.PAYLOAD_PUBLIC_SERVER_URL

  return (
    <LayoutWithHeaderFooter>
      <Suspense fallback={<div>Loading posts...</div>}>
        <MoviesContent serverUrl={serverUrl} />
      </Suspense>
    </LayoutWithHeaderFooter>
  )
}

export default Movies
