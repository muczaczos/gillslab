import React from 'react'
import Head from 'next/head'
import { draftMode } from 'next/headers'
import Image from 'next/image'

import { Page, Product } from '../../../payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import { Gutter } from '../../_components/Gutter'
import { HR } from '../../_components/HR'
import LayoutWithHeaderFooter from '../../layouts/withHeaderAndFooter/layout'
import GrowkitsCards from '../cubensis-grow-kits/GrowkitsCards'

import classes from './index.module.scss'

const Substrates = async () => {
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
      return page.categories[0].slug === 'substrates'
    }
  })

  return (
    <LayoutWithHeaderFooter>
      <Head>
        {/* 60 char */}
        <title>Premium Substrates for Growing Cubensis Mushrooms</title>
        {/* 150 char */}
        <meta
          name="description"
          content="Optimize your Cubensis mushroom cultivation with our premium substrates, formulated to support every stage of growth for healthy, high-quality yields."
        />
        <meta
          name="keywords"
          content="Cubensis substrates, mushroom cultivation, premium substrates, grow kits"
        />
        <meta name="author" content="www.gillslab.com" />
        <meta property="og:title" content="Premium Substrates for Growing Cubensis Mushrooms" />
        <meta
          property="og:description"
          content="Enhance your Cubensis mushroom cultivation with our high-quality substrates, perfect for beginners and advanced growers alike."
        />
        <meta property="og:image" content="/media/substrates.webp" />
        <meta property="og:url" content="https://gillslab.com/mushroom-substrates" />
        <meta property="og:type" content="website" />
      </Head>
      <Gutter className="bg-customWhite pb-64">
        <div className={classes.imageTitle}>
          <Image
            alt="Cubensis mushroom substrates"
            src="/media/substrates.webp"
            height="500"
            width="600"
          />
          <h1 className="text-primary text-4xl md:text-3xl pb-5">
            Premium Substrates for Cubensis Mushroom Cultivation 🌱🍄
          </h1>
        </div>
        <p className="text-xl text-customGray-dark font-medium md:text-lg">
          Unlock the full potential of your Cubensis mushroom cultivation with our expertly crafted
          substrates, designed to support each stage of growth and maximize yield. Whether you're a
          beginner or an experienced cultivator, our substrates provide a reliable foundation for
          healthy, productive mushrooms. Dive into the world of mycology and experience the
          satisfaction of growing your own premium-quality mushrooms with substrates you can trust.
          Join the growing community of enthusiasts and take your cultivation journey to new
          heights! 🌍🍄
        </p>
        <div className={classes.gap}></div>
        <GrowkitsCards pages={filteredPages} />
      </Gutter>
    </LayoutWithHeaderFooter>
  )
}

export default Substrates
