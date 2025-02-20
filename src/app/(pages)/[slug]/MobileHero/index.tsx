import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const MobileHero = () => {
  return (
    <div>
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
    </div>
  )
}

export default MobileHero
