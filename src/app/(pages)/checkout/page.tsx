import React from 'react'

import { Settings } from '../../../payload/payload-types'
import { fetchSettings } from '../../_api/fetchGlobals'
import { Gutter } from '../../_components/Gutter'
import LayoutWithHeaderFooter from '../../layouts/withHeaderAndFooter/layout'
import { CheckoutPage } from './CheckoutPage'

import classes from './index.module.scss'

const Checkout = async () => {
  let settings: Settings | null = null

  try {
    settings = await fetchSettings()
  } catch (error) {
    console.error(error)
  }

  return (
    <LayoutWithHeaderFooter>
      <div className={`${classes.checkout} bg-customWhite`}>
        <Gutter className={classes.checkoutPage}>
          <CheckoutPage settings={settings} />
        </Gutter>
      </div>
    </LayoutWithHeaderFooter>
  )
}

export default Checkout
