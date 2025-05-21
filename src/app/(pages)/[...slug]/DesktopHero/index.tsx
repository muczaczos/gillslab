import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const DesktopHero = () => {
  return (
    <div>
      {/* Desktokp Hero */}
      <div className="bg-customWhite md:flex md:justify-center">
        <section className="hidden md:block md:w-full 2xl:min-w-[1519px] max-w-[1519px]">
          <div className="grid grid-cols-3 bg-customWhite">
            {/* Lewa kolumna podzielona na dwa wiersze */}
            <div className="col-span-2 grid grid-rows-2">
              <div className="bg-customWhite relative">
                <Image
                  src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/clouds2.png`}
                  alt="Clouds image"
                  width={1000}
                  height={500}
                  quality={100}
                  priority={true}
                  className="pt-10 pl-3 scale-100 hover:scale-105 transition-transform duration-300 object-contain"
                />
              </div>
              <div className="bg-customWhite">
                <h1 className="font-black text-primary ml-7 w-80% mb-0 sm:mt-10 sm:ml-10">
                  MAGIC <br />
                  GROWKITS
                </h1>
                <p className="text-primary ml-7 mt-2 sm:ml-10">
                  <span className="font-normal text-base">Cultivate Your Mushroom Dreams</span>
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
    </div>
  )
}

export default DesktopHero
