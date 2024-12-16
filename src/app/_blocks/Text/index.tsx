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
}

export const Text: React.FC<Props> = props => {
  const { test, media, staticImage } = props

  let caption
  if (media && typeof media === 'object') caption = media.filename

  console.log(props)
  return (
    <div className={classes.mediaBlock}>
      <p>test</p>
      <p>{test}</p>
      <Media resource={media} src={staticImage} />
      <p>no i po obrazku</p>
    </div>
  )
}
