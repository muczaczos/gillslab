import React from 'react'
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Page } from '../../../payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { Blocks } from '../../_components/Blocks'
import { Gutter } from '../../_components/Gutter'
import { generateMeta } from '../../_utilities/generateMeta'

import classes from './index.module.scss'

// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../[slug]/page.tsx' about this
export const dynamic = 'force-dynamic'

export default async function About() {
  let page: Page | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug: 'about',
    })
  } catch (error) {
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // so swallow the error here and simply render the page with fallback data where necessary
    // in production you may want to redirect to a 404  page or at least log the error somewhere
    // console.error(error)
  }

  return (
    <Gutter>
      <div className={classes.container}>
        <h1>About our mushrooms team</h1>
        <section className={classes.hero}>
          <div className={classes.heroText}>
            <h2>Planet-of-Mushrooms Team</h2>
            <p className={classes.text}>
              We are people from different parts of the world 🌏. We have different hobbies ⚽,
              different religions 🧕, different tastes 🍟🌭🍕. We have a different skin color and a
              different hair color or we don’t have a hair 😁. We wear different clothes and speak
              different mother tongues 🎏🏳‍🌈🏴, but we share the same passion. Passion for
              mushrooms 🍄. Mushrooms that have developed our world for billions of years 🐱‍🐉. Now
              we want to infect your brain with this passion.🍄
            </p>
            <div className={classes.links}>
              <Link className={classes.link} href="http://facebook.com">
                <BsFacebook className={classes.facebook} />
              </Link>
              <Link className={classes.link} href="http://twitter.com">
                <BsTwitter className={classes.twitter} />
              </Link>
              <Link className={classes.link} href="http://instagram.com">
                <BsInstagram className={classes.instagram} />
              </Link>
            </div>
          </div>
          <Image
            src="/media/team-earth.svg"
            alt="earth with mushrooms on the hand"
            width={500}
            height={500}
            className={classes.heroImage}
          />
        </section>
        <section className={classes.workers}>
          <div className={classes.worker}>
            <Image
              src="/media/Jan.svg"
              alt="James is avatar"
              width={200}
              height={200}
              className={classes.avatar}
            />
            <h3>James</h3>
            <h4>Mushrooms Grower</h4>
            <p>
              My name is James and I have been a mushroom farmer for fifteen years. I’ve worked in a
              few cubensis grow kit stores, but now I work with Arek. I want to share my knowledge
              with you. You can contact me via chat from 9am to 5pm.
            </p>
          </div>
          <div className={classes.worker}>
            <Image
              src="/media/Adiva.svg"
              alt="Adiva is avatar"
              width={200}
              height={200}
              className={classes.avatar}
            />
            <h3>Adiva</h3>
            <h4>Help Desk</h4>
            <p>
              My name is Adiva and I am waiting for your e-mail. You can talk to me in English or
              Polish. I will be happy to answer any questions about our store. My mission is to help
              people solve their problems.
            </p>
          </div>
          <div className={classes.worker}>
            <Image
              src="/media/arek.svg"
              alt="Arek is avatar"
              width={200}
              height={200}
              className={classes.avatar}
            />
            <h3>Arek</h3>
            <h4>IT Technican</h4>
            <p>
              Hi, I’m Arek and apart from mushrooms I love computers. If you have any problems with
              payment, the functioning of our website or the shipment, just give me a call. I will
              try to help you.
            </p>
          </div>
        </section>
      </div>
    </Gutter>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  let page: Page | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug: 'about',
    })
  } catch (error) {
    // don't throw an error if the fetch fails
    // this is so that we can render a static cart page for the demo
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // in production you may want to redirect to a 404  page or at least log the error somewhere
  }

  if (!page) {
    page = null
  }

  return generateMeta({ doc: page })
}
