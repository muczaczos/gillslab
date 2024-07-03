import React, { Suspense } from 'react'
import { Metadata } from 'next'

import { Gutter } from '../../_components/Gutter'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { OrderConfirmationPage } from './OrderConfirmationPage'

import classes from './index.module.scss'

export default async function OrderConfirmationCrypto() {
  return (
    <Gutter>
      <Suspense fallback={<div>Loading...</div>}>
        <OrderConfirmationPage />
      </Suspense>
    </Gutter>
  )
}

export const metadata: Metadata = {
  title: 'Order Confirmation - Crypto',
  description: 'Your order has been confirmed. Your payment method is Cryptocurency',
  openGraph: mergeOpenGraph({
    title: 'Order Confirmation - Crypto',
    url: '/order-confirmation-crypto',
  }),
}
