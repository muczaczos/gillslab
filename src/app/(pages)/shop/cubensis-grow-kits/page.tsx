import React from 'react'
import { Metadata } from 'next'
import Head from 'next/head'
import { draftMode } from 'next/headers'
import Image from 'next/image'

import { Page, Product } from '../../../../payload/payload-types'
import { fetchDoc } from '../../../_api/fetchDoc'
import { fetchDocs } from '../../../_api/fetchDocs'
import { Gutter } from '../../../_components/Gutter'
import ProductsCarousel from '../../../_components/ProductsCarousel'
import LayoutWithHeaderFooter from '../../../layouts/withHeaderAndFooter/layout'

import classes from './index.module.scss'
import { useFilteredProducts } from '../../../_components/FilteredProducts'

type Props = {
  filteredProducts: Page[]
}

const GrowKits = ({ filteredProducts }: Props) => {
  return (
    <LayoutWithHeaderFooter>
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
      <section className="bg-customWhite pb-36">
        <Gutter className="pt-5">
          <div className="m-0">
            <h1 className="mb-0 text-primary text-2xl">Cubensis Growkits</h1>
          </div>

          <div className={classes.gap}></div>
          <ProductsCarousel filteredPages={filteredProducts} category={'cubensis-monotubs'} />
        </Gutter>
      </section>
    </LayoutWithHeaderFooter>
  )
}

// Przenieś logikę pobierania danych do getServerSideProps
export const getServerSideProps = async () => {
  const { isEnabled: isDraftMode } = draftMode()
  let products: Product[] | null = null
  let pages: Page[] = []
  let filteredPages: Page[] = []

  try {
    // Pobierz produkty
    products = await fetchDocs<Product>('products')

    // Pobierz strony produktów na podstawie sluga
    pages = await Promise.all(
      products.map(product =>
        fetchDoc<Page>({
          collection: 'products',
          slug: product.slug,
          draft: isDraftMode,
        }),
      ),
    )

    // Filtrowanie stron na podstawie kategorii
    const { filteredProducts, loading, error } = useFilteredProducts({ categorySlug: 'cubensis-monotubs' }, { 'cubensis-monotubs': {} });

    return {
      props: {
        filteredProducts, // Zwróć przefiltrowane dane jako prop
      },
    }
  }

// Metadane strony
export const metadata: Metadata = {
    title: 'Beginner-Friendly Cubensis Grow Kit - Psychodelic Mushrooms',
    description:
      'Embark on a captivating journey into the world 🌎 of fungi with our premium Cubensis Grow Kits, designed to bring the magic of mushroom cultivation',
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
