import React from 'react'
import { Metadata } from 'next'
import Head from 'next/head'
import { draftMode } from 'next/headers'
import Image from 'next/image'

import { Category, Page, Product } from '../../../payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import { Gutter } from '../../_components/Gutter'
import { Hero } from '../../_components/Hero'
import { HR } from '../../_components/HR'
import LayoutWithHeaderFooter from '../../layouts/withHeaderAndFooter/layout'
import GrowkitsCards from '../cubensis-grow-kits/GrowkitsCards'
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
    <LayoutWithHeaderFooter>
      <Head>
        {/* 60 char */}
        <title>Beginner-Friendly Cubensis Liquid Culture – Simplify Mushroom Cultivation</title>
        {/* 150 char */}
        <meta
          name="description"
          content="Discover the Fascinating World 🌱 of Fungi with Our Premium Liquid Culture Kits – Unleash the Magic of Mushroom Growth at Home"
        />
        <meta
          name="keywords"
          content="Cubensis liquid cultures, Liquid cultures, cubensis mycelium, Cubensis, Cubensis spores, Fungi, Organic Mushrooms"
        />
        <meta name="author" content="www.gillslab.com" />
        <meta property="og:title" content="Liquid culture - Start Your Mushroom Cultivation" />
        <meta
          property="og:description"
          content="
          Discover the Fascinating World 🌱 of Fungi with Our Premium Liquid Culture Kits – Unleash the Magic of Mushroom Growth at Home"
        />
        <meta property="og:image" content="/media/growkit.jpeg" />
        <meta
          property="og:url"
          content="https://planet-of-mushrooms.com/cubensis-liquid-cultures"
        />
        <meta property="og:type" content="website" />
      </Head>
      <Gutter className="bg-customWhite pb-64">
        <div className={classes.imageTitle}>
          <Image
            alt="Syringe needle inside ampoule"
            src="/media/cultures.jpeg"
            height="500"
            width="600"
          />
          <h1 className="text-4xl">Cultivate with Cubensis Liquid Cultures! 🧪🧪🧪🍄</h1>
        </div>
        <p className="mt-5 text-lg">
          Experience Effortless Growth with Cubensis Liquid Cultures! Our premium liquid cultures
          offer a hassle-free solution for mushroom cultivation. Inject 💉 vitality into your
          substrate and witness rapid mycelial colonization 🚀, leading to bountiful harvests.
          Perfect for both beginners and seasoned growers, our liquid cultures ensure consistent
          results and robust mushroom yields 🍄🍄🍄. Elevate your cultivation game 🎮 with Cubensis
          Liquid Cultures today!
        </p>
        <div className={`${classes.gap} bg-customWhite`}></div>
        <GrowkitsCards pages={filteredPages} products={products} />
      </Gutter>
    </LayoutWithHeaderFooter>
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
