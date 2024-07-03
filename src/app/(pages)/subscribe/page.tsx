import React, { Suspense } from 'react'
import { Metadata } from 'next'

import { Gutter } from '../../_components/Gutter'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { SubscribePage } from './SubscribePage'

import classes from './index.module.scss'

export default async function Subscribe() {
  return (
    <Gutter>
      <Suspense fallback={<div>Loading...</div>}>
        <SubscribePage />
      </Suspense>
    </Gutter>
  )
}
