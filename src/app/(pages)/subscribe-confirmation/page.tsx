import React, { Suspense } from 'react'
import { Metadata } from 'next'

import { Gutter } from '../../_components/Gutter'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { SubscribeConfiramtionPage } from './SubscribeConfirmationPage'

export default async function SubscribeConfirmation() {
  return (
    <Gutter>
      <Suspense fallback={<div>Loading...</div>}>
        <SubscribeConfiramtionPage />
      </Suspense>
    </Gutter>
  )
}
