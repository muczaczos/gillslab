import { FaHeart, FaHome, FaRegHeart, FaShoppingCart, FaUser } from 'react-icons/fa'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
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

type NewsItem = {
  id: string
  title: string
  content: string
  meta: {
    image: {
      filename: string
    }
  }
}

export default async function Pages({ params: { slug = 'home' } }) {
  const { isEnabled: isDraftMode } = draftMode()

  const response = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/posts`, {
    headers: {
      Authorization: `Bearer ${process.env.CMS_API_KEY}`,
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  const data: { docs: NewsItem[] } = await response.json()

  //console.log(data)

  // data.docs.map(news => console.log(news.meta.image.filename))

  const images3 = data.docs
    .slice(-5) // Pobiera ostatnie 5 elementów z tablicy
    .map(news => `http://localhost:3000/media/${news.meta.image.filename}`) // Dodaje prefiks do ścieżki

  console.log(images3)

  let page: Page | null = null
  let categories: Category[] | null = null
  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug,
      draft: isDraftMode,
    })
    categories = await fetchDocs<Category>('categories')
  } catch (error) { }

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

  const links = [
    'cubensis-grow-kits',
    'cubensis-spore-syringes',
    'cubensis-liquid-cultures',
    'laboratory-equipments',
    'substrates',
  ]
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

  console.log(images2)

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

              <div className="bg-customWhite col-span-1 flex justify-end">
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
              <div className="bg-customWhite">
                <h1 className="font-black text-primary ml-7 w-80% mb-0 sm:mt-10 sm:ml-10">
                  MAGIC <br />
                  GROWKITS
                </h1>
                <p className="text-primary ml-7 mt-2 sm:ml-10">
                  <span className="font-normal text-base">Cultivate Your Mushrooms Dreams</span>
                </p>
                <Link href="#start2">
                  <button className="border-0 rounded-xl text-customWhite text-2xl font-black bg-secondary py-3 px-7 ml-7 mt-5 mb-5 sm:mt-10 sm:ml-10">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>

            {/* Druga kolumna */}
          </section>
          {/* /////////// */}

          {/* Desktokp Hero */}
          <div className="bg-customWhite md:flex md:justify-center">
            <section className="hidden md:block md:w-full 2xl:min-w-[1519px] max-w-[1519px]">
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
                    <Link href="#start">
                      <button className="border-0 rounded-xl text-customWhite text-2xl font-black bg-secondary py-3 px-7 ml-7 mt-5 mb-5 sm:mt-10 sm:ml-10">
                        Get Started
                      </button>
                    </Link>
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
          </div>
          {/* /////////// */}

          {/* horizontal carousel for mobile*/}
          <section id="start2" className="block md:hidden bg-customWhite py-4 pb-7">
            <Gutter className="classes.home">
              <h2 className="py-2 font-bold text-2xl text-primary">Shop By Categories</h2>
            </Gutter>
            <SmallCarousel
              icons={null}
              links={links}
              catLabels={catLabels}
              images={images}
              modals={null}
              handleOpenModal={null} // Pass function down to SmallCarousel
              isModalOpen={null} // Pass modal state down to SmallCarousel
              handleCloseModal={null} // Pass close function as prop
              modalContent={null}
            />
          </section>
          {/* /////////// */}

          {/* horizontal menu for desktop*/}
          <section className="w-full hidden md:block bg-customWhite pb-20 py-5">
            <div className="flex flex-col w-full items-end">
              <div id="start" className="w-3/4">
                <h2 className="py-2 font-bold text-2xl text-primary sm:text-3xl">
                  Shop By Categories
                </h2>
                <div className={`${classes.gradientMenu} rounded-xl flex py-14 px-10`}>
                  <Link className="" href={`/${links[0]}`}>
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
                      <div className="flex justify-center -mt-5 ">
                        <p className="pt-1  text-primary font-semibold mb-2">Growkits</p>
                      </div>
                    </div>
                  </Link>

                  <Link className="" href={`/${links[1]}`}>
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
                        <p className="pb-2 pt-1 text-primary font-semibold">Spores</p>
                      </div>
                    </div>
                  </Link>

                  <Link className="" href={`/${links[2]}`}>
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
                        <p className="pb-2 pt-1 text-primary font-semibold">Cultures</p>
                      </div>
                    </div>
                  </Link>

                  <Link className="" href={`/${links[3]}`}>
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
                        <p className="pb-2 pt-1 text-primary font-semibold">Lab</p>
                      </div>
                    </div>
                  </Link>

                  <Link className="" href={`/${links[4]}`}>
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
                        <p className="pb-2 pt-1 text-primary font-semibold">Substrates</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          {/* /////////// */}

          {/* Banners */}
          <div className="px-5 xl:px-10 bg-customWhite md:flex md:justify-center">
            <div className="w-full md:flex md:justify-start max-w-[1536px]">
              <h2 className="py-2 font-bold text-2xl text-primary sm:text-3xl">Promotions</h2>
            </div>
          </div>
          <section className="pb-10 xl:px-5 bg-customWhite md:flex md:justify-center">
            <div className="px-5 w-full bg-customWhite flex flex-col items-center md:justify-between md:flex-row 2xl:px-0 max-w-[1536px]">
              {/* Promo banner */}
              <Link href="/cubensis-grow-kits" className={`${classes.promoCard} mb-5 md:mb-0 flex`}>
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
              </Link>

              {/* News banner */}
              <Link
                href="/subscribe"
                className={`${classes.newsletterSec} grid grid-rows-[auto,1fr,auto] min-h-[150px]`}
              >
                {/* Górny wiersz */}
                <div className="2xl:w-3/4 row-start-1 col-span-full">
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
              </Link>
            </div>
          </section>
          {/* /////////// */}

          {/* Best producst */}
          <section className="w-full bg-customWhite py-4 md:pb-20">
            <div className="flex flex-col w-full items-center">
              <div className="w-full xl:w-3/4">
                <div className="pl-5 flex justify-start xl:pl-0 xl:justify-end">
                  <h2 className="py-2 font-bold text-2xl text-primary sm:text-3xl">
                    Best Products
                  </h2>
                </div>
                <div
                  className={`${classes.gradientMenu2} rounded-xl flex gap-2 xl:gap-12 justify-center xl:justify-end pb-14 xl:pt-14 px-10`}
                >
                  <div className=" xl:flex xl:gap-12">
                    <div className="mb-2 relative flex flex-col justify-aroun bg-customWhite shadow-xl rounded-xl h-[12rem] w-[10rem] sm:h-[16rem] sm:w-[14rem]">
                      <FaHeart className="absolute top-3 right-3 text-secondary text-2xl" />
                      <div className="mt-5 flex justify-center">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/mckLabel.png`}
                          alt="Promotion"
                          className="w-[5rem] py-4 sm:w-[7rem] sm:mt-[1rem]"
                          width={100}
                          height={100}
                        />
                      </div>
                      <p className="leading-3 pl-3 text-primary font-bold opacity-70">Cambodian</p>
                      <p className="text-primary text-2xl font-bold pl-3">$35</p>
                    </div>

                    <div className="mb-2 relative flex flex-col justify-aroun bg-customWhite shadow-xl rounded-xl h-[12rem] w-[10rem] sm:h-[16rem] sm:w-[14rem]">
                      <FaHeart className="absolute top-3 right-3 text-secondary text-2xl" />
                      <div className="mt-5 flex justify-center">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/ecuLabel.png`}
                          alt="Promotion"
                          className="w-[5rem] py-4 sm:w-[7rem] sm:mt-[1rem]"
                          width={100}
                          height={100}
                        />
                      </div>
                      <p className="leading-3 pl-3 text-primary font-bold opacity-70">Cambodian</p>
                      <p className="text-primary text-2xl font-bold pl-3">$35</p>
                    </div>
                  </div>

                  <div className="xl:flex xl:gap-12">
                    <div className="mb-2 relative flex flex-col justify-aroun bg-customWhite shadow-xl rounded-xl h-[12rem] w-[10rem] sm:h-[16rem] sm:w-[14rem]">
                      <FaHeart className="absolute top-3 right-3 text-secondary text-2xl" />
                      <div className="mt-5 flex justify-center">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/gtLabel.png`}
                          alt="Promotion"
                          className="w-[5rem] py-4 sm:w-[7rem] sm:mt-[1rem]"
                          width={100}
                          height={100}
                        />
                      </div>
                      <p className="leading-3 pl-3 text-primary font-bold opacity-70">Cambodian</p>
                      <p className="text-primary text-2xl font-bold pl-3">$35</p>
                    </div>

                    <div className="mb-2 relative flex flex-col justify-aroun bg-customWhite shadow-xl rounded-xl h-[12rem] w-[10rem] sm:h-[16rem] sm:w-[14rem]">
                      <FaHeart className="absolute top-3 right-3 text-secondary text-2xl" />
                      <div className="mt-5 flex justify-center">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/colLabel.png`}
                          alt="Promotion"
                          className="w-[5rem] py-4 sm:w-[7rem] sm:mt-[1rem]"
                          width={100}
                          height={100}
                        />
                      </div>
                      <p className="leading-3 pl-3 text-primary font-bold opacity-70">Cambodian</p>
                      <p className="text-primary text-2xl font-bold pl-3">$35</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* /////////// */}

          {/* news on blog and vlog */}
          <section className={`${classes.blogvlog} pt-10`}>
            <Gutter>
              <div className="flex justify-between z-0">
                <p className="py-2 font-bold text-xl text-primary z-20 sm:text-3xl">News on Blog</p>
                <p className="pt-2 relative top-1 font-bold text-md text-primary sm:text-xl">
                  View All
                </p>
              </div>
            </Gutter>
            <NewsCarousel catLabels={catLabels} images={images3} />
            <div className="pb-10"></div>
            <Gutter>
              <div className="flex justify-between z-10">
                <p className="py-2 relative top-1 font-bold text-md text-primary sm:text-xl">
                  View All
                </p>
                <p className="py-2 font-bold text-xl text-primary sm:text-3xl">News on Vlog</p>
              </div>
            </Gutter>
            <NewsCarousel catLabels={null} images={images2} />
          </section>
          {/* /////////// */}
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
