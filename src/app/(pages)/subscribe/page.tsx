import React, { Suspense } from 'react'
import { Metadata } from 'next'

import { Gutter } from '../../_components/Gutter'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import LayoutWithHeaderFooter from '../../layouts/withHeaderAndFooter/layout'
import { SubscribePage } from './SubscribePage'

import classes from './index.module.scss'

export default async function Subscribe() {
  return (
    <LayoutWithHeaderFooter>
      <Gutter className="pt-5 pb-40 bg-customWhite">
        <Suspense fallback={<div>Loading...</div>}>
          <SubscribePage />
        </Suspense>
      </Gutter>
    </LayoutWithHeaderFooter>
  )
}
