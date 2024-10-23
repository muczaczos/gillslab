'use client'
import React from 'react'
import Image from 'next/image'

import { Gutter } from '../../_components/Gutter'
import { HR } from '../../_components/HR'
import PrintsCards from './PrintsCards'

import classes from './index.module.scss'
import FavoritesPage from './FavoritiesPage'

const Favorities = () => {

  return (
    <Gutter>
      <div className={classes.imageTitle}>
        <Image alt="Planet of mushrooms" src="/media/prints.jpeg" height="500" width="600" />
        <h2 className={classes.title}>
          Cubensis Spore Prints: High-Quality Mushroom Genetics 😍😍😍
        </h2>
      </div>
      <p className={classes.heroText}>
        Explore 🔎 our diverse collection of Cubensis Spore Prints 🧫🧫🧫, each meticulously
        harvested to ensure optimal genetics 🍄. These prints offer a convenient way to propagate
        your favorite mushroom strains, whether you're a seasoned cultivator 👴 or just starting
        your mycological journey 👶. With our high-quality spore prints, you can embark on exciting
        mushroom cultivation projects with confidence. 😎
      </p>
      <div className={classes.gap}></div>
      <FavoritesPage />
      <HR />
    </Gutter>
  )
}


export default Favorities
