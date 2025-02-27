import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Page, Settings } from '../../../payload/payload-types'
import { staticCart } from '../../../payload/seed/cart-static'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchSettings } from '../../_api/fetchGlobals'
import { Button } from '../../_components/Button'
import { Gutter } from '../../_components/Gutter'
import { generateMeta } from '../../_utilities/generateMeta'
import LayoutWithHeaderFooter from '../../layouts/withHeaderAndFooter/layout'
import { CartPage } from './CartPage'

import classes from './index.module.scss'

// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../[slug]/page.tsx' about this
export const dynamic = 'force-dynamic'

export default async function Cart() {
  let page: Page | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug: 'cart',
    })
  } catch (error) {
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // so swallow the error here and simply render the page with fallback data where necessary
    // in production you may want to redirect to a 404  page or at least log the error somewhere
    // console.error(error)
  }

  // if no `cart` page exists, render a static one using dummy content
  // you should delete this code once you have a cart page in the CMS
  // this is really only useful for those who are demoing this template
  if (!page) {
    page = staticCart
  }

  if (!page) {
    return notFound()
  }

  let settings: Settings | null = null

  try {
    settings = await fetchSettings()
  } catch (error) {
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // so swallow the error here and simply render the page with fallback data where necessary
    // in production you may want to redirect to a 404  page or at least log the error somewhere
    // console.error(error)
  }

  return (
    <LayoutWithHeaderFooter>
      <div className={classes.container}>
        <Gutter className="pb-36 bg-customWhite">
          <h3 className="text-primary">Cart</h3>
          <CartPage settings={settings} page={page} />
          <div className="p-10 w-full bg-primary opacity-90 rounded-xl">
            <Button label="Continue Shopping" href="/" appearance="secondary" />
          </div>
        </Gutter>
      </div>
    </LayoutWithHeaderFooter>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  let page: Page | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug: 'cart',
    })
  } catch (error) {
    // don't throw an error if the fetch fails
    // this is so that we can render a static cart page for the demo
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // in production you may want to redirect to a 404  page or at least log the error somewhere
  }

  if (!page) {
    page = staticCart
  }

  return generateMeta({ doc: page })
}
