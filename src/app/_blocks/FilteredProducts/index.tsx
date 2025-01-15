import React from 'react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

import { Page } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'

type Props = Extract<Page['layout'][0], { blockType: 'filteredProducts' }> & {
  staticImage?: StaticImageData
  id?: string
  test?: string
  imagePosition?: 'left' | 'right' // Nowe pole dla pozycji obrazu
}

export const FilteredProducts: React.FC<Props> = props => {
  const { category } = props // Wyciągamy tablicę `items` z propsów

  return (
    <Gutter className="pb-20 justify-center flex flex-wrap">
      <h1>Filtered Products test</h1>
    </Gutter>
  )
}
