import React from 'react'
import Image from 'next/image'

export type ImageTextBlockProps = {
  blockName: string;  // Dodaj blockName tutaj
  blockType: string;
  image: {
    url: string
    alt?: string
  }
  text: string
  alignment: 'left' | 'right'
}

export const ImageTextBlock: React.FC<ImageTextBlockProps> = ({ image, text, alignment }) => {
  console.log('Blocks props:', image)
  return (
    <div
      className={`flex flex-col md:flex-row ${alignment === 'right' ? 'md:flex-row-reverse' : ''
        } items-center`}
    >
      <div className="w-full md:w-1/2">
        <Image src={image.url} alt={image.alt || 'Image'} className="w-full h-auto" />
      </div>
      <div className="w-full md:w-1/2 p-4">
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </div>
  )
}
