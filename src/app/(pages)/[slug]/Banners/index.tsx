import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import classes from './index.module.scss'

const Banners = () => {
  const promotionImg = process.env.NEXT_PUBLIC_SERVER_URL + '/media/promotions.png'

  return (
    <div>
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
    </div>
  )
}

export default Banners
