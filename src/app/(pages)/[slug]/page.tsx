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
import { Promotion } from '../../_components/Promotion'
import SmallCarousel from '../../_components/SmallCarousel'
import NewsCarousel from '../../_components/NewsCarousel'
import StickyBottomMenu from '../../_components/StickyBottomMenu'
import { generateMeta } from '../../_utilities/generateMeta'

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
    '/media/growkitsCat.png',
    '/media/sporesCat.png',
    '/media/liquidCat.png',
    '/media/labCat.png',
    '/media/substrateCat.png',
  ]

  const images2 = [
    '/media/gtLabel.png',
    '/media/mckLabel.png',
    '/media/gtLabel.png',
    '/media/mckLabel.png',
    '/media/gtLabel.png',
  ]

  const catLabels = ['Growkits', 'Spores', 'Liquids', 'Lab', 'Substrates']

  return (
    <React.Fragment>
      {slug === 'home' ? (
        <>
          <section className="bg-customWhite pb-7">
            <div className="flex justify-end">
              <Image
                src="/media/mobileHero.png" // Ścieżka do obrazu w katalogu public
                alt="GillsLab logotype"
                width={240} // Szerokość obrazu
                height={20} // Wysokość obrazu
                className=""
              />
            </div>
            <h1 className="font-black text-primary ml-7 w-80% mb-0 sm:mt-10 sm:ml-10">
              MAGIC <br />
              GROWKITS
            </h1>
            <p className="text-primary-light ml-7 mt-2 sm:ml-10">
              <span className="font-thin text-base ">Cultivate Your Mushrooms Dreams</span>
            </p>
            <button className="border-0 rounded-xl text-customWhite text-2xl font-black bg-secondary py-3 px-7 ml-7 mt-5 mb-5 sm:mt-10 sm:ml-10">
              Get Started
            </button>
            <Gutter>
              <div className="hidden lg:block lg:h-[28rem] xl:h-[35rem] 2xl:h-[44rem] bg-no-repeat bg-cover bg-right bg-[url('/media/hero-big.png')] pt-10 pb-10 p-6 bg-gray-50 border-l-0 border-r-0 border-2 border-solid border-gray-100">
                <p className="text-white lg:font-bold lg:text-4xl lg:mt-5 lg:ml-3 xl:text-5xl xl:mt-[4rem] 2xl:ml-[4rem] w-80% mb-0 mt-52 ml-10">
                  Be yourself and...
                </p>
                <p className="text-white mt-2 lg:ml-3 md:ml-10 2xl:ml-[4rem]">
                  <span className="font-thin text-2xl ">
                    ...Unleash your <br className="xl:hidden" /> own imagination.
                  </span>
                </p>
                <Button
                  className="mt-5 mb-5 lg:ml-3 md:mt-10 md:ml-10 2xl:ml-[4rem] 2xl:mt-[5rem]"
                  label="Get Started"
                  appearance="primary"
                  href="/products"
                ></Button>
              </div>
            </Gutter>
          </section>
          <section className="bg-customWhite py-4 pb-7">
            <Gutter className="classes.home">
              <h2 className="py-2 font-bold text-2xl text-primary">Shop By Categories</h2>
              <SmallCarousel catLabels={catLabels} images={images} />
            </Gutter>
          </section>
          <div className=" bg-customWhite ">
            <h2 className="pl-7 py-2 font-bold text-2xl text-primary">Promotions</h2>
          </div>
          <section className="bg-customWhite flex justify-center px-5 pb-7">
            <div className={classes.promoCard}>
              <div className={classes.promoText}>
                <p className={classes.smallText}>Get</p>
                <h3>20% Off</h3>
                <p className={classes.smallText}>for this month</p>
              </div>
              <Image
                src="/media/promotions.png"
                alt="Promotion"
                className={classes.promoImage}
                width={100}
                height={100}
              />
            </div>
          </section>
          <section className="bg-customWhite py-4 pb-7">
            <Gutter className="classes.home">
              <h2 className="py-2 font-bold text-2xl text-primary">Cubensis Growkits</h2>
              <div className="mb-3 flex justify-between gap-3">
                <div className="relative flex flex-col bg-white rounded-xl h-[14rem] w-1/2">
                  <FaHeart className="absolute top-3 right-3 text-secondary text-2xl" />
                  <div className="mt-5 flex justify-center">
                    <Image
                      src="/media/mckLabel.png"
                      alt="Promotion"
                      className="w-[6rem] py-4"
                      width={100}
                      height={100}
                    />
                  </div>
                  <p className="leading-3 pl-3 text-primary font-bold opacity-70">Cambodian</p>
                  <p className="text-primary text-2xl font-bold pl-3">$35</p>
                </div>

                <div className="relative flex flex-col bg-white rounded-xl h-[14rem] w-1/2">
                  <FaRegHeart className="absolute top-3 right-3 text-primary text-2xl" />
                  <div className="mt-5 flex justify-center">
                    <Image
                      src="/media/ecuLabel.png"
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
              <div className="flex justify-between gap-3">
                <div className="relative flex flex-col bg-white rounded-xl h-[14rem] w-1/2">
                  <FaRegHeart className="absolute top-3 right-3 text-primary text-2xl" />
                  <div className="mt-5 flex justify-center">
                    <Image
                      src="/media/gtLabel.png"
                      alt="Promotion"
                      className="w-[6rem] py-4"
                      width={100}
                      height={100}
                    />
                  </div>
                  <p className="leading-3 pl-3 text-primary font-bold opacity-70">Mazatapec</p>
                  <p className="text-primary text-2xl font-bold pl-3">$35</p>
                </div>

                <div className="relative flex flex-col bg-white rounded-xl h-[14rem] w-1/2">
                  <FaRegHeart className="absolute top-3 right-3 text-primary text-2xl" />
                  <div className="mt-5 flex justify-center">
                    <Image
                      src="/media/colLabel.png"
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
            </Gutter>
          </section>
          <section className="pb-7 bg-customWhite">
            <Gutter>
              <div className="drop-shadow-2xl rounded-2xl relative overflow-hidden rotate-bg">
                <div className="header-content">
                  <h2>Subscribe to our newsletter!</h2>

                  <div className="flex w-full justify-between">
                    <div>
                      <p className="pt-1 leading-4 text-shadow font-sm">
                        Be the First to Know 
                        About Promotions 
                        and New Arrivals!
                      </p>

                      <div className="shadow-md rounded-lg w-full mt-1 flex justify-center bg-primary">
                        <p className="font-medium">Subscribe</p>
                      </div>
                    </div>
                    <Image
                      src="/media/newsletter.png"
                      alt="man with growkit"
                      width={100}
                      height={100}
                      className="w-[10rem] relative bottom-14"
                    />
                  </div>
                </div>
              </div>
            </Gutter>
          </section>

        <section className="bg-customWhite">
          <Gutter>
            <div className="flex justify-between">
              <p className="py-2 font-bold text-xl text-primary">News on Blog</p>
              <p className="py-2 font-bold text-xl text-primary">View All</p>
            </div>
            <NewsCarousel catLabels={catLabels} images={images2} />
          </Gutter>
          <Gutter>
            <div className="flex justify-between">
              <p className="py-2 font-bold text-xl text-primary">View All</p>
              <p className="py-2 font-bold text-xl text-primary">News on Vlog</p>
            </div>
            <NewsCarousel catLabels={null} images={images2} />
          </Gutter>
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
    </React.Fragment>
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
