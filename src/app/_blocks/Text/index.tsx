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

export const Text: React.FC<Props> = props => {
  const { richText, media, staticImage, imagePosition = 'left' } = props
  let caption
  if (media && typeof media === 'object') caption = media.filename

  console.log(props)

  return (
    <Gutter className="">
      <div className={`md:flex ${imagePosition === 'right' ? 'md:flex-row-reverse' : ''}`}>
        <RichText
          content={richText}
          className={`${classes} px-5 py-5 md:py-0 w-full md:w-1/2 order-2`}
        />{' '}
        {/* Renderowanie pola `richText` */}
        <div className="flex w-full md:w-1/2 justify-center">
          <Media resource={media} src={staticImage} className=" order-1" />
        </div>
      </div>
    </Gutter>
  )
}
