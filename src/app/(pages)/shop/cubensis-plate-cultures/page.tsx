import React from 'react'
import Head from 'next/head'
import { draftMode } from 'next/headers'
import Image from 'next/image'

import { Page, Product } from '../../../../payload/payload-types'
import { fetchDoc } from '../../../_api/fetchDoc'
import { fetchDocs } from '../../../_api/fetchDocs'
import { Gutter } from '../../../_components/Gutter'
import { HR } from '../../../_components/HR'
import LayoutWithHeaderFooter from '../../../layouts/withHeaderAndFooter/layout'
import PlatesCards from './PlatesCards'

import classes from './index.module.scss'

const CubensisPlatesCultures = async () => {
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
      return page.categories[0].slug === 'cubensis-plate-cultures'
    }
  })

  return (
    <LayoutWithHeaderFooter>
      <Head>
        {/* 60 char */}
        <title>Cultivate with Precision: Psilocybe Cubensis Plate Cultures!</title>
        {/* 150 char */}
        <meta
          name="description"
          content="Enhance your mushroom cultivation endeavors with our premium Cubensis Plate Cultures 🍽️. Designed to streamline the cultivation process"
        />
        <meta
          name="keywords"
          content="Cubensis spore prints, spore syringes, Azurescens spores, mushrooms spore print, mycelium, Organic Mushrooms Spores"
        />
        <meta name="author" content="www.gillslab.com" />
        <meta
          property="og:title"
          content="Cultivate with Precision: Psilocybe Cubensis Plate Cultures!"
        />
        <meta
          property="og:description"
          content="
          Enhance your mushroom cultivation endeavors with our premium Cubensis Plate Cultures 🍽️. Designed to streamline the cultivation process"
        />
        <meta property="og:image" content="/media/cultures.jpeg" />
        <meta property="og:url" content="https://planet-of-mushrooms.com/cubensis-plate-cultures" />
        <meta property="og:type" content="website" />
      </Head>
      <Gutter>
        <div className={classes.imageTitle}>
          <Image
            alt="Syringe needle inside ampoule"
            src="/media/cultures.jpeg"
            height="500"
            width="600"
          />
          <h1 className={classes.title}>
            Cultivate with Precision: Cubensis Plate Cultures! 🧫🧫🧫
          </h1>
        </div>
        <p className="text-xl lg:pt-10">
          Enhance your mushroom cultivation endeavors with our premium Cubensis Plate Cultures 🍽️.
          Designed to streamline the cultivation process, our petri dish cultures are meticulously
          prepared to deliver exceptional results. Each plate contains a carefully isolated strain,
          ensuring purity and potency for successful cultivation 💪. Elevate your growing experience
          with our high-quality plate cultures today 🚀.
        </p>
        <div className={classes.gap}></div>
        <PlatesCards pages={filteredPages} products={products} />
        <HR />
      </Gutter>
    </LayoutWithHeaderFooter>
  )
}

export default CubensisPlatesCultures
