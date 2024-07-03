'use client'

import React, { Fragment, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { Button } from '../../../_components/Button'
import { Message } from '../../../_components/Message'
import { useAuth } from '../../../_providers/Auth'
import { useCart } from '../../../_providers/Cart'

import classes from './index.module.scss'

export const OrderConfirmationPage: React.FC<{}> = () => {
  const searchParams = useSearchParams()
  const orderID = searchParams.get('order_id')
  const total = searchParams.get('total')
  const error = searchParams.get('error')

  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  const { user } = useAuth()

  return (
    <Fragment>
      <h1 className="mb-5">Thank you for your order!</h1>
      <p className="text-xl text-left mb-5">
        Your order has been confirmed. You will receive an email confirmation shortly. Your order ID
        is <p className="font-bold">{orderID}</p>
      </p>
      <p className="text-xl text-left pt-">
        You have selected the payment option to a Wise account. Now you have two options:
      </p>
      <ol className="text-left list-decimal pl-5 text-xl pr-0 mb-5">
        <li>You can transfer money to our Wise account from any bank account.</li>
        <li>You can open an account with Wise. Then transfers to our account will be instant.</li>
      </ol>
      <p className="text-left text-xl mb-5">
        Whichever method you choose, remember to include the order ID in the transfer reference.
        This will streamline the purchasing process.
      </p>

      <div className="xs:p-0 lg:p-2 border-solid border border-gray-200">
        <p className="text-xl text-center">The details for the transfer are as follows:</p>
        <p className="text-xl font-bold text-center">
          Account number in IBAN format: <br />
        </p>
        <p className="lg:text-xl xs:text-sm text-center">BE03 9679 8908 2084</p>
        <p className="text-xl font-bold text-center">
          BIC / SWIFT: <br />
        </p>
        <p className="lg:text-xl xs:text-sm text-center">TRWIBEB1XXX</p>
        <p className="text-xl font-bold text-center">
          Reference: <br />
        </p>
        <p className="lg:text-xl xs:text-sm text-center">Order ID: {orderID}</p>
        <p className="text-xl font-bold text-center">
          Total amount: <br />
        </p>
        <p className="lg:text-xl xs:text-sm text-center">€{total}</p>
        <p className="text-xl font-bold text-center">
          Company name: <br />
        </p>
        <p className="text-xl text-center">UiTeH</p>
        <p className="text-xl font-bold text-center">Address:</p>
        <p className="text-xl text-center">Szkolna 1/3, 05-500 Piaseczno, Poland</p>
      </div>
      <p className="mt-10 text-center text-2xl">Check out Wise</p>
      <Link
        href="https://www.wise.com/"
        className="mt-5 mb-10 lg:flex lg:flex-row lg:items-center md:flex xs:flex-col items-center"
      >
        <Image
          alt="Wise bank logo"
          src="/media/vise.svg"
          height="300"
          width="200"
          className="w-50 lg:pl-0 xs:pl-0 mx-auto"
        />
      </Link>
      <div className={classes.actions}>
        {user && (
          <>
            <Button href={`/account/orders/${orderID}`} label="View order" appearance="primary" />
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/account/orders`}
              label="View all orders"
              appearance="secondary"
            />
          </>
        )}
        {!user && (
          <>
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/products`}
              label="Back To Shop"
              appearance="secondary"
            />
          </>
        )}
      </div>
    </Fragment>
  )
}
