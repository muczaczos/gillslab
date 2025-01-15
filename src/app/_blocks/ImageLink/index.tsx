import React from 'react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

import { Page } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'

import classes from './index.module.scss'

type Props = Extract<Page['layout'][0], { blockType: 'imageLink' }> & {
  staticImage?: StaticImageData
  id?: string
  test?: string
  imagePosition?: 'left' | 'right' // Nowe pole dla pozycji obrazu
}

export const ImageLink: React.FC<Props> = props => {
  const { items } = props // Wyciągamy tablicę `items` z propsów

  return (
    <Gutter className="pb-20 justify-center flex flex-wrap">
      {items &&
        items.map((item, index) => (
          <Link
            key={index}
            href={item.url}
            className="m-5 max-w-sm rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white"
          >
            {/* Obrazek */}
            {item.media && typeof item.media !== 'string' && (
              <Image
                className="p-2 w-[150px] h-[150px]"
                src={item.media.url}
                alt="Example"
                height="100"
                width="100"
              />
            )}
            {/* Treść */}
            <div className="px-4 pb-4">
              {/* Tytuł */}
              <h2 className="text-lg font-bold text-customGray-dark mb-2">{item.title}</h2>
              {/* Treść */}
              <RichText content={item.richText} className="" />{' '}
            </div>
          </Link>
        ))}
    </Gutter>
  )
}
