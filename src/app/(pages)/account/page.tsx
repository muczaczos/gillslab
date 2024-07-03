import React, { Fragment } from 'react'
import { BiDoorOpen } from 'react-icons/bi'
import { FaClipboardList, FaCreditCard, FaIdBadge, FaRegUser } from 'react-icons/fa'
import { Metadata } from 'next'
import Link from 'next/link'

import { Order } from '../../../payload/payload-types'
import { Button } from '../../_components/Button'
import { Gutter } from '../../_components/Gutter'
import { HR } from '../../_components/HR'
import { RenderParams } from '../../_components/RenderParams'
import { LowImpactHero } from '../../_heros/LowImpact'
import { getMeUser } from '../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import notFound from '../not-found'
import AccountForm from './AccountForm'
import OrdersList from './OrdersList'

import classes from './index.module.scss'

export default async function Account() {
  const { user } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to access your account.',
    )}&redirect=${encodeURIComponent('/account')}`,
  })

  const { token } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to view your orders.',
    )}&redirect=${encodeURIComponent('/orders')}`,
  })

  let orders: Order[] | null = null

  try {
    orders = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      cache: 'no-store',
    })
      ?.then(async res => {
        if (!res.ok) notFound()
        const json = await res.json()
        if ('error' in json && json.error) notFound()
        if ('errors' in json && json.errors) notFound()
        return json
      })
      ?.then(json => json.docs)
  } catch (error) {
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // so swallow the error here and simply render the page with fallback data where necessary
    // in production you may want to redirect to a 404  page or at least log the error somewhere
    // console.error(error)
  }
  // console.log(orders)
  return (
    <Fragment>
      <Gutter>
        <h1 className={classes.title}>My Profile</h1>
        <div className={classes.layout}>
          <div className={classes.menu}>
            <ul className={classes.menuList}>
              <li className={classes.avatar}>
                <FaIdBadge className={classes.avatarUser} />
                <div className={classes.avatarText}>
                  <p className={classes.avatarName}>
                    <strong>{user.name}</strong>
                  </p>
                  <p className={classes.avatarEmail}>{user.email}</p>
                </div>
              </li>
              <Link href="/personal" className={classes.menuItem}>
                <FaRegUser />
                Personal Information
              </Link>
              <Link href="/purchases" className={classes.menuItem}>
                <FaCreditCard />
                My Pucharses
              </Link>
              <Link href="/orders" className={classes.menuItem}>
                <FaClipboardList />
                My Orders
              </Link>
              <Link href="/logout" className={classes.menuItem + ' ' + classes.menuLogout}>
                <BiDoorOpen />
                Logout
              </Link>
            </ul>
          </div>
          <div className={classes.orders}>
            <h5 className={classes.ordersTitle}>My orders</h5>
            <OrdersList orders={orders} />
          </div>
        </div>
      </Gutter>
    </Fragment>
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
