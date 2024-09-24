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
        <div className="bg-transparent md:hidden -mt-40 relative overflow-hidden h-auto">
          <Image
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/mobFoot3.png`}
            alt="Example Image"
            width="2000"
            height="200"
            objectFit="cover"
            className="relative left-0"
          />
        </div>
        <div className="bg-customWhite hidden md:block md:mb-10">
          <Image
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/bigFoot.png`}
            alt="Example Image"
            width="2000"
            height="200"
            objectFit="cover"
            className="relative left-0"
          />
        </div>

        <div
          className="xs:-mt-16 -mt-20 bg-cover bg-primary relative z-20 p-5 xs:p-3"
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_SERVER_URL}/media/eyes5.png)`,
          }}
        >
          {/* Address, Socials, Payments, Shipping*/}
          <div className="flex xs:justify-between csm:gap-20 sm:gap-40 justify-center">
            <div>
              {/* Logo */}
              <section className="mb-5">
                <Image
                  src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/logo3.png`}
                  alt="Gillslab logo"
                  width="150"
                  height="100"
                  objectFit="cover"
                  className="relative -left-[10px]"
                />
                <p className="text-customWhite text-xl">Gillslab LTD.</p>
                <p className="text-customWhite text-xl">05-500</p>
                <p className="text-customWhite text-xl">Piaseczno</p>
                <p className="text-customWhite text-xl">Szkolna 1/3</p>
                <p className="text-customWhite text-xl">Poland</p>
                <FaWhatsapp className="text-4xl text-customWhite mr-5" />{' '}
                <FaPhone className="text-3xl text-customWhite" />
              </section>

              {/* Socials */}
              <section className="mb-5">
                <h4 className="text-customWhite font-bold">Socials</h4>
                <FaFacebook className="text-4xl  mr-5 text-customWhite" />
                <FaInstagram className=" text-4xl mr-5 text-customWhite" />
                <FaVimeo className="text-4xl text-customWhite" />
              </section>

              {/* Payments */}
              <section className="mb-5">
                <h4 className="text-customWhite font-bold">Payments</h4>
                <FaBtc className="text-4xl  mr-5 text-customWhite" />
                <FaCreditCard className=" text-4xl mr-5 text-customWhite" />
                <FaVimeo className="text-4xl text-customWhite" />
              </section>

              {/* Shipping */}
              <section className="mb-5">
                <h4 className="text-customWhite font-bold">Shipping</h4>
                <p className="text-customWhite text-xl">Poland 1 Day</p>
                <p className="text-customWhite text-xl">Europe 1-3 Days</p>
                <p className="text-customWhite text-xl">USA 4-7 Days</p>
              </section>
            </div>
            <section>
              <h4 className="text-customWhite font-bold">Sitemap</h4>
              <p className="text-customWhite text-xl">Gillslab LTD.</p>
              <p className="text-customWhite text-xl">Growkits</p>
              <p className="text-customWhite text-xl">Spores</p>
              <p className="text-customWhite text-xl">Cultures</p>
              <p className="text-customWhite text-xl">Lab</p>
              <p className="text-customWhite text-xl">Substrates</p>
              <p className="text-customWhite text-xl">Contact</p>
              <p className="text-customWhite text-xl">Conditions</p>
              <p className="text-customWhite text-xl">Privacy</p>
              <p className="text-customWhite text-xl">Blog</p>
              <p className="text-customWhite text-xl">Vlog</p>
              <p className="text-customWhite text-xl">Shipping</p>
              <p className="text-customWhite text-xl">Payments</p>
              <p className="text-customWhite text-xl">Cart</p>
              <p className="text-customWhite text-xl">Favorities</p>
            </section>
          </div>

          {/* dhl, dpd, ups, fedex logotypes */}
          <div className="flex items-center gap-2 w-full h-24 mx-auto overflow-hidden">
            {/* Kontener z 50% szerokości i wyśrodkowany */}
            <div className="relative w-full h-16">
              {' '}
              {/* Ustawienie stałej wysokości */}
              <Image
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/dhl.png`}
                alt="dhl logo image"
                className="object-contain w-full h-full" // Ustawienie w pełni skalowalnego obrazu
                width={100}
                height={100}
              />
            </div>
            <div className="relative w-full h-16">
              <Image
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/dpd.png`}
                alt="dpd logo image"
                className="object-contain w-full h-full" // Ustawienie w pełni skalowalnego obrazu
                width={100}
                height={100}
              />
            </div>
            <div className="relative w-full h-16">
              <Image
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/ups.png`}
                alt="ups logo image"
                className="object-contain w-full h-full" // Ustawienie w pełni skalowalnego obrazu
                width={100}
                height={100}
              />
            </div>
            <div className="relative w-full h-16">
              <Image
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/fedex.png`}
                alt="fedex logo image"
                className="object-contain w-full h-full" // Ustawienie w pełni skalowalnego obrazu
                width={100}
                height={100}
              />
            </div>
          </div>

          {/* Gillslab logo and date */}
          <div className="mt-2 mb-20 items-center flex gap-2">
            <p className="text-customWhite text-large font-bold">© 2008 - 2024</p>
            <Image
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/logoCom.png`}
              alt="Gillslab logo"
              className="" // Skaluje obrazek do 50% jego rozmiarów
              width={150}
              height={100}
            />
          </div>
        </div>
      </footer>
    </>
  )
}

export default FooterComponent
