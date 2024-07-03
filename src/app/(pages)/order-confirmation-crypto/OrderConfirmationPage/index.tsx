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
        You have selected the payment option Cryptocurency. Now you have two options:
      </p>
      <ol className="text-left list-decimal pl-5 text-xl pr-0 mb-5">
        <li>You can use BTC.</li>
        <li>You can use ETH</li>
      </ol>
      <p className="text-left text-xl mb-5">
        Whichever method you choose, send to us email with ID transaction after payment. This will
        speed up proccesing of your order.
      </p>

      <div className="xs:p-0 lg:p-2 border-solid border border-gray-200">
        <p className="text-xl text-center">
          BTC wallet address: <br />
        </p>
        <p className="font-bold lg:text-xl xs:text-sm text-center">
          1DZj35SBrLXGPNtp9XnS8E1vArvBmXDtQn
        </p>
      </div>
      <p className="mt-5 text-center text-2xl">Click on the logo and checkout how works BTC</p>
      <Link
        href="https://bitcoin.org/en/getting-started"
        className="mt-5 mb-10 lg:flex lg:flex-row lg:items-center md:flex xs:flex-col items-center"
      >
        <Image
          alt="Bitcoin logo"
          src="/media/bitcoin.png"
          height="300"
          width="200"
          className="w-50 lg:pl-10 xs:pl-0 mx-auto"
        />
      </Link>
      <div className="mt-10 xs:p-0 lg:p-2 border-solid border border-gray-200">
        <p className="text-xl text-center">
          ETH wallet address: <br />
        </p>
        <p className="font-bold lg:text-xl xs:text-sm text-center">
          0xf4f656a1316838cffebe664d279170ef2ba20e61
        </p>
      </div>
      <p className="mt-5 text-center text-2xl">Click on the logo and checkout how works ETH</p>
      <Link
        href="https://ethereum.org/en/"
        className="mt-5 mb-10 lg:flex lg:flex-row lg:items-center md:flex xs:flex-col items-center"
      >
        <Image
          alt="Eth Logo"
          src="/media/eth.svg"
          height="300"
          width="100"
          className="w-50 lg:pl-10 xs:pl-0 mx-auto"
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
