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

  return (
    <Gutter className="">
      {richText && media && (
        <div
          className={`md:flex md:items-center ${
            imagePosition === 'right' ? 'md:flex-row-reverse' : ''
          } min-h-[300px]`} // dodajemy minimalną wysokość tylko od md
        >
          <RichText
            content={richText}
            className={`${classes} px-5 py-0 w-full md:py-0 md:w-1/2 order-2`}
          />{' '}
          {/* Renderowanie pola `richText` */}
          <div className="flex w-full md:w-1/2 justify-center">
            <Media resource={media} src={staticImage} className=" order-1" />
          </div>
        </div>
      )}
      {richText && !media && (
        <div className="w-full">
          <RichText content={richText} className={`${classes} px-5 py-0 md:py-0 w-full order-2`} />{' '}
        </div>
      )}
    </Gutter>
  )
}
