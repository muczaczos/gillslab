'use client'

import React, { Fragment } from 'react'
import Link from 'next/link'

import { Page, Settings } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { LoadingShimmer } from '../../../_components/LoadingShimmer'
import { useCart } from '../../../_providers/Cart'
import CartItem from '../CartItem'

import classes from './index.module.scss'

export const CartPage: React.FC<{
  settings: Settings
  page: Page
}> = props => {
  const { settings } = props
  const { productsPage } = settings || {}

  const { cart, cartIsEmpty, addItemToCart, totalAmount, hasInitializedCart } = useCart()
  let subtotal = 0

  return (
    <Fragment>
      <br />
      {!hasInitializedCart ? (
        <div className={classes.loading}>
          <LoadingShimmer />
        </div>
      ) : (
        <Fragment>
          {cartIsEmpty ? (
            <div className={classes.empty}>
              Your cart is empty.
              {typeof productsPage === 'object' && productsPage?.slug && (
                <Fragment>
                  {' '}
                  <Link href={`/${productsPage.slug}`}>Click here</Link>
                  {` to shop.`}
                </Fragment>
              )}
            </div>
          ) : (
            <div className={classes.cartWrapper}>
              <div>
                {/* CART LIST HEADER */}
                <div className={classes.header}>
                  <p>Products</p>
                  <div className={classes.headerItemDetails}>
                    <p></p>
                    <p></p>
                    <p>Quantity</p>
                  </div>
                  <p className={classes.headerSubtotal}>Subtotal</p>
                </div>
                {/* CART ITEM LIST */}
                <ul className={classes.itemList}>
                  {cart?.items?.map(item => {
                    if (typeof item.product === 'object') {
                      const {
                        quantity,
                        product,
                        product: { price, id, title, meta },
                      } = item
                      subtotal = Number(price) * quantity

                      const metaImage = meta?.image

                      return (
                        <CartItem
                          key={id}
                          product={product}
                          title={title}
                          metaImage={metaImage}
                          qty={quantity}
                          price={price}
                          addItemToCart={addItemToCart}
                          sub={subtotal}
                        />
                      )
                    }
                    return null
                  })}
                </ul>
              </div>

              <div className={classes.summary}>
                <div className={classes.row}>
                  <h6 className={classes.cartTotal}>Summary</h6>
                </div>

                <div className={classes.row}>
                  <p className={classes.cartTotal}>Delivery Charge</p>
                  <p className={classes.cartTotal}>Will be calculated soon</p>
                </div>

                <div className={classes.row}>
                  <p className={classes.cartTotal}>Grand Total</p>
                  <p className={classes.cartTotal}>€{totalAmount}</p>
                </div>

                <Button
                  className={classes.checkoutButton}
                  href={'/checkout'}
                  label={'Checkout'}
                  appearance="third"
                />
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}
