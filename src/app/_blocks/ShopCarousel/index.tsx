import React from 'react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

import { Page } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'
import ProductsCarousel from '../../_components/ProductsCarousel'

import classes from './index.module.scss'

type Props = Extract<Page['layout'][0], { blockType: 'imageLink' }> & {
  staticImage?: StaticImageData
  id?: string
  title?: string
  imagePosition?: 'left' | 'right' // Nowe pole dla pozycji obrazu
}

export const ShopCarousel: React.FC<Props> = props => {
  const { title } = props // Wyciągamy tablicę `items` z propsów

  return (
    <Gutter className="pb-20 justify-center flex flex-wrap">
      {/* Tytuł */}
      <h2 className="text-lg font-bold text-customGray-dark mb-2">{title}</h2>
      {/* Karuzela produktów */}
      <ProductsCarousel filteredPages={undefined} category={title} />
    </Gutter>
  )
}
