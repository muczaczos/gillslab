import React from 'react'
import { FaHeart } from 'react-icons/fa'
import Image from 'next/image'

import classes from './index.module.scss'

const BestProducts = () => {
  return (
    <>
      {/* Best producst */}
      <section className="w-full bg-customWhite py-4 md:pb-20">
        <div className="flex flex-col w-full items-center">
          <div className="w-full xl:w-3/4">
            <div className="pl-5 flex justify-start xl:pl-0 xl:justify-end">
              <h2 className="py-2 font-bold text-2xl text-primary sm:text-3xl">Best Products</h2>
            </div>
            <div
              className={`${classes.gradientMenu2} rounded-xl flex gap-2 xl:gap-12 justify-center xl:justify-end pb-14 xl:pt-14 px-10`}
            >
              <div className=" xl:flex xl:gap-12">
                <div className="mb-2 relative flex flex-col justify-aroun bg-customWhite shadow-xl rounded-xl h-[12rem] w-[10rem] sm:h-[16rem] sm:w-[14rem]">
                  <p className="absolute pl-3 text-primary text-2xl font-bold top-3 z-[100]">B+</p>
                  <div className="mt-5 flex justify-center">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/b_liquid_fotor.png`}
                      alt="Promotion"
                      className="w-[5rem] sm:w-[7rem] sm:mt-[1rem]"
                      width={100}
                      height={100}
                    />
                  </div>
                  <p className="absolute bottom-3 text-primary text-2xl font-bold pl-3">$35</p>
                </div>

                <div className="mb-2 relative flex flex-col justify-aroun bg-customWhite shadow-xl rounded-xl h-[12rem] w-[10rem] sm:h-[16rem] sm:w-[14rem]">
                  <p className="absolute pl-3 text-primary text-2xl font-bold top-3">Cambodian</p>
                  <div className="flex justify-center">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/Cambodia_monotub_transparent.png`}
                      alt="Promotion"
                      className="w-[10rem] h-[10rem] sm:w-[12rem] sm:h-[12rem] sm:mt-[1rem]"
                      width={200}
                      height={200}
                    />
                  </div>
                  <p className="absolute bottom-3 text-primary text-2xl font-bold pl-3">$50</p>
                </div>
              </div>

              <div className="xl:flex xl:gap-12">
                <div className="mb-2 relative flex flex-col justify-aroun bg-customWhite shadow-xl rounded-xl h-[12rem] w-[10rem] sm:h-[16rem] sm:w-[14rem]">
                  <p className="absolute pl-3 text-primary text-2xl font-bold top-3">Golden T.</p>
                  <div className="mt-2 flex justify-center">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/Golden_plate-fotor-1.png`}
                      alt="Promotion"
                      className="w-[10rem] sm:w-[12rem] sm:mt-[1rem]"
                      width={100}
                      height={100}
                    />
                  </div>
                  <p className="absolute bottom-3 text-primary text-2xl font-bold pl-3">$20</p>
                </div>

                <div className="mb-2 relative flex flex-col justify-aroun bg-customWhite shadow-xl rounded-xl h-[12rem] w-[10rem] sm:h-[16rem] sm:w-[14rem]">

                  <p className="absolute pl-3 text-primary text-2xl font-bold top-3">Malabar</p>
                  <div className="mt-1 flex justify-center">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/Malabar_print-fotor.png`}
                      alt="Promotion"
                      className="w-[10rem] sm:w-[12rem] sm:mt-[1rem]"
                      width={100}
                      height={100}
                    />
                  </div>
                  <p className="absolute bottom-3 pl-3 text-primary text-2xl font-bold">$25</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /////////// */}
    </>
  )
}

export default BestProducts
