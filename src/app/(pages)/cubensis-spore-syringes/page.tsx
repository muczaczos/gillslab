import React from 'react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Image from 'next/image'

import { Category, Page, Product } from '../../../payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import { Gutter } from '../../_components/Gutter'
import { HR } from '../../_components/HR'
import SyringesCards from './SyringesCards'

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
    <>
      <Gutter>
        <div className={classes.imageTitle}>
          <Image alt="Planet of mushrooms" src="/media/syringes.webp" height="500" width="600" />
          <h2 className={classes.title}>
            Cubensis Spore Syringes: Premium Cultivation Essentials 💉💉💉
          </h2>
        </div>
        <p className={classes.heroText}>
          Unlock the mysteries of the fungal world with our premium Cubensis Spore Syringes. Perfect
          for both beginners and experienced cultivators, these syringes contain high-quality,
          viable spores ready to kickstart your mushroom-growing adventure. Experience the joy and
          satisfaction of cultivating your own organic mushrooms at home. Join a vibrant community
          of enthusiasts and discover the rewards of growing your own harvest. Begin your
          fascinating journey into mycology today! 🌍🍄
        </p>
        <div className={classes.gap}></div>
        <SyringesCards pages={filteredPages} products={products} />
        <HR />
      </Gutter>
    </>
  )
}

// either Static metadata
export const metadata: Metadata = {
  title: 'Cubensis Spore Syringes: Premium Cultivation Essentials', //60 char
  description:
    'Unlock the mysteries of the fungal world with our premium Cubensis Spore Syringes. Perfect for both beginners and experienced cultivators', //150 char
  keywords:
    'Cubensis spore syringe, Cubensis spore print, magic mushrooms, Cubensis spores, Fungi, Organic Mushrooms',
  openGraph: {
    images: ['/media/syringes.webp'],
    title: 'Cubensis Spore Syringes: Premium Cultivation Essentials',
    description:
      'Unlock the mysteries of the fungal world with our premium Cubensis Spore Syringes. Perfect for both beginners and experienced cultivators',
    url: 'https://planet-of-mushrooms.com/cubensis-spore-syringes',
    type: 'website',
  },
}

export default Syringes
