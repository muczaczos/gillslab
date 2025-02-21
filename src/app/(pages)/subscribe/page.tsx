import React, { Suspense } from 'react'

import { Gutter } from '../../_components/Gutter'
import LayoutWithHeaderFooter from '../../layouts/withHeaderAndFooter/layout'
import { SubscribePage } from './SubscribePage'

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
