import React from 'react'
import Head from 'next/head'
import { draftMode } from 'next/headers'
import Image from 'next/image'

import { Page, Product } from '../../../../payload/payload-types'
import { fetchDoc } from '../../../_api/fetchDoc'
import { fetchDocs } from '../../../_api/fetchDocs'
import { Gutter } from '../../../_components/Gutter'
import LayoutWithHeaderFooter from '../../../layouts/withHeaderAndFooter/layout'
import GrowkitsCards from '../../shop/cubensis-grow-kits/GrowkitsCards'

import classes from './index.module.scss'

const Equipments = async () => {
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
      return page.categories[0].slug === 'laboratory-equipments'
    }
  })

  return (
    <LayoutWithHeaderFooter>
      <Head>
        {/* 60 char */}
        <title>Cultivate mushrooms with our premium laboratory equipment</title>
        {/* 150 char */}
        <meta
          name="description"
          content="Explore the world of fungi with our premium laboratory equipment, designed to support every stage of your mushroom cultivation journey."
        />
        <meta name="keywords" content="Cubensis spore syringe, syringes, hepa, nidles, scalpels" />
        <meta name="author" content="www.gillslab.com" />
        <meta
          property="og:title"
          content="Cultivate mushrooms with our premium laboratory equipment"
        />
        <meta
          property="og:description"
          content="Cultivate mushrooms with our premium laboratory equipment"
        />
        <meta property="og:image" content="/media/syringes.webp" />
        <meta property="og:url" content="https://gillslab.com/laboratory-equipments" />
        <meta property="og:type" content="website" />
      </Head>
      <Gutter className="bg-customWhite pb-64">
        <div className={classes.imageTitle}>
          <Image alt="Planet of mushrooms" src="/media/syringes.webp" height="500" width="600" />
          <h1 className="text-primary text-4xl md:text-3xl pb-5">
            Cultivate mushrooms with our premium laboratory equipment 🔬🔬
          </h1>
        </div>
        <p className="text-xl text-customGray-dark font-medium md:text-lg">
          Explore the world of fungi with our premium laboratory equipment, designed to support
          every stage of your mushroom cultivation journey. Perfect for both beginners and seasoned
          growers, our equipment provides the precision and reliability needed for successful
          cultivation. Whether you're advancing your mycology skills or just starting out,
          experience the satisfaction of growing high-quality, organic mushrooms with tools trusted
          by professionals. Join a community of dedicated enthusiasts and elevate your cultivation
          journey today! 🌍🍄
        </p>
        <div className={classes.gap}></div>
        <GrowkitsCards pages={filteredPages} />
      </Gutter>
    </LayoutWithHeaderFooter>
  )
}

export default Equipments
