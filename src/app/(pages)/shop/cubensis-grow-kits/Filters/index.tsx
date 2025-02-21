'use client'

import React from 'react'

import { Category } from '../../../../../payload/payload-types'
import { useFilter } from '../../../../_providers/Filter'

import classes from './index.module.scss'

const Filters = ({}: { categories: Category[] }) => {
  const { setCategoryFilters } = useFilter()

  setCategoryFilters(['65e7730c3f429b083f97af6a'])

  return <div className={classes.filters}></div>
}

export default Filters
