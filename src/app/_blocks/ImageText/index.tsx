import React from 'react'
import { StaticImageData } from 'next/image'

import { Page } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'

import classes from './index.module.scss'

type Props = Extract<Page['layout'][0], { blockType: 'imageText' }> & {
  staticImage?: StaticImageData
  id?: string
}

export const ImageText: React.FC<Props> = props => {
  const { media, position = 'default', staticImage } = props
  let caption

  return (
    <div className={classes.mediaBlock}>
      <p>test</p>
    </div>
  )
}
