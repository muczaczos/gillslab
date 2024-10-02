import React from 'react'
import { FaHeart, FaHome, FaRegHeart, FaShoppingCart, FaUser } from 'react-icons/fa'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { Category, Page } from '../../../payload/payload-types'
import { staticHome } from '../../../payload/seed/home-static'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import { Blocks } from '../../_components/Blocks'
import { Button } from '../../_components/Button'
import Categories from '../../_components/Categories'
import { Gutter } from '../../_components/Gutter'
import { Hero } from '../../_components/Hero'
import NewsCarousel from '../../_components/NewsCarousel'
import { Promotion } from '../../_components/Promotion'
import SmallCarousel from '../../_components/SmallCarousel'
import { generateMeta } from '../../_utilities/generateMeta'
import LayoutWithHeaderFooter from '../../layouts/withHeaderAndFooter/layout'

import classes from './index.module.scss'

// Payload Cloud caches all files through Cloudflare, so we don't need Next.js to cache them as well
// This means that we can turn off Next.js data caching and instead rely solely on the Cloudflare CDN
// To do this, we include the `no-cache` header on the fetch requests used to get the data for this page
// But we also need to force Next.js to dynamically render this page on each request for preview mode to work
// See https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
// If you are not using Payload Cloud then this line can be removed, see `../../../README.md#cache`
export const dynamic = 'force-dynamic'

