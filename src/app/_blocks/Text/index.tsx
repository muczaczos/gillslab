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

  return (
    <Gutter className="">
      <div className="flex">
        <RichText content={test} className={`${classes} w-1/2 order-2`} /> {/* Renderowanie pola `richText` */}
        <Media resource={media} src={staticImage} className="w-1/2 order-1" />
      </div>
    </Gutter>
  )
}
