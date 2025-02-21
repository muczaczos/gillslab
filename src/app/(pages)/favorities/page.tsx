'use client'
import React from 'react'

import { Gutter } from '../../_components/Gutter'
import LayoutWithHeaderFooter from '../../layouts/withHeaderAndFooter/layout'
import FavoritesPage from './FavoritiesPage'

const Favorities = () => {
  // console.log('sdfdsfsfsfd$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
  return (
    <LayoutWithHeaderFooter>
      <Gutter className="bg-customWhite pb-64">
        <div className="pt-10 pb-10">
          <h1 className="text-primary text-4xl md:text-6xl">
            Your favorities mushrooms products are here 😍😍😍
          </h1>
        </div>
        <FavoritesPage />
      </Gutter>
    </LayoutWithHeaderFooter>
  )
}

export default Favorities
