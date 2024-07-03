import React, { Fragment } from 'react'
import Link from 'next/link'

import { Gutter } from '../../_components/Gutter'
import { HR } from '../../_components/HR'
import { getMeUser } from '../../_utilities/getMeUser'

import classes from './index.module.scss'

const Purchases = async () => {
  const { user } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to access your account.',
    )}&redirect=${encodeURIComponent('/account')}`,
  })

  return (
    <Fragment>
      <Gutter className={classes.account}>
        <h1 className={classes.title}>Purchases Products</h1>
        <p>These are the products you have purchased over time.</p>
        <div>
          {user?.purchases?.length || 0 > 0 ? (
            <ul className={classes.purchases}>
              {user?.purchases?.map((purchase, index) => {
                return (
                  <li key={index} className={classes.purchase}>
                    {typeof purchase === 'string' ? (
                      <p>{purchase}</p>
                    ) : (
                      <div>
                        <h4>
                          <Link href={`/products/${purchase.slug}`}>{purchase.title}</Link>
                        </h4>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          ) : (
            <div className={classes.noPurchases}>You have no purchases.</div>
          )}
        </div>
        <HR />
      </Gutter>
    </Fragment>
  )
}

export default Purchases
