import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import { Order } from '../../../payload/payload-types'
import { useCart } from '../../_providers/Cart'
import { Button } from '../Button'

const GatewayLogic = ({
  setShowMessage,
  setShowMessage2,
  disabled,
  method,
  totalAmount,
  fullName,
  address,
  city,
  postalCode,
  country,
  phone,
  email,
  lockerCode,
  additionalInfo,
  cart,
}) => {
  const router = useRouter()
  const { clearCart } = useCart()

  const handleSubmit = async () => {
    if (
      fullName === '' ||
      address === '' ||
      city === '' ||
      postalCode === '' ||
      country === '' ||
      phone === '' ||
      email === ''
    ) {
      setShowMessage2(true)
    } else {
      //console.log('dupa')
      if (method === 'gateway') {
        const orderReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            total: totalAmount,
            stripePaymentIntentID: '',
            fullname: fullName,
            streetAddress: address,
            city: city,
            postalCode: postalCode,
            country: country,
            phoneNumber: phone,
            email: email,
            lockerCode: lockerCode,
            shippingMethod: 'DPD or Inpost',
            paymentMethod: method,
            additionalInfo: additionalInfo,
            items: (cart?.items || [])?.map(({ product, quantity }) => ({
              product: typeof product === 'string' ? product : product.id,
              quantity,
              price: typeof product === 'number' ? product : Number(product.price),
            })),
          }),
        })

        const {
          error: errorFromRes,
          doc,
        }: {
          message?: string
          error?: string
          doc: Order
        } = await orderReq.json()

        let data = JSON.stringify({
          title: 'Zamówienie nr: ' + doc.id,
          amount: {
            value: parseFloat(totalAmount),
            currencyCode: 'PLN',
          },
          //returnUrl: 'https://grzybole.pl/order-confirmation?order_id=' + doc.id,
          returnUrl: 'https://www.google.pl',
          negativeReturnUrl: 'https://shroom.it',
          sign: '',
        })

        const crypto = require('crypto')
        const dataObj = JSON.parse(data)
        const hash = crypto.createHash('sha1')

        hash.update(
          dataObj.title +
            dataObj.amount.value +
            dataObj.amount.currencyCode +
            dataObj.returnUrl +
            dataObj.negativeReturnUrl +
            '04f58ee93d486f0b426c09d776e1f540',
        )
        // Obliczanie skrótu SHA-1 i przekształcenie wyniku na szesnastkowy
        const sha1Hash = hash.digest('hex')

        // Przypisanie wyliczonego skrótu do pola sign w obiekcie dataObj
        dataObj.sign = sha1Hash

        clearCart()

        try {
          const response = await axios.post('/cashbill-payment', dataObj)
          //  console.log(response.data)
          router.push(response.data.redirectUrl)
        } catch (error) {
          //   console.error('Error:', error.message)
        }
      } else if (method === 'revolut') {
        // console.log('1')
        const orderReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            total: totalAmount,
            stripePaymentIntentID: '',
            fullname: fullName,
            streetAddress: address,
            city: city,
            postalCode: postalCode,
            country: country,
            phoneNumber: phone,
            email: email,
            lockerCode: lockerCode,
            shippingMethod: 'DPD or Inpost',
            paymentMethod: method,
            additionalInfo: additionalInfo,
            items: (cart?.items || [])?.map(({ product, quantity }) => ({
              product: typeof product === 'string' ? product : product.id,
              quantity,
              price: typeof product === 'number' ? product : Number(product.price),
            })),
          }),
        })

        const {
          error: errorFromRes,
          doc,
        }: {
          message?: string
          error?: string
          doc: Order
        } = await orderReq.json()
        router.push(`/order-confirmation-revolut?order_id=${doc.id}&total=${doc.total}`)
      } else if (method === 'crypto') {
        // console.log('1')
        const orderReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            total: totalAmount,
            stripePaymentIntentID: '',
            fullname: fullName,
            streetAddress: address,
            city: city,
            postalCode: postalCode,
            country: country,
            phoneNumber: phone,
            email: email,
            lockerCode: lockerCode,
            shippingMethod: 'DPD or Inpost',
            paymentMethod: method,
            additionalInfo: additionalInfo,
            items: (cart?.items || [])?.map(({ product, quantity }) => ({
              product: typeof product === 'string' ? product : product.id,
              quantity,
              price: typeof product === 'number' ? product : Number(product.price),
            })),
          }),
        })

        const {
          error: errorFromRes,
          doc,
        }: {
          message?: string
          error?: string
          doc: Order
        } = await orderReq.json()
        router.push(`/order-confirmation-crypto?order_id=${doc.id}`)
      } else if (method === 'wise') {
        // console.log('1')
        const orderReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            total: totalAmount,
            stripePaymentIntentID: '',
            fullname: fullName,
            streetAddress: address,
            city: city,
            postalCode: postalCode,
            country: country,
            phoneNumber: phone,
            email: email,
            lockerCode: lockerCode,
            shippingMethod: 'DPD or Inpost',
            paymentMethod: method,
            additionalInfo: additionalInfo,
            items: (cart?.items || [])?.map(({ product, quantity }) => ({
              product: typeof product === 'string' ? product : product.id,
              quantity,
              price: typeof product === 'number' ? product : Number(product.price),
            })),
          }),
        })

        const {
          error: errorFromRes,
          doc,
        }: {
          message?: string
          error?: string
          doc: Order
        } = await orderReq.json()
        router.push(`/order-confirmation-wise?order_id=${doc.id}&total=${doc.total}`)
      } else if (method === 'sepa') {
        // console.log('1')
        const orderReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            total: totalAmount,
            stripePaymentIntentID: '',
            fullname: fullName,
            streetAddress: address,
            city: city,
            postalCode: postalCode,
            country: country,
            phoneNumber: phone,
            email: email,
            lockerCode: lockerCode,
            shippingMethod: 'DPD or Inpost',
            paymentMethod: method,
            additionalInfo: additionalInfo,
            items: (cart?.items || [])?.map(({ product, quantity }) => ({
              product: typeof product === 'string' ? product : product.id,
              quantity,
              price: typeof product === 'number' ? product : Number(product.price),
            })),
          }),
        })

        const {
          error: errorFromRes,
          doc,
        }: {
          message?: string
          error?: string
          doc: Order
        } = await orderReq.json()
        router.push(`/order-confirmation-sepa?order_id=${doc.id}&total=${doc.total}`)
      } else {
        setShowMessage(true)
      }
    }
  }

  return (
    <Button
      disabled={disabled}
      label="Place the Order"
      appearance="primary"
      onClick={handleSubmit}
    ></Button>
  )
}

export default GatewayLogic
