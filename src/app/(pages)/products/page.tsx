import React from 'react'
import { draftMode } from 'next/headers'

import { Category, Page } from '../../../payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import { Blocks } from '../../_components/Blocks'
import { Gutter } from '../../_components/Gutter'
import { HR } from '../../_components/HR'
import LayoutWithHeaderFooter from '../../layouts/withHeaderAndFooter/layout'
import Filters from './Filters'

import classes from './index.module.scss'

const Products = async () => {
  const { isEnabled: isDraftMode } = draftMode()

  let page: Page | null = null //Page for layout
  let categories: Category[] | null = null //I need this for filters
  if(page.layout){
    try {
      //fetch page and categories
      //1 fetch page with slug 'products'
      page = await fetchDoc<Page>({
        collection: 'pages',
        slug: 'products',
        draft: isDraftMode,
        /*drafts allow you to build on top of versions functionality
          to make changes to your collection, documents and globals but
          publish only when you're ready. It allows you to check out
          how something is currently working. 
        */
      })
    
      categories = await fetchDocs<Category>('categories')
    } catch (error) {
      //console.log(error)
    }
  }
  return (
    <LayoutWithHeaderFooter>
      <div className="bg-customWhite">
        <Gutter className={classes.products}>
          <Filters categories={categories} />
          <Blocks blocks={page.layout} disableTopPadding={true} />
        </Gutter>
      </div>
    </LayoutWithHeaderFooter>
  )
}

export default Products
