'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Header as HeaderType } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { Button } from '../../Button'
import { CartLink } from '../../CartLink'
import { CMSLink } from '../../Link'

import '/node_modules/flag-icons/css/flag-icons.min.css'

import classes from './index.module.scss'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const { user } = useAuth()

  return (
    <nav className={[classes.nav, user === undefined && classes.hide].filter(Boolean).join(' ')}>
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="none" />
      })}
      <CartLink />
      {user && <Link href="/account">Account</Link>}
      {!user && (
        <Button
          el="link"
          href="/login"
          label="Login"
          appearance="primary"
          onClick={() => (window.location.href = '/login')}
        />
      )}
      <div className="flex items-center gap-2">
        <Link href="/" aria-label="Change language to english">
          <span className="fi fi-gb"></span>
        </Link>
        <Link href="/" aria-label="Change langueage to polish">
          <Image alt="Planet of mushrooms" src="/media/polska.png" height="25" width="25" />
        </Link>
      </div>
    </nav>
  )
}
