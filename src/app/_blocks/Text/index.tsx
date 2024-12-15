import React from 'react'
import { StaticImageData } from 'next/image'

import { Page } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'

import classes from './index.module.scss'

type Props = Extract<Page['layout'][0], { blockType: 'text' }>

interface Media {
  caption?: string
}

export const Text: React.FC<
  Props & {
    staticImage?: StaticImageData
    id?: string
  }
> = ({ test, staticImage, media }) => {
  if (media?.filename) {
    // Renderuj obraz
  } else {
    // Wyświetl placeholder lub pomiń
  }

  let caption
  if (media && typeof media === 'object') caption = media.caption
  return (
    <div className={classes.mediaBlock}>
      <p>test</p>
      <p>{test}</p>
      <Media resource={media} src={staticImage} />
    </div>
  )
}
