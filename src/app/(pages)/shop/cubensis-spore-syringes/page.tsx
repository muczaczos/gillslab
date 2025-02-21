import React from 'react'
import Head from 'next/head'
import { draftMode } from 'next/headers'
import Image from 'next/image'

import { Page, Product } from '../../../../payload/payload-types'
import { fetchDoc } from '../../../_api/fetchDoc'
import { fetchDocs } from '../../../_api/fetchDocs'
import { Gutter } from '../../../_components/Gutter'
import LayoutWithHeaderFooter from '../../../layouts/withHeaderAndFooter/layout'
import GrowkitsCards from '../cubensis-grow-kits/GrowkitsCards'

import classes from './index.module.scss'

const Syringes = async () => {
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
      return page.categories[0].slug === 'cubensis-spore-syringes'
    }
  })

  return (
    <LayoutWithHeaderFooter>
      <Head>
        {/* 60 char */}
        <title>Cubensis Spore Syringes: Premium Cultivation Essentials</title>
        {/* 150 char */}
        <meta
          name="description"
          content="Unlock the mysteries of the fungal world with our premium Cubensis Spore Syringes. Perfect for both beginners and experienced cultivators"
        />
        <meta
          name="keywords"
          content="Cubensis spore syringe, Cubensis spore print, magic mushrooms, Cubensis spores, Fungi, Organic Mushrooms"
        />
        <meta name="author" content="www.gillslab.com" />
        <meta
          property="og:title"
          content="Cubensis Spore Syringes: Premium Cultivation Essentials"
        />
        <meta
          property="og:description"
          content="
          Enhance your mushroom cultivation endeavors with our premium Cubensis Plate Cultures 🍽️. Designed to streamline the cultivation process"
        />
        <meta property="og:image" content="/media/syringes.webp" />
        <meta property="og:url" content="https://gillslab.com/cubensis-spore-syringes" />
        <meta property="og:type" content="website" />
      </Head>
      <Gutter className="bg-customWhite pb-64">
        <div className={`flex flex-col lg:flex-row mb-5 pt-10`}>
          <div className="w-full flex justify-center items-center mb-10 lg:w-1/2">
            <div className="relative w-[80%] aspect-w-4 aspect-h-3">
              <Image
                alt="Planet of mushrooms"
                src="/media/syringes.webp"
                height="500"
                width="600"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <h1 className="text-primary text-4xl md:text-3xl pb-5">
              Cubensis Spore Syringes: Premium Cultivation Essentials 💉💉💉
            </h1>
            <p className="text-xl text-customGray-dark font-medium md:text-lg">
              Unlock the mysteries of the fungal world with our premium Cubensis Spore Syringes.
              Perfect for both beginners and experienced cultivators, these syringes contain
              high-quality, viable spores ready to kickstart your mushroom-growing adventure.
              Experience the joy and satisfaction of cultivating your own organic mushrooms at home.
              Join a vibrant community of enthusiasts and discover the rewards of growing your own
              harvest. Begin your fascinating journey into mycology today! 🌍🍄
            </p>
          </div>
        </div>
        <div className={classes.gap}></div>
        <GrowkitsCards pages={filteredPages} />
      </Gutter>
    </LayoutWithHeaderFooter>
  )
}

export default Syringes
