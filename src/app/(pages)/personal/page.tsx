import React, { Fragment } from 'react'
import { draftMode } from 'next/headers'

import { Gutter } from '../../_components/Gutter'
import { RenderParams } from '../../_components/RenderParams'
import { LowImpactHero } from '../../_heros/LowImpact'
import AccountForm from '../account/AccountForm'

import classes from './index.module.scss'

const Personal = async () => {
  const { isEnabled: isDraftMode } = draftMode()
  return (
    <Fragment>
      <Gutter className={classes.account}>
        <h1 className={classes.title}>Personal Information</h1>
        <AccountForm />
      </Gutter>
    </Fragment>
  )
}

export default Personal
