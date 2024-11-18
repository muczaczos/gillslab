'use client'
import React from 'react'
import Image from 'next/image'

import { Gutter } from '../../_components/Gutter'
import { HR } from '../../_components/HR'
import LayoutWithHeaderFooter from '../../layouts/withHeaderAndFooter/layout'
import FavoritesPage from './FavoritiesPage'

import classes from './index.module.scss'

const Favorities = () => {

  console.log('sdfdsfsfsfd$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
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
