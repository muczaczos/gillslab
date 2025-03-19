import React from 'react'

import { Page } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'

type Props = Extract<Page['layout'][0], { blockType: 'shopCarousel' }> & {
  id?: string
  title?: string
}

export const ShopCarousel: React.FC<Props> = props => {
  const { title } = props // Wyciągamy tablicę `items` z propsów

  return (
    <Gutter className="pb-20 flex flex-wrap">
      <h2>{title}</h2>
    </Gutter>
  )
}
