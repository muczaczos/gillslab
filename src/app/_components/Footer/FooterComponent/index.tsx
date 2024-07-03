'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
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
    //console.log(email)
  }

  return (
    <>
      <footer className={noHeaderFooterUrls.includes(pathname) ? classes.hide : ''}>
        <Gutter>
          <ul className={classes.inclusions}>
            {inclusions.map((inclusion, index) => (
              <li key={inclusion.title}>
                <Image
                  src={inclusion.icon}
                  alt={inclusion.title}
                  width={36}
                  height={36}
                  className={classes.icon}
                />

                <p className="text-xl font-bold">{inclusion.title}</p>
                <p>{inclusion.description}</p>
              </li>
            ))}
          </ul>
        </Gutter>
        <Image
          src="/media/footer-grass.svg"
          style={{ width: '100%' }}
          alt="elephant and mushroom"
          width={350}
          height={50}
        />
        <div className={classes.footer}>
          <Gutter>
            <div className={classes.newsletter}>
              <Input
                name="subscribe"
                type="email"
                label=""
                placeholder="Subscribe to newsletter"
                register={register}
                error={null}
                disabled={false}
                onChange={handleAddress}
                className={classes.newsletterInput}
              />
              <Button
                label="Subscribe"
                onClick={handleSubscriber}
                className={classes.newsButton}
              ></Button>
            </div>
            <div className={classes.menu}>
              <div className={classes.menuCol}>
                <section className="w-1/2">
                  <label>Products</label>
                  <ul>
                    <li>
                      <Link href="/cubensis-grow-kits">Growkits</Link>
                    </li>
                    <li>
                      <Link href="/cubensis-spore-syringes">Syringes</Link>
                    </li>
                    <li>
                      <Link href="/cubensis-liquid-cultures">Liquids</Link>
                    </li>
                    <li>
                      <Link href="/cubensis-spore-prints">Prints</Link>
                    </li>
                    <li>
                      <Link href="/cubensis-plate-cultures">Plates</Link>
                    </li>
                  </ul>
                </section>
                <section>
                  <label>Informations</label>
                  <ul>
                    <li>
                      <Link href="/about">About Us</Link>
                    </li>
                    <li>
                      <Link href="/shipping">Shipping</Link>
                    </li>
                    <li>
                      <Link href="/payments">Payments</Link>
                    </li>
                    <li>
                      <Link href="/contact">Contact</Link>
                    </li>
                    <li>
                      <Link href="/posts">Blog</Link>
                    </li>
                  </ul>
                </section>
              </div>
              <div className={`${classes.menuCol} ${classes.rules}`}>
                <section>
                  <label>Rules</label>
                  <ul>
                    <li>
                      <Link href="/conditions">Terms & Conditions</Link>
                    </li>
                    <li>
                      <Link href="/privacy">Privacy Policy</Link>
                    </li>
                  </ul>
                </section>
              </div>
            </div>
            <div className="">
              <div className="mb-5 flex justify-center items-center pt-3 pb-3 border-solid border-b border-t border-l-0 border-r-0 border-gray-600 gap-5">
                <p>Revolut &nbsp;</p>
                <p>Vise &nbsp;</p>
                <p>Crypto &nbsp;</p>
                <p>SEPA &nbsp;</p>
              </div>
            </div>
            <div className={classes.disclamer}>
              <h3>Disclamer</h3>
              <p className="">
                www.planet-of-mushrooms.com does not advice growing any illegal substance, such as
                Psilocybe Cubensis (magic mushrooms). While our cubensis growkits, syringes of
                cubensis spores and prints of cubensis spores are capable of growing Psilocybe
                Cubensis mushrooms (magic mushrooms), it is not advised by
                www.planet-of-mushrooms.com for anybody to do so unless legally licensed by their
                local agricultural or research authorities. We sell that products only for
                microscopic research. Check your country's laws and regulations regarding exotic
                species. Legal status of psilocybin mushrooms
              </p>
            </div>
            <div className={classes.wrap}>
              <Link className="mt-5" href="/">
                <Image src="/media/logo-com-white.svg" alt="logo" width={350} height={50} />
              </Link>

              <div className={classes.socialLinks}>
                {navItems.map(item => {
                  const icon = item?.link?.icon as Media

                  return (
                    <Button
                      key={item.link.label}
                      el="link"
                      href={item.link.url}
                      newTab={true}
                      className={classes.socialLinkItem}
                    >
                      <Image
                        src={icon?.url}
                        alt={item.link.label}
                        width={24}
                        height={24}
                        className={classes.socialIcon}
                      />
                    </Button>
                  )
                })}
              </div>
            </div>
          </Gutter>
        </div>
      </footer>
    </>
  )
}

export default FooterComponent
