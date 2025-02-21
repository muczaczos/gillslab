import React from 'react'
import { Metadata } from 'next'

import { Gutter } from '../../_components/Gutter'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import LayoutWithHeaderFooter from '../../layouts/withHeaderAndFooter/layout'
import { CheckoutPage } from './CheckoutPage'

import classes from './index.module.scss'

export default async function Checkout() {
  return (
    <LayoutWithHeaderFooter>
      <div className={`${classes.checkout} bg-customWhite`}>
        <Gutter className={classes.checkoutPage}>
          <CheckoutPage />
        </Gutter>
      </div>
    </LayoutWithHeaderFooter>
  )
}

export const metadata: Metadata = {
  title: 'Account',
  description: 'Create an account or log in to your existing account.',
  openGraph: mergeOpenGraph({
    title: 'Account',
    url: '/account',
  }),
}
