import React from 'react'
import { notFound } from 'next/navigation'

import { Page } from '../../../payload/payload-types' // Import typu zdefiniowanego dla stron
import { fetchDoc } from '../../_api/fetchDoc'
import { Blocks } from '../../_components/Blocks'
import LayoutWithHeaderFooter from '../../layouts/withHeaderAndFooter/layout'

export default async function Privacy({}) {
  const pageData: Page | null = await fetchDoc<Page>({
    collection: 'pages',
    slug: 'privacy',
  })

  if (!pageData) {
    return notFound()
  }

  return (
    <LayoutWithHeaderFooter>
      <div className={`custom-page ${pageData.customClass || ''}`}>
        <h1 className="pt-10 pl-5 pb-3 text-primary">{pageData.title}</h1>

        <Blocks blocks={pageData.layout} />
      </div>
    </LayoutWithHeaderFooter>
  )
}
