'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'

import LayoutWithHeaderFooter from '../../../layouts/withHeaderAndFooter/layout'

export const SubscribeConfiramtionPage: React.FC<{}> = () => {
  const searchParams = useSearchParams()
  const firstName = searchParams.get('firstName')

  return (
    <LayoutWithHeaderFooter>
      <div className="flex justify-center mx-5">
        <h1 className="mb-36 mt-10 text-2xl text-secondary xl:text-4xl">
          Welcome to our newsletter, {firstName} !
        </h1>
      </div>
    </LayoutWithHeaderFooter>
  )
}
