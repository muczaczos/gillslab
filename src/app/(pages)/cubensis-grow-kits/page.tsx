import React from 'react'
import { Metadata } from 'next'
import Head from 'next/head'
import { draftMode } from 'next/headers'
import Image from 'next/image'

import { Page, Product } from '../../../payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import { Gutter } from '../../_components/Gutter'
import { HR } from '../../_components/HR'
import GrowkitsCards from './GrowkitsCards'

import classes from './index.module.scss'

const GrowKits = async () => {
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
      return page.categories[0].slug === 'cubensis-grow-kits'
    }
  })

  return (
    <>
      <Head>
        {/* 60 char */}
        <title>Beginner-Friendly Cubensis Grow Kit - Psychodelic Mushrooms</title>
        {/* 150 char */}
        <meta
          name="description"
          content="Embark on a captivating journey into the world 🌎 of fungi with our premium Cubensis Grow Kits, designed to bring the magic of mushroom cultivation"
        />
        <meta
          name="keywords"
          content="Cubensis grow kits, Cubensis mushrooms cultivation, Cubensis, Cubensis spores, Fungi, Organic Mushrooms"
        />
        <meta name="author" content="www.planet-of-mushrooms" />
        <meta property="og:title" content="Grow Kits - Start Your Mushroom Journey" />
        <meta
          property="og:description"
          content="Embark on a captivating journey into the world of fungi with our premium Cubensis Grow Kits, designed to bring the magic of mushroom cultivation"
        />
        <meta property="og:image" content="/media/growkit.jpeg" />
        <meta property="og:url" content="https://planet-of-mushrooms.com/grow-kits" />
        <meta property="og:type" content="website" />
      </Head>
      <Gutter>
        <div className={classes.imageTitle}>
          <Image alt="Planet of mushrooms" src="/media/growkit.jpeg" height="500" width="600" />
          <h2 className={classes.title}>
            Start Your Mushroom Journey: Beginner-Friendly Cubensis Grow Kits 🍄 🍄 🍄
          </h2>
        </div>
        <p className={classes.heroText}>
          Embark on a captivating journey into the world 🌎 of fungi with our premium Cubensis Grow
          Kits, designed to bring the magic of mushroom cultivation to your fingertips. Elevate your
          gardening experience and unlock the satisfaction of growing your own fresh, organic
          mushrooms right at home. Join countless enthusiasts 👩🏿‍🤝‍👩🏾👩🏼‍🤝‍🧑🏼👩🏿‍🤝‍🧑🏾 who have discovered
          the joy and rewards of cultivating their own delicious harvest – start your mushroom
          adventure today! 💪 🍄
        </p>
        <div className={classes.gap}></div>
        <GrowkitsCards pages={filteredPages} products={products} />
        <HR />
      </Gutter>
    </>
  )
}

// either Static metadata
export const metadata: Metadata = {
  title: 'Beginner-Friendly Cubensis Grow Kit - Psychodelic Mushrooms', //60 char
  description:
    'Embark on a captivating journey into the world 🌎 of fungi with our premium Cubensis Grow Kits, designed to bring the magic of mushroom cultivation', //150 char
  keywords:
    'Cubensis grow kit, growkits, magic mushrooms growkit, Cubensis spore print, Fungi, Organic Mushrooms',
  openGraph: {
    images: ['/media/growkit.jpg'],
    title: 'Beginner-Friendly Cubensis Grow Kit - Psychodelic Mushrooms',
    description:
      'Embark on a captivating journey into the world 🌎 of fungi with our premium Cubensis Grow Kits, designed to bring the magic of mushroom cultivation',
    url: 'https://planet-of-mushrooms.com/cubensis-grow-kits',
    type: 'website',
  },
}

export default GrowKits