export default async function Pages({ params: { slug = 'home' } }) {
  const { isEnabled: isDraftMode } = draftMode()

  let page: Page | null = null
  let categories: Category[] | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug,
      draft: isDraftMode,
    })
    categories = await fetchDocs<Category>('categories')
  } catch (error) {
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // so swallow the error here and simply render the page with fallback data where necessary
    // in production you may want to redirect to a 404  page or at least log the error somewhere
    // console.error(error)
  }

  // if no `home` page exists, render a static one using dummy content
  // you should delete this code once you have a home page in the CMS
  // this is really only useful for those who are demoing this template
  if (!page && slug === 'home') {
    page = staticHome
  }

  if (!page) {
    return notFound()
  }

  const { hero, layout } = page

  const images = [
    process.env.NEXT_PUBLIC_SERVER_URL + '/media/growkitsCat.png',
    process.env.NEXT_PUBLIC_SERVER_URL + '/media/sporesCat.png',
    process.env.NEXT_PUBLIC_SERVER_URL + '/media/liquidCat.png',
    process.env.NEXT_PUBLIC_SERVER_URL + '/media/labCat.png',
    process.env.NEXT_PUBLIC_SERVER_URL + '/media/substrateCat.png',
  ]

  const images2 = [
    process.env.NEXT_PUBLIC_SERVER_URL + '/media/muchomor.jpg',
    process.env.NEXT_PUBLIC_SERVER_URL + '/media/koszyk.jpg',
    process.env.NEXT_PUBLIC_SERVER_URL + '/media/growkit.jpg',
    process.env.NEXT_PUBLIC_SERVER_URL + '/media/muchomor.jpg',
    process.env.NEXT_PUBLIC_SERVER_URL + '/media/koszyk.jpg',
  ]

  const catLabels = ['Growkits', 'Spores', 'Liquids', 'Lab', 'Substrates']
  const promotionImg = process.env.NEXT_PUBLIC_SERVER_URL + '/media/promotions.png'
  return (
    <LayoutWithHeaderFooter>
      {slug === 'home' ? (
        <>
          {/* Mobile Hero */}
          <section className="block md:hidden">
            <div className="">
              {/* Lewa kolumna podzielona na dwa wiersze */}

              <div className="col-span-1 flex justify-end">
                <Image
                  src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/clouds.png`} // Ścieżka do obrazu w katalogu public
                  alt="Clouds image"
                  width={240} // Szerokość obrazu
                  height={20} // Wysokość obrazu
                  className="hidden sm:block ml-15 w-3/4 h-full"
                />
                <Image
                  src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/mobileHero.png`} // Ścieżka do obrazu w katalogu public
                  alt="Hero image"
                  width={240} // Szerokość obrazu
                  height={20} // Wysokość obrazu
                  className="md:w-[440px]"
                />
              </div>
              <div className="">
                <h1 className="font-black text-primary ml-7 w-80% mb-0 sm:mt-10 sm:ml-10">
                  MAGIC <br />
                  GROWKITS
                </h1>
                <p className="text-primary ml-7 mt-2 sm:ml-10">
                  <span className="font-normal text-base">Cultivate Your Mushrooms Dreams</span>
                </p>
                <button className="border-0 rounded-xl text-customWhite text-2xl font-black bg-secondary py-3 px-7 ml-7 mt-5 mb-5 sm:mt-10 sm:ml-10">
                  Get Started
                </button>
              </div>
            </div>

            {/* Druga kolumna */}
          </section>

          {/* Desktokp Hero */}
          <section className="hidden md:block">
            <div className="grid grid-cols-3 bg-customWhite">
              {/* Lewa kolumna podzielona na dwa wiersze */}
              <div className="col-span-2 grid grid-rows-2">
                <div className="bg-customWhite">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/clouds.png`} // Ścieżka do obrazu w katalogu public
                    alt="Clouds image"
                    width={240} // Szerokość obrazu
                    height={20} // Wysokość obrazu
                    className="hidden md:block ml-10 mt-10 w-[450px] lg:w-[600px] xl:w-[800px] xl:ml-14 xl:mt-16 2xl:w-[1000px]"
                  />
                </div>
                <div className="bg-customWhite">
                  <h1 className="font-black text-primary ml-7 w-80% mb-0 sm:mt-10 sm:ml-10">
                    MAGIC <br />
                    GROWKITS
                  </h1>
                  <p className="text-primary ml-7 mt-2 sm:ml-10">
                    <span className="font-normal text-base">Cultivate Your Mushrooms Dreams</span>
                  </p>
                  <button className="border-0 rounded-xl text-customWhite text-2xl font-black bg-secondary py-3 px-7 ml-7 mt-5 mb-5 sm:mt-10 sm:ml-10">
                    Get Started
                  </button>
                </div>
              </div>

              {/* Druga kolumna */}
              <div className="col-span-1 flex justify-end">
                <Image
                  src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/mobileHero.png`} // Ścieżka do obrazu w katalogu public
                  alt="Hero image"
                  width={240} // Szerokość obrazu
                  height={20} // Wysokość obrazu
                  className="md:w-[440px]"
                />
              </div>
            </div>
          </section>

          {/* horizontal carousel for mobile*/}
          <section className="block md:hidden bg-customWhite py-4 pb-7">
            <Gutter className="classes.home">
              <h2 className="py-2 font-bold text-2xl text-primary">Shop By Categories</h2>
            </Gutter>
            <SmallCarousel icons={null} catLabels={catLabels} images={images} />
          </section>

          {/* horizontal menu for desktop*/}
          <section className="w-full hidden md:block bg-customWhite py-4 pb-7">
            <div className="flex flex-col w-full items-end">
              <div className="w-3/4">
                <h2 className="py-2 font-bold text-2xl text-primary">Shop By Categories</h2>
                <div className={`${classes.gradientMenu} rounded-xl flex py-14 px-10`}>
                  <div
                    className={`${classes.imageContainer} bg-customWhite rounded-lg shadow-xl mr-5`}
                  >
                    <Image
                      src={images[0]} // Ścieżka do obrazu
                      alt="Category Image"
                      width={170} // Szerokość obrazu
                      height={120} // Wysokość obrazu
                      className=" transform hover:scale-105"
                    />
                    <div className="flex justify-center -mt-5 mb-2">
                      <p className="text-primary font-semibold">Growkits</p>
                    </div>
                  </div>

                  <div
                    className={`${classes.imageContainer} bg-customWhite rounded-lg shadow-xl mr-5`}
                  >
                    <Image
                      src={images[1]} // Ścieżka do obrazu
                      alt="Category Image"
                      width={170} // Szerokość obrazu
                      height={120} // Wysokość obrazu
                      className=" transform hover:scale-105"
                    />
                    <div className="flex justify-center -mt-5 mb-2">
                      <p className="text-primary font-semibold">Spores</p>
                    </div>
                  </div>

                  <div
                    className={`${classes.imageContainer} bg-customWhite rounded-lg shadow-xl mr-5`}
                  >
                    <Image
                      src={images[2]} // Ścieżka do obrazu
                      alt="Category Image"
                      width={170} // Szerokość obrazu
                      height={120} // Wysokość obrazu
                      className=" transform hover:scale-105"
                    />
                    <div className="flex justify-center -mt-5 mb-2">
                      <p className="text-primary font-semibold">Cultures</p>
                    </div>
                  </div>

                  <div
                    className={`${classes.imageContainer} bg-customWhite rounded-lg shadow-xl mr-5`}
                  >
                    <Image
                      src={images[3]} // Ścieżka do obrazu
                      alt="Category Image"
                      width={170} // Szerokość obrazu
                      height={120} // Wysokość obrazu
                      className=" transform hover:scale-105"
                    />
                    <div className="flex justify-center -mt-5 mb-2">
                      <p className="text-primary font-semibold">Lab</p>
                    </div>
                  </div>

                  <div
                    className={`${classes.imageContainer} bg-customWhite rounded-lg shadow-xl mr-5`}
                  >
                    <Image
                      src={images[4]} // Ścieżka do obrazu
                      alt="Category Image"
                      width={160} // Szerokość obrazu
                      height={120} // Wysokość obrazu
                      className=" transform hover:scale-105"
                    />
                    <div className="flex justify-center -mt-[13px] mb-2">
                      <p className="text-primary font-semibold">Substrates</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Banners */}
          <div className=" bg-customWhite ">
            <h2 className="pl-7 py-2 font-bold text-2xl text-primary">Promotions</h2>
          </div>
          <section className="px-5 w-full bg-customWhite flex flex-col items-center md:justify-between md:flex-row">

            {/* Promo banner */}
            <div className={`${classes.promoCard} mb-5 md:mb-0 flex`}>
              <div className={classes.promoText}>
                <p className={classes.smallText}>Get</p>
                <h3 className={classes.bigText}>20% Off</h3>
                <p className={classes.smallText}>for this month</p>
              </div>
              <div>
                <Image
                  src={promotionImg}
                  alt="Promotion"
                  className={classes.promoImage}
                  width={100}
                  height={100}
                />
              </div>
            </div>

            {/* News banner */}
            <div
              className={`${classes.newsletterSec} grid grid-rows-[auto,1fr,auto] min-h-[150px]`}
            >
              {/* Górny wiersz */}
              <div className="row-start-1 col-span-full">
                <h3 className="ml-5 mt-5 text-customWhite text-shadow xl:text-4xl xl:ml-10 xl:mt-10">
                  Subscribe to our newsletter!
                </h3>
              </div>

              {/* Wiersz z dwoma kolumnami */}
              <div className="grid grid-cols-2">
                <div className="">
                  <p className="ml-5 w-full mt-2 text-customWhite font-semibold text-shadow xl:text-2xl xl:ml-10 ">
                    Be the First to Know About Promotions and New Arrivals!
                  </p>
                </div>
                <div className="">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/newsletter2.png`}
                    alt="Promotion"
                    className="xl:ml-5 xl:w-[250px] xl:relative xl:bottom-[45px]"
                    width={200}
                    height={100}
                  />
                </div>
              </div>
            </div>

          </section>

          {/* 4 x growkit section */}
          <section className="bg-customWhite py-4 pb-7">
            <Gutter className="classes.home">
              <h2 className="py-2 font-bold text-2xl text-primary">Best Products</h2>
              <div className="flex flex-col sm:flex-row sm:gap-3">
                <div className="mb-3 flex justify-between csm:justify-center sm:w-full gap-3">
                  <div className="relative flex flex-col justify-aroun bg-white rounded-xl h-[14rem] w-1/2 csm:w-1/3 sm:w-1/2">
                    <FaHeart className="absolute top-3 right-3 text-secondary text-2xl" />
                    <div className="mt-5 flex justify-center">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/mckLabel.png`}
                        alt="Promotion"
                        className="w-[6rem] py-4"
                        width={100}
                        height={100}
                      />
                    </div>
                    <p className="leading-3 pl-3 text-primary font-bold opacity-70">Cambodian</p>
                    <p className="text-primary text-2xl font-bold pl-3">$35</p>
                  </div>

                  <div className="relative flex flex-col bg-white rounded-xl h-[14rem] w-1/2 csm:w-1/3">
                    <FaRegHeart className="absolute top-3 right-3 text-primary text-2xl" />
                    <div className="mt-5 flex justify-center">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/ecuLabel.png`}
                        alt="Promotion"
                        className="w-[6rem] py-4"
                        width={100}
                        height={100}
                      />
                    </div>
                    <p className="leading-3 pl-3 text-primary font-bold opacity-70">G. Teacher</p>
                    <p className="text-primary text-2xl font-bold pl-3">$35</p>
                  </div>
                </div>
                <div className="flex justify-between csm:justify-center gap-3 sm:w-full">
                  <div className="relative flex flex-col bg-white rounded-xl h-[14rem] w-1/2 csm:w-1/3">
                    <FaRegHeart className="absolute top-3 right-3 text-primary text-2xl" />
                    <div className="mt-5 flex justify-center">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/gtLabel.png`}
                        alt="Promotion"
                        className="w-[6rem] py-4"
                        width={100}
                        height={100}
                      />
                    </div>
                    <p className="leading-3 pl-3 text-primary font-bold opacity-70">Mazatapec</p>
                    <p className="text-primary text-2xl font-bold pl-3">$35</p>
                  </div>

                  <div className="relative flex flex-col bg-white rounded-xl h-[14rem] w-1/2 csm:w-1/3">
                    <FaRegHeart className="absolute top-3 right-3 text-primary text-2xl" />
                    <div className="mt-5 flex justify-center">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/colLabel.png`}
                        alt="Promotion"
                        className="w-[6rem] py-4"
                        width={100}
                        height={100}
                      />
                    </div>
                    <p className="leading-3 pl-3 text-primary font-bold opacity-70">Ecuador</p>
                    <p className="text-primary text-2xl font-bold pl-3">$35</p>
                  </div>
                </div>
              </div>
            </Gutter>
          </section>

          {/* news on blog and vlog */}
          <section className={classes.blogvlog}>
            <Gutter>
              <div className="flex justify-between z-0">
                <p className="py-2 font-bold text-xl text-primary z-20">News on Blog</p>
                <p className="pt-2 relative top-1 font-bold text-md text-primary">View All</p>
              </div>
            </Gutter>
            <NewsCarousel catLabels={catLabels} images={images2} />

            <Gutter>
              <div className="flex justify-between z-10">
                <p className="py-2 relative top-1 font-bold text-md text-primary">View All</p>
                <p className="py-2 font-bold text-xl text-primary">News on Vlog</p>
              </div>
            </Gutter>
            <NewsCarousel catLabels={null} images={images2} />
          </section>
        </>
      ) : (
        <>
          <Hero {...hero} />
          <Blocks
            blocks={layout}
            disableTopPadding={!hero || hero?.type === 'none' || hero?.type === 'lowImpact'}
          />
        </>
      )}
    </LayoutWithHeaderFooter>
  )
}

export async function generateStaticParams() {
  try {
    const pages = await fetchDocs<Page>('pages')
    return pages?.map(({ slug }) => slug)
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params: { slug = 'home' } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode()

  let page: Page | null = null
  let categories: Category[] | null = null
  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug,
      draft: isDraftMode,
    })
    categories = await fetchDocs<Category>('categories')
  } catch (error) {
    // don't throw an error if the fetch fails
    // this is so that we can render a static home page for the demo
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // in production you may want to redirect to a 404  page or at least log the error somewhere
  }

  if (!page && slug === 'home') {
    page = staticHome
  }

  return generateMeta({ doc: page })
}
