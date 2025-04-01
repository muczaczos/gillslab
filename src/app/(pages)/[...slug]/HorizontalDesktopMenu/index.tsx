import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import classes from './index.module.scss'

const HorizontalDesktopMenu = () => {
  const images = [
    process.env.NEXT_PUBLIC_SERVER_URL + '/media/growkitsCat.png',
    process.env.NEXT_PUBLIC_SERVER_URL + '/media/sporesCat.png',
    process.env.NEXT_PUBLIC_SERVER_URL + '/media/liquidCat.png',
    process.env.NEXT_PUBLIC_SERVER_URL + '/media/labCat.png',
    process.env.NEXT_PUBLIC_SERVER_URL + '/media/substrateCat.png',
  ]

  const links = [
    'cubensis-grow-kits',
    'cubensis-spore-syringes',
    'cubensis-liquid-cultures',
    'laboratory-equipments',
    'substrates',
  ]

  return (
    <div>
      {/* horizontal menu for desktop*/}
      <section className="w-full hidden md:block bg-customWhite pb-20 py-5">
        <div className="flex flex-col w-full items-end">
          <div id="start" className="w-3/4">
            <h2 className="py-2 font-bold text-2xl text-primary sm:text-3xl">Shop By Categories</h2>
            <div className={`${classes.gradientMenu} rounded-xl flex py-14 px-10`}>
              <Link className="" href={`/shop/${links[0]}`}>
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

              <Link className="" href={`/shop/${links[1]}`}>
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

              <Link className="" href={`/shop/${links[2]}`}>
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

              <Link className="" href={`/shop/${links[3]}`}>
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

              <Link className="" href={`/shop/${links[4]}`}>
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
    </div>
  )
}

export default HorizontalDesktopMenu
