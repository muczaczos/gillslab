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
    </>
  )
}

export default BestProducts
