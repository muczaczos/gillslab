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
import LiquidsCards from './LiquidsCards'

import classes from './index.module.scss'

const CubensisLiquidCultures = async () => {
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
      return page.categories[0].slug === 'cubensis-liquid-cultures'
    }
  })

  return (
    <Gutter>
      <div className={classes.imageTitle}>
        <Image
          alt="Syringe needle inside ampoule"
          src="/media/cultures.jpeg"
          height="500"
          width="600"
        />
        <h2 className={classes.title}>Cultivate with Cubensis Liquid Cultures! 🧪🧪🧪🍄</h2>
      </div>
      <p className="mt-5 text-lg">
        Experience Effortless Growth with Cubensis Liquid Cultures! Our premium liquid cultures
        offer a hassle-free solution for mushroom cultivation. Inject 💉 vitality into your
        substrate and witness rapid mycelial colonization 🚀, leading to bountiful harvests. Perfect
        for both beginners and seasoned growers, our liquid cultures ensure consistent results and
        robust mushroom yields 🍄🍄🍄. Elevate your cultivation game 🎮 with Cubensis Liquid
        Cultures today!
      </p>
      <div className={classes.gap}></div>
      <LiquidsCards pages={filteredPages} products={products} />
      <HR />
    </Gutter>
  )
}

// either Static metadata
export const metadata: Metadata = {
  title: 'Cultivate with Cubensis Liquid Cultures - Easy inoculation', //60 char
  description:
    'Experience Effortless Growth with Cubensis Liquid Cultures! Our premium liquid cultures offer a hassle-free solution for mushroom cultivation', //150 char
  keywords:
    'Cubensis liquid cultures, mushroom mycelium, Azurescens spores, Cubensis spore print, Fungus, Organic Mushrooms Mycelium',
  openGraph: {
    images: ['/media/cultures.jpeg'],
    title: 'Cultivate with Cubensis Liquid Cultures - Easy inoculation',
    description:
      'Experience Effortless Growth with Cubensis Liquid Cultures! Our premium liquid cultures offer a hassle-free solution for mushroom cultivation',
    url: 'https://planet-of-mushrooms.com/cubensis-liquid-cultures',
    type: 'website',
  },
}

export default CubensisLiquidCultures
