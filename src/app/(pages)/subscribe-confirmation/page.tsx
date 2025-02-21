import React, { Suspense } from 'react'

import { SubscribeConfiramtionPage } from './SubscribeConfirmationPage'

export default async function SubscribeConfirmation() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubscribeConfiramtionPage />
    </Suspense>
  )
}
