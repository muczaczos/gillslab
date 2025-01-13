import React from 'react'
import { StaticImageData } from 'next/image'

import { Page } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'

import classes from './index.module.scss'

type Props = Extract<Page['layout'][0], { blockType: 'text' }> & {
  staticImage?: StaticImageData
  id?: string
  test?: string
  imagePosition?: 'left' | 'right' // Nowe pole dla pozycji obrazu
}

export const ImageLink: React.FC<Props> = props => {
  return (
    <Gutter className="pb-20">
      <h1>Test</h1>
    </Gutter>
  )
}
