import React from 'react'
import Image, { StaticImageData } from 'next/image'

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
    <Gutter className="pb-20 justify-center flex flex-wrap">
      <div className="m-5 max-w-sm rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white">
        {/* Obrazek */}
        <Image
          className="p-2 w-[100px] h-[100px]"
          src="/media/promotions.png"
          alt="Example"
          height="100"
          width="100"
        />
        {/* Treść */}
        <div className="px-4 pb-4">
          {/* Tytuł */}
          <h2 className="text-lg font-bold text-gray-800 mb-2">Przykładowy Tytuł</h2>
          {/* Treść */}
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
        </div>
      </div>
      <div className="m-5 max-w-sm rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white">
        {/* Obrazek */}
        <Image
          className="p-2 w-[100px] h-[100px]"
          src="/media/promotions.png"
          alt="Example"
          height="100"
          width="100"
        />
        {/* Treść */}
        <div className="px-4 pb-4">
          {/* Tytuł */}
          <h2 className="text-lg font-bold text-gray-800 mb-2">Przykładowy Tytuł</h2>
          {/* Treść */}
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
        </div>
      </div>
      <div className="m-5 max-w-sm rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white">
        {/* Obrazek */}
        <Image
          className="p-2 w-[100px] h-[100px]"
          src="/media/promotions.png"
          alt="Example"
          height="100"
          width="100"
        />
        {/* Treść */}
        <div className="px-4 pb-4">
          {/* Tytuł */}
          <h2 className="text-lg font-bold text-gray-800 mb-2">Przykładowy Tytuł</h2>
          {/* Treść */}
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
        </div>
      </div>
      <div className="m-5 max-w-sm rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white">
        {/* Obrazek */}
        <Image
          className="p-2 w-[100px] h-[100px]"
          src="/media/promotions.png"
          alt="Example"
          height="100"
          width="100"
        />
        {/* Treść */}
        <div className="px-4 pb-4">
          {/* Tytuł */}
          <h2 className="text-lg font-bold text-gray-800 mb-2">Przykładowy Tytuł</h2>
          {/* Treść */}
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
        </div>
      </div>
    </Gutter>
  )
}
