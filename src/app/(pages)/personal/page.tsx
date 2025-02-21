import React, { Fragment } from 'react'
import { draftMode } from 'next/headers'

import { Gutter } from '../../_components/Gutter'
import AccountForm from '../account/AccountForm'

import classes from './index.module.scss'

const Personal = async () => {
  draftMode()
  return (
    <Fragment>
      <Gutter className={classes.account}>
        <h1 className={`${classes.title} text-primary-dark`}>Personal Information</h1>
        <AccountForm />
      </Gutter>
    </Fragment>
  )
}

export default Personal
