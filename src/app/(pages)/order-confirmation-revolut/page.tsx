import React, { Suspense } from 'react'
import { Metadata } from 'next'

import { Gutter } from '../../_components/Gutter'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { OrderConfirmationPage } from './OrderConfirmationPage'

import classes from './index.module.scss'

export default async function OrderConfirmationRevolut() {
  return (
    <Gutter>
      <Suspense fallback={<div>Loading...</div>}>
        <OrderConfirmationPage />
      </Suspense>
    </Gutter>
  )
}

export const metadata: Metadata = {
  title: 'Order Confirmation - Revolut',
  description: 'Your order has been confirmed. Your payment method is Revolut',
  openGraph: mergeOpenGraph({
    title: 'Order Confirmation - Revolut',
    url: '/order-confirmation-revolut',
  }),
}
