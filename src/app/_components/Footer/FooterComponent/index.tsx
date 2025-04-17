'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  FaBtc,
  FaCreditCard,
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaVimeo,
  FaWhatsapp,
} from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import router from 'next/router'

import { Footer, Media } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { inclusions, noHeaderFooterUrls, profileNavItems } from '../../../constants'
import { Gutter } from '../../Gutter'
import { Input } from '../../Input'

import classes from './index.module.scss'

const FooterComponent = ({ footer }: { footer: Footer }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormData>()
  const router = useRouter()
  const [email, setEmailValue] = useState('')
  const pathname = usePathname()
  const navItems = footer?.navItems || []
  const handleAddress = e => {
    setEmailValue(e.target.value)
  }
  const handleSubscriber = async () => {
    router.push(`/subscribe?email=${email}`)
  }

  return (
    <>
      <footer className={`${noHeaderFooterUrls.includes(pathname) ? classes.hide : ''} relative`}>
        {/*Footer image*/}
        <div className="bg-transparent md:hidden -mt-40 relative overflow-hidden h-auto"></div>
        <div className="bg-customWhite hidden md:block md:mb-10 xxl:hidden"></div>

        <div className="xs:-mt-16 -mt-20 bg-cover bg-primary relative z-20 p-5 xs:p-3 xxl:pt-20">
          <div className="">
            <div className="w-full xxl:w-[2000px] xxl:mx-auto">
              {/* Address, Socials, Payments, Shipping*/}
              <div className="flex xs:justify-between csm:gap-20 sm:gap-5 justify-center lg:justify-around sm:mb-10">
                <div className="flex flex-col sm:flex-row">
                  {/* Logo and company details */}
                  <div className="flex flex-col lg:flex-row lg:gap-5">
                    <section className="mb-5">
                      <p className="text-customWhite text-xl">Gillslab LTD.</p>
                      <p className="text-customWhite text-xl">05-500</p>
                      <p className="text-customWhite text-xl">Piaseczno</p>
                      <p className="text-customWhite text-xl">Szkolna 1/3</p>
                      <p className="text-customWhite text-xl">Poland</p>
                      <FaWhatsapp className="text-4xl text-customWhite mr-5" />{' '}
                      <FaPhone className="text-3xl text-customWhite" />
                    </section>

                    {/* Socials */}
                    <section className="mb-5 lg:mr-10">
                      <h4 className="text-customWhite font-bold">Socials</h4>
                      <div className="flex flex-row lg:flex-col">
                        <FaFacebook className="text-4xl  mr-5 text-customWhite lg:mb-5" />
                        <FaInstagram className=" text-4xl mr-5 text-customWhite lg:mb-5" />
                        <FaVimeo className="text-4xl text-customWhite" />
                      </div>
                    </section>
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-10">
                    {/* Payments */}
                    <section className="mb-5">
                      <h4 className="text-customWhite font-bold">Payments</h4>
                      <div className="flex flex-row lg:flex-col">
                        <FaBtc className="text-4xl  mr-5 text-customWhite mb-5" />
                        <FaCreditCard className=" text-4xl mr-5 text-customWhite mb-5" />
                        <FaVimeo className="text-4xl text-customWhite" />
                      </div>
                    </section>

                    {/* Shipping */}
                    <section className="mb-5 lg:mr-5">
                      <h4 className="text-customWhite font-bold">Shipping</h4>
                      <p className="text-customWhite text-xl">Poland 0-1 Days</p>
                      <p className="text-customWhite text-xl">Europe 1-3 Days</p>
                      <p className="text-customWhite text-xl">USA 4-7 Days</p>
                    </section>
                  </div>
                </div>
                <section>
                  <h4 className="text-customWhite font-bold">Sitemap</h4>
                  <Link href="/shop/">
                    <p className="text-customWhite text-xl">Shop</p>
                  </Link>
                  <Link href="/shop/cubensis-grow-kits">
                    <p className="text-customWhite text-xl">Growkits</p>
                  </Link>
                  <Link href="/shop/cubensis-liquid-cultures">
                    <p className="text-customWhite text-xl">Cultures</p>
                  </Link>
                  <Link href="/shop/cubensis-spore-syringes">
                    <p className="text-customWhite text-xl">Spores</p>
                  </Link>
                  <Link href="/shop/laboratory-equipments">
                    <p className="text-customWhite text-xl">Lab</p>
                  </Link>
                  <Link href="/shop/substrates">
                    <p className="text-customWhite text-xl">Substrates</p>
                  </Link>
                  <Link href="/contact">
                    <p className="text-customWhite text-xl">Contact</p>
                  </Link>
                  <Link href="/conditions">
                    <p className="text-customWhite text-xl">Conditions</p>
                  </Link>
                  <Link href="/privacy">
                    <p className="text-customWhite text-xl">Privacy</p>
                  </Link>
                  <Link href="/blog">
                    <p className="text-customWhite text-xl">Blog</p>
                  </Link>
                  <Link href="/vlog">
                    <p className="text-customWhite text-xl">Vlog</p>
                  </Link>
                  <Link href="/shipping">
                    <p className="text-customWhite text-xl">Shipping</p>
                  </Link>
                  <Link href="/payments">
                    <p className="text-customWhite text-xl">Payments</p>
                  </Link>
                  <Link href="/cart">
                    <p className="text-customWhite text-xl">Cart</p>
                  </Link>
                  <Link href="/favorities">
                    <p className="text-customWhite text-xl">Favorities</p>
                  </Link>
                  <Link href="/about">
                    <p className="text-customWhite text-xl">About</p>
                  </Link>
                </section>
              </div>
            </div>
          </div>
          <hr className="border-customWhite w-full sm:mb-10 xl:w-3/4" />
          {/* dhl, dpd, ups, fedex logotypes */}
        </div>
      </footer>
    </>
  )
}

export default FooterComponent
