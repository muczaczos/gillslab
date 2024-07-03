import React from 'react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Image from 'next/image'

import { Category, Page, Product } from '../../../payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import { Gutter } from '../../_components/Gutter'
import { Hero } from '../../_components/Hero'
import { HR } from '../../_components/HR'
import PrintsCards from './PrintsCards'

import classes from './index.module.scss'

const CubensisSporePrints = async () => {
  const { isEnabled: isDraftMode } = draftMode()
  let products: Product[] | null = null
  let pages = []
  let filteredPages = []

  try {
    products = await fetchDocs<Product>('products')

    for (let i = 0; i < products.length; i++) {
      pages[i] = await fetchDoc<Page>({
        collection: 'products',
        slug: products[i].slug,
        draft: isDraftMode,
      })
    }
  } catch (error) {
    //console.log(error)
  }

  filteredPages = pages.filter(page => {
    if (page.categories[0]) {
      return page.categories[0].slug === 'cubensis-spore-prints'
    }
  })

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
      <PrintsCards pages={filteredPages} products={products} />
      <HR />
    </Gutter>
  )
}

// either Static metadata
export const metadata: Metadata = {
  title: 'Cubensis Spore Prints: High-Quality Mushroom Genetics', //60 char
  description:
    'Explore 🔎 our diverse collection of Cubensis Spore Prints 🧫🧫🧫, each meticulously harvested to ensure optimal genetics 🍄.', //150 char
  keywords:
    'Cubensis spore prints, spore syringes, Azurescens spores, mushrooms spore print, mycelium, Organic Mushrooms Spores',
  openGraph: {
    images: ['/media/prints.jpeg'],
    title: 'Cubensis Spore Prints: High-Quality Mushroom Genetics',
    description:
      'Explore 🔎 our diverse collection of Cubensis Spore Prints 🧫🧫🧫, each meticulously harvested to ensure optimal genetics 🍄.',
    url: 'https://planet-of-mushrooms.com/cubensis-spore-prints',
    type: 'website',
  },
}

export default CubensisSporePrints
